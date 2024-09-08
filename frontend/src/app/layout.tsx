"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import Provider from "@/components/provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Raleway as Font } from "next/font/google";
import "./globals.css";
import EmojiRain from "@/components/canvas-bg";
import FloatingBackground from "@/components/canvas-bg";
import { usePathname } from "next/navigation";

const font = Font({
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Tesseract | EthOnline 2024",
//   description: "",
// };

const images = [
  "/eth-logo.png",
  "/tesseract.png",
  "/eigen.png",
  "https://ssv.network/wp-content/uploads/logos/logo-ssv-full.svg",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const isHomePage = path === "/";
  return (
    <html lang="en">
      <body className={cn(font.className)}>
        <Provider>
          {/* <FloatingBackground images={images}> */}
          <div
            className={cn(
              "flex min-h-screen w-full flex-col md:gap-y-4",
              isHomePage ? "bg-gradient" : "bg-white"
            )}
          >
            <Header />
            <div>{children}</div>
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
          {/* </FloatingBackground> */}
        </Provider>
      </body>
    </html>
  );
}
