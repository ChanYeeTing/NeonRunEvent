import React from 'react';
import './AdminDashboard.css';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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
            </div>
        </div>
    );
}

export default AdminDashboard;
