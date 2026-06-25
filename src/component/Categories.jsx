'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
    {
        id: 1,
        name: 'Fiction',
        icon: '📚',
    },
    {
        id: 2,
        name: 'Sci-Fi',
        icon: '🚀',
    },
    {
        id: 3,
        name: 'Academic',
        icon: '🎓',
    },
    {
        id: 4,
        name: 'History',
        icon: '🏛️',
    },
    {
        id: 5,
        name: 'Biography',
        icon: '👤',
    },
    {
        id: 6,
        name: 'Technology',
        icon: '💻',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const PopularCategories = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold">
                        Popular Categories
                    </h2>

                    <p className="text-gray-600 mt-3">
                        Explore books by your favorite category.
                    </p>
                </motion.div>

                {/* Category Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
                >
                    {categories.map((category) => (
                        <motion.div
                            key={category.id}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.08,
                                y: -5,
                            }}
                        >
                            <Link
                                href={`/allbooks?category=${category.name}`}
                                className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all"
                            >
                                <span className="text-4xl mb-3">
                                    {category.icon}
                                </span>

                                <h3 className="font-semibold text-gray-800">
                                    {category.name}
                                </h3>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PopularCategories;