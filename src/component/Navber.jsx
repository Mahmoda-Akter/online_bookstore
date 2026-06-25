'use client'

import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';
import { Button, Avatar } from '@heroui/react';
import { usePathname } from 'next/navigation';

const Navber = () => {
     const pathname = usePathname();

    const {
        data: session,
        isPending,
        error,
        refetch
    } = authClient.useSession();

    const user = session?.user;

    const handlelogout = async () => {
        await authClient.signOut();
    };

    return (
        <div className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm">

            {/* Logo */}
            <div>
                <Link href="/" className="text-xl font-bold">
                    Book<span className='text-pink-400 text-2xl'>Flow</span>
                </Link>
            </div>

            {/* Menu */}
            <div className="hidden md:flex gap-6 text-sm font-medium">
                <Link
                    href="/"
                    className={`transition ${pathname === '/'
                        ? 'text-pink-500 font-bold border-b-2 border-pink-500 pb-1'
                        : 'text-gray-700 hover:text-pink-500'
                        }`}
                >
                    Home
                </Link>
                <Link
                    href="/allbooks"
                    className={`transition ${pathname === '/allbooks'
                            ? 'text-pink-500 font-bold border-b-2 border-pink-500 pb-1'
                            : 'text-gray-700 hover:text-pink-500'
                        }`}
                >
                    All Books
                </Link>

                <Link
                    href="/about"
                    className={`transition ${pathname === '/about'
                            ? 'text-pink-500 font-bold border-b-2 border-pink-500 pb-1'
                            : 'text-gray-700 hover:text-pink-500'
                        }`}
                >
                    About
                </Link>
                {/* <Link href="/allbooks">All books</Link> */}
                {/* <Link href="/companies">Companies</Link>
                <Link href="/pricing">Pricing</Link> */}
                {/* <Link href="/about">About</Link> */}
            </div>

            {/* Auth */}
            <div className="flex items-center gap-3">

                {user ? (
                    <>
                        <Link href={`/deshboard/${user.role}`}>
                            <Button
                                size="sm"
                                color="primary"
                                variant="flat"
                            >
                                Dashboard
                            </Button>
                        </Link>
                        <span className="text-sm font-medium">
                            {user?.name}
                        </span>

                        <Avatar
                            src={user?.image}
                            name={user?.name}
                            size="sm"
                        />

                        <Button
                            size="sm"
                            color="danger"
                            variant="bordered"
                            onClick={handlelogout}
                        >
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <Button size="sm" variant="light">
                                Login
                            </Button>
                        </Link>

                        <Link href="/signup">
                            <Button size="sm" color="primary">
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}

            </div>

        </div>
    );
};

export default Navber;