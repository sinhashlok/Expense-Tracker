import Welcome from "@/components/Dashboard/Welcome";
import ProgressSection from "@/components/Dashboard/ProgressSection";
import { cookies } from "next/headers";
import { UserData } from "@/schema/dbScehma";
import { DataTable } from "@/components/Dashboard/ExpenseTable";
import { columns } from "@/components/Dashboard/columns";
import Charts from "@/components/Dashboard/Charts";

async function getUserData() {
  const cookie = cookies().toString();
  const res = await fetch(`${process.env.DOMAIN}/api/user/getUserData`, {
    next: { tags: ["dashboard"] },
    headers: { Cookie: cookie },
  })
    .then(async (res: any) => {
      const data = await res.json();
      return data.data;
    })
    .catch((error: any) => {
      console.log(error);
    });
    
  return res;
}

export default async function page() {
  const { id, name, expenses, budget }: UserData = await getUserData();
  let data: any = [];
  expenses.map((item) => {
    const date = new Date(item.createdAt);
    data.push({
      id: item.id,
      title: item.title,
      expenseType: item.expenseType,
      createdAt:
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
      amount: "₹" + item.amount + "/-",
    });
  });

  return (
    <div>
      <Welcome name={name} />
      <ProgressSection expenses={expenses} budget={budget} />
      <Charts expenses={expenses} budget={budget} />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
