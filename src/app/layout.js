import "./globals.css";
import { Roboto } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Roboto({ subsets: ["latin"], weight: "400" })
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white`}
        
      >
        <Toaster position="top-center" reverseOrder={false}/>
        <Header />
          {children}
        <Footer/>
      </body>
    </html>
  );
}
