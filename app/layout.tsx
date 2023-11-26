import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FitnessNow!",
  description: "Fitness Website by G16 K01",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-black">
          <div className="container">
            <ToastContainer />
            <Navbar />
          </div>
        </div>

        {children}
        <div className="bg-black">
          <div className="container">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
