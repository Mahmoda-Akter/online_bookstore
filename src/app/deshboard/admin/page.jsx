import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Adminoverviewpage = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    });

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
        {
            cache: "no-store",
            headers: {
            authorization: `Bearer ${token}`
        }
        }
    );

    const users = await res.json();
    console.log(users)
    const resbook = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/books`,
        {
            cache: "no-store",
            headers: {
            authorization: `Bearer ${token}`
        }
        }
    );

    const books = await resbook.json();
    console.log(books)
    const resorder = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/orders`,
        {
            cache: "no-store",
            headers: {
            authorization: `Bearer ${token}`
        }
        }
    );

    const orders = await resorder.json();
    console.log(orders, "from admin")

    const totalUsers = users.length;
    const totalBooks = books.length;

    const totalDeliveries = orders.filter(
        (order) => order.status === "Delivered"
    ).length;

    const totalRevenue = orders.reduce(
        (sum, order) => sum + Number(order.price || 0),
        0
    );



    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-4 md:p-6 lg:p-8">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Monitor users, books, deliveries  revenue.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                    {/* Users */}
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-6 text-white shadow-xl hover:scale-105 duration-300">
                        <div className="text-4xl mb-4">👥</div>
                        <h3 className="text-lg font-medium">Total Users</h3>
                        <p className="text-4xl font-bold mt-2">{totalUsers}</p>
                    </div>

                    {/* Books */}
                    <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-6 text-white shadow-xl hover:scale-105 duration-300">
                        <div className="text-4xl mb-4">📚</div>
                        <h3 className="text-lg font-medium">Total Books</h3>
                        <p className="text-4xl font-bold mt-2">{totalBooks}</p>
                    </div>

                    {/* Deliveries */}
                    <div className="bg-gradient-to-r from-purple-500 to-fuchsia-600 rounded-3xl p-6 text-white shadow-xl hover:scale-105 duration-300">
                        <div className="text-4xl mb-4">🚚</div>
                        <h3 className="text-lg font-medium">Total Deliveries</h3>
                        <p className="text-4xl font-bold mt-2">{totalDeliveries}</p>
                    </div>

                    {/* Revenue */}
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-xl hover:scale-105 duration-300">
                        <div className="text-4xl mb-4">💰</div>
                        <h3 className="text-lg font-medium">Total Revenue</h3>
                        <p className="text-4xl font-bold mt-2">৳ {totalRevenue}</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-10">

                    {/* Pie Chart Area */}
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                Books by Category
                            </h2>
                            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                                Pie Chart
                            </span>
                        </div>

                        <div className="h-[350px] flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-3">📊</div>
                                <p className="text-gray-500">
                                    Recharts Pie Chart Here
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Summary Panel */}
                    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-6">
                            Platform Summary
                        </h2>

                        <div className="space-y-5">
                            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                                <span className="font-medium text-gray-700">
                                    Registered Users
                                </span>
                                <span className="font-bold text-blue-600">
                                    {totalUsers}
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                                <span className="font-medium text-gray-700">
                                    Available Books
                                </span>
                                <span className="font-bold text-green-600">
                                    {totalBooks}
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl">
                                <span className="font-medium text-gray-700">
                                    Completed Deliveries
                                </span>
                                <span className="font-bold text-purple-600">
                                    {totalDeliveries}
                                </span>
                            </div>

                            <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl">
                                <span className="font-medium text-gray-700">
                                    Total Revenue
                                </span>
                                <span className="font-bold text-orange-600">
                                    ৳ {totalRevenue}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Adminoverviewpage;