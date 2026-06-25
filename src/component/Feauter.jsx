import Link from 'next/link';
import React from 'react';

const Feauter = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/featured-books`,
        {
            cache: "no-store",
        }
    );

    const books = await res.json();
    return (
        <div>
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-8 text-violet-400">
                        Latest Featured Books
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {books.map((book) => (
                            <div
                                key={book._id}
                                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                            >
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="w-full h-60 object-cover"
                                />

                                <div className="p-4">
                                    <h3 className="text-xl font-semibold">
                                        {book.title}
                                    </h3>

                                    <p className="text-gray-600 mt-1">
                                        {book.author}
                                    </p>

                                    <p className="mt-2 text-sm">
                                        Category: {book.category}
                                    </p>

                                    <p className="font-bold text-blue-600 mt-2">
                                        Delivery Fee: ৳{book.deliveryFee}
                                    </p>

                                    <Link
                                        href={`/allbooks/${book._id}`}
                                        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Feauter;