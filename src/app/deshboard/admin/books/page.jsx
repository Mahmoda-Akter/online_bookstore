import Booktable from '@/component/Booktable';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Manageallbooks = async () => {
    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token)

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/books`,
        {
            cache: "no-store",
            headers: {
                authorization: `Bearer ${token}`
            }
        }
    );

    const books = await res.json();
    console.log(books,"from manageallbooks")



    return (
        <div>
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                        Manage All Books
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Admin can publish, unpublish, or permanently delete any book.
                    </p>
                </div>

                <Booktable books={books}></Booktable>
            </div>
        </div>
    );
};

export default Manageallbooks;