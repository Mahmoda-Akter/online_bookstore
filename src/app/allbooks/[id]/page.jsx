
import Editebook from '@/component/Editebook';
import Manageacton from '@/component/Manageacton';
import Review from '@/component/Review';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';

const Bookdetilspage = async ({ params }) => {
    const { id } = await params

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user
    console.log(user, 'from sesson')

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/seller/books/${id}`, {
        // headers: {
        //     authorization: `Bearer ${token}`
        // }
    })
    const book = await res.json()

    const reviewRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/review/${id}`,
        {
            cache: "no-store",
        }
    );

    const reviews = await reviewRes.json();
    // const isAvailable = !book?.status || book?.status === "Available" || book?.status === "Dispatched" || book?.status === "Delivered";
    // const disableButton = !isAvailable;

    // console.log(isAvailable)
    console.log(book, 'from detilspage')
    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 py-8 px-4">
                <div className="max-w-6xl mx-auto">


                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

                        <div className="grid grid-cols-1 lg:grid-cols-2">

                            {/* Image Section */}
                            <div className="relative bg-gray-100">
                                <img
                                    src={book?.imageUrl}
                                    alt={book?.title}
                                    className="w-full h-[300px] sm:h-[450px] lg:h-full object-cover"
                                />

                                <div className="absolute top-4 left-4">
                                    <span className="bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow">
                                        {book?.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 md:p-8 lg:p-10 flex flex-col">

                                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
                                    {book?.title}
                                </h1>

                                <p className="text-lg text-gray-500 mt-2">
                                    by {book?.author}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500">
                                            Publisher
                                        </p>
                                        <p className="font-semibold text-gray-800">
                                            {book?.publisher || "N/A"}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 rounded-xl p-4">
                                        <p className="text-sm text-gray-500">
                                            Publication Year
                                        </p>
                                        <p className="font-semibold text-gray-800">
                                            {book?.publicationYear || "N/A"}
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-8">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                                        Description
                                    </h2>

                                    <p className="text-gray-600 leading-relaxed">
                                        {book?.description ||
                                            "No description available."}
                                    </p>
                                </div>

                                <div className="mt-8 p-5 bg-cyan-50 rounded-2xl border border-cyan-100">
                                    <p className="text-sm text-gray-500">
                                        Delivery Fee
                                    </p>

                                    <h3 className="text-3xl font-bold text-cyan-600">
                                        ৳{book?.deliveryFee}
                                    </h3>
                                </div>

                                {!user && (
                                    <Link
                                        href="/login"
                                        className="mt-8 w-full text-center py-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition duration-300"
                                    >
                                        Login to Order Book
                                    </Link>
                                )}

                                {/* Buyer Button */}
                                {user?.role === "buyer" && (
                                    <form
                                        action="/api/payment"
                                        method="POST"
                                        className="mt-8"
                                    >
                                        <input
                                            type="hidden"
                                            name="price"
                                            value={book?.deliveryFee}
                                        />

                                        <input
                                            type="hidden"
                                            name="title"
                                            value={book?.title}
                                        />

                                        <input
                                            type="hidden"
                                            name="productID"
                                            value={book?._id}
                                        />

                                        <button
                                            type="submit"
                                            disabled={book.status === "Delivered"}
                                            className="w-full py-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-semibold transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {book.status === "Approved"
                                                ? "Order Now"
                                                : "Delivered"}
                                        </button>
                                    </form>
                                )}

                                {/* Seller Actions */}
                                {(user?.role === "seller" ||
                                    user?.role === "librarian") && (
                                        <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                            <Editebook book={book} />
                                            <Manageacton book={book} />
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>

                    {/* Review Section */}
                    <div className="mt-10">
                        <Review user={user} book={book} reviews={reviews}/>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default Bookdetilspage;