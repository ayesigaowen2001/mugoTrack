import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Use environment variable for API URL

// Fetch Tags function
const getTags = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tags`);
    if (response.status === 200) {
      return response.data; // Return the fetched data
    } else {
      throw new Error("Failed to fetch tags. Please try again.");
    }
  } catch (error: any) {
    console.error("Get Tags API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export default getTags;
