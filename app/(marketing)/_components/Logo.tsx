import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});
const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-2">
      <Image src="/logo-favicon.svg" alt="logo" height={50} width={50} />
      <p className={cn("font-semibold", font.className)}>Notion-clone</p>
    </div>
  );
};

export default Logo;
