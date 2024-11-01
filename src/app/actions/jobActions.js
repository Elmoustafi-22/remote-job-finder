"use server";

import mongoose from "mongoose";
import { JobModel } from "../../../models/Job";

export async function saveJobAction(data) {
    await mongoose.connect(process.env.MONGODB_URI);
    const jobDoc = await JobModel.create(Object.fromEntries(data));
    return JSON.parse(JSON.stringify(jobDoc));
}