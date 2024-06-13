import React from "react";

const loading = () => {
  return (
    <div>
      <div className="mb-10">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="h-7 w-44 bg-gray-200 rounded-sm mb-2"></div>
            <div className="h-5 w-24 bg-gray-200"></div>
          </div>
          <div className="h-12 w-44 bg-gray-200 rounded-sm"></div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-between  mx-auto">
        <div className="w-80 h-[170px] lg:w-96 p-2 lg:p-4 rounded-2xl bg-gray-200"></div>
        <div className="mt-5 mb-5 h-[170px] md:mt-0 w-80 lg:w-96 p-2 lg:p-4 rounded-2xl bg-gray-200"></div>
        <div className="mt-5 lg:mt-0 h-[170px] w-80 lg:w-96 p-2 lg:p-4 rounded-2xl bg-gray-200"></div>
      </div>
    </div>
  );
};

export default loading;
