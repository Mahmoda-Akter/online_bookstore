'use client'
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const Sallerchart = ({ allbooks }) => {
    const data = [
        { name: "Total", value: allbooks?.length || 0 },
        // { name: "Pending", value: stats?.pendingBooks || 0 },
        {
            name: "Published", value: allbooks?.length || 0
        },
    ];
    return (
        <div>
            <div className="bg-white p-4 rounded-xl shadow w-full h-80 mt-10">

                <h2 className="text-lg font-semibold mb-4">
                    Books Overview
                </h2>

                <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />

                        <Bar dataKey="value" fill="#06b6d4" />

                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
};

export default Sallerchart;