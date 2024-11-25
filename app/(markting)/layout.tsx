import { Navbar } from "./_components/navbar";

const MarktingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full dark:bg-[#1f1f1f]">{children}</main>
    </div>
  );
};

export default MarktingLayout;
