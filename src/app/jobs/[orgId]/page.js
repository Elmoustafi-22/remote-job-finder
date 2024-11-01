import Jobs from "@/app/components/Jobs";
import { WorkOS } from "@workos-inc/node"
import mongoose from "mongoose";
import { JobModel } from "../../../../models/Job";


export default async function CompanyJobsPage(props) {
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const org = await workos.organizations.getOrganization(props.params.orgId);
    await mongoose.connect(process.env.MONGODB_URI);
    const jobsDocs = await JobModel.find({orgId: org.id});
    const orgs = [];

    for (const job of jobsDocs) {
        const org = await workos.organizations.getOrganization(job.orgId);
        job.orgName = org.name;
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