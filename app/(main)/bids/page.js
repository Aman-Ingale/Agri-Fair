"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Types } from "mongoose";
import { toast } from "sonner";
const page = () => {
    const [bids, setBids] = useState([{}])
    const url = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();
    const [isBuyer, setIsBuyer] = useState(true)
    const formatter = new Intl.NumberFormat("en-IN", {
        style: "decimal",
        maximumFractionDigits: 2,
    });
    function handleDeleteListing(id) {
        fetch(`${url}/api/bids/${id}`, {
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
                toast.success("Success", {
                    description: "Order placed succesfully",
                })
                router.push("/orders")
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    }

    async function handleOrder(bid) {
        // const data = JSON.stringify(bid);
        // setBidObj(bid)
        console.log(bid)
        fetch(`${url}/api/orders`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    listings_id: bid.listings_id,
                    buyer_id: bid.buyer_id,
                    farmer_id: bid.farmer_id,
                    total: bid.total,
                    bid_id: bid._id,
                    quantity: bid.quantity,
                    title: bid.title,
                    price: bid.bid_price,
                    delivery_address: "pune",
                    contact_number: "9999999"
                })
            }

        ).then(response => {
            if (!response.ok) {

                // throw new Error("Failed with status " + response.status);
            }
            return response.json();
        }).then(async data => {
            console.log("Created:", data);
            console.log(bid._id)
            fetch(`${url}/api/bids/${bid._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        updateData: {
                            status: 'ordered'
                        }
                    })
                })
            await getData();
            toast.success("Success", {
                description: "Order placed succesfully",
            })
        })
            .catch(error => {
                console.error("Error:", error);
                toast.error("Error!", {
                    description: "Something went wrong",
                })
            });




    }
    async function handleAccept(bid) {
        console.log(bid._id)
        fetch(`${url}/api/bids/${bid._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    updateData: {
                        status: 'accepted'
                    }
                })
            }
        ).then(response => {
            if (!response.ok) {
                // throw new Error("Failed with status " + response.status);
            }
            return response.json();
        })
            .then(data => {
                console.log("Created:", data);
                console.log(bid._id)
                toast.success("Success", {
                    description: "Bid Accepted",
                })
            })
            .catch(error => {
                console.error("Error:", error);
                toast.error("Error!", {
                    description: "Something went wrong",
                })
            });
        await getData();


    }
    async function getData() {
        // fetch(`${url}/api/bids/${localStorage.getItem("id")}`)
        const role = (await cookieStore.get('role')).value
        if (role == 'farmer') setIsBuyer(false)

        fetch(`${url}/api/bids`)

            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok " + response.status);
                }
                return response.json(); // or response.text()
            })
            .then(data => {
                console.log("Data:", data);
                setBids(data.data)
            })
            .catch(error => {
                console.error("Fetch error:", error);

            });
    }
    useEffect(() => {
        getData()
        // setTimeout(() => {
        //     setIsLoading(false)
        // }, 1300);
    }, [])

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
                    <table className="min-w-full text-xs sm:text-sm md:text-base border-collapse">
                        <thead className="border-b bg-green-50 dark:bg-green-900/20">
                            <tr>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400 whitespace-nowrap">
                                    Title
                                </th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400 whitespace-nowrap">
                                    Date
                                </th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400 whitespace-nowrap">
                                    Variety
                                </th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400 whitespace-nowrap">
                                    Quantity
                                </th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400 whitespace-nowrap">
                                    Price
                                </th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400 whitespace-nowrap">
                                    Total
                                </th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400 whitespace-nowrap">
                                    Status
                                </th>
                                <th className="px-2 sm:px-4 py-2 text-center font-semibold text-green-800 dark:text-green-400 whitespace-nowrap">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {bids.map((txn, index) => (
                                <tr key={index} className="hover:bg-green-50/50 dark:hover:bg-green-900/10 transition border-b border-green-100 dark:border-green-800/20">
                                    <td className="text-center py-3 px-2 sm:px-4 w-1/4 break-words">
                                        {txn.title}
                                    </td>
                                    <td className="text-center py-3 px-2 sm:px-4 whitespace-nowrap">
                                        {new Date(txn.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="text-center py-3 px-2 sm:px-4 whitespace-nowrap">
                                        {txn.variety}
                                    </td>
                                    <td className="text-center py-3 px-2 sm:px-4">
                                        {txn.quantity}
                                    </td>
                                    <td className="text-center py-3 px-2 sm:px-4 font-medium whitespace-nowrap">
                                        ₹ {formatter.format(txn.bid_price)}
                                    </td>
                                    <td className="text-center py-3 px-2 sm:px-4 font-medium whitespace-nowrap">
                                        ₹ {formatter.format(txn.total)}
                                    </td>
                                    <td
                                        className={`text-center py-3 px-2 sm:px-4 font-semibold capitalize ${txn.status === "accepted"
                                            ? "text-green-600 dark:text-green-400"
                                            : txn.status === "rejected" ? "text-red-600 dark:text-red-400" :
                                                txn.status === "ordered" ? "text-blue-600 dark:text-blue-400"
                                                    : "text-yellow-600 dark:text-yellow-400"
                                            }`}
                                    >
                                        {txn.status}
                                    </td>
                                    <td className="text-center py-3 px-2 sm:px-4">
                                        <Button onClick={() => handleOrder(bids[index])} className={`cursor-pointer text-xs sm:text-sm md:text-base px-2 sm:px-4 py-1 sm:py-2 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600                     
                                        ${isBuyer && txn.status == 'accepted'
                                                ? ""
                                                : "hidden"
                                            }`}>
                                            Order
                                        </Button>
                                        <Button onClick={() => handleAccept(bids[index])} className={`cursor-pointer text-xs sm:text-sm md:text-base px-2 sm:px-4 py-1 sm:py-2 bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600                     
                                        ${!isBuyer && txn.status == 'pending'
                                                ? ""
                                                : "hidden"
                                            }`}>
                                            Accept
                                        </Button>
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
