import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[280px] h-[200px] sm:w-[350px] sm:h-[250px] md:w-[400px] md:h-[300px]">
          <Image
            fill
            alt="team-works"
            loading="eager"
            src="/teamworks.png"
            className="object-contain block dark:hidden"
            sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, 400px"
          />
          <Image
            fill
            alt="team-works"
            loading="eager"
            src="/teamworks-dark.png"
            className="object-contain hidden dark:block"
            sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, 400px"
          />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
