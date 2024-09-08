"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { WalletConnector } from "@privy-io/react-auth";
import ConnectWalletButton from "./wallet-connect";

export default function Header() {
  const path = usePathname();
  const isApp = path === "/app";
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
      {isApp ? (
        <div>
          <ConnectWalletButton />
        </div>
      ) : (
        <Link
          href={"/app"}
          className={cn(buttonVariants({ variant: "default" }))}
        >
          Launch App
        </Link>
      )}
    </div>
  );
}
