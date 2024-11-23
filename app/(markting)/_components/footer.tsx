import Logo from "./logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="w-full flex items-center px-5 py-2 bg-background dark:bg-[#1f1f1f] z-50">
      <Logo />
      <div className="w-full flex items-center justify-between gap-x-2 md:justify-end md:ml-auto text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </footer>
  );
};
