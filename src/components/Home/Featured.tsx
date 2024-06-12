"use client";
import { useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { FEATURED_DATA } from "@/utils/data";
import AOS from "aos";
import "aos/dist/aos.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Featured = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 250,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <div className="flex flex-col">
      <div data-aos="fade-up">
        <div className="flex flew-col justify-evenly flex-wrap">
          <div className="mb-10">
            <Card shadow="sm">
              <CardHeader>
                <h1 className="text-3xl md:text-xl lg:text-4xl font-light text-center">
                  Featured
                </h1>
              </CardHeader>
              <CardBody className="overflow-visible px-3 flex flex-row justify-between items-end text-sm md:text-lg">
                <div className="font-extralight w-[65%]">
                  Our app promotes smart spending habits. Stay informed, spend
                  wisely.
                </div>
                <Button
                  value="default"
                  className="w-32 md:w-44 py-2 md:py-6 rounded-none text-[10px] md:text-sm"
                >
                  <Link href="/login">Explore Features </Link>
                </Button>
              </CardBody>
            </Card>
          </div>
          <div className="gap-3 lg:gap-[2%] grid grid-cols-3">
            {FEATURED_DATA.map((item) => (
              <Card
                shadow="sm"
                key={item.id}
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    width="100%"
                    height="500px"
                    alt={item.title}
                    className="object-cover h-[200px] md:h-[300px] lg:h-[400px] rounded-2xl"
                    src={item.img}
                  />
                </CardBody>

                <CardFooter className="text-lg font-extralight justify-center">
                  {item.title}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
