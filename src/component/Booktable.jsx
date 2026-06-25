'use client'

import { authClient } from "@/lib/auth-client";



const Booktable = ({ books }) => {
    console.log(books,"from booktable")
    const updatePublishStatus = async (id, publishStatus) => {
        const { data: tokendata } = await authClient.token()
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/book/publish-status/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${tokendata?.token}`
                    },
                    body: JSON.stringify({ publishStatus }),
                }
            );

            const data = await res.json();

            if (data.modifiedCount > 0) {
                alert("Book status updated");
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBook = async (id) => {
        const confirmDelete = confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) return;
        const { data: tokendata } = await authClient.token()

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

            const data = await res.json();

            if (data.deletedCount > 0) {
                alert("Book deleted successfully");
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className="space-y-6">

                {/* 🌈 HEADER */}
                <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-6 text-white shadow-xl">
                    <h1 className="text-2xl md:text-3xl font-bold">
                        📚 Manage All Books
                    </h1>
                    <p className="text-white/80 mt-1">
                        Admin control panel for books
                    </p>

                    <div className="mt-4">
                        <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold">
                            Total Books: {books.length}
                        </span>
                    </div>
                </div>

                {/* 📱 TABLE */}
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border">

                    <table className="min-w-full text-sm text-left">

                        {/* HEADER */}
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="p-3">#</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Author</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Publish</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody>

                            {books.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="text-center p-6 text-gray-500"
                                    >
                                        No books found
                                    </td>
                                </tr>
                            ) : (
                                books.map((book, index) => (
                                    <tr
                                        key={book._id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >

                                        <td className="p-3">
                                            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-bold">
                                                {index + 1}
                                            </span>
                                        </td>

                                        <td className="p-3 font-semibold text-indigo-600">
                                            {book.title}
                                        </td>

                                        <td className="p-3 text-gray-700">
                                            {book.author}
                                        </td>

                                        <td className="p-3">
                                            <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                                {book.category}
                                            </span>
                                        </td>

                                        <td className="p-3">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${book.status === "Approved"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                                    }`}
                                            >
                                                {book.status}
                                            </span>
                                        </td>

                                        <td className="p-3">
                                            <select
                                                className="border rounded-md px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-400"
                                                defaultValue={book.publishStatus}
                                                onChange={(e) =>
                                                    updatePublishStatus(
                                                        book._id,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Published">
                                                    Published
                                                </option>
                                                <option value="Unpublished">
                                                    Unpublished
                                                </option>
                                            </select>
                                        </td>

                                        <td className="p-3">
                                            <button
                                                onClick={() => deleteBook(book._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Booktable;