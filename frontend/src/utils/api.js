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
      throw new Error(result.error || "Login failed.");
    }
    return result; 
  } catch (error) {
    throw new Error(error.message);
  }
};