// app/(main)/layout.js
import { Navbar1 } from "@/components/ui/navbar1";
import NavbarWrapper from "@/components/ui/navbarWrapper";

export default function MainLayout({ children }) {
  return (
    <>
    <Navbar1 initialVerified={true} />
      <main>{children}</main>
    </>
  );
}