import Heroes from "./_components/heroes";
import Heading from "./_components/heading";
import { Footer } from "./_components/footer";

export default function MarktingPage() {
  return (
    <div className="min-h-full flex flex-col">
      <section className="flex flex-col items-center justify-center md:justify-start text-center flex-1 gap-y-8 px-5 pb-10">
        <Heading />
        <Heroes />
      </section>
      <Footer />
    </div>
  );
}
