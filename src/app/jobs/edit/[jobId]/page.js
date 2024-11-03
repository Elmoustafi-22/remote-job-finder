import mongoose from "mongoose";
import { JobModel } from "../../../../../models/Job";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import JobForm from "@/app/components/JobForm";

export default async function EditJobPage(pageProps) {
    const jobId = pageProps.params.jobId;
    await mongoose.connect(process.env.MONGODB_URI);
    const jobDoc = JSON.parse(JSON.stringify(await JobModel.findById(jobId)));
    if (!jobDoc) {
        return "Not found"
    }
    const {user} = await withAuth();
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    if(!user) {
        return "You need to login"
    }
    const oms = await workos.userManagement.listOrganizationMemberships({
        userId: user.id,
        organizationId: jobDoc.orgId
    });
    if (!oms.data.length === 0) {
        return "Access denied"
    }
    return (
        <div>
            <JobForm orgId={jobDoc.orgId} jobDoc={jobDoc}/>
        </div>
    )
}