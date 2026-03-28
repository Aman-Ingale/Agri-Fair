"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";

function Page() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFarmer, setIsFarmer] = useState(true);
    const [updatingOrderId, setUpdatingOrderId] = useState(null);

    // =========================
    // 📦 Fetch Orders
    // =========================
    async function getData() {
        try {
            setLoading(true);

            const res = await fetch("/api/orders");
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            setOrders(data.data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    }

    // =========================
    // 🔄 Update Order Status (Reusable)
    // =========================
    async function updateOrderStatus(orderId, status) {
        setUpdatingOrderId(orderId);
        try {
            const res = await fetch(`/api/orders/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    updateData: { order_status: status },
                }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            toast.success(`Order ${status}`);

            // ✅ Optimistic UI update (NO refetch needed)
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId
                        ? { ...order, order_status: status }
                        : order
                )
            );
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setUpdatingOrderId(null);
        }
    }

    // =========================
    // 🚀 Initial Load
    // =========================
    useEffect(() => {
        Cookies.get("role") === "farmer" ? setIsFarmer(true) : setIsFarmer(false);
        getData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 py-8">
            <Card className="mx-auto w-full max-w-6xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-semibold text-green-700">
                        Orders
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 items-center">

                    {/* 🔄 Loading */}
                    {loading && <p>Loading...</p>}

                    {/* ❌ No Orders */}
                    {!loading && orders.length === 0 && (
                        <p>No orders found</p>
                    )}

                    {/* 📦 Orders List */}
                    {orders.map((order) => (
                        <Card
                            key={order._id}
                            className="w-full max-w-3xl rounded-xl shadow-md"
                        >
                            <CardHeader className="flex justify-between flex-row items-center">
                                <div>
                                    <CardTitle className="text-sm flex gap-2 items-center">
                                        Order #{order._id}

                                        <span
                                            className={`px-2 py-1 rounded text-xs ${
                                                order.order_status === "completed"
                                                    ? "text-green-600"
                                                    : order.order_status === "confirmed"
                                                    ? "text-blue-600"
                                                    : order.order_status === "cancelled"
                                                    ? "text-red-600"
                                                    : "text-yellow-600"
                                            }`}
                                        >
                                            {order.order_status}
                                        </span>
                                    </CardTitle>
                                </div>

                                <Button variant="link">
                                    <Download className="w-4 h-4" />
                                    Invoice
                                </Button>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div className="font-semibold text-green-700">
                                    {order?.listings_id?.title || "N/A"}
                                </div>

                                <div className="flex gap-3 flex-wrap">
                                    <Button
                                        className={`bg-red-600 hover:bg-red-800 text-white ${!isFarmer && order.order_status === "placed"?"":"hidden"} `}
                                        disabled={loading || updatingOrderId === order._id}
                                        onClick={() =>
                                            updateOrderStatus(order._id, "cancelled")
                                        }
                                    >
                                        {updatingOrderId === order._id ? "Updating..." : "Cancel"}
                                    </Button>
                                    

                                    <Button
                                    className={`${isFarmer && order.order_status === "placed"?"":"hidden"}`}
                                        variant="outline"
                                        disabled={loading || updatingOrderId === order._id}
                                        onClick={() =>
                                            updateOrderStatus(order._id, "confirmed")
                                        }
                                    >
                                        {updatingOrderId === order._id ? "Updating..." : "Confirm"}
                                    </Button>

                                    <Button
                                    className={`${!isFarmer && order.order_status === "confirmed"?"":"hidden"}`}
                                        variant="outline"
                                        disabled={loading || updatingOrderId === order._id}
                                        onClick={() =>
                                            updateOrderStatus(order._id, "completed")
                                        }
                                    >
                                        {updatingOrderId === order._id ? "Updating..." : "Complete"}
                                    </Button>
                                </div>

                                <div className="text-sm text-gray-600">
                                    Order Date:{" "}
                                    {order.created_at
                                        ? new Date(order.created_at).toLocaleDateString(
                                              "en-IN",
                                              {
                                                  day: "2-digit",
                                                  month: "short",
                                                  year: "numeric",
                                              }
                                          )
                                        : "N/A"}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

export default Page;