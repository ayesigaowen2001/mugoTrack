import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Store API base URL in .env

export const fetchSpecies = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/species`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching species data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch species data."
    );
  }
};
