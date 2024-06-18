"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import axios, { AxiosError, AxiosResponse } from "axios";
import action from "@/app/action";
import toast from "react-hot-toast";

const handleDelete = async (id: string) => {
  const res = await axios
    .post("/api/user/deleteExpense", JSON.stringify({ id }))
    .then(async (res: AxiosResponse) => {
      toast.success("Expense Deleted", {
        duration: 6000,
      });
      await action();
    })
    .catch((err: AxiosError) => {
      console.log(err);
      const data: any = err?.response?.data;
      toast.error(data?.message), { duration: 6000 };
    });
};
export type Payment = {
  id: string;
  title: string;
  amount: number;
  createdAt: string;
  expenseType: number;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "expenseType",
    header: "Expense Type",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "amount",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem
              onClick={(e) => {
                window.location.replace("/user/dashboard/editExpense");
              }}
            >
              Edit Expense
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={() => handleDelete(payment.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
