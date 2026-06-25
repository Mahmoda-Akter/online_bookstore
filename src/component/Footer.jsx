'use client';

import Link from 'next/link';
import { Input, Button } from '@heroui/react';
import {
    FaFacebookF,
    FaLinkedinIn,
    FaGithub,
    FaXTwitter,
    FaBookOpen,
} from 'react-icons/fa6';

const Footer = () => {
    return (
        <footer className="bg-content1 border-t">
            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <FaBookOpen className="text-2xl" />
                            <h2 className="text-2xl font-bold">
                                BiblioDrop
                            </h2>
                        </div>

                        <p className="text-default-500 text-sm leading-relaxed">
                            Your Local Library, Delivered. Discover books,
                            request deliveries, and connect with local
                            libraries from anywhere.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-2">
                            <Link href="/" className="hover:text-primary">
                                Home
                            </Link>

                            <Link href="/browse-books" className="hover:text-primary">
                                Browse Books
                            </Link>

                            <Link href="/about" className="hover:text-primary">
                                About Us
                            </Link>

                            <Link href="/contact" className="hover:text-primary">
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Legal
                        </h3>

                        <div className="flex flex-col gap-2">
                            <Link href="/privacy-policy" className="hover:text-primary">
                                Privacy Policy
                            </Link>

                            <Link href="/terms" className="hover:text-primary">
                                Terms & Conditions
                            </Link>

                            <Link href="/cookies" className="hover:text-primary">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">
                            Newsletter
                        </h3>

                        <p className="text-default-500 text-sm mb-3">
                            Subscribe for updates and new arrivals.
                        </p>

                        <div className="space-y-3">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                            />

                            <Button
                                color="primary"
                                className="w-full"
                            >
                                Subscribe
                            </Button>
                        </div>
                    </div>

                </div>

                {/* Bottom Footer */}
                <div className="border-t mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-default-500 text-center md:text-left">
                        © {new Date().getFullYear()} BiblioDrop. All Rights Reserved.
                    </p>

                    <div className="flex items-center gap-4 text-xl">
                        <a href="#">
                            <FaFacebookF />
                        </a>

                        <a href="#">
                            <FaLinkedinIn />
                        </a>

                        <a href="#">
                            <FaGithub />
                        </a>

                        <a href="#">
                            <FaXTwitter />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;