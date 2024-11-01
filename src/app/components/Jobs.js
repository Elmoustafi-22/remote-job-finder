import JobRow from "./JobRow";

export default function Jobs({header, jobs}) {
    return (
      <>
        <div className="bg-slate-200 py-6 rounded-b-3xl">
          <div className="container">
            <h2 className="font-bold mb-4 text-xl">{header || "Recent jobs"}</h2>
            <div className="flex flex-col gap-4">
              {!jobs?.length && (
                <div>No jobs found</div>
              )}
              {jobs && jobs.map((job, index)=> (
                <JobRow key={index} jobDoc={job}/>
              ))}
            </div>
          </div>
        </div>
      </>
    );
}