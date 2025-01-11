import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer  } from 'recharts';
import { eventStatistics } from '../utils/api';

function AdminDashboard () {
    const [statistics, setStatistics] = useState({});

    useEffect(()=> {
       const fetchStatistics = async () => {
      try {
        const data = await eventStatistics();
        setStatistics(data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();

        },[]);

    const COLORS = ["hotpink", "#FFBB28", "#bb00ff"];

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="stats-container">
                <div className="stat-box">
                    <h2>Total Participants</h2>
                    <p>{statistics.totalParticipants}</p>
                </div>
                <div className='chart-container'>
                    <div className="chart-box">
                        <h2>Category Distribution</h2>
                        <PieChart width={400} height={300}>
                            <Pie
                                data={statistics.categories}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="hotpink"
                                label
                            >
                                {statistics.categories?.map((entry, index) => (
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
                                data={statistics.packages}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="hotpink"
                                label
                            >
                                {statistics.packages?.map((entry, index) => (
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
                            data={statistics.tshirtSizes}
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
