import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Header() {
  return (
    <div className="flex w-full items-center justify-between py-5 md:max-w-7xl mx-auto">
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
      <Link
        href={"/dashboard"}
        className={cn(buttonVariants({ variant: "default" }))}
      >
        Dashboard
      </Link>
    </div>
  );
}
