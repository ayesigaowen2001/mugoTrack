import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Store API base URL in .env

interface FetchGeoLocationsParams {
  animalId: string;
  customerId: number;
  hours: number;
  access_token: string;
}

export const fetchGeoLocations = async ({
  animalId,
  customerId,
  hours,
  access_token,
}: FetchGeoLocationsParams): Promise<any[]> => {
  if (!animalId || !customerId || !hours || !access_token) {
    throw new Error("Animal ID, Customer ID, and Hours are required.");
  }

  const url = `${API_BASE_URL}/gps_locations/by_animal_number/${animalId}?customer_id=${customerId}&hours=${hours}`;

  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        token: access_token,
        animalId,
        customerId: customerId.toString(), // Convert to string for header compatibility
        hours: hours.toString(),
      },
    });

    return response.data;
    console.log(response.data);
  } catch (error: any) {
    console.error("Error fetching GPS locations:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch GPS locations."
    );
  }
};
