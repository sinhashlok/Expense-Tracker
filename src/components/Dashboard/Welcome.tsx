import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";

const Welcome = ({ name }: { name: string }) => {
  return (
    <div className="mb-10">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h1 className="text-lg md:text-2xl font-semibold">Hi, {name}</h1>
          <p className="text-sm md:text-lg">Here is your Report</p>
        </div>
        <div>
          <Button
            className="p-2 md:p-6 font-semibold border-2 border-red-500"
            variant="add"
          >
            <CirclePlus className="mr-2" /> Add Expense
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
