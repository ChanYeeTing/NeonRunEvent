import React, { useState, useEffect } from "react";
import "./ParticipantList.css";
import { participantList, updateStatus } from "../utils/api"; // Import custom API functions

function ParticipantList() {
    const [participants, setParticipants] = useState([]);
    const [currentTab, setCurrentTab] = useState("Pending");
    const [packageFilter, setPackageFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [modalImage, setModalImage] = useState(null);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const data = await participantList(); // Fetch data from custom API
                const participantsWithUserId = data.users.map((participant) => ({
                    ...participant, // Spread other participant data
                    userId: participant.uid, // Assign uid as userId for each participant
                }));
                setParticipants(participantsWithUserId); // Set the participants with userId
            } catch (error) {
                console.error("Error fetching participants:", error);
            }
        };

        fetchParticipants();
    }, []);

    // Filter participants based on category and package
    const filteredParticipants = participants.filter((participant) => {
        const matchesPackage = packageFilter ? participant.package === packageFilter : true;
        const matchesCategory = categoryFilter ? participant.category === categoryFilter : true;
        return matchesPackage && matchesCategory;
    });

    const handleAccept = async (userId) => {
        try {
            // Update local state
            setParticipants((prevParticipants) =>
                prevParticipants.map((participant) =>
                    participant.userId === userId
                        ? { ...participant, status: "Approved" }
                        : participant
                )
            );

            // Call API to update status in Firestore
            const response = await updateStatus({ userId, status: "Approved" });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleReject = async (userId) => {
        try {
            // Update local state
            setParticipants((prevParticipants) =>
                prevParticipants.map((participant) =>
                    participant.userId === userId
                        ? { ...participant, status: "Failed" }
                        : participant
                )
            );

            // Call API to update status in Firestore
            const response = await updateStatus({ userId, status: "Failed" });
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const pendingParticipants = filteredParticipants.filter(
        (participant) => participant.status === "Pending"
    );

    const approvedParticipants = filteredParticipants.filter(
        (participant) => participant.status === "Approved"
    );

    const openModal = (image) => {
        setModalImage(image);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    return (
        <div className="list-container">
            <h1>Participant List</h1>

            <div className="tabs">
                <button
                    className={`tab-button ${currentTab === "Pending" ? "active" : ""}`}
                    onClick={() => setCurrentTab("Pending")}
                >
                    Pending Participants
                </button>
                <button
                    className={`tab-button ${currentTab === "Approved" ? "active" : ""}`}
                    onClick={() => setCurrentTab("Approved")}
                >
                    Approved Participants
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
                    <option value="student">Student USM</option>
                    <option value="public">Public</option>
                </select>

                <button
                    className="clear-filter"
                    onClick={() => {
                        setCategoryFilter("");
                        setPackageFilter("");
                    }}
                >
                    Clear Filter
                </button>
            </div>

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
                            {pendingParticipants.map((participant) => (
                                <tr key={participant.uid}>
                                    <td>{participant.fullName}</td>
                                    <td>{participant.icNumber}</td>
                                    <td>{participant.contactNumber}</td>
                                    <td>{participant.category}</td>
                                    <td>{participant.school}</td>
                                    <td>{participant.package}</td>
                                    <td>{participant.tshirtSize || "N/A"}</td>
                                    <td>
                                        <button onClick={() => openModal(participant.paymentProofUrl)}>
                                            View
                                        </button>
                                    </td>
                                    <td>
                                        <div className="action-container">
                                            <button
                                                className="accept-button"
                                                onClick={() => handleAccept(participant.uid)}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                className="reject-button"
                                                onClick={() => handleReject(participant.uid)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {currentTab === "Approved" && (
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
                            {approvedParticipants.map((participant) => (
                                <tr key={participant.uid}>
                                    <td>{participant.fullName}</td>
                                    <td>{participant.icNumber}</td>
                                    <td>{participant.contactNumber}</td>
                                    <td>{participant.category}</td>
                                    <td>{participant.school}</td>
                                    <td>{participant.package}</td>
                                    <td>{participant.tshirtSize || "N/A"}</td>
                                    <td>
                                        <button onClick={() => openModal(participant.paymentProofUrl)}>
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {modalImage && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={modalImage} alt="Payment Proof" className="modal-image"/>
                        <div>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ParticipantList;
