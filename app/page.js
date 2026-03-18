"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Wheat,
  Sprout,
  Leaf,
  ShoppingBasket,
  Tractor,
  Truck,
  CheckCircle2,
  BarChart,
  Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Navbar1 } from "@/components/ui/navbar1";
import NavbarWrapper from "@/components/ui/navbarWrapper";

// static categories for UI
const categories = [
  { name: "Cereals", icon: Wheat, color: "bg-yellow-600" },
  { name: "Vegetables", icon: Leaf, color: "bg-green-600" },
  { name: "Fruits", icon: Sprout, color: "bg-amber-500" },
  { name: "Pulses", icon: ShoppingBasket, color: "bg-rose-500" },
  { name: "Spices", icon: BarChart, color: "bg-orange-600" },
  { name: "Farm Equipment", icon: Tractor, color: "bg-blue-600" },
];

const steps = [
  {
    title: "Farmers List Their Produce",
    description:
      "Farmers register and upload details of their crops, including variety, grade, and price expectations.",
    icon: Tractor,
  },
  {
    title: "Buyers Place Fair Bids",
    description:
      "Restaurants, societies, and local vendors place bids for crops directly from farmers.",
    icon: BarChart,
  },
  {
    title: "Deal & Delivery Coordination",
    description:
      "Once a farmer accepts a bid, both parties can communicate and complete the transaction smoothly.",
    icon: CheckCircle2,
  },
];

const url = process.env.NEXT_PUBLIC_BASE_URL;
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const aboutRef = useRef(null);
  const categoriesRef = useRef(null);
  const howItWorksRef = useRef(null);
  const getStartedRef = useRef(null);

  const router = useRouter();

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={aboutRef}
          className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-green-50 to-emerald-100"
        >
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="container relative px-4 md:px-6 text-center mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-green-800">
              Connecting Farmers & Buyers Fairly
            </h1>
            <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
              AgriFair empowers farmers to sell directly to local buyers —
              ensuring fair prices for producers and affordable rates for
              consumers.
            </p>
            <form className="mt-8 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  className="pl-9"
                  placeholder="Search crops, categories, or farmers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Link href="/listings">
                <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                  Search
                </Button>
              </Link>
            </form>
          </div>
        </section>

        {/* Popular Categories Section */}
        <section ref={categoriesRef} className="w-full py-20 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Categories
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-green-800">
                Explore Crop Categories
              </h2>
              <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground">
                Browse a variety of produce directly listed by farmers from across India.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <div key={index}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 flex flex-col items-center gap-2">
                      <div className={`${category.color} p-3 rounded-full`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksRef} className="w-full py-20 bg-emerald-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Process
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-green-800">
                How AgriFair Works
              </h2>
              <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground">
                Simple, transparent, and farmer-friendly — here’s how the process flows:
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div key={index}>
                  <Card className="h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <step.icon className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-green-800">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section ref={getStartedRef} className="w-full py-20 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center">
              <Badge variant="secondary" className="mb-4">
                Get Started
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-green-800">
                Join AgriFair Today
              </h2>
              <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground">
                Whether you're a farmer or a buyer, start connecting today for a fairer and smarter agricultural market.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup/buyer">
                  <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                    Buy Crops
                  </Button>
                </Link>
                <Link href="/signup/farmer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-green-600 text-green-700"
                  >
                    Sell Produce
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </>);
}
