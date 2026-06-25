import Sallerchart from '@/component/deshboards/Sallerchart';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Sallerpage = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token)

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/seller/books`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const allbooks = await res.json()
    console.log(allbooks)
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">

                <div className="p-4 md:p-8 max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                            📊 Seller Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Manage your books, earnings and performanc
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                        {/* Total Books */}
                        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-blue-500 hover:shadow-xl transition">
                            <p className="text-gray-500 text-sm">Total Books</p>
                            <h2 className="text-3xl font-bold text-blue-600 mt-2">
                                {allbooks?.length || 0}
                            </h2>
                        </div>

                        {/* Publisher */}
                        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-purple-500 hover:shadow-xl transition">
                            <p className="text-gray-500 text-sm">Publisher</p>
                            <h2 className="text-lg font-semibold text-purple-600 mt-2">
                                {allbooks?.[0]?.publisher || "N/A"}
                            </h2>
                        </div>

                        {/* Last Added */}
                        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-green-500 hover:shadow-xl transition">
                            <p className="text-gray-500 text-sm">Last Added</p>
                            <h2 className="text-sm font-medium text-green-600 mt-2">
                                {allbooks?.[0]?.createdAt
                                    ? new Date(allbooks[0].createdAt).toLocaleDateString()
                                    : "N/A"}
                            </h2>
                        </div>

                        {/* Status Card (extra visual boost without logic change) */}
                        <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-orange-500 hover:shadow-xl transition">
                            <p className="text-gray-500 text-sm">System Status</p>
                            <h2 className="text-sm font-bold text-orange-500 mt-2">
                                Active
                            </h2>
                        </div>

                    </div>

                    {/* Table */}

                    <div className="bg-white rounded-2xl shadow-lg overflow-x-auto border">

                        <div className="p-5 border-b bg-gradient-to-r from-blue-500 to-purple-500">
                            <h2 className="text-white font-semibold text-lg">
                                Your Books List
                            </h2>
                        </div>

                        <table className="w-full min-w-[600px]">

                            <thead className="bg-gray-100 text-left">
                                <tr>
                                    <th className="p-3">Title</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Publisher</th>
                                    <th className="p-3">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {allbooks?.map((book, i) => (
                                    <tr key={i} className="border-t hover:bg-blue-50 transition">

                                        <td className="p-3 font-medium text-gray-800">
                                            {book.title}
                                        </td>

                                        <td className="p-3 text-blue-600 font-semibold">
                                            ${book.deliveryFee || 0}
                                        </td>

                                        <td className="p-3 text-purple-600">
                                            {book.publisher || "N/A"}
                                        </td>

                                        <td className="p-3 text-sm text-gray-500">
                                            {book.createdAt
                                                ? new Date(book.createdAt).toLocaleDateString()
                                                : "N/A"}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    {/* Chart Section */}
                    <div className="mt-8 bg-white rounded-2xl shadow-lg p-5">
                        <Sallerchart allbooks={allbooks} />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Sallerpage;