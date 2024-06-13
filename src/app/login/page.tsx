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
import { loginSchema } from "@/schema/loginSchema";

export default function SignUp() {
  const FormSchema = loginSchema;
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setBtnDisabled(true);
    const res = await axios
      .post("/api/login", data)
      .then((res: AxiosResponse) => {
        toast.success(res.data.message, { duration: 6000 });
        const exists = res.data.data;
        router.push(exists ? "/user/dashboard" : "/user/budget");
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
      <div className="bg-[url('/assets/authenticate/authImg.jpeg')] h-screen lg:pb-14">
        <Toaster />
        <nav>
          <Nav />
        </nav>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center px-6 lg:px-44">
          <div className="hidden md:flex">
            <div className="flex flex-col justify-center text-white">
              <h1 className="text-5xl md:text-3xl lg:text-6xl mb-8 font-light">
                Track your expenses effortlessly
              </h1>
              <p className="font-light">
                Smart tools to manage your finances with ease
              </p>
            </div>
          </div>
          <div className="bg-white mt-16 md:mt-44 lg:mt-20 mb-16 md:mb-20 lg:mb-12 lg:w-[65%] lg:ml-auto rounded-lg p-6 px-12 hover:scale-110 hover:shadow-black hover:shadow-2xl transition-all">
            <h1 className="text-2xl mb-6 text-center">Log in</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-[100%] space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter password" {...field} />
                      </FormControl>
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
              <div className="mt-6 text-center">
                <p>
                  Don{"'"}t have an account?{" "}
                  <Link href="/signup" className="hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-0">
        <Footer />
      </div>
    </div>
  );
}
