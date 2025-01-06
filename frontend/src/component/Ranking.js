import React, { useEffect, useState } from 'react';
import "./Ranking.css";
import { approvedList, updateWinnerList } from "../utils/api";
import LoadingOverlay from "./LoadingOverlay";


const Ranking = () => {

  // Array of participants as provided
  const [participants, setParticipants] = useState([]);
  const [icNumber, setIcNumber] = useState('');
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  const fetchParticipants = async () => {
    setLoading(true); // Show loading overlay
    try {
      const response = await approvedList();
      const updatedParticipants = response.users.map((user) => ({
        ...user,
        rank: user.rankAssign || "No Rank",
      }));
      setParticipants(updatedParticipants);
      setFilteredParticipants(updatedParticipants);
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false); // Hide loading overlay
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, []); // Run only once on component mount
  

  const handleSearch = (icNumber) => {
    const searchResults = participants.filter(participant =>
      participant.icNumber.includes(icNumber)
    );
    setFilteredParticipants(searchResults);
  };

  const handleRankChange = (icNumber, newRank) => {
    // Only check for uniqueness if the new rank is 1, 2, or 3
    if (newRank === "1" || newRank === "2" || newRank === "3") {
      const rankTaken = participants.some(participant => participant.rank === newRank && participant.icNumber !== icNumber);

      if (rankTaken) {
        alert(`Rank ${newRank} is already assigned to another participant. Please choose a different rank.`);
        return; // Prevent rank change
      }
    }

    const updatedParticipants = participants.map(participant =>
      participant.icNumber === icNumber ? { ...participant, rank: newRank } : participant
    );
    setParticipants(updatedParticipants);
    setFilteredParticipants(updatedParticipants);
  };

  const handleUpdate = async () => {
    // Prepare the data to be updated
    const updateData = filteredParticipants.map((participant) => {
      return {
        icNumber: participant.icNumber,
        rank: participant.rank,
      };
    });

    setLoading(true); // Show loading overlay
    try {
      await updateWinnerList(updateData);
      alert("Ranking updated successfully.");
      await fetchParticipants();
    } catch (error) {
      console.error("Error updating ranking:", error);
      alert("Failed to update ranking.");
    } finally {
      setLoading(false); // Hide loading overlay
    }
  };

  const getAvailableRanks = (currentRank) => {
    const usedRanks = participants
      .filter((participant) => participant.rank && participant.rank !== "Top 150" && participant.rank !== "No Rank")
      .map((participant) => participant.rank);

    const allRanks = ["1", "2", "3", "Top 150", "No Rank"];
    return allRanks.filter((rank) => rank === currentRank || !usedRanks.includes(rank));
  };
  

  return (
    <div className='ranking-container'>
      <LoadingOverlay loading={loading} />
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
          </tr>
        </thead>
        <tbody>
          {filteredParticipants.map((participant) => (
            <tr key={participant.icNumber}>
              <td>
                <select
                  value={participant.rank || "No Rank"} // Default value if rank is not set
                  onChange={(e) => handleRankChange(participant.icNumber, e.target.value)}>
                  {getAvailableRanks(participant.rank).map((rank) => (
                    <option key={rank} value={rank}>
                      {rank}
                    </option>
                  ))}
                </select>
              </td>
              <td>{participant.name}</td>
              <td>{participant.icNumber}</td>
              <td>{participant.contactNo}</td>
              <td>{participant.category}</td>
              <td>{participant.matricNo}</td>
              <td>{participant.package}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Floating Update Button */}
      <button
        className="update-btn"
        onClick={handleUpdate}
      >
        Update
      </button>

    </div>
  );
};

export default Ranking;
