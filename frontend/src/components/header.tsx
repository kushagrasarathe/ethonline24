"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  const isDashboard = path === "/dashboard";
  return (
    <div className="flex w-full items-center justify-between py-5 md:max-w-7xl mx-auto z-[10000]">
      <Link href={"/"}>
        <Image
          src="/tesseract.png"
          alt="logo"
          className="drop-shadow-xl"
          width={180}
          height={180}
          priority
        />
      </Link>
      {isDashboard ? (
        <div>Connect Wallet Button Here</div>
      ) : (
        <Link
          href={"/dashboard"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Dashboard
        </Link>
      )}
    </div>
  );
}
