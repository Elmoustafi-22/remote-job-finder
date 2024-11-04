import { JobModel } from "../../../../models/Job";
import Image from "next/image";
import mongoose from "mongoose";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

export default async function SingleJobPage(props) {
  const jobId = props.params.jobId;
  await mongoose.connect(process.env.MONGODB_URI);
  const jobDoc = await JobModel.findById(jobId);

  return (
    <div className="container mt-8 my-6">
      <div className="sm:flex">
        <div className="grow">
          <h1 className="text-3xl font-bold text-gray-700 drop-shadow-sm">
            {jobDoc?.title}
          </h1>
          <div className="capitalize text-sm text-teal-700">
            {jobDoc?.remote} &middot; {jobDoc?.city}, {jobDoc?.country} |{" "}
            {jobDoc?.type}
          </div>
        </div>
        <div>
          <Image
            src={jobDoc?.jobIcon}
            alt="job icon"
            width={50}
            height={50}
            className="w-auto h-auto max-w-16 max-h-16 shadow-lg rounded-full"
          />
        </div>
      </div>

      <div className="my-4 flex flex-col gap-2">
        <h3 className="font-bold text-lg">Job Description</h3>
        <div className="text-gray-700 whitespace-pre-line text-sm drop-shadow-sm">
          {jobDoc?.description}
        </div>

        <div className="flex items-center gap-4 mt-6 bg-gray-100 p-8 rounded-lg">
          <h3 className="font-bold mb-2 italic text-gray-600">To apply, send your CV and cover letter to the contact below</h3>
          <Image
            src={jobDoc?.contactPhoto}
            alt="contact person"
            width={50}
            height={50}
            className="w-auto h-auto max-w-16 max-h-16 shadow-lg rounded-full"
          />
          <div className="text-gray-700 text-lg">
            <p className="flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} className="text-teal-600 size-4" />
              <span>Name: {jobDoc?.contactName}</span>
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-teal-600 size-4"
              />
              <Link
                href={`mailto:${jobDoc?.contactEmail}`}
                className="hover:text-violet-600 hover:underline"
              >
                {jobDoc?.contactEmail}
              </Link>
            </p>
            <p className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-teal-600 size-4"
              />
              <Link
                href={`tel:${jobDoc?.contactPhone}`}
                className="hover:text-violet-600 hover:underline"
              >
                {jobDoc?.contactPhone}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
