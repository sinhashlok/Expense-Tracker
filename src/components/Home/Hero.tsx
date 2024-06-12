import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="mt-28 md:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-96 sm:gap-32 md:gap-20 lg:gap-[20%]">
      <div className="flex flex-col justify-center">
        <h1 className="text-5xl md:text-3xl lg:text-6xl mb-8 font-light">
          Track your expenses effortlessly
        </h1>
        <p className="font-light mb-20">
          Smart tools to manage your finances with ease
        </p>
        <Button value="default" className="w-44 py-6 rounded-none text-sm">
          Get Started
        </Button>
      </div>
      <div className="hidden sm:flex">
        <Image
          priority
          src="/assets/home/hero-section-piggy-bank.jpeg"
          width="550"
          height="100"
          alt="hero"
        />
      </div>
    </div>
  );
};

export default Hero;
