"use client";
import { Github, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { SOCIAL_LINK } from "@/utils/data";
import axios, { AxiosError, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function ProfileMenu() {
  const router = useRouter();
  const handleLogout = async () => {
    const res = await axios
      .post("/api/logout")
      .then((res: AxiosResponse) => {
        toast.success(res.data.message, { duration: 6000 });
        router.push("/login");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        const data: any = err?.response?.data;
        toast.error(data?.message), { duration: 6000 };
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Shlok Sinha</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link href={SOCIAL_LINK.github} target="_blank">
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
