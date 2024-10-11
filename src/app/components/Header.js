import React from "react";
import Link from "next/link";

export default function Header() {
    return (
      <>
        <header>
          <div className="container flex items-center justify-between mx-auto my-4">
            <Link href="/" className="font-bold text-xl ">
              Job Board{" "}
            </Link>
            <nav className="flex gap-2 *:py-2 *:px-4 *:rounded-lg">
              <Link href={"/Login"} className="text-lg bg-gray-200 shadow-md hover:opacity-80 transition">
                Login
              </Link>
              <Link href={"/new-listing"} className="text-lg shadow-lg hover:bg-violet-500 transition text-white bg-violet-600">
                Post a job
              </Link>
            </nav>
          </div>
        </header>
      </>
    );
}