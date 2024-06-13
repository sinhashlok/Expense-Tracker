"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Nav from "@/components/Home/Nav";
import Footer from "@/components/Footer";
import { targetSchema } from "@/schema/targetSchema";

export default function Budget() {
  const FormSchema = targetSchema;
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      targetAmount: 10000,
    },
  });
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    
    setBtnDisabled(true);
    const res = await axios
      .post("/api/targetAmount", data)
      .then((res: AxiosResponse) => {
        console.log(res.data);

        toast.success(res.data.message, { duration: 6000 });
        router.push("/user/dashboard");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        const data: any = err?.response?.data;
        toast.error(data?.message, { duration: 6000 });
      });
    setBtnDisabled(false);
  }

  return (
    <div>
      <div className="bg-[url('/assets/authenticate/authImg.jpeg')] h-screen">
        <nav>
          <Nav />
        </nav>
        <div className="bg-white mt-16 md:mt-44 lg:mt-20 lg:w-[30%] mx-auto rounded-lg p-6 px-12">
          <h1 className="text-2xl mb-6 text-center">Budget</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-[100%] space-y-6"
            >
              <FormField
                control={form.control}
                name="targetAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Amount</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the amount over which you not spend
                    </FormDescription>
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
        </div>
        <div className="w-full absolute bottom-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}
