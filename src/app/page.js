import Link from "next/link";
import { 
  getSignInUrl,
  getSignUpUrl,
  withAuth,
 } from "@workos-inc/authkit-nextjs";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";


export default async function Home() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();
  
  return (
    <>
      <Hero />
      <Jobs />
    </>
  );
}
