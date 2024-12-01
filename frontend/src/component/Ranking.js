import React, { useState } from 'react';
import "./Ranking.css";


const Ranking = () => {

    // Array of participants as provided
    const [participants, setParticipants] = useState([
        { id: 1, name: "John", icNumber: "010912-04-0143", contactNo: "011-3489028", category: "Student USM", matricNo: "157329", package: "B", tshirtSize: "M", paymentFile: "View", rank: null },
        { id: 2, name: "Jane", icNumber: "050214-08-1321", contactNo: "012-6453243", category: "Student USM", matricNo: "158342", package: "A", tshirtSize: "N/A", paymentFile: "View", rank: null },
        { id: 3, name: "Mike", icNumber: "011021-06-0143", contactNo: "018-3234324", category: "Public", matricNo: "N/A", package: "B", tshirtSize: "S", paymentFile: "View", rank: null },
        { id: 4, name: "Emily", icNumber: "020502-04-0441", contactNo: "011-6754523", category: "Public", matricNo: "N/A", package: "B", tshirtSize: "M", paymentFile: "View", rank: null },
        { id: 5, name: "Chris", icNumber: "031109-08-1274", contactNo: "011-78973242", category: "Student USM", matricNo: "157453", package: "B", tshirtSize: "XL", paymentFile: "View", rank: null }
    ]);

  const [rank, setRank] = useState(1)
  const [icNumber, setIcNumber] = useState('');
  const [filteredParticipants, setFilteredParticipants] = useState(participants);
  const [rankingsAssigned, setRankingsAssigned] = useState(false);
  

  const handleSearch = (icNumber) => {
    const searchResults = participants.filter(participant =>
      participant.icNumber.includes(icNumber)
    );
    setFilteredParticipants(searchResults);
  };

  const assignRanks = () => {
    const updatedFiltered = filteredParticipants.map(participant => ({
      ...participant,
      rank: rank
    }),
    setRank(rank+1)
  );

    const updatedParticipants = participants.map(participant => {
        const filteredMatch = updatedFiltered.find(p => p.id === participant.id);
        return filteredMatch ? { ...participant, rank: filteredMatch.rank } : participant;
    });

    setFilteredParticipants(updatedFiltered);
    setParticipants(updatedParticipants);


    if(rank > 3)
    {
        setRankingsAssigned(true);
    }

  };

  return (
    <div className='ranking-container'>
      <h1>Admin Ranking Page</h1>

      <div className='search-section'>
      <label htmlFor="searchTerm">Search by IC Number: </label>
        <input
          className='ic-search'
          type="text"
          value={icNumber}
          onChange={(e) => {setIcNumber(e.target.value); handleSearch(e.target.value);}}
          placeholder="Enter participant's IC Number"
        />
              <button className="ranking" onClick={assignRanks} disabled={(rankingsAssigned, (filteredParticipants.length!==1))}>Assign Ranks</button>
        <button className='clear' onClick={()=> {setIcNumber(""); setFilteredParticipants(participants);}}>Clear</button>
      </div>
      

      <h2>Participants List</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>IC Number</th>
            <th>Contact No</th>
            <th>Category</th>
            <th>Matric No</th>
            <th>Package</th>
            <th>T-Shirt Size</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.rank === null ? 'Not Ranked' : participant.rank}</td>
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
  );
};

export default Ranking;
