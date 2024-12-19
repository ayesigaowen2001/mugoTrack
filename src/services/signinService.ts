import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Use an environment variable

// Define the signup function
const signUp = async (signinData: {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  num_animals: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/customers/register`, signinData);
    if (response.status === 200) { // Assuming 201 status for successful signup
      console.log("Signup successful:", response.data);
      return response.data; // Return response for further processing
    } else {
      throw new Error("Signup failed. Please try again.");
    }
  } catch (error: any) {
    console.error("Signup API Error:", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export default signUp;
