import Footer from "@/components/footer";
import Header from "@/components/header";
import Provider from "@/components/provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Raleway as Font } from "next/font/google";
import "./globals.css";

const font = Font({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tesseract | EthOnline 2024",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(font.className)}>
        <Provider>
          <div className="flex min-h-screen w-full flex-col md:gap-y-4">
            <Header />
            <div>{children}</div>
            <div className="mt-auto">
              <Footer />
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
