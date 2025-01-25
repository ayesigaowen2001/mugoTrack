import { createContext, useState, ReactNode } from "react";

// Define interfaces for GPS locations, animal data, and user data
export interface GpsLocation {
  latitude: string;
  longitude: string;
  timestamp: string;
}

export interface Animal {
  animal_name: string;
  animal_number: string;
  gender: string;
  animal_species: string;
  gps_locations: GpsLocation[];
  customer_id: number;
}

export interface Resources {
  animals: Animal[];
}

export interface AnimalData {
  resources: Resources;
}

export interface UserData {
  customer_id: number | null; // Store the logged-in customer's ID
  access_token: string | null; // Store the access token for API calls
}

// Define the context type
export interface AnimalContextType {
  animalData: AnimalData | null; // `null` initially if no data is available
  userData: UserData;
  setAnimalData: (data: AnimalData) => void;
  setUserData: (data: any) => void;
}

// Create context with initial default values
export const AnimalContext = createContext<AnimalContextType>({
  animalData: null,
  userData: { customer_id: null, access_token: null },
  setAnimalData: () => {},
  setUserData: () => {},
});

interface AnimalProviderProps {
  children: ReactNode;
}

export const AnimalProvider: React.FC<AnimalProviderProps> = ({ children }) => {
  const [animalData, setAnimalData] = useState<AnimalData | null>(null);
  const [userData, setUserData] = useState<UserData>({
    customer_id: null,
    access_token: null,
  });

  console.log("Animal Data:", animalData);
  console.log("User Data:", userData);

  return (
    <AnimalContext.Provider
      value={{ animalData, setAnimalData, userData, setUserData }}
    >
      {children}
    </AnimalContext.Provider>
  );
};
