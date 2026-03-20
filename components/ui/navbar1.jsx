"use client";

import {
  Book,
  Menu,
  Plus,
  Store,
  Sunset,
  Trees,
  Zap,
  LayoutDashboard,
} from "lucide-react";

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
import Cookies from "js-cookie";

const Navbar1 = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Listings", url: "/listings" },
    { title: "Blog", url: "/blog" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  initialVerified,
}) => {
  const [verified, setVerified] = useState(initialVerified);
  const [mounted, setMounted] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    setVerified(initialVerified);
    setRole(Cookies.get("role"));
    setMounted(true);
  }, [initialVerified]);

  if (!mounted) return null;

  return (
    <section className="py-4 bg-gradient-to-r from-green-50 to-white dark:from-green-950/20 dark:to-black border-b border-green-200 dark:border-green-800/30">
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 mx-3 text-green-800 dark:text-green-400"
            >
              <Store className="text-green-600 dark:text-green-400" />
              <span className="text-lg font-semibold">AgriFair</span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-4 items-center ">
            {verified && role === "farmer" && (
              <>
                <Link href="/addListing">
                  <div className="bg-white h-8 w-15 flex items-center justify-center rounded-md cursor-pointer shadow">
                    <Plus color="green" />
                  </div>
                </Link>

                <Link href="/dashboard">
                  <div className="bg-white h-8 w-15 flex items-center justify-center rounded-md cursor-pointer shadow">
                    <LayoutDashboard color="green" />
                  </div>
                </Link>
              </>
            )}

            {!verified ? (
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-green-600 text-green-700 hover:bg-green-50"
                >
                  <Link href={auth.login.url}>{auth.login.title}</Link>
                </Button>

                <Button
                  asChild
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Link href={auth.signup.url}>{auth.signup.title}</Link>
                </Button>
              </div>
            ) : (
              <div className="mx-5">
                <ProfileMenu />
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 mx-3 text-green-800 dark:text-green-400"
            >
              <Store className="text-green-600 dark:text-green-400" />
              <span className="text-lg font-semibold">AgriFair</span>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4 text-green-800 dark:text-green-400" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-black">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center gap-2 text-green-800 dark:text-green-400">
                      <Store className="text-green-600 dark:text-green-400" />
                      <span className="text-lg font-semibold">
                        AgriFair
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) =>
                      renderMobileMenuItem(item)
                    )}
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

/* ---------------- MENU ITEMS ---------------- */

const renderMenuItem = (item) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger>
          {item.title}
        </NavigationMenuTrigger>

        <NavigationMenuContent>
          {item.items.map((subItem) => (
            <NavigationMenuLink
              asChild
              key={subItem.title}
              className="w-80"
            >
              <SubMenuLink item={subItem} />
            </NavigationMenuLink>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink asChild>
        <Link
          href={item.url}
          className=" hover:underline hover:bg-green-50 hover:text-green-800  group inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-green-800"
        >
          {item.title}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item) => {
  if (item.items) {
    return (
      <AccordionItem
        key={item.title}
        value={item.title}
        className="border-b-0"
      >
        <AccordionTrigger className="text-md text-green-800 py-0 font-semibold">
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
    <Link
      key={item.title}
      href={item.url}
      className="text-md font-semibold text-green-800 hover:text-green-600"
    >
      {item.title}
    </Link>
  );
};

/* ---------------- SUB MENU ---------------- */

const SubMenuLink = ({ item }) => {
  return (
    <Link
      href={item.url}
      className="hover:bg-muted flex min-w-80 flex-row gap-4 rounded-md p-3 transition-colors"
    >
      <div>{item.icon}</div>

      <div>
        <div className="text-sm font-semibold">
          {item.title}
        </div>

        {item.description && (
          <p className="text-sm text-muted-foreground">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

export { Navbar1 };