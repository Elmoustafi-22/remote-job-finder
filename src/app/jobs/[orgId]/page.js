import Jobs from "@/app/components/Jobs";
import { WorkOS } from "@workos-inc/node"
import mongoose from "mongoose";
import { JobModel } from "../../../../models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";

export default async function CompanyJobsPage(props) {
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workos.organizations.getOrganization(props.params.orgId);
    const {user} = await withAuth();
    await mongoose.connect(process.env.MONGODB_URI);
    const jobsDocs = JSON.parse(JSON.stringify(await JobModel.find({orgId: org.id})));
    let oms = null
    if (user) {
      oms = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
      });
    }

    for (const job of jobsDocs) {
        const org = await workos.organizations.getOrganization(job.orgId);
        job.orgName = org.name;
        if (oms && oms.data.length > 0) {
          job.isAdmin = !!oms.data.find(om => om.organizationId === job.orgId)
        }
    }

    return (
      <div>
        <div className="container">
          <h1 className="text-xl my-10">{org.name}</h1>
        </div>
        <Jobs jobs={jobsDocs} header={`Jobs posted by ${org.name}`}/>
      </div>
    );
}