"use client";
import { NextUIProvider } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import { ProfileMenu } from "@/components/Login/ProfileMenu";

const NavLoggedIn = () => {
  return (
    <div>
      <NextUIProvider>
        <nav>
          <Navbar isBordered className="bg-white">
            <NavbarContent className="sm:hidden pr-3" justify="start">
              <NavbarBrand>
                <Link href="/" className="font-bold text-inherit">
                  TRACKER
                </Link>
              </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex pr-3" justify="start">
              <NavbarBrand>
                <Link href="/" className="font-bold text-inherit">
                  TRACKER
                </Link>
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent justify="end">
              <NavbarItem><ProfileMenu /></NavbarItem>
            </NavbarContent>
          </Navbar>
        </nav>
      </NextUIProvider>
    </div>
  );
};

export default NavLoggedIn;
