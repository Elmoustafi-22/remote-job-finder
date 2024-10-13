import "./globals.css";
import Header from "./components/Header";
import { Roboto } from "next/font/google"

const inter = Roboto({ subsets: ["latin"], weight: "400" })
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white`}
        
      >
        {children}
      </body>
    </html>
  );
}
