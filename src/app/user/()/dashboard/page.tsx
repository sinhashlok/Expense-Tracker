import Welcome from "@/components/Dashboard/Welcome";
import ProgressSection from "@/components/Dashboard/ProgressSection";
import { cookies } from "next/headers";
import { UserData } from "@/schema/dbScehma";
import ExpenseTable from "@/components/Dashboard/ExpenseTable";

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

  return (
    <div>
      <Welcome name={name} />
      <ProgressSection expenses={expenses} budget={budget} />
      <ExpenseTable expenses={expenses}/>
    </div>
  );
}
