import React from "react";
import './KitCollection.css';
import { useState } from "react";

function KitCollection () {

    const [participants, setParticipants] = useState([
        { id: 1, name: "John", icNumber:"010912-04-0143", contactNo:"011-3489028", category: "Student USM", matricNo: "157329", package: "B", tshirtSize: "M", collected: false },
        { id: 2, name: "Jane", icNumber:"050214-08-1321", contactNo:"012-6453243",  category: "Student USM", matricNo: "158342", package: "A", tshirtSize: "N/A", collected: false },
        { id: 3, name: "Mike", icNumber:"011021-06-0143", contactNo:"018-3234324",  category: "Public", matricNo: "N/A", package: "B", tshirtSize: "S", collected: false },
        { id: 4, name: "Emily", icNumber:"020502-04-0441", contactNo:"011-6754523",  category: "Public", matricNo: "N/A", package: "B", tshirtSize: "M", collected: false },
        { id: 5, name: "Chris", icNumber:"031109-08-1274", contactNo:"011-78973242",  category: "Student USM", matricNo: "157453", package: "B", tshirtSize: "XL", collected: false }
      ]);

      const [packageFilter, setPackageFilter] = useState('');
      const [categoryFilter, setCategoryFilter] = useState('');
      const [collectedFilter, setCollectedFilter] = useState('');

      const handleCheckboxChange = (id) => {
        setParticipants((prevParticipants) =>
          prevParticipants.map((participant) =>
            participant.id === id ? { ...participant, collected: !participant.collected } : participant
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

 
    return (
        <div className="kit-container">
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
                    <option value="Student USM">Student USM</option>
                    <option value="Public">Public</option>
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
                        <tr key={participant.id}>
                            <td>{participant.name}</td>
                            <td>{participant.icNumber}</td>
                            <td>{participant.contactNo}</td>
                            <td>{participant.category}</td>
                            <td>{participant.matricNo}</td>
                            <td>{participant.package}</td>
                            <td>{participant.tshirtSize}</td>
                            <td>
                                <input type="checkbox" checked={participant.collected} onChange={() => handleCheckboxChange(participant.id)}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default KitCollection;