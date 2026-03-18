"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Loader2, Truck, CheckCircle, Download } from "lucide-react";
import { useEffect, useState } from "react";
const url = process.env.NEXT_PUBLIC_BASE_URL;
function page() {
    const [orders, setOrders] = useState([{}])
    function handleDeleteListing(id) {
        fetch(`${url}/api/orders/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    console.log("Network response was not ok " + response.status);
                }
                return response.json();
            })
            .then(data => {
                getData()
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    }
    async function getData() {
        fetch(`${url}/api/orders`)
            .then(response => {
                if (!response.ok) {
                    console.log("Network response was not ok " + response.status);
                }
                return response.json();
            })
            .then(data => {
                console.log("Data:", data.data);
                setOrders(data.data)
            })
            .catch(error => {
                console.error("Fetch error:", error);

            });
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10 py-8">
            <Card className="mx-auto w-full  max-w-6xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30">
                <CardHeader className="flex flex-col justify-center items-center text-center p-4 sm:p-6 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 border-b border-green-200 dark:border-green-800/30">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-green-800 dark:text-green-400">
                        Orders
                    </CardTitle>
                </CardHeader>

                <CardContent className="overflow-x-auto flex flex-col gap-2 justify-center items-center">
                    {orders?.map((order, idx) => (
                        <div key={idx}>
                            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-green-200 dark:border-green-800/30 w-4xl m-auto rounded-2xl shadow-lg p-2 sm:p-3">
                                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-green-50/50 dark:bg-green-900/10">
                                    <div >
                                        <CardTitle className="text-base sm:text-sm font-semibold flex flex-row gap-2 text-green-800 dark:text-green-400 items-center">
                                            <div>Order ID: #{order._id?.slice(-6)}</div>
                                            <div className={`text-sm sm:text-sm px-2 py-1 rounded-md mt-1 inline-block ${
                                                order.order_status === "completed" 
                                                    ? "bg-green-600/30 text-green-700 dark:bg-green-700/30 dark:text-green-400" 
                                                    : order.order_status === "cancelled"
                                                    ? "bg-red-600/30 text-red-700 dark:bg-red-700/30 dark:text-red-400"
                                                    : "bg-blue-600/30 text-blue-700 dark:bg-blue-700/30 dark:text-blue-400"
                                            }`}>
                                                {order.order_status}
                                            </div>
                                        </CardTitle>
                                    </div>
                                    <Button
                                        variant="link"
                                        className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm sm:text-base flex items-center gap-1"
                                    >
                                        <Download className="w-4 h-4" /> Download invoice
                                    </Button>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="text-green-800 dark:text-green-400 text-lg font-semibold">{order?.listings_id?.title || "N/A"}</div>
                                    <div className="flex flex-wrap gap-3 sm:gap-4">
                                        <Button className="px-4 py-2 rounded-md text-sm bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600" onClick={()=>handleDeleteListing(orders[idx]._id)}>
                                            Cancel order
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20 text-sm"
                                        >
                                            Track order
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-green-600 text-green-700 hover:bg-green-50 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900/20 text-sm"
                                        >
                                            Order details
                                        </Button>
                                    </div>


                                    <div className="border-t border-green-200 dark:border-green-800/30 pt-3 text-sm space-y-1">
                                        <div className="flex flex-wrap gap-4 text-gray-700 dark:text-gray-300">
                                            <p>
                                                <span className="text-green-800 dark:text-green-400 font-medium">Order date:</span> {new Date(order.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card></div>))
                    }
                </CardContent>
            </Card>
            </div>

        </>
    )
}
export default page