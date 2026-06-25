import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Userdeleveryhistory = async ({ params }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userId = session?.user?.id;

    console.log(userId);
    const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/order/user/${userId}`,
        {
            cache: "no-store",
        }
    );

    const orders = await res.json();
    console.log(orders)

    const totalOrders = orders?.length || 0;
    const pendingOrders =
        orders?.filter((item) => item.status === "Pending Delivery")
            .length || 0;

    const deliveredOrders =
        orders?.filter((item) => item.status === "Delivered")
            .length || 0;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        My Delivery History
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Track all your book delivery requests and statuses.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

                    <div className="bg-white rounded-2xl shadow p-5 border">
                        <h3 className="text-gray-500 text-sm">
                            Total Orders
                        </h3>
                        <p className="text-3xl font-bold mt-2">
                            {totalOrders}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-5 border">
                        <h3 className="text-gray-500 text-sm">
                            Pending Deliveries
                        </h3>
                        <p className="text-3xl font-bold mt-2 text-yellow-600">
                            {pendingOrders}
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-5 border">
                        <h3 className="text-gray-500 text-sm">
                            Delivered Books
                        </h3>
                        <p className="text-3xl font-bold mt-2 text-green-600">
                            {deliveredOrders}
                        </p>
                    </div>

                </div>

                {/* Empty State */}
                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center shadow">
                        <h2 className="text-xl font-semibold">
                            No Delivery History Found
                        </h2>
                        <p className="text-gray-500 mt-2">
                            You have not requested any books yet.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow border overflow-hidden">

                        <div className="p-5 border-b">
                            <h2 className="text-xl font-semibold">
                                Delivery Records
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th>Book Title</th>
                                        <th>Delivery Fee</th>
                                        <th>Request Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="font-medium">
                                                {order.title}
                                            </td>

                                            <td>
                                                ${order.price}
                                            </td>

                                            <td>
                                                {order.requestDate
                                                    ? new Date(
                                                        order.requestDate
                                                    ).toLocaleDateString()
                                                    : "N/A"}
                                            </td>

                                            <td>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold
                                                    ${order.status ===
                                                            "Delivered"
                                                            ? "bg-green-100 text-green-700"
                                                            : order.status ===
                                                                "Dispatched"
                                                                ? "bg-blue-100 text-blue-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Userdeleveryhistory;