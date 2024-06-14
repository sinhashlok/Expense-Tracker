"use client";
import { CirclePlus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { AddExpense } from "./AddExpense";

const Welcome = ({ name }: { name: string }) => {
  const [expense, setExpense] = useState<boolean>(false);
  return (
    <div className="mb-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-2xl font-semibold">Hi, {name}</h1>
          <p className="text-sm md:text-lg">Here is your Report</p>
        </div>
        <div className="h-fit p-2 border-2 border-black/80 rounded-md text-black">
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
