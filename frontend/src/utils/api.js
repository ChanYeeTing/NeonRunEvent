// src/utils/api.js

// Function for user registration
export const register = async (data) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Registration failed.");
    }
    return result; // Return result if successful
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function for user login
export const login = async (data) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Login failed.");
    }
    return result; // Return result if successful
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function for admin login
export const adminLogin = async (data) => {
  try {
    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Admin login failed.");
    }
    return result; // Return result if successful
  } catch (error) {
    throw new Error(error.message);
  }
};


export const participantList = async (data) => {
  const token = localStorage.getItem('authToken'); 
  try {
    const response = await fetch("/api/participantList", {
      method: "GET",
      headers: { "Content-Type": "application/json", 'Authorization': token },
      
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Error fetching participants");
    }
    return result; 
  } catch (error) {
    throw new Error(error.message);
  }
};

export const eventStatistics = async (data) => {
  try{
    const response = await fetch("api/event-stats", 
      {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const result = await response.json()
      if(!response.ok)
      {
        throw new Error(result.error || "Error fetching event statistics");
      }
      return result;
  }
  catch (error) {
    throw new Error(error.message);
  }

};

export const registerParticipant = async (data) => {
  try {
    const response = await fetch("/api/register-participant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Registration failed.");
    }
    return result; // Return result if successful
  } catch (error) {
    throw new Error(error.message);
  }
};

export const uploadMemory = async (data) => {
  try {
    const response = await fetch("/api/upload-memory", {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Upload failed.");
    }
    return result; // Return result if successful
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getMemories = async () => {
  try {
    const response = await fetch("/api/get-memories", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json()
    if(!response.ok)
    {
      throw new Error(result.error || "Error fetching image");
    }
    return result;
  }
  catch (error) {
    throw new Error(error.message);
  }
};

export const uploadWinner = async (data) => {
  try {
    const response = await fetch("/api/upload-winners", {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Upload failed.");
    }
    return result; // Return result if successful
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getWinners = async () => {
  try {
    const response = await fetch("/api/get-winners", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const result = await response.json()
    if(!response.ok)
    {
      throw new Error(result.error || "Error fetching image");
    }
    return result;
  }
  catch (error) {
    throw new Error(error.message);
  }
};

export const uploadPaymentProof = async (data) => {
  try {
    const response = await fetch("/api/upload-payment-proof", {
      method: "POST",
      body: data,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Payment proof upload failed.");
    }
    return result;
  } catch (error) {
    throw new Error(error.message); 
  }
};

// Function to update user status
export const updateStatus = async (data) => {
  try {
    const response = await fetch("/api/update-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Failed to update status.");
    }
    return result; // Return result if successful
  } catch (error) {
    throw new Error(error.message);
  }
};
