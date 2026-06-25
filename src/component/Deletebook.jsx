'use client'
import React from 'react';
import { toast } from 'react-toastify';

const Deletebook = ({book}) => {

    const deletebook = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/seller/books/${book._id}`,
            {
                method: 'DELETE',
            }
        );

        const data = await res.json();

        if (res.ok) {
            toast.success("Book deleted successfully");
            // window.location.href = "/dashboard/books";
        } else {
            alert("Delete failed");
        }
    };
    return (
        <div>
            <div className="flex gap-2">
                <button
                    onClick={deletebook}
                    className="px-3 py-1 text-xs rounded bg-red-500 text-white"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Deletebook;