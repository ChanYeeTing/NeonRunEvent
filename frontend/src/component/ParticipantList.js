import React, { useState } from "react";
import './ParticipantList.css';

function ParticipantList() {
    const initialParticipants = [
        { id: 1, name: "John", icNumber: "010912-04-0143", contactNo: "011-3489028", category: "Student USM", matricNo: "157329", package: "B", tshirtSize: "M", paymentFile: "/images/payment1.jpg", status: "Approved" },
    { id: 2, name: "Jane", icNumber: "050214-08-1321", contactNo: "012-6453243", category: "Student USM", matricNo: "158342", package: "A", tshirtSize: "N/A", paymentFile: "/images/payment1.jpg", status: "Approved" },
    { id: 3, name: "Mike", icNumber: "011021-06-0143", contactNo: "018-3234324", category: "Public", matricNo: "N/A", package: "B", tshirtSize: "S", paymentFile: "/images/payment1.jpg", status: "Approved" },
    { id: 4, name: "Emily", icNumber: "020502-04-0441", contactNo: "011-6754523", category: "Public", matricNo: "N/A", package: "B", tshirtSize: "M", paymentFile: "/images/payment1.jpg", status: "Approved" },
    { id: 5, name: "Chris", icNumber: "031109-08-1274", contactNo: "011-78973242", category: "Student USM", matricNo: "157453", package: "B", tshirtSize: "XL", paymentFile: "/images/payment1.jpg", status: "Approved" },
    { id: 6, name: "Sarah", icNumber: "990816-10-1432", contactNo: "016-9823742", category: "Public", matricNo: "N/A", package: "C", tshirtSize: "L", paymentFile: "/images/payment1.jpg", status: "Pending" },
    { id: 7, name: "Ali", icNumber: "950324-07-1321", contactNo: "013-4567890", category: "Student USM", matricNo: "157894", package: "A", tshirtSize: "S", paymentFile: "/images/payment1.jpg", status: "Pending" },
    { id: 8, name: "Siti", icNumber: "000412-05-0123", contactNo: "017-8923748", category: "Student USM", matricNo: "158674", package: "C", tshirtSize: "M", paymentFile: "/images/payment1.jpg", status: "Pending" },
    { id: 9, name: "Tom", icNumber: "021223-09-8765", contactNo: "019-7283945", category: "Public", matricNo: "N/A", package: "B", tshirtSize: "L", paymentFile: "/images/payment1.jpg", status: "Pending" },
    { id: 10, name: "Jessica", icNumber: "030101-02-5432", contactNo: "012-7894321", category: "Public", matricNo: "N/A", package: "A", tshirtSize: "S", paymentFile: "/images/payment1.jpg", status: "Pending" },
    ]

    const [participants, setParticipants] = useState(initialParticipants);
    const [currentTab, setCurrentTab] = useState("Pending");
    const [packageFilter, setPackageFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [modalImage, setModalImage] = useState(null);

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
                participant.id === id ? { ...participant, status: "Approved" } : participant
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
    const ApprovedParticipants = filteredParticipants.filter(p => p.status === "Approved");

    const openModal = (image) => {
        setModalImage(image);
    };

    // Handle closing the modal
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
                    <option value="Student USM">Student USM</option>
                    <option value="Public">Public</option>
                </select>

                <button className="clear-filter" onClick={() => { setCategoryFilter(""); setPackageFilter(""); }}>Clear Filter</button>
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
                            {pendingParticipants.map(participant => (
                                <tr key={participant.id}>
                                    <td>{participant.name}</td>
                                    <td>{participant.icNumber}</td>
                                    <td>{participant.contactNo}</td>
                                    <td>{participant.category}</td>
                                    <td>{participant.matricNo}</td>
                                    <td>{participant.package}</td>
                                    <td>{participant.tshirtSize}</td>
                                    <td>
                                        {console.log(participant.name+participant.paymentFile)}
                                    <button onClick={() => openModal(participant.paymentFile)}>
                                            View
                                    </button>
                                    </td>
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
                            {ApprovedParticipants.map(participant => (
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

            {modalImage && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={modalImage} alt="Payment Proof" className="modal-image" />
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
