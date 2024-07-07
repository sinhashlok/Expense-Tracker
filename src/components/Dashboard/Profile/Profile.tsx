"use client";

import { useEffect, useState } from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const Profile = ({
  user,
  expense,
}: {
  user: { name: string; email: string } | undefined;
  expense: { amount: number; expenseType: number }[] | null;
}) => {
  let totalExpense = 0;
  let totalInvestment = 0;
  let data = [
    { value: 0, label: "Food" },
    { value: 0, label: "Travel" },
    { value: 0, label: "Entertainment" },
    { value: 0, label: "Health" },
    { value: 0, label: "Gym" },
    { value: 0, label: "Investment" },
    { value: 0, label: "Rent" },
    { value: 0, label: "Subscription" },
    { value: 0, label: "Mobile Recharge" },
    { value: 0, label: "Learning" },
  ];

  const size = {
    width: 400,
    height: 400,
    legend: { hidden: true },
    margin: { right: 5 },
  };

  expense?.map((item) => {
    if (item.expenseType === 6) {
      totalInvestment += item.amount;
    } else {
      totalExpense += item.amount;
    }
    data[item.expenseType - 1].value += item.amount;
  });

  return (
    <div>
      <div className="flex flex-col">
        <h1 className="text-lg md:text-3xl font-semibold">Hi, {user?.name}</h1>
      </div>
      <div className="mt-10">
        <div className="mt-5 grid grid-cols-2 w-fit">
          <div className="flex flex-row w-fit h-fit text-white rounded-lg bg-gradient-to-r from-indigo-500 to-teal-400">
            <div className="aspect-square w-52 flex flex-col justify-center items-center">
              <h1>Total Expense</h1>
              <h1 className="text-2xl font-black">{totalExpense}</h1>
            </div>
            <div className="aspect-square w-52 flex flex-col justify-center items-center">
              <h1>Total Investment</h1>
              <h1 className="text-2xl font-black">{totalInvestment}</h1>
            </div>
          </div>
          <div className="flex flex-col rounded-lg border-2 border-black p-5 items-center justify-center">
            <PieChart
              series={[
                {
                  arcLabel: (item) => `${item.label} (${item.value})`,
                  arcLabelMinAngle: 45,
                  data,
                },
              ]}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontWeight: "light",
                },
              }}
              {...size}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
