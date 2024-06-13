"use client";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { CATEGORIES_DATA } from "@/utils/data";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  offscreen: {
    y: 150,
  },
  onscreen: {
    y: -100,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.5,
      duration: 1.5,
    },
  },
};

const Categories = () => {
  return (
    <div className="mt-32 flex flex-col">
      <motion.div
        className="card-container"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
      >
        <div>
          <h1 className="text-5xl md:text-3xl lg:text-6xl font-light text-center mb-20 lg:mb-40">
            Categories
          </h1>
          <motion.div className="card" variants={cardVariants}>
            <div className="gap-6 lg:gap-[2%] grid grid-cols-2 lg:grid-cols-4">
              {CATEGORIES_DATA.map((item) => (
                <Card
                  shadow="sm"
                  key={item.id}
                  isFooterBlurred
                  className="border-none"
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

                  <CardFooter className="rounded-b-xl justify-between bg-black/60 border-white/20 border-1 overflow-hidden py-1 md:py-2 absolute bottom-0 w-[100%]  shadow-small  z-10">
                    <p className="text-tiny text-white/80 text-[10px] md:text-base">
                      {item.title}
                    </p>
                    <Button
                      className={`text-tiny text-[8px] p-2 md:text-base text-white bg-black/65 rounded-md ${
                        (item.id === 1 || item.id === 4) &&
                        "hover:cursor-default"
                      }`}
                      variant="flat"
                      color="default"
                      size="sm"
                    >
                      {item.id === 1 || item.id === 4 ? (
                        "Comming Soon"
                      ) : (
                        <Link href="/login">Try Now!</Link>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Categories;
