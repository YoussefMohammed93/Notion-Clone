import { Navbar } from "./_components/navbar";

const MarktingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="h-full pt-[4.5rem]">{children}</main>
    </div>
  );
};

export default MarktingLayout;
