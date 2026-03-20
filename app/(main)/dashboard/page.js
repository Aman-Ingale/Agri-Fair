"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  FileText,
  Award,
  BarChart3,
  Wheat,
  MapPin,
  TrendingDown,
  Loader2,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
const url = process.env.NEXT_PUBLIC_BASE_URL;
import Cookies from "js-cookie";
export default function DashboardPage() {
  const [farmer, setFarmer] = useState({});
  const [loading, setLoading] = useState(false);
const formatter = new Intl.NumberFormat("en-IN", {
        style: "decimal",
        maximumFractionDigits: 2,
    });
  // useEffect(() => {
  //   // In a real app, get farmer_id from session/auth context
  //   // For now, using a placeholder - replace with actual auth
  //   const id = localStorage.getItem("farmer_id") || "67c8e8f1e8f1e8f1e8f1e8f1";
  //   setFarmerId(id);

  //   if (id) {
  //     fetchDashboardData(id);
  //   }
  // }, []);

  // const fetchDashboardData = async (id) => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch(`/api/dashboard?farmer_id=${id}`);
  //     const result = await response.json();

  //     if (result.success) {
  //       setData(result.data);
  //     } else {
  //       // Use dummy data if API fails
  //       setData(getDummyData());
  //     }
  //   } catch (error) {
  //     console.error("Error fetching dashboard data:", error);
  //     // Use dummy data on error
  //     setData(getDummyData());
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  async function getData() {
    const id = Cookies.get('id');
        
    fetch(`${url}/api/dashboard/${id}`, {
      // cache: "force-cache"
    })
      .then(response => {
        if (!response.ok) {
          console.log("Network response was not ok " + response.status);
        }
        return response.json(); // or response.text()
      })
      .then(data => {
        console.log("Data:", data.data);
        setFarmer(data.data)
      })
      .catch(error => {
        console.error("Fetch error:", error);

      });
  }
  useEffect(() => {
    getData()
  }, [])
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-black">
        <Loader2 className="h-8 w-8 animate-spin text-green-600 dark:text-green-400" />
      </div>
    );
  }


  const StatCard = ({ title, value, icon: Icon, subtitle, trend }) => (
    <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </p>
            <p className="text-2xl font-bold text-green-800 dark:text-green-400 mt-2">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 flex items-center justify-center">
            <Icon className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-lg p-6 border border-green-200 dark:border-green-800/30 flex flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-green-800 dark:text-green-400">
              Farmer Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Welcome back, {farmer?.firstname || "Farmer"}
              {/* {farmer?.lastname || ""} */}
            </p>
            <div className="flex flex-wrap gap-4 mt-4 text-sm">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>{farmer?.address || "N/A"}</span>
              </div>
            </div>
          </div>
          {/* <Link href="/addlisting"><div className="bg-white h-10 w-15 flex items-center justify-center rounded-md cursor-pointer shadow"><Plus color="gray"/></div></Link> */}
        </div>

        {/* farmer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Listings"
            value={farmer?.total_listings}
            icon={Package}
          // subtitle={`${farmer.activeListings} active`}
          />
          <StatCard
            title="Total Bids"
            value={farmer?.total_bids}
            icon={TrendingUp}
          // subtitle={`${farmer.pendingBids} pending`}
          />
          <StatCard
            title="Total Orders"
            value={farmer?.total_orders}
            icon={ShoppingCart}
          // subtitle={`${farmer.completedOrders} completed`}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${formatter.format(farmer?.total_revenue || 0)}`}
            icon={DollarSign}
          // subtitle="From completed orders"
          />
        </div>

        {/* Analysis Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Price Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avg. Listing Price
                </p>
                <p className="text-xl font-bold text-green-800 dark:text-green-400">
                  ₹{farmer?.avg_listings}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Avg. Bid Price
                </p>
                <p className="text-xl font-bold text-green-800 dark:text-green-400">
                  ₹{farmer?.avg_bids}
                </p>
              </div>
              {farmer?.avg_bids > 0 && farmer?.avg_listings > 0 && (
                <div className="flex items-center gap-2 pt-2 border-t border-green-200 dark:border-green-800/30">
                  {farmer?.avg_bids >= farmer?.avg_listings ? (
                    <>
                      <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm text-green-600 dark:text-green-400">
                        Bids are {Math.round(
                          ((farmer?.avg_bids - farmer?.avg_listings) /
                            farmer?.avg_listings) *
                          100
                        )}% higher
                      </span>
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      <span className="text-sm text-orange-600 dark:text-orange-400">
                        Bids are {Math.round(
                          ((farmer?.avg_listings - farmer?.avg_bids) /
                            farmer?.avg_listings) *
                          100
                        )}% lower
                      </span>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
                <Wheat className="h-5 w-5" />
                Crop Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(farmer?.crops || {}).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(farmer.crops).map(([crop, count]) => (
                    <div key={crop} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {crop}
                      </span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {count}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No crops listed yet
                </p>
              )}
            </CardContent>
          </Card>

          {/* <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Completed
                </span>
                <Badge className="bg-green-600 text-white dark:bg-green-700">
                  {farmer.completedOrders}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Pending
                </span>
                <Badge className="bg-yellow-500 text-white dark:bg-yellow-600">
                  {farmer.pendingOrders}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Accepted Bids
                </span>
                <Badge className="bg-blue-500 text-white dark:bg-blue-600">
                  {farmer.acceptedBids}
                </Badge>
              </div>
            </CardContent>
          </Card> */}
        </div>

        {/* Recent Activity */}

      </div>
    </div>
  );
}

