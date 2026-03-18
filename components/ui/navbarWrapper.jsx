// NavbarWrapper.tsx (Server)
"use client"
import Cookies from "js-cookie";
import { Navbar1 } from "./navbar1";

export default  function NavbarWrapper() {
  const userId = Cookies.get("id");
  return <Navbar1 initialVerified={!!userId} />;
}