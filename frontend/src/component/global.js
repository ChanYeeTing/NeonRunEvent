const GlobalState = {
    latestStatus: "Pending", // Default status
    setLatestStatus(newStatus) {
      this.latestStatus = newStatus;
    },
  };
  
  export default GlobalState;
  