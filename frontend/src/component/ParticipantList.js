import React, { useState } from "react";
import './ParticipantList.css';

function ParticipantList() {
    const initialParticipants = [
        { id: 1, name: "John", icNumber: "010912-04-0143", contactNo: "011-3489028", category: "Student USM", matricNo: "157329", package: "B", tshirtSize: "M", paymentFile: "View", status: "Pending" },
        { id: 2, name: "Jane", icNumber: "050214-08-1321", contactNo: "012-6453243", category: "Student USM", matricNo: "158342", package: "A", tshirtSize: "N/A", paymentFile: "View", status: "Valid" },
        { id: 3, name: "Mike", icNumber: "011021-06-0143", contactNo: "018-3234324", category: "Public", matricNo: "N/A", package: "B", tshirtSize: "S", paymentFile: "View", status: "Pending" },
        { id: 4, name: "Emily", icNumber: "020502-04-0441", contactNo: "011-6754523", category: "Public", matricNo: "N/A", package: "B", tshirtSize: "M", paymentFile: "View", status: "Valid" },
        { id: 5, name: "Chris", icNumber: "031109-08-1274", contactNo: "011-78973242", category: "Student USM", matricNo: "157453", package: "B", tshirtSize: "XL", paymentFile: "View", status: "Pending" }
    ];

    const [participants, setParticipants] = useState(initialParticipants);
    const [currentTab, setCurrentTab] = useState("Pending");
    const [packageFilter, setPackageFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');

    // Filter participants based on category and package
    const filteredParticipants = participants.filter(participant => {
        const matchesPackage = packageFilter ? participant.package === packageFilter : true;
        const matchesCategory = categoryFilter ? participant.category === categoryFilter : true;
        return matchesPackage && matchesCategory;
    });

    // Accept a participant
    const handleAccept = (id) => {
        setParticipants(prevParticipants =>
            prevParticipants.map(participant =>
                participant.id === id ? { ...participant, status: "Valid" } : participant
            )
        );
    };

    // Reject a participant
    const handleReject = (id) => {
        setParticipants(prevParticipants =>
            prevParticipants.map(participant =>
                participant.id === id ? { ...participant, status: "Rejected" } : participant
            )
        );
    };

    // Separate participants by status
    const pendingParticipants = filteredParticipants.filter(p => p.status === "Pending");
    const validParticipants = filteredParticipants.filter(p => p.status === "Valid");

    return (
        <div className="list-container">
            <h1>Participant List</h1>
            
           

            {/* Tab Navigation */}
            <div className="tabs">
                <button
                    className={`tab-button ${currentTab === "Pending" ? "active" : ""}`}
                    onClick={() => setCurrentTab("Pending")}
                >
                    Pending Participants
                </button>
                <button
                    className={`tab-button ${currentTab === "Valid" ? "active" : ""}`}
                    onClick={() => setCurrentTab("Valid")}
                >
                    Valid Participants
                </button>
            </div>

            <div className="filter">
                <label htmlFor="packageFilter">Filter by Package: </label>
                <select
                    id="packageFilter"
                    onChange={(e) => setPackageFilter(e.target.value)}
                    value={packageFilter}
                    className="filter-selection"
                >
                    <option value="">All</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>

                <label htmlFor="categoryFilter">Filter by Category: </label>
                <select
                    id="categoryFilter"
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    value={categoryFilter}
                    className="filter-selection"
                >
                    <option value="">All</option>
                    <option value="Student USM">Student USM</option>
                    <option value="Public">Public</option>
                </select>

                <button className="clear-filter" onClick={() => { setCategoryFilter(""); setPackageFilter(""); }}>Clear Filter</button>
            </div>

            {/* Pending Participants Section */}
            {currentTab === "Pending" && (
                <div className="tab-content">
                    <table border="1" className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>IC No.</th>
                                <th>Contact No.</th>
                                <th>Category</th>
                                <th>Matric No.</th>
                                <th>Package</th>
                                <th>T-Shirt Size</th>
                                <th>Payment File</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingParticipants.map(participant => (
                                <tr key={participant.id}>
                                    <td>{participant.name}</td>
                                    <td>{participant.icNumber}</td>
                                    <td>{participant.contactNo}</td>
                                    <td>{participant.category}</td>
                                    <td>{participant.matricNo}</td>
                                    <td>{participant.package}</td>
                                    <td>{participant.tshirtSize}</td>
                                    <td>{participant.paymentFile}</td>
                                    <td>
                                        <div className="action-container">
                                        <button className="accept-button" onClick={() => handleAccept(participant.id)}>Accept</button>
                                        <button className="reject-button" onClick={() => handleReject(participant.id)}>Reject</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Valid Participants Section */}
            {currentTab === "Valid" && (
                <div className="tab-content">
                    <table border="1" className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>IC No.</th>
                                <th>Contact No.</th>
                                <th>Category</th>
                                <th>Matric No.</th>
                                <th>Package</th>
                                <th>T-Shirt Size</th>
                                <th>Payment File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {validParticipants.map(participant => (
                                <tr key={participant.id}>
                                    <td>{participant.name}</td>
                                    <td>{participant.icNumber}</td>
                                    <td>{participant.contactNo}</td>
                                    <td>{participant.category}</td>
                                    <td>{participant.matricNo}</td>
                                    <td>{participant.package}</td>
                                    <td>{participant.tshirtSize}</td>
                                    <td>{participant.paymentFile}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ParticipantList;
