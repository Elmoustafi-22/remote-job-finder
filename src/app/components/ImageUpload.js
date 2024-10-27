"use client"
import { Button } from "@radix-ui/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ImageUpload({ icon }) {
  const fileInRef = useRef();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("")

  async function handleUpload(ev) {
    const input = ev.target;

    if (input && input.files?.length > 0) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.data.link) {
          setUrl(response.data.link);
          setError("");
          toast.success("Image uploaded successfully!"); 
        }
      } catch (error) {
        console.error("Upload failed:", error)
        setError("Image upload failed. Please try again.");
        toast.error("Failed to upload image.");
      }
    }
  }

  return (
    <>
      <div className="bg-gray-100 border border-dotted rounded-md size-24 inline-flex items-center content-center justify-center">
        {url ? (
          <Image src={url} alt="Uploaded image" width={80} height={80} className="object-cover"/>
        ) : (
          <FontAwesomeIcon icon={icon} className="text-gray-400" />
        )}
      </div>
      <div className="mt-2">
        <input
          ref={fileInRef}
          type="file"
          className="hidden"
          onChange={handleUpload}
        />
        <Button
          variant="soft"
          type="button"
          onClick={() => fileInRef.current?.click()}
        >
          Select file
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </>
  );
}