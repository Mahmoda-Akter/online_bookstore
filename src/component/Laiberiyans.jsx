'use client';

import React from 'react';
import { motion } from 'framer-motion';

const librarians = [
    {
        id: 1,
        name: 'Sarah Ahmed',
        avatar: 'https://i.pravatar.cc/300?img=1',
        deliveries: 320,
    },
    {
        id: 2,
        name: 'John Smith',
        avatar: 'https://i.pravatar.cc/300?img=2',
        deliveries: 285,
    },
    {
        id: 3,
        name: 'Emily Johnson',
        avatar: 'https://i.pravatar.cc/300?img=3',
        deliveries: 250,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
        },
    },
};

const TopLibrarians = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Top Librarians
                    </h2>

                    <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                        Meet our most trusted providers with the highest number
                        of successful book deliveries.
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {librarians.map((librarian) => (
                        <motion.div
                            key={librarian.id}
                            variants={cardVariants}
                            whileHover={{
                                scale: 1.05,
                                y: -8,
                            }}
                            className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100"
                        >
                            <img
                                src={librarian.avatar}
                                alt={librarian.name}
                                className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto object-cover border-4 border-blue-100"
                            />

                            <h3 className="mt-5 text-xl font-semibold text-gray-900">
                                {librarian.name}
                            </h3>

                            <p className="mt-2 text-gray-500">
                                Completed Deliveries
                            </p>

                            <div className="mt-4">
                                <span className="text-3xl font-bold text-blue-600">
                                    {librarian.deliveries}+
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TopLibrarians;