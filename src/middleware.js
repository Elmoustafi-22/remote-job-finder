import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

export const config = { 
    matcher: [
        "/", 
        "/new-listing",
        "/new-listing/:orgId*", 
        "/new-company",
        "/api/upload",
    ] 
};