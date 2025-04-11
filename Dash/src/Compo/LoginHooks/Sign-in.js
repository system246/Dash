import axios from "axios";

const API_URL = "http://localhost:5000/users";  

export const checkUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, userData, {
      headers: { "Content-Type": "application/json" },  
    });
    return response.data;
  } catch (error) {
    console.error("User check failed:", error);
    throw error.response ? error.response.data : { message: "Server error" };
  }
};