import Deletebook from '@/component/Deletebook';
import Editebook from '@/component/Editebook';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Managrinventory = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token)
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/seller/books`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const bookdata = await res.json()
    console.log(bookdata)


    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-8">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        📦 Manage Inventory
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Edit, delete and manage your books
                    </p>
                </div>

                {/* Table Container */}
                <div className="bg-white rounded-2xl shadow-xl overflow-x-auto border">

                    {/* Table Header */}
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                        <h2 className="text-white font-semibold text-lg">
                            Your Books Inventory
                        </h2>
                    </div>

                    <table className="w-full min-w-[700px]">

                        {/* Head */}
                        <thead className="bg-gray-100 text-left">
                            <tr className="text-gray-700">
                                <th className="p-4">Title</th>
                                <th className="p-4">Author</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {bookdata?.map((book) => (
                                <tr
                                    key={book._id}
                                    className="border-t hover:bg-indigo-50 transition"
                                >

                                    {/* Title */}
                                    <td className="p-4 font-semibold text-gray-800">
                                        {book.title}
                                    </td>

                                    {/* Author */}
                                    <td className="p-4 text-gray-600">
                                        {book.author}
                                    </td>

                                    {/* Category */}
                                    <td className="p-4 text-purple-600 font-medium">
                                        {book.category}
                                    </td>

                                    {/* Price */}
                                    <td className="p-4 text-blue-600 font-semibold">
                                        ${book.deliveryFee || 0}
                                    </td>

                                    {/* Status */}
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                            ${book.status === "Published"
                                                    ? "bg-green-100 text-green-700"
                                                    : book.status === "Pending Approval"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {book.status || "Pending"}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-4 flex gap-2">

                                        {/* Edit */}
                                        <div className="hover:scale-105 transition">
                                            <Editebook book={book} />
                                        </div>

                                        {/* Delete */}
                                        <div className="hover:scale-105 transition">
                                            <Deletebook book={book} />
                                        </div>

                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>
        </div>
        
    );
};

export default Managrinventory;