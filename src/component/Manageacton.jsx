'use client'
import React from 'react';

const Manageacton = ({ book }) => {
    const deletebook = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/books/${book._id}`,
            {
                method: 'DELETE',
            }
        );

        const data = await res.json();

        if (res.ok) {
            alert("Book deleted successfully");
            // window.location.href = "/dashboard/books";
        } else {
            alert("Delete failed");
        }
    };

    const unpublishebook = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/books/publish-status/${book._id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    publishStatus: "Unpublished",
                }),
            }
        );

        const data = await res.json();

        if (res.ok) {
            alert("Book unpublished");
            window.location.reload();
        } else {
            alert("Failed to unpublish");
        }
    };
    return (
        <div>
            <div className="flex gap-3 mt-5">
                <button className="bg-red-500 px-4 py-2 text-white rounded" onClick={deletebook}>
                    Delete
                </button>

                <button className="bg-gray-700 px-4 py-2 text-white rounded" onClick={unpublishebook}>
                    Unpublish
                </button>
            </div>
        </div>
    );
};

export default Manageacton;