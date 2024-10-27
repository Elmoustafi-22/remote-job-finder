"use server";
import path from "path";
import fs from "fs/promises"
import { v4 as uuidv4 } from "uuid";
import os from "os"
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function savePhotoToLocal(formData) {
    const file = formData.get("file");
    if (!file) throw new Error("No file provided")

    const data = await file.arrayBuffer();
    const buffer = Buffer.from(data);
    const name = uuidv4();
    const ext = file.type.split("/")[1];
    console.log({ name, ext })

    const tempdir = os.tmpdir();
    const uploadDir = path.join(tempdir, `${name}.${ext}`);

    await fs.writeFile(uploadDir, buffer);

    return { filepath: uploadDir, filename: file.name }
}

async function uploadPhotoToCloudinary(file) {
    return await cloudinary.v2.uploader.upload(file.filepath, {
        folder: "remote-jobs",
        public_id: `file_${Date.now()}`,
        resource_type: "image",
    });
}

export async function uploadPhoto(formData) {
    try {
        const newFile = await savePhotoToLocal(formData);
        const photo = await uploadPhotoToCloudinary(newFile);
        return {url: photo.secure_url }
    } catch (error) {
        return { errMsg: error.message };
    }
}