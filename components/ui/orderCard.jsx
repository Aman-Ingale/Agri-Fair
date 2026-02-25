"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Loader2, Truck, CheckCircle } from "lucide-react";

export default function orderCard() {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Track Your Order</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Order Details */}
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-gray-500">Order Number:</p>
            <p className="text-blue-600 font-medium cursor-pointer hover:underline">
              #ORD123456
            </p>
          </div>
          <div>
            <p className="text-gray-500">Status:</p>
            <p className="text-green-600 font-medium">In Transit</p>
          </div>
        </div>

        <div className="text-sm">
          <p className="text-gray-500">Item:</p>
          <p className="font-medium">Premium Wireless Headphones</p>
        </div>

        <div className="text-sm">
          <p className="text-gray-500">Shipping Address:</p>
          <p className="font-medium">123 Main St, Anytown, USA 12345</p>
        </div>

        {/* Progress Track */}
        <div className="relative pb-6 pt-2">
          {/* Track Line BG */}
          <div className="absolute top-6 left-0 right-0 h-[3px] bg-gray-200 rounded-full"></div>
          {/* Active Progress */}
          <div className="absolute top-6 left-0 w-2/3 h-[3px] bg-blue-600 rounded-full"></div>

          <div className="flex justify-between text-center">
            <Step icon={<Package size={26} />} label="Order Placed" active />
            <Step icon={<Loader2 size={26} />} label="Processing" active />
            <Step icon={<Truck size={26} />} label="In Transit" active />
            <Step icon={<CheckCircle size={26} />} label="Delivered" />
          </div>
        </div>

        {/* Action Button */}
        <Button className="w-full bg-blue-600 hover:bg-blue-700">Next Step</Button>
      </CardContent>
    </Card>
  );
}

function Step({ icon, label, active }) {
  return (
    <div className="flex flex-col items-center">
      <div className={active ? "text-blue-600" : "text-gray-400"}>{icon}</div>
      <p
        className={
          "text-xs mt-1 font-medium " +
          (active ? "text-blue-600" : "text-gray-400")
        }
      >
        {label}
      </p>
    </div>
  );
}
