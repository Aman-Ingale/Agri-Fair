"use client"
import { Book, Menu, Store, Sunset, Trees, Zap } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProfileMenu from "../profileMenu";
const Navbar1 = ({
  menu = [
    { title: "Home", url: "http://localhost:3000/" },
    {
      title: "Listings",
      url: "http://localhost:3000/listings",
    },
    {
      title: "Blog",
      url: "",
    },
  ],
  auth = {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
}) => {
  const [verified, setVerified] = useState(true)
  return (
    <section className="py-4 bg-gradient-to-r from-green-50 to-white dark:from-green-950/20 dark:to-black border-b border-green-200 dark:border-green-800/30">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <a className="flex items-center gap-2 mx-3 text-green-800 dark:text-green-400">
              <Store className="text-green-600 dark:text-green-400" />
              <span className="text-lg font-semibold">
                AgriFair
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            {!verified ? (<div className="flex gap-2 ">
              <Button asChild variant="outline" size="sm" className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-400">
                <a href={auth.login.url}>{auth.login.title}</a>
              </Button>
              <Button asChild size="sm" className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600">
                <a href={auth.signup.url}>{auth.signup.title}</a>
              </Button>
            </div>) :
            <div className="mx-5">
              <ProfileMenu />
            </div>
            }
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a className="flex items-center gap-2 mx-3 text-green-800 dark:text-green-400">
              <Store className="text-green-600 dark:text-green-400" />
              <span className="text-lg font-semibold">
                AgriFair
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="border-green-200 dark:border-green-800/30">
                  <Menu className="size-4 text-green-800 dark:text-green-400" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-black">
                <SheetHeader>
                  <SheetTitle>
                      <a className="flex items-center gap-2 text-green-800 dark:text-green-400">
              <Store className="text-green-600 dark:text-green-400" />
              <span className="text-lg font-semibold">
                AgriFair
              </span>
            </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-green-200 dark:border-green-800/30 text-green-800 dark:text-green-400">
          {item.items.map((subItem) => (
            <NavigationMenuLink asChild key={subItem.title} className="w-80">
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="bg-background hover:bg-green-50 hover:text-green-800 dark:hover:bg-green-900/30 dark:hover:text-green-400 group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors text-green-800 dark:text-green-400"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <SubMenuLink key={subItem.title} item={subItem} />
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a key={item.title} href={item.url} className="text-md font-semibold text-green-800 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300">
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }) => {
  return (
    <a
      className="hover:bg-muted hover:text-accent-foreground flex min-w-80 select-none flex-row gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors"
      href={item.url}
    >
      <div className="text-foreground">{item.icon}</div>
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        {item.description && (
          <p className="text-muted-foreground text-sm leading-snug">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };
