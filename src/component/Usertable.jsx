'use client'
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Usertable = ({ users }) => {

    const router = useRouter();

    const updateRole = async (id, role) => {
        const { data: tokendata } = await authClient.token()
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/users/role/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${tokendata?.token}`
                    },
                    body: JSON.stringify({ role }),
                }
            );

            const data = await res.json();

            if (data.modifiedCount > 0) {
                alert("Role updated successfully");
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (id) => {
        const { data: tokendata } = await authClient.token()
        const confirmDelete = confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        authorization: `Bearer ${tokendata?.token}`
                    }
                }
            );

            const data = await res.json();

            if (data.deletedCount > 0) {
                alert("User deleted successfully");
                router.refresh();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className="w-full">
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg">
                    <table className="w-full min-w-[800px]">
                        <thead>
                            <tr className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
                                <th className="px-4 py-4 text-left">#</th>
                                <th className="px-4 py-4 text-left">Name</th>
                                <th className="px-4 py-4 text-left">Email</th>
                                <th className="px-4 py-4 text-left">Current Role</th>
                                <th className="px-4 py-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => (
                                <tr
                                    key={user._id}
                                    className="border-b border-slate-100 hover:bg-slate-50 transition-all duration-200"
                                >
                                    <td className="px-4 py-4 font-semibold text-slate-700">
                                        {index + 1}
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 font-bold text-white">
                                                {user.name?.charAt(0)?.toUpperCase()}
                                            </div>

                                            <span className="font-medium text-slate-800">
                                                {user.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-4 py-4 text-slate-600">
                                        {user.email}
                                    </td>

                                    <td className="px-4 py-4">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${user.role === "admin"
                                                ? "bg-red-100 text-red-600"
                                                : user.role === "seller"
                                                    ? "bg-purple-100 text-purple-600"
                                                    : "bg-green-100 text-green-600"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4">
                                        <div className="flex flex-col gap-2 md:flex-row md:items-center">
                                            <select
                                                defaultValue=""
                                                onChange={(e) =>
                                                    updateRole(
                                                        user._id,
                                                        e.target.value
                                                    )
                                                }
                                                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                            >
                                                <option value="" disabled>
                                                    Change Role
                                                </option>

                                                <option value="buyer">
                                                    buyer
                                                </option>

                                                <option value="seller">
                                                    seller
                                                </option>

                                                {/* <option value="admin">
                                                    admin
                                                </option> */}
                                            </select>

                                            <button
                                                onClick={() =>
                                                    deleteUser(user._id)
                                                }
                                                className="rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Usertable;