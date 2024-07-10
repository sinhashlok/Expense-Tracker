"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});

const Delete = ({
  user,
}: {
  user: { name: string; email: string } | undefined;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const handleSendDeleteOTP = async () => {
    try {
      await axios.post("/api/user/sendDeleteOTPEmail", {});
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await axios
      .post("/api/user/deleteUser", { code: data.pin })
      .then(async (res: AxiosResponse) => {
        router.push("/");
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  if (user?.email === "test@124.com") {
    return (
      <div>
        <h1 className="text-lg md:text-3xl font-semibold">Access Denied</h1>
        <p className="lg:w-1/2 text-sm font-light mt-1">
          * Since this is a dummy user for every, it cannot be deleted.
          <br />* Once login for all emails are activated this dummy user will
          be removed
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-lg md:text-3xl font-semibold">
        Sure, Delete Your Account?
      </h1>
      <div className="mt-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive" onClick={handleSendDeleteOTP}>
              Delete Account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Enter One-Time Password</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormDescription>
                          Please enter the one-time password sent to your phone.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
            <DialogFooter className="sm:justify-start"></DialogFooter>
          </DialogContent>
        </Dialog>
        <p className="lg:w-1/2 text-sm font-light mt-1">
          * Before proceeding with deleting your account, please note that this
          action is irreversible and will permanently remove all your data
          associated with your account.
        </p>
      </div>
    </div>
  );
};

export default Delete;
