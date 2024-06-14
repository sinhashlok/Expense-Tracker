"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXPENSE_TABLE } from "@/utils/data";
import { Input } from "../ui/input";
import { addExpenseSchema } from "@/schema/addExpenseSchema";
import toast, { Toaster } from "react-hot-toast";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import action from "@/app/action";

const FormSchema = addExpenseSchema;

export function AddExpense() {
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setBtnDisabled(true);
    const title = data.title;
    const amount = data.amount;
    const expenseType = parseInt(data.expneseType, 10);

    await axios
      .post("/api/addExpense", JSON.stringify({ title, amount, expenseType }))
      .then(async (res: AxiosResponse) => {
        toast.success(res.data.message + "\nVerify your email.", {
          duration: 6000,
        });
        await action();
      })
      .catch((err: AxiosError) => {
        console.log(err);
        const data: any = err?.response?.data;
        toast.error(data?.message), { duration: 6000 };
      });
    setBtnDisabled(false);
  }

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expneseType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expenses List</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of expense" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EXPENSE_TABLE.map((expense) => (
                    <SelectItem key={expense.id} value={expense.id + ""}>
                      {expense.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {btnDisabled ? (
          <Button disabled className="w-full">
            <Loader2 className="mr-2 h-4 w- animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit" variant="outline" className="w-full">
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}
