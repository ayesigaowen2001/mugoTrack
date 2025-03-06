import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Store API base URL in .env

interface FetchGeoLocationsParams {
  customerId: number;
  hours: number;
  access_token: string;
  geofenceStatus: string;
}

export const fetchGeoLocations = async ({
  customerId,
  hours,
  access_token,
  geofenceStatus,
}: FetchGeoLocationsParams): Promise<any[]> => {
  if (!customerId || !hours || !access_token) {
    throw new Error("Customer ID, Hours, and Geofence Status are required.");
  }

  const url = `${API_BASE_URL}/gps_locations/for_customer/${customerId}?hours=${hours}&geofence_status=${geofenceStatus}`;

  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        token: access_token,
      },
    });

    console.log("Server response:", response.data); // Print the JSON response from the server
    return response.data;
  } catch (error: any) {
    console.error("Error fetching GPS locations:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch GPS locations."
    );
  }
};
