import { WorkOS } from "@workos-inc/node";
import mongoose, { model, models, Schema } from "mongoose";

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    remote: { type: String, required: true },
    type: { type: String, required: true },
    salary: { type: Number, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    countryId: { type: String, required: true },
    stateId: { type: String, required: true },
    cityId: { type: String, required: true },
    jobIcon: { type: String },
    contactPhoto: { type: String },
    contactName: { type: String, required: true },
    contactPhone: { type: String, required: true },
    contactEmail: { type: String, required: true },
    orgId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export async function addOrgAndUserData(jobsDocs, user) {
  jobsDocs = JSON.parse(JSON.stringify(jobsDocs));
  await mongoose.connect(process.env.MONGODB_URI);
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  let oms = null;

  if (user && user.id) {
    oms = await workos.userManagement.listOrganizationMemberships({
      userId: user.id,
    });
  }

  for (const job of jobsDocs) {
    const org = await workos.organizations.getOrganization(job.orgId);
    job.orgName = org.name;
    if (oms && oms.data.length > 0) {
      job.isAdmin = !!oms.data.find((om) => om.organizationId === job.orgId);
    }
  }
  return jobsDocs;
}

export const JobModel = models?.Job || model("Job", JobSchema);
