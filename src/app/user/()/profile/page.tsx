"use client";

import Budget from "@/components/Dashboard/Profile/Budget";
import Delete from "@/components/Dashboard/Profile/Delete";
import Profile from "@/components/Dashboard/Profile/Profile";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

const Page = () => {
  const [section, setSection] = useState<0 | 1 | 2>(0);
  const [user, setUser] = useState<{name: string, email: string}>();
  useEffect(() => {
    async function getUserData() {
      await fetch(`/api/user/getUserDetails`, {
        next: { tags: ["dashboard" ] },
      })
        .then(async (res: any) => {
          const data = await res.json();
          setUser(data.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    getUserData();
  }, [])

  return (
    <div className="flex flex-cols lg:flex-row">
      <div className="flex flex-row w-fit">
        <div className="flex flex-col space-y-5 p-10">
          <Button
            variant={`${section === 0 ? "default" : "ghost"}`}
            onClick={() => setSection(0)}
          >
            Profile
          </Button>
          <Button
            variant={`${section === 1 ? "default" : "ghost"}`}
            onClick={() => setSection(1)}
          >
            Budget
          </Button>
          <Button
            variant={`${section === 2 ? "destructive" : "ghost"}`}
            onClick={() => setSection(2)}
          >
            Delete Account
          </Button>
        </div>
        <Separator orientation="vertical" />
      </div>
      <div className="w-full p-5">
        {section === 0 ? <Profile user={user} /> : section === 1 ? <Budget /> : <Delete />}
      </div>
    </div>
  );
};

export default Page;
