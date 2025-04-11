import axios from "axios";

// Backend API Base URL
const API_URL = "http://localhost:5000/users"; 

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-up`, userData);
    return response.data;
  } catch (error) {
    console.error("Error saving data:", error);
    throw error.response ? error.response.data : { message: "Server error" };
  }
};
