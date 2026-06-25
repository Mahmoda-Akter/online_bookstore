import Allbooks from '@/component/Allbooks';
import Link from 'next/link';
import React from 'react';

const Allbookpage = async ({ searchParams }) => {
    const resolvedParams = await searchParams;
    const page = Number(resolvedParams?.page) || 1;
    const search = resolvedParams?.search || "";
    const category = resolvedParams?.category || "";
    const minFee = resolvedParams?.minFee || "";
    const maxFee = resolvedParams?.maxFee || "";
    const availability = resolvedParams?.availability || "";
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books?page=${page}&limit=6&search=${search}&category=${category}&minFee=${minFee}&maxFee=${maxFee}&availability=${availability}`, {
        cache: "no-store"
        // headers: {
        //     authorization: `Bearer ${token}`
        // }
    })
    const allbooks = await res.json()
    console.log(allbooks)
    return (
        <div className='max-w-7xl mx-auto px-4'>


            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    📚 Browse Books
                </h1>
                <p className="text-gray-500 mt-2">
                    Search and filter books easily
                </p>
            </div>

            {/* Search & Filters */}
            <form method="GET" className="bg-white shadow-lg rounded-2xl p-6 mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">

                    <input
                        type="text"
                        name="search"
                        placeholder="Search by book name"
                        defaultValue={search}
                        className="border rounded-lg p-3"
                    />

                    <select
                        name="category"
                        defaultValue={category}
                        className="border rounded-lg p-3"
                    >
                        <option value="">All Categories</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Science">Science</option>
                        <option value="Programming">Programming</option>
                        <option value="History">History</option>
                        <option value="Biography">Biography</option>
                    </select>

                    <input
                        type="number"
                        name="minFee"
                        placeholder="Min Fee"
                        defaultValue={minFee}
                        className="border rounded-lg p-3"
                    />

                    <input
                        type="number"
                        name="maxFee"
                        placeholder="Max Fee"
                        defaultValue={maxFee}
                        className="border rounded-lg p-3"
                    />

                    <select
                        name="availability"
                        defaultValue={availability}
                        className="border rounded-lg p-3"
                    >
                        <option value="">All Status</option>
                        <option value="Available">Available</option>
                        <option value="Checked Out">Checked Out</option>
                        <option value="Delivered">Delivered</option>
                    </select>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-3 font-medium"
                    >
                        Search
                    </button>
                </div>
            </form>
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-7'>
                {
                    allbooks.books.map(book => <Allbooks book={book}></Allbooks>)
                }
            </div>
            <div className="flex justify-center gap-2 mt-10">
                {Array.from(
                    { length: allbooks.totalPages },
                    (_, i) => i + 1
                ).map((num) => (
                    <Link
                        key={num}
                        href={`/allbooks?page=${num}`}
                        className={`px-4 py-2 border rounded ${page === num
                            ? "bg-blue-600 text-white"
                            : "bg-white"
                            }`}
                    >
                        {num}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Allbookpage;