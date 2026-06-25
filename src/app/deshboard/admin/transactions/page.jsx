import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Transactonspage = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token)

    const resbook = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/transactions`,
        {
            cache: "no-store",
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );

    const orders = await resbook.json();
    console.log(orders)
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-6 lg:p-10">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        💳 All Transactions
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Track all payments and order history
                    </p>
                </div>

                {/* Table Card */}

                <div className="bg-white rounded-3xl shadow-xl border overflow-x-auto">

                    <table className="min-w-full text-sm md:text-base">

                        {/* Table Head */}
                        
                        <thead className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                            <tr>
                                <th className="p-4 text-left">Transaction ID</th>
                                <th className="p-4 text-left">User Email</th>
                                <th className="p-4 text-left">Book Title</th>
                                <th className="p-4 text-left">Amount</th>
                                <th className="p-4 text-left">Status</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody>
                            {orders?.map((order, index) => (
                                <tr
                                    key={order._id || index}
                                    className="border-b hover:bg-gray-50 transition"
                                >

                                    {/* Transaction ID */}
                                    <td className="p-4 text-xs text-gray-600">
                                        {order._id}
                                    </td>

                                    {/* User Email */}
                                    <td className="p-4 font-medium text-gray-700">
                                        {order.userEmail}
                                    </td>

                                    {/* Book Title */}
                                    <td className="p-4 text-gray-600">
                                        {order.title}
                                    </td>

                                    {/* Amount */}
                                    <td className="p-4 font-bold text-green-600">
                                        ৳ {order.price}
                                    </td>

                                    {/* Status Badge */}
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "Delivered"
                                                ? "bg-green-100 text-green-600"
                                                : order.status === "Approved"
                                                    ? "bg-blue-100 text-blue-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {orders?.length === 0 && (
                        <div className="text-center p-10 text-gray-500">
                            No transactions found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Transactonspage;