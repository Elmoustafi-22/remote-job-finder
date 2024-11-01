"use server";

import mongoose from "mongoose";
import { JobModel } from "../../../models/Job";
import { revalidatePath } from "next/cache";

export async function saveJobAction(data) {
    await mongoose.connect(process.env.MONGODB_URI);
    const jobDoc = await JobModel.create(Object.fromEntries(data));
    if ('orgId' in data) {
        revalidatePath(`/jobs/${data?.orgId}`);
    }
    return JSON.parse(JSON.stringify(jobDoc));
}