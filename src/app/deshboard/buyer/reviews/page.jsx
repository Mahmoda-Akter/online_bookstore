import Deletereviews from '@/component/Deletereviews';
import Updatereview from '@/component/Updatereview';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Reviewpage = async ({ params }) => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token)
    // const { id } =  params
    // console.log(id,"from review")
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/review`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
    const reviews = await res.json()
    return (
        <div>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">

                {/* Header */}
                <div className="max-w-5xl mx-auto mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        My Reviews
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base">
                        All your submitted book reviews
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">

                    {reviews?.length > 0 ? (
                        reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 md:p-6 flex flex-col justify-between"
                            >
                                {/* Rating */}
                                <div className="text-yellow-500 text-lg md:text-xl">
                                    {"⭐".repeat(Number(review.rating))}
                                </div>

                                {/* Comment */}
                                <p className="mt-3 text-gray-700 text-sm md:text-base leading-relaxed">
                                    {review.comment}
                                </p>

                                {/* Footer */}
                                <div className="mt-4 border-t pt-3 flex flex-col sm:flex-row sm:justify-between gap-2">
                                    <span className="text-xs md:text-sm text-gray-500">
                                        {review.userEmail}
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        {new Date(review.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Buttons */}
                                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                    <button className="w-full sm:w-auto px-4 py-2 text-white rounded-lg text-sm">
                                        <Updatereview review={review}></Updatereview>
                                    </button>

                                    <button className="w-full sm:w-auto px-4 py-2 text-white rounded-lg text-sm ">
                                        <Deletereviews review={review}></Deletereviews>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-1 md:col-span-2 text-center py-10">
                            <p className="text-gray-500">
                                No reviews found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Reviewpage;