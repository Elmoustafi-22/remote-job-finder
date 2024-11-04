import {withAuth} from "@workos-inc/authkit-nextjs"
import { WorkOS } from "@workos-inc/node";
import Link from "next/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function NewListingPage() {
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    
                    
    const {user} = await withAuth();
    
    if (!user) {
        return (
          <div className="container">
            <p>You need to be logged in to post a job</p>
          </div>
        );
    }

    

    const organisationMemberships =
      await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
      });

    const activeOrganisationMemberships = organisationMemberships.data.filter(o => o.status === "active")
    const organisationNames = {}

    for (const activeMembership of activeOrganisationMemberships) {
        const organization = await workos.organizations.getOrganization(activeMembership.organizationId);
        organisationNames[organization.id] = organization.name
    }

    return (
      <>
        <div className="container mb-3">
          <div>
            <h2 className="text-lg mt-4">Your companies</h2>
            <p className="text-gray-500 text-sm mb-2">
              Select a company to create a job
            </p>
            <div>
              <div className="border inline-block rounded-md">
                {Object.keys(organisationNames).map((orgId) => (
                  <Link
                    key={orgId}
                    href={`new-listing/${orgId}`}
                    className={`p-3 hover:shadow-md 
                        hover:bg-slate-100 transition 
                        shadow-violet-300 flex 
                        gap-2 items-center ${Object.keys(organisationNames)[0] === orgId ? "": "border-t"}`}
                  >
                    {organisationNames[orgId]}
                    <FontAwesomeIcon className="size-4" icon={faArrowRight} />
                  </Link>
                ))}
              </div>
            </div>
            {organisationMemberships.data.length === 0 && (
              <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
                No company assigned to you
              </div>
            )}
            <Link
              href={"/new-company"}
              className="inline-flex gap-2 items-center bg-gray-200 px-4 py-2 rounded-md mt-6 hover:opacity-90 transition hover:shadow-md"
            >
              Create a new company
              <FontAwesomeIcon className="size-4" icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </>
    );
}