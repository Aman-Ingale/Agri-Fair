"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";

const page = () => {
    const [bids, setBids] = useState([]); // ✅ fixed
    const [isBuyer, setIsBuyer] = useState(true);
    const [loading, setLoading] = useState(false);
    const [updatingBidId, setUpdatingBidId] = useState(null);
    const [orderingBidId, setOrderingBidId] = useState(null);

    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();

    const formatter = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 2,
    });

    // =========================
    // 📦 Fetch Data
    // =========================
    async function getData() {
        try {
            setLoading(true);

            const res = await fetch(`${url}/api/bids`);
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            setBids(data.data || []);

            // ✅ client-safe role
            const role = Cookies.get("role");
            setIsBuyer(role === "buyer");

        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch bids");
        } finally {
            setLoading(false);
        }
    }

    // =========================
    // 🔄 Update Bid Status
    // =========================
    async function updateBidStatus(bidId, status) {
        setUpdatingBidId(bidId);
        try {
            const res = await fetch(`${url}/api/bids/${bidId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    updateData: { status },
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            toast.success(`Bid ${status}`);

            // ✅ Optimistic UI update
            setBids((prev) =>
                prev.map((bid) =>
                    bid._id === bidId ? { ...bid, status } : bid
                )
            );

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setUpdatingBidId(null);
        }
    }

    // =========================
    // 🛒 Order
    // =========================
    async function handleOrder(bid) {
        try {
            setOrderingBidId(bid._id);
            const res = await fetch(`${url}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    listings_id: bid.listings_id,
                    buyer_id: bid.buyer_id,
                    farmer_id: bid.farmer_id,
                    total: bid.total,
                    bid_id: bid._id,
                    quantity: bid.quantity,
                    price: bid.bid_price,
                    delivery_address: "Pune",
                    contact_number: "9999999999",
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            await updateBidStatus(bid._id, "ordered");

            toast.success("Order placed successfully");

        } catch (error) {
            console.error(error);
            toast.error("Order failed");
        } finally {
            setOrderingBidId(null);
        }
    }

    // =========================
    // 🚀 Initial Load ONLY
    // =========================
    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 dark:from-green-950/20 dark:via-black dark:to-green-950/10 py-8">
            <Card className="mx-auto w-full max-w-6xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-green-200 dark:border-green-800/30">
                <CardHeader className="flex flex-col justify-center items-center text-center p-4 sm:p-6 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 border-b border-green-200 dark:border-green-800/30">
                    <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-green-800 dark:text-green-400">
                        Bids
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        List of all your bids
                    </CardDescription>
                </CardHeader>

                <CardContent className="overflow-x-auto">

                    {loading && <p className="text-center">Loading...</p>}

                    <table className="min-w-full text-xs sm:text-sm md:text-base border-collapse">
                        <thead className="border-b bg-green-50 dark:bg-green-900/20">
                            <tr>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400">Title</th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400">Date</th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400">Variety</th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400">Quantity</th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400">Price</th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400">Total</th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400">Status</th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400">Action</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {bids.map((txn) => (
                                <tr key={txn._id} className="hover:bg-green-50/50 dark:hover:bg-green-900/10 transition border-b">

                                    <td className="text-center py-3">{txn.title}</td>

                                    <td className="text-center py-3">
                                        {txn.created_at
                                            ? new Date(txn.created_at).toLocaleDateString()
                                            : "N/A"}
                                    </td>

                                    <td className="text-center py-3">{txn.variety}</td>
                                    <td className="text-center py-3">{txn.quantity}</td>

                                    <td className="text-center py-3 font-medium">
                                        ₹ {formatter.format(txn.bid_price)}
                                    </td>

                                    <td className="text-center py-3 font-medium">
                                        ₹ {formatter.format(txn.total)}
                                    </td>

                                    <td className={`text-center py-3 font-semibold capitalize ${
                                        txn.status === "accepted"
                                            ? "text-green-600"
                                            : txn.status === "rejected"
                                            ? "text-red-600"
                                            : txn.status === "ordered"
                                            ? "text-blue-600"
                                            : "text-yellow-600"
                                    }`}>
                                        {txn.status}
                                    </td>

                                    <td className="text-center py-3 px-2 sm:px-4">
                                        <Button
                                            onClick={() => handleOrder(txn)}
                                            disabled={loading || orderingBidId === txn._id}
                                            className={`cursor-pointer text-xs sm:text-sm md:text-base px-2 sm:px-4 py-1 sm:py-2 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600                     
                                        ${isBuyer && txn.status == 'accepted'
                                                ? ""
                                                : "hidden"

                                            }`}>
                                            {orderingBidId === txn._id ? "Ordering..." : "Order"}
                                        </Button>
                                        <div className={`flex justify-center gap-1 ${!isBuyer && txn.status == 'pending'
                                                ? ""
                                                : "hidden"}`}>
                                        <Button
                                            onClick={() => updateBidStatus(txn._id,"accepted")}
                                            disabled={loading || updatingBidId === txn._id || orderingBidId === txn._id}
                                            className={`cursor-pointer text-xs sm:text-sm md:text-base px-2 sm:px-4 py-1 sm:py-2 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600`}>
                                            {updatingBidId === txn._id ? "Updating..." : "Accept"}
                                        </Button>
                                        <Button
                                            onClick={() => updateBidStatus(txn._id,"rejected")}
                                            disabled={loading || updatingBidId === txn._id || orderingBidId === txn._id}
                                            className={`cursor-pointer text-xs sm:text-sm md:text-base px-2 sm:px-4 py-1 sm:py-2 bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600`}>
                                            {updatingBidId === txn._id ? "Updating..." : "Reject"}
                                        </Button>

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;