import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Use an environment variable

const createTag = async (createTagData: { Species: string; Gender: string ; Name: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customers/createTag`, createTagData);
    if (response.status === 200) {
      console.log("createTag successful:", response.data);
      return response.data;
    } else {
      throw new Error("createTag failed. Please try again.");
    }
  } catch (error: any) {
    console.error("createTag API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export default createTag;
