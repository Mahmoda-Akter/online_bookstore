'use client'
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from 'react';

const Adminapprovaltable = ({ books }) => {

    const router = useRouter();

    const handleApprove = async (id) => {
        const { data: tokendata } = await authClient.token()
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/book/approve/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        authorization: `Bearer ${tokendata?.token}`
                    }
                }
            );

            if (res.ok) {
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (id) => {
         const { data: tokendata } = await authClient.token()
        const confirmDelete = confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/book/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${tokendata?.token}`
                    }

                }
            );

            if (res.ok) {
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full min-w-[800px]">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">Author</th>
                            <th className="p-3 text-left">Category</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((book) => (
                            <tr
                                key={book._id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-3 font-medium">
                                    {book.title}
                                </td>

                                <td className="p-3">
                                    {book.author}
                                </td>

                                <td className="p-3">
                                    {book.category}
                                </td>

                                <td className="p-3">
                                    ${book.deliveryFee || 0}
                                </td>

                                <td className="p-3">
                                    <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold">
                                        {book.status}
                                    </span>
                                </td>

                                <td className="p-3 flex gap-2">
                                    <button
                                        onClick={() =>
                                            handleApprove(book._id)
                                        }
                                        className="px-3 py-1 text-xs rounded bg-green-500 text-white hover:bg-green-600"
                                    >
                                        Approve & Publish
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(book._id)
                                        }
                                        className="px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {books.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No pending books found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Adminapprovaltable;