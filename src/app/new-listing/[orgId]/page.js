import { withAuth } from "@workos-inc/authkit-nextjs"
import { WorkOS } from "@workos-inc/node";
import JobForm from "@/app/components/JobForm";

export default async function NewListingForOrgPage(props) {

    const {user} = await withAuth();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);

    if(!user) {
        return (
          <div className="container">
            <p>Please log in</p>
          </div>
        );
    }
    const orgId = props.params.orgId
    const ons = await workos.userManagement.listOrganizationMemberships({
        userId:user.id,
        organizationId: orgId
    });
    const hasAccess = ons.data.length > 0;
    if(!hasAccess){
        return (
          <div className="container">
            <p>Has no access</p>
          </div>
        );
    }
    return (
      <>
        <JobForm orgId={orgId}/>
      </>
    );
}