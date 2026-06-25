"use client";

import React from "react";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const Banner = () => {
    return (
        <div>
            <Swiper
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
            >
                {/* Slide 1 */}
                <SwiperSlide>
                    <div className="relative">
                        <img
                            src="https://rbdbookistan.com/newsite/wp-content/uploads/2026/01/Book-Banner.jpg"
                            alt="Book Banner"
                            className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                        />

                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
                                    Discover Your Next Favorite Book
                                </h1>

                                <p className="mt-4 text-sm md:text-lg max-w-2xl mx-auto">
                                    Explore thousands of books from trusted
                                    librarians and independent providers.
                                </p>

                                <Link
                                    href="/allbooks"
                                    className="inline-block mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold transition"
                                >
                                    Browse Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide>
                    <div className="relative">
                        <img
                            src="https://images.openai.com/static-rsc-4/RlT3SNCA78VkgdA3EOonBbW4O1QgHvuISZ1oNhuMcX4URV-psV3hq_2eaxIiPKwD6AKJUN5ABifbc642bQW7RMwApY1wnC8RU72akztmWCgJVJw4PGnOLeQAyxW686uWNp7wIglsZIyH9fKVoK7itRojhFjt0KJ6xBx6JLZValBYIbhgZV4hHdxWrjUOWcYv?purpose=fullsize"
                            alt="Library"
                            className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                        />

                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <h1 className="text-2xl md:text-4xl font-bold">
                                    Read More, Learn More
                                </h1>

                                <p className="mt-4 text-sm md:text-lg">
                                    Access a wide collection of academic,
                                    fiction, and sci-fi books.
                                </p>

                                <Link
                                    href="/allbooks"
                                    className="inline-block mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold transition"
                                >
                                    Browse Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide>
                    <div className="relative">
                        <img
                            src="https://images.openai.com/static-rsc-4/HnVgjLW9rY-sbe9gOa4XEkOA89O2Tpt6B7uUd5747C5gqHDa1g6ax3y-NKsHAQOSjH82sfGqY98wCr96wiBNfT1uCZ3AQh-uyd9WM6e_GDomow6xJx52p7obcQ66xdxj4HM76_dikOjRJVvOhiY8cadQl8LulZAvU6ESZbXsgBTsKDFIawtfP4Od91UiyA0p?purpose=fullsize"
                            alt="Books"
                            className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
                        />

                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="text-center text-white px-4">
                                <h1 className="text-2xl md:text-4xl font-bold">
                                    Books Delivered To Your Doorstep
                                </h1>

                                <p className="mt-4 text-sm md:text-lg">
                                    Fast, reliable, and convenient book delivery.
                                </p>

                                <Link
                                    href="/allbooks"
                                    className="inline-block mt-6 px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold transition"
                                >
                                    Browse Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;