import Usertable from '@/component/Usertable';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import React from 'react';

const Manageuser = async () => {

    const { token } = await auth.api.getToken({
        headers: await headers()
    })
    console.log(token)
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    );

    const users = await res.json();
    return (
        <div className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 shadow-xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    Manage Users
                </h1>

                <p className="mt-2 text-sm md:text-base text-indigo-100">
                    View, update roles and manage all users from one place.
                </p>
            </div>

            <div>
                <Usertable users={users} />
            </div>
        </div>
    );
};

export default Manageuser;