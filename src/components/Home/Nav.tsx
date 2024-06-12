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
  Link,
} from "@nextui-org/react";
import { Button } from "@/components/ui/button";

import { useState } from "react";

const Nav = () => {
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
        >
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </NavbarContent>

          <NavbarContent className="sm:hidden pr-3" justify="center">
            <NavbarBrand>
              <p className="font-bold text-inherit">TRACKER</p>
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className="hidden sm:flex pr-3" justify="start">
            <NavbarBrand>
              <p className="font-bold text-inherit">TRACKER</p>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
            <Button variant="link">
              <Link href="/about">
                About
              </Link>
              </Button>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <NavbarItem className="hidden lg:flex">
              <Button variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button variant="ghost">
                <Link href="/signup">Sign up</Link>
              </Button>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenu>
            {menuItems.map((item) => (
              <NavbarMenuItem key={item.id}>
                <Link className="w-full" href={item.link} size="lg">
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
