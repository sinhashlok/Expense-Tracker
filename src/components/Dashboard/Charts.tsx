"use client";
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { UserData } from "@/schema/dbScehma";
import { motion } from "framer-motion";

export default function Charts({
  expenses,
  budget,
}: {
  expenses: UserData["expenses"];
  budget: UserData["budget"];
}) {
  let expenseData = new Array(30).fill(0);
  let investmentData = new Array(30).fill(0);
  let totalSavings = new Array(30).fill(0);
  let xAxis = new Array(30).fill(0);
  let income = budget.totalIncome;
  expenses.map((item) => {
    if (item.expenseType === 6 || item.expenseType === 10) {
      investmentData[new Date(item.createdAt).getDate()] += item.amount;
    } else {
      expenseData[new Date(item.createdAt).getDate()] += item.amount;
    }
  });

  for (var i = 0; i < 30; i++) {
    income -= expenseData[i] + investmentData[i];
    totalSavings[i] = income;
    xAxis[i] = i + 1;
  }

  return (
    <motion.div
      className="flex justify-center"
      initial={{ y: "3vh", opacity: "0" }}
      animate={{ y: "0vh", opacity: "1" }}
      transition={{ duration: 0.2 }}
    >
      <LineChart
        width={1000}
        height={500}
        series={[
          { data: totalSavings, label: "savings", area: true, showMark: false },
          { data: expenseData, label: "expense", area: true, showMark: false },
          {
            data: investmentData,
            label: "investment",
            area: true,
            showMark: false,
          },
        ]}
        xAxis={[{ scaleType: "point", data: xAxis }]}
      />
    </motion.div>
  );
}
