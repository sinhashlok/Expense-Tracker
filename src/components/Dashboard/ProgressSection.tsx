import { UserData } from "@/schema/dbScehma";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import { Progress } from "@/components/ui/progress";

function getAllData({
  expenses,
  budget,
}: {
  expenses: UserData["expenses"];
  budget: UserData["budget"];
}) {
  let totalExpense: number = 0;
  let totalInvestment: number = 0;
  expenses.forEach((item) => {
    item.expenseType === 6 || item.expenseType === 10
      ? (totalInvestment += item.amount)
      : (totalExpense += item.amount);
  });

  const expensePercent: number = Math.ceil(
    (totalExpense / budget?.spendingAmount) * 100
  );

  const investmentPercent: number = Math.ceil(
    (totalInvestment / budget?.investmentAmount) * 100
  );

  const savingPercent: number = Math.ceil(
    ((budget?.totalIncome - (totalExpense + totalInvestment)) /
      budget.totalIncome) *
      100
  );

  return {
    totalExpense,
    totalInvestment,
    expensePercent,
    investmentPercent,
    savingPercent,
  };
}

export default async function ProgressSection({
  expenses,
  budget,
}: {
  expenses: UserData["expenses"];
  budget: UserData["budget"];
}) {
  const {
    totalExpense,
    totalInvestment,
    expensePercent,
    investmentPercent,
    savingPercent,
  } = getAllData({ expenses, budget });

  return (
    <div className="flex flex-row flex-wrap justify-between  mx-auto">
      <Card className="w-80 h-[170px] lg:w-96 p-2 lg:p-4 rounded-2xl border-2 border-black">
        <CardHeader className="font-bold">Expenses</CardHeader>
        <CardBody className="text-2xl pb-0">₹ {totalExpense}</CardBody>
        <CardFooter className="justify-between">
          <Progress value={expensePercent} className="w-[80%]" color="red" />
          <span className="font-bold">
            {expensePercent > 100 ? 100 : expensePercent} %
          </span>
        </CardFooter>
      </Card>
      <Card className="mt-5 mb-5 h-[170px] md:mt-0 w-80 lg:w-96 p-2 lg:p-4 rounded-2xl border-2 border-black">
        <CardHeader className="font-bold">Investments & Learning</CardHeader>
        <CardBody className="text-2xl pb-0">₹ {totalInvestment}</CardBody>
        <CardFooter className="justify-between">
          <Progress value={investmentPercent} className="w-[80%]" />
          <span className="font-bold">
            {investmentPercent > 100 ? 100 : investmentPercent} %
          </span>
        </CardFooter>
      </Card>
      <Card className="mt-5 lg:mt-0 h-[170px] w-80 lg:w-96 p-2 lg:p-4 rounded-2xl border-2 border-black">
        <CardHeader className="font-bold">Total Savings</CardHeader>
        <CardBody className="text-2xl pb-0">
          ₹ {budget?.totalIncome - (totalInvestment + totalExpense)}
        </CardBody>
        <CardFooter className="justify-between">
          <Progress value={savingPercent} className="w-[80%]" />
          <span className="font-bold">
            {savingPercent < 0 ? 0 : savingPercent} %
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}