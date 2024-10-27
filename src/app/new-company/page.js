import { withAuth } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";
import createCompany from "../actions/workosActions";


export default async function NewCompanyPage() {
    const workos = new WorkOS(process.env.WORKOS_API_KEY);
    const { user } = await withAuth();

    if (!user) {
      return (
        <div className="container">
          <p>You need to be logged in to post a job</p>
        </div>
      );
    }
    async function handleSubmit(data) {
      "use server";
      if (user) {
        await createCompany(data.get("newCompanyName"), user.id);
      }
    }
    return (
        <div className="container">
        <h2 className="text-xl mt-6">Create a new company</h2>
        <p className="text-gray-500 text-sm mb-2">
            To create a job listing you need to register
        </p>

        <form action={handleSubmit} className="flex gap-2 mb-4">
            <input
            type="text"
            name="newCompanyName"
            placeholder="company name"
            className="p-2 border border-slate-400 rounded-md outline-none"
            />
            <button
            type="submit"
            className="flex gap-1 items-center bg-gray-200 px-4 py-2 rounded-md shadow-md hover:opacity-85"
            >
            Create company
            </button>
        </form>
        </div>
    );
}
