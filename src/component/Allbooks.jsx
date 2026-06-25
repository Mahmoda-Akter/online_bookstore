import Link from "next/link";
import React from "react";

const Allbooks = ({ book }) => {
    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">

            {/* Book Image */}
            <img
                src={book?.imageUrl}
                alt={book?.title}
                className="w-full h-48 object-cover"
            />

            {/* Content */}
            <div className="p-4 flex flex-col gap-1">

                <h2 className="text-lg font-bold text-gray-800">
                    {book?.title}
                </h2>

                <p className="text-sm text-gray-600">
                    Author: <span className="font-medium">{book?.author}</span>
                </p>

                <p className="text-sm text-gray-600">
                    Category: {book?.category}
                </p>

                <p className="text-sm text-gray-600">
                    Publisher: {book?.publisher || "N/A"}
                </p>

                <p className="text-sm font-semibold text-cyan-600">
                    Delivery Fee: ${book?.deliveryFee}
                </p>

                {/* Button */}
                {/* import Link from "next/link"; */}

                <Link href={`/allbooks/${book._id}`}>
                    <button className="mt-3 w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition text-sm">
                        View Now
                    </button>
                </Link>

            </div>
        </div>
    );
};

export default Allbooks;