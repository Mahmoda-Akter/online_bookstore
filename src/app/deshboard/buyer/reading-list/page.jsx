import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Readinglist = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const userId = session?.user?.id;

    console.log(userId);
    // const { id } = await params;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/order/user/${userId}`,
        {
            cache: "no-store",
        }
    );

    const orders = await res.json();
    console.log(orders)
    const readingList = Array.isArray(orders)
        ? orders.filter((item) => item.status === "Delivered")
        : [];

    return (
        <div>
            <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-10">

                <div className="max-w-7xl mx-auto">

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            📚 My Reading List
                        </h1>
                        <p className="text-gray-500 mt-2">
                            All your successfully delivered books
                        </p>
                    </div>

                    {/* Empty State */}
                    {readingList.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow p-10 text-center">
                            <h2 className="text-xl font-semibold">
                                No Books Found
                            </h2>
                            <p className="text-gray-500 mt-2">
                                You haven't received any books yet.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                            {readingList.map((book) => (
                                <div
                                    key={book._id}
                                    className="bg-white rounded-2xl shadow hover:shadow-xl transition p-4"
                                >

                                    {/* Book Cover Placeholder */}
                                    <div className="h-40 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4">
                                        <span className="text-gray-500 text-sm">
                                            📘 Book Cover
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="font-semibold text-lg text-gray-800">
                                        {book.title}
                                    </h2>

                                    {/* Price */}
                                    <p className="text-gray-500 text-sm mt-1">
                                        Delivery Fee: ${book.price}
                                    </p>

                                    {/* Status Badge */}
                                    <span className="inline-block mt-3 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                                        {book.status}
                                    </span>

                                    {/* Button (optional) */}
                                    <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                                        Read Now
                                    </button>

                                </div>
                            ))}

                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Readinglist;