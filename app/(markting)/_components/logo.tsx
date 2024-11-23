import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        alt="logo"
        width="40"
        height="40"
        loading="eager"
        src="/notion.png"
        className="block dark:hidden"
      />
      <Image
        alt="logo"
        width="40"
        height="40"
        loading="eager"
        src="/notion-dark.png"
        className="hidden dark:block"
      />
      <p className={cn("font-semibold", font.className)}>Notion</p>
    </div>
  );
};

export default Logo;
