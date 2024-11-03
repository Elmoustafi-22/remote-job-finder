import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import "@radix-ui/themes/styles.css";

const inter = Roboto({ subsets: ["latin"], weight: "400" })

export const metadata = {
  title: "Remote Job Finder",
  description: "Authored by Mustopha Abdulqadir",
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white flex flex-col min-h-screen`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
