"use client";
import { NextUIProvider } from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Nav = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    {
      id: 1,
      item: "About",
      link: "/about",
    },
    {
      id: 2,
      item: "Login",
      link: "/login",
    },
  ];

  return (
    <NextUIProvider>
      <nav>
        <Navbar
          isBordered
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className="bg-white"
        >
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </NavbarContent>

          <NavbarContent className="sm:hidden pr-3" justify="center">
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

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link href="/about">
                <Button variant="link" className="text-white">
                  About
                </Button>
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">
                <Button
                  variant="ghost"
                  className={`${pathname === "/login" && "underline"}`}
                >
                  Log in
                </Button>
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/signup">
                <Button
                  variant="ghost"
                  className={`${pathname === "/signup" && "underline"}`}
                >
                  Sign up
                </Button>
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu>
            {menuItems.map((item) => (
              <NavbarMenuItem key={item.id}>
                <Link className="w-full" href={item.link}>
                  {item.item}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>
      </nav>
    </NextUIProvider>
  );
};

export default Nav;
