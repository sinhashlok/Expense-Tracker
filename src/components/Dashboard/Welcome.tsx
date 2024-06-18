"use client";
import { CirclePlus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { AddExpense } from "./AddExpense";
import { motion } from "framer-motion";

const Welcome = ({ name }: { name: string }) => {
  const [expense, setExpense] = useState<boolean>(false);
  return (
    <div className="mb-10">
      <motion.div
        className="hidden md:flex bg-white h-10 w-44 absolute"
        initial={{ x: "0" }}
        animate={{
          x: "176px",
          transition: {
            duration: 1.5,
          },
        }}
      />
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-2xl font-semibold">Hi, {name}</h1>
          <p className="text-sm md:text-lg">Here is your Report</p>
        </div>
        <div className="h-fit p-2 bg-slate-900 rounded-md text-white">
          <Popover>
            <PopoverTrigger className="flex">
              <CirclePlus className="mr-2" /> Add Expense
            </PopoverTrigger>
            <PopoverContent className="mt-2 w-96">
              <AddExpense />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
