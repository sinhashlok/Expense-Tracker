import Footer from "@/components/Footer";
import Categories from "@/components/Home/Categories";
import Featured from "@/components/Home/Featured";
import Hero from "@/components/Home/Hero";
import Nav from "@/components/Home/Nav";

const page = () => {
  return (
    <div>
      <Nav />
      <div className="mx-6 md:mx-8 lg:mx-[5%] sm:mx-40">
        <Hero />
        <Categories />
        <h1 className="text-3xl md:text-xl lg:text-4xl text-center mt-20 mb-20 lg:mt-52 lg:mb-52 font-light">Save money like a pro with our expense tracking app</h1>
        <Featured />
      </div>
      <Footer />
    </div>
  );
};

export default page;
