import React from 'react';
import './AdminDashboard.css';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer  } from 'recharts';

function AdminDashboard () {
    const participantData = {
        totalParticipants: 5,
        categories: [
            { name: "Student USM", value: 3 },
            { name: "Public", value: 2 },
        ],
        packages: [
            { name: "A", value: 1 },
            { name: "B", value: 4 },
        ],
        tshirtSizes: [
            { size: "S", count: 1 },
            { size: "M", count: 2 },
            { size: "L", count: 0 },
            { size: "XL", count: 1 },
        ],
    };

    const COLORS = ["hotpink", "#FFBB28", "#bb00ff"];

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="stats-container">
                <div className="stat-box">
                    <h2>Total Participants</h2>
                    <p>{participantData.totalParticipants}</p>
                </div>
                <div className='chart-container'>
                    <div className="chart-box">
                        <h2>Category Distribution</h2>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={participantData.categories}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="hotpink"
                                label
                            >
                                {participantData.categories.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                    <div className="chart-box">
                        <h2>Package Distribution</h2>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={participantData.packages}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="hotpink"
                                label
                            >
                                {participantData.packages.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </div>
                </div>
                <div className="bar-chart-box">
                        <h2>T-Shirt Size Distribution</h2>
                        <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={participantData.tshirtSizes}
                            margin={{
                                top: 20, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="size" 
                            stroke="#ffffff" />
                            <YAxis stroke="#ffffff" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="hotpink" />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
