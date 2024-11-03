import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { JobModel } from "../../../../models/Job";

export async function DELETE(req) {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    await mongoose.connect(process.env.MONGODB_URI);
    await JobModel.deleteOne({
        _id: id,
    });
    return Response.json(true)
}