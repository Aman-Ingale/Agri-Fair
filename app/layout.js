import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar1 } from "@/components/ui/navbar1";
import { Toaster } from "@/components/ui/sonner"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AgriFair",
  description: "Connecting farmers and buyers fairly",
};

export default function RootLayout({ children }) {
  return (
    <>
    <Navbar1 />
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
    </>
  );
}
