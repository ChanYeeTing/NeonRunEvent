import React from 'react';
import './AdminDashboard.css';

function AdminDashboard () {
    const participantData = {
        totalParticipants: 120,
        categories: [
            { name: "Students", value: 60 },
            { name: "Staff", value: 30 },
            { name: "Visitors", value: 30 },
        ],
        packages: [
            { name: "Basic", value: 70 },
            { name: "Premium", value: 30 },
            { name: "VIP", value: 20 },
        ],
    };

    return (
        <div className="dashboard">
           
        </div>
    );
}

export default AdminDashboard;
