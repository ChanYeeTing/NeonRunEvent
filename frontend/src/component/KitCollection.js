import React from "react";
import './KitCollection.css';
import { useState, useEffect } from "react";
import { kitList, updateKitList } from "../utils/api";
import LoadingOverlay from "./LoadingOverlay";


function KitCollection () {

    const [participants, setParticipants] = useState([]);
    const [packageFilter, setPackageFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [collectedFilter, setCollectedFilter] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const fetchParticipants = async () => {
        setLoading(true); // Show loading overlay
        try {
            const response = await kitList();  // Fetching the participant list
            const updatedParticipants = response.users.map((user) => ({
                ...user,
                collected: user.raceKit === "Collected" ? true : false,
            }));
            setParticipants(updatedParticipants);
        } catch (error) {
            console.error("Error fetching participants:", error);
        } finally {
            setLoading(false); // Hide loading overlay
        }
    };

    useEffect(() => {
        fetchParticipants(); // Fetch participants once when the component mounts
    }, []);

    const handleCheckboxChange = (icNumber) => {
       setParticipants((prevParticipants) =>
          prevParticipants.map((participant) =>
            participant.icNumber === icNumber ? { ...participant, collected: !participant.collected } : participant
          )
        );
      };

      const [searchTerm, setSearchTerm] = useState('');

      const filteredParticipants = participants.filter(participant => {
        const matchesPackage = packageFilter ? participant.package === packageFilter : true;
        const matchesCategory = categoryFilter ? participant.category === categoryFilter : true;
        const matchesCollected = collectedFilter
          ? collectedFilter === "collected"
            ? participant.collected
            : !participant.collected
          : true;
        const matchesSearch = participant.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesPackage && matchesCategory && matchesCollected && matchesSearch;
      });

      const handleUpdate = async () => {
        // Prepare the data to be updated
            const updateData = filteredParticipants.map((participant) => {
              return {
                icNumber: participant.icNumber,
                collected: participant.collected,
              };
            });

            setLoading(true); // Show loading overlay
            try {
              await updateKitList(updateData);
              alert("Race Kit Collection updated successfully.");
              await fetchParticipants();
            } catch (error) {
              console.error("Error updating race kit collection:", error);
              alert("Failed to update race kit collection.");
            } finally {
                setLoading(false); // Hide loading overlay
            }
      };

 
    return (
        <div className="kit-container">
            <LoadingOverlay loading={loading} />
            <h1>Race Kit Collection Checklist</h1>
            <div className="filter">
                <label htmlFor="packageFilter">Filter by Package: </label>
                <select id="packageFilter" 
                onChange={(e) => setPackageFilter(e.target.value)} 
                value={packageFilter}
                className="filter-selection">
                    <option value="">All</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>

                <label htmlFor="categoryFilter">Filter by Category: </label>
                <select id="categoryFilter" 
                onChange={(e) => setCategoryFilter(e.target.value)} 
                value={categoryFilter}
                className="filter-selection">
                    <option value="">All</option>
                    <option value="student">Student USM</option>
                    <option value="public">Public</option>
                </select>

                <label htmlFor="collectedFilter">Filter by Collected Status: </label>
                <select id="collectedFilter"
                onChange={(e) => setCollectedFilter(e.target.value)}
                value={collectedFilter}
                className="filter-selection">
                    <option value="">All</option>
                    <option value="collected">Collected</option>
                    <option value="not_collected">Not Collected</option>
                </select>

                <button className="clear-filter" onClick={()=> (setCategoryFilter(""), setPackageFilter(""), setCollectedFilter(""))}>Clear Filter</button>
            
            <div className="search-bar">
            <label htmlFor="searchTerm">Search by Name: </label>
            <input type="text" id="searchTerm" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Enter participant's name" className="search-input"/>
            </div>

            </div>
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
                        <th>Collected</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredParticipants.map(participant => (
                        <tr key={participant.icNumber}>
                            <td>{participant.name}</td>
                            <td>{participant.icNumber}</td>
                            <td>{participant.contactNo}</td>
                            <td>{participant.category}</td>
                            <td>{participant.matricNo}</td>
                            <td>{participant.package}</td>
                            <td>{participant.tshirtSize}</td>
                            <td>
                                <input type="checkbox" checked={participant.collected} onChange={() => handleCheckboxChange(participant.icNumber)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Floating Update Button */}
            <button
                className="update-btn1"
                onClick={handleUpdate}
            >
                Update
            </button>
        </div>
    );
}

export default KitCollection;