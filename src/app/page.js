import Link from "next/link";
import { 
  getSignInUrl,
  getSignUpUrl,
  withAuth,
 } from "@workos-inc/authkit-nextjs";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Jobs from "./components/Jobs";
import Footer from "./components/Footer";

export default async function Home() {
  // Retrieves the user from the session or returns `null` if no user is signed in
  const { user } = await withAuth();

  // Get the URL to redirect the user to AuthKit to sign in
  const signInUrl = await getSignInUrl();

  // Get the URL to redirect the user to AuthKit to sign up
  const signUpUrl = await getSignUpUrl();

  return (
    <>
      <Header />
      <Hero />
      <Jobs />
      <Footer />
    </>
  );
}
