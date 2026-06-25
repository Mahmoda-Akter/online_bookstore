import Adminapprovaltable from '@/component/Adminapprovaltable';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Bookapprovalpage = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token)
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/pending-books`,
        {
            cache: "no-store",
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );

    const books = await res.json();
    return (
        <div>
            <div className="p-4 md:p-8">
                <h1 className="text-2xl font-bold mb-6">
                    Book Approval Queue
                </h1>

                <div className="mb-4">
                    <p className="text-gray-600">
                        Total Pending Books: {books.length}
                    </p>
                </div>

                <Adminapprovaltable books={books}></Adminapprovaltable>
            </div>
        </div>
    );
};

export default Bookapprovalpage;