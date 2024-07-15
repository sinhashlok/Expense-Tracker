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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { EXPENSE_TABLE } from "@/utils/data";
import { Input } from "../ui/input";
import { addExpenseSchema } from "@/schema/addExpenseSchema";
import toast, { Toaster } from "react-hot-toast";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import action from "@/app/action";
import { cn } from "@/lib/utils";
import { format } from "util";

const FormSchema = addExpenseSchema;

export function AddExpense() {
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      createdAt: new Date(),
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setBtnDisabled(true);
    const title = data.title;
    const amount = data.amount;
    const expenseType = parseInt(data.expneseType, 10);
    const createdAt = data.createdAt.toString();

    await axios
      .post(
        "/api/user/addExpense",
        JSON.stringify({ title, amount, expenseType, createdAt })
      )
      .then(async (res: AxiosResponse) => {
        toast.success("Expense Added", {
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
        <FormField
          control={form.control}
          name="createdAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of expense</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(
                          field.value.getDate() +
                            "/" +
                            field.value.getMonth() +
                            "/" +
                            field.value.getFullYear()
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
