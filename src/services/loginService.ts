import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Use an environment variable

// Define the login function
const login = async (loginData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customers/login`, loginData);
    if (response.status === 200) {
      
      console.log("Login successful:", response.data);
      return response.data; // Return response for further processing
    } else {
      throw new Error("Login failed. Please try again.");
    }
  } catch (error: any) {
    console.error("Login API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export default login;
