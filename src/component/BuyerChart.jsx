'use client';

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts';

const BuyerChart = ({delivered,pending,spent,}) => {
    const data = [
        {
            name: "Delivered",
            value: delivered,
        },
        {
            name: "Pending",
            value: pending,
        },
        {
            name: "Spent",
            value: spent,
        },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 border">
            <h2 className="text-xl font-semibold mb-4">
                Overview Analytics
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                        dataKey="value"
                        fill="#06b6d4"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BuyerChart;