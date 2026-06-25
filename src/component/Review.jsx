'use client'
import React, { useState } from 'react';

const Review = ({ user, book, reviews }) => {
    const [rating, setRating] = useState("5");
    const [comment, setComment] = useState("");
    const handleSubmit = async () => {
        console.log("button clicked")
        const reviewData = {
            bookId: book._id,
            bookTitle: book.title,
            userId: user.id,
            userEmail: user.email,
            rating,
            comment,
            createdAt: new Date(),
        };

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/review`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reviewData),
            }
        );

        const data = await res.json();

        console.log(data);
        if (res.ok) {
            alert("Review submitted successfully");
            // setComment("");
            // setRating("5");
        }
    }
    return (
        <div>
            {user?.role === "buyer" && (
                <div className="max-w-5xl mx-auto mt-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">
                            My Review
                        </h2>

                        <div className="space-y-4">
                            <select
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="w-full border rounded-lg p-3"
                            >
                                <option value="5">⭐⭐⭐⭐⭐</option>
                                <option value="4">⭐⭐⭐⭐</option>
                                <option value="3">⭐⭐⭐</option>
                                <option value="2">⭐⭐</option>
                                <option value="1">⭐</option>
                            </select>

                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full border rounded-lg p-3"
                                rows={4}
                                placeholder="Write your review..."
                            />

                            <button
                                type='button'
                                onClick={handleSubmit}
                                className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-5xl mx-auto mt-8">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Reader Reviews
                    </h2>

                    {reviews?.length > 0 ? (
                        <div className="space-y-4">
                            {reviews.map((review) => (
                                <div
                                    key={review._id}
                                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-yellow-500">
                                            ⭐ {review.rating}/5
                                        </h3>

                                        <span className="text-sm text-gray-500">
                                            {review.userEmail}
                                        </span>
                                    </div>

                                    <p className="mt-2 text-gray-700">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">
                            No reviews yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Review;