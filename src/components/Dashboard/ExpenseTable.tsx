import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UserData } from "@/schema/dbScehma";
import { MONTHS } from "@/utils/data";

export default function ExpenseTable({
  expenses,
}: {
  expenses: UserData["expenses"];
}) {
  /*
    id: number;
          title: string;
          amount: number;
          createdAt: Date;
          month: number;
          expenseType: number
    */
  return (
    <div>
      <Table>
        <TableCaption>
          Spendings for{" "}
          <span className="underline">{MONTHS[new Date().getMonth()]}</span>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">Expense Type</TableHead>
            <TableHead className="w-[20%]">Title</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        {expenses.map((expense) => (
          <TableBody key={expense.id}>
            <TableRow>
              <TableCell>{expense.expenseType}</TableCell>
              <TableCell className="font-medium">{expense.title}</TableCell>
              <TableCell className="text-right">₹ {expense.amount}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
}
