import React from "react";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import Link from "next/link";
import { SOCIAL_LINK } from "@/utils/data";

const Footer = () => {
  return (
    <div className="p-5 bg-white">
      <div className="flex flex-row justify-center space-x-10">
        <div className="flex flex-col mr-20 md:mr-44 items-center">
          <h1 className="font-bold text-inherit">TRACKER</h1>
          <Link href={SOCIAL_LINK.twitter} target="_blank">
            <XIcon fontSize="small" className="mt-4 cursor-pointer" />
          </Link>
          <Link href={SOCIAL_LINK.instagram} target="_blank">
            <InstagramIcon fontSize="small" className="mt-4 cursor-pointer" />
          </Link>
        </div>
        <div className="text-sm font-medium flex flex-col">
          <Link href="/about" className="mb-4 hover:underline">
            About me
          </Link>
          <Link href="/login" className="mb-4 hover:underline">
            Log in
          </Link>
          <Link href="/signup" className="hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
