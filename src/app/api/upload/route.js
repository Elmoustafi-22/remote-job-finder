import cloudinary from "cloudinary";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import os from "os";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const runtime = "nodejs";

async function savePhotoToLocal(file){
  const data = await file.arrayBuffer();
  const buffer = Buffer.from(data);
  const name = uuidv4();
  const ext = file.type.split("/")[1];
  const tempDir = os.tmpdir();
  const uploadDir = path.join(tempDir, `${name}.${ext}`);
  await fs.writeFile(uploadDir, buffer);

  return uploadDir;
}

async function uploadPhotoToCloudinary(filePath) {
  const result = await cloudinary.v2.uploader.upload(filePath, {
    folder: "remote-jobs",
    public_id: `file_${Date.now()}`,
    resource_type: "image",
  })

  return result.secure_url
}

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response(JSON.stringify({ error: "No file provided" }), {
      status: 400,
      headers: {"Content-Type": "application/json"},
    });
  }

  try {
    const localFilePath = await savePhotoToLocal(file);
    const photoUrl = await uploadPhotoToCloudinary(localFilePath);

    // Clean up the local file after upload
    await fs.unlink(localFilePath);

    return new Response(JSON.stringify({ link: photoUrl }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Upload failed:", error);
    return new Response(JSON.stringify({ error: "Upload failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}