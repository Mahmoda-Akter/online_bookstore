'use client'
import { authClient } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';

const Managedeleverypage = () => {

    //  const [search, setsearch] = useState("")
    const [allmanagebook, setallmanagebook] = useState([])

    // const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/order`,
    //     {
    //         cache: "no-store"
    //     }
    // );

    // const deleverydata = await res.json();

    // useEffect(() => {
    //     const fetchdata = async () => {
    //         // const { token } = await authClient.token()
    //         const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/seller/order`, {
    //             // headers: {
    //             //     authorization: `Bearer ${token}`
    //             // }
    //         })
    //         const deleverydata = await res.json();
    //         setallmanagebook(deleverydata)
    //     }
    //     fetchdata()
    // }, [])
    const fetchdata = async () => {
        const { data } = await authClient.token()
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/order`, {
            headers: {
                authorization: `Bearer ${data?.token}`,
            },
        }
        );

        const deleverydata = await res.json();
        setallmanagebook(deleverydata);
    };

    useEffect(() => {
        fetchdata();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        const { data: tokendata } = await authClient.token()
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/order/${orderId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${tokendata?.token}`
                    },
                    body: JSON.stringify({
                        status: newStatus,
                    }),
                }
            );

            const data = await res.json();

            if (data.success) {
                alert(`Status updated to ${newStatus}`);
                fetchdata();
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong!");
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">

                {/* Header */}
                <div className="max-w-6xl mx-auto mb-8">

                    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 md:p-8 rounded-2xl shadow-lg text-white">

                        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
                            🚚 Manage Deliveries
                        </h1>

                        <p className="mt-2 text-sm md:text-base text-white/80">
                            Update order status smoothly from{" "}
                            <span className="font-semibold text-white">Pending</span> →{" "}
                            <span className="font-semibold text-white">Dispatched</span> →{" "}
                            <span className="font-semibold text-white">Delivered</span>
                        </p>

                        {/* optional decorative badges */}
                        <div className="flex gap-2 mt-4 flex-wrap">
                            <span className="px-3 py-1 text-xs bg-white/20 rounded-full">
                                Real-time tracking
                            </span>
                            <span className="px-3 py-1 text-xs bg-white/20 rounded-full">
                                Fast updates
                            </span>
                            <span className="px-3 py-1 text-xs bg-white/20 rounded-full">
                                Delivery control panel
                            </span>
                        </div>

                    </div>
                </div>

                {/* Table Container */}
                <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md overflow-x-auto">

                    <table className="w-full min-w-[700px]">
                        <thead className="bg-gray-100 text-gray-700 text-left">
                            <tr>
                                <th className="p-4">Client Name</th>
                                <th className="p-4">Book Title</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {allmanagebook?.length > 0 ? (
                                allmanagebook.map((order) => (
                                    <tr
                                        key={order?._id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="p-4">
                                            {order?.username || order?.name}
                                        </td>

                                        <td className="p-4">
                                            {order?.title}
                                        </td>

                                        <td className="p-4">
                                            {order?.date
                                                ? new Date(order.date).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${order?.status ===
                                                    "Dispatched"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : order?.status ===
                                                        "Delivered"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {order?.status || "Pending"}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <select
                                                value={
                                                    order?.status || "Pending"
                                                }
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        order?._id,
                                                        e.target.value
                                                    )
                                                }
                                                className="border rounded-lg px-2 py-1 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="Dispatched">
                                                    Dispatched
                                                </option>
                                                <option value="Delivered">
                                                    Delivered
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center p-8 text-gray-500"
                                    >
                                        No delivery orders found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default Managedeleverypage;