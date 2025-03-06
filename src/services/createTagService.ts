import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Use an environment variable

interface CreateTagParams {
  Species: string;
  Subspecies: string;
  Gender: string;
  Name: string;
}

const createTag = async (tagData: CreateTagParams): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/customers/createTag`,
      tagData
    );
    if (response.status === 200) {
      console.log("createTag successful:", response.data);
      return response.data;
    } else {
      throw new Error("createTag failed. Please try again.");
    }
  } catch (error: any) {
    console.error(
      "createTag API Error:",
      error.response?.data || error.message
    );
    throw error.response?.data || error.message;
  }
};

export default createTag;
