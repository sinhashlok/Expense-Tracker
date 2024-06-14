import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div>
      <div className="mb-10">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <Skeleton className="h-7 w-44 rounded-sm mb-2" />
            <Skeleton className="h-5 w-24 mb-2" />
          </div>
          <Skeleton className="h-12 w-44 bg-gray-200 rounded-sm" />
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-between  mx-auto">
        <Skeleton className="w-80 h-[170px] lg:w-96 p-2 lg:p-4 rounded bg-gray-200" />
        <Skeleton className="mt-5 mb-5 h-[170px] md:mt-0 w-80 lg:w-96 p-2 lg:p-4 rounded bg-gray-200" />
        <Skeleton className="mt-5 lg:mt-0 h-[170px] w-80 lg:w-96 p-2 lg:p-4 rounded bg-gray-200" />
      </div>
    </div>
  );
};

export default loading;
