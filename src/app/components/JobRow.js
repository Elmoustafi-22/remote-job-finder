"use client"

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import TimeAgo from "./TimeAgo";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";


export default function JobRow({jobDoc}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
      try {
        await axios.delete(`/api/jobs?id=${jobDoc._id}`);
        window.location.reload();
      } catch (error) {
        toast.error("Failed to delete :", error);
    }
    setIsModalOpen(false)
  }
    
    return (
      <>
        <div className="bg-white p-3 rounded-lg 
          hover:shadow-2xl hover:translate-y-1  transition shadow-sm relative duration-300">
          <div className="absolute top-4 right-2">
            <FontAwesomeIcon
              className="size-4 cursor-pointer text-gray-600"
              icon={faHeart}
            />
          </div>
          <div className="flex grow gap-4">
            <div className="content-center">
              <Link href={`/jobs/${jobDoc.orgId}`}>
                <Image
                  className="size-14 border-2 border-violet-200 hover:border-violet-400 hover:scale-105 transition cursor-pointer rounded-full object-cover"
                  src={jobDoc?.jobIcon}
                  width={50}
                  height={50}
                  alt={"job icon"}
                />
              </Link>
            </div>
            <div className="grow sm:flex">
              <div className="grow">
                <div>
                  <Link
                    href={`/jobs/${jobDoc.orgId}`}
                    className="text-gray-600 text-sm hover:underline transition"
                  >
                    {jobDoc?.orgName || "?"}
                  </Link>
                </div>
                <div className="font-bold text-lg mb-1">
                  <Link href={`/show/${jobDoc._id}`} className="hover:drop-shadow-md transition hover:underline">
                    {jobDoc?.title || "Job Title Unavailable"}
                  </Link>
                </div>
                <div className="text-gray-400 text-sm capitalize">
                  {jobDoc?.remote} &middot; {jobDoc?.city}, {jobDoc?.country} |{" "}
                  {jobDoc?.type}
                  {jobDoc.isAdmin && (
                    <>
                      {" "}
                      &middot;{" "}
                      <Link
                        href={`/jobs/edit/${jobDoc._id}`}
                        className="lowercase px-1 text-xs hover:bg-violet-800 transition bg-violet-600 text-slate-100 rounded-md"
                      >
                        Edit
                      </Link>{" "}
                      &middot;{" "}
                      <button
                        type="button"
                        className="px-1 lowercase text-xs hover:bg-orange-800 transition bg-orange-600 text-slate-100 rounded-md"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
              {jobDoc.createdAt && (
                <div className="content-end text-gray-500 text-sm">
                  <TimeAgo createdAt={jobDoc.createdAt} />
                </div>
              )}
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
              <p>Are you sure want to delete this job?</p>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-3 py-1 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  onClick={handleDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
}