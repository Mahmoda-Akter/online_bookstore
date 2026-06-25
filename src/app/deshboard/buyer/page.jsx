import BuyerChart from '@/component/BuyerChart';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Buyerpage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userId = session?.user?.id;

    console.log(userId);


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/order/user/${userId}`,
        {
            cache: "no-store",
        }
    );

    const orders = await res.json();
    console.log(orders)
    const totledelevery = orders.filter((orderbook) => orderbook.status === "Delivered").length
    const totlepanding = orders.filter((orderbook) => orderbook.status === "Pending Delivery").length
    const totalSpent = orders.reduce(
        (sum, order) => sum + Number(order.price || 0),
        0
    );

    return (
        <div>
            <div className="min-h-screen bg-gray-50 p-6 md:p-10">

                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            🛒 Buyer Dashboard
                        </h1>
                        <p className="text-gray-500">
                            Welcome back! Track your books & deliveries
                        </p>
                    </div>

                    {/* Stats Cards (HeroUI style) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Delivered */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition">
                            <h2 className="text-gray-500 text-sm">
                                Books Delivered
                            </h2>
                            <p className="text-4xl font-bold text-green-600 mt-2">
                                {totledelevery}
                            </p>
                        </div>

                        {/* Pending */}
                        <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition">
                            <h2 className="text-gray-500 text-sm">
                                Pending Orders
                            </h2>
                            <p className="text-4xl font-bold text-yellow-500 mt-2">
                                {totlepanding}
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition">
                            <h2 className="text-gray-500 text-sm">
                                Total Spent
                            </h2>

                            <p className="text-4xl font-bold text-blue-600 mt-2">
                                ৳{totalSpent}
                            </p>
                        </div>

                        {/* Spent */}
                        {/* <div className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-xl transition">
                            <h2 className="text-gray-500 text-sm">
                                Total Spent
                            </h2>
                            <p className="text-4xl font-bold text-blue-600 mt-2">
                                ${totalSpent}
                            </p>
                        </div> */}

                    </div>
                    <div className="mt-10">
                        <BuyerChart
                            delivered={totledelevery}
                            pending={totlepanding}
                            spent={totalSpent}
                        />
                    </div>

                    {/* Recent Orders Section */}
                    <div className="mt-10 bg-white rounded-2xl shadow-md p-6 border">

                        <h2 className="text-xl font-semibold mb-4">
                            Recent Orders
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-2">Book</th>
                                        <th>Price</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id} className="border-b">
                                            <td className="py-3">
                                                {order.title}
                                            </td>

                                            <td>${order.price}</td>

                                            <td>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${order.status === "Delivered"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Buyerpage;