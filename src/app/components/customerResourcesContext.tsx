import { createContext, useState, ReactNode } from "react";

// Define interfaces for GPS locations and animal data
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
}

export interface Resources {
  animals: Animal[];
}

export interface AnimalData {
  resources: Resources;
}

// Define the context type with specific types
export interface AnimalContextType {
  animalData: AnimalData | null; // `null` initially if no data is available
  setAnimalData: (data: AnimalData) => void;
}

// Create context with initial default values
export const AnimalContext = createContext<AnimalContextType>({
  animalData: null,
  setAnimalData: () => {},
});

interface AnimalProviderProps {
  children: ReactNode;
}

export const AnimalProvider: React.FC<AnimalProviderProps> = ({ children }) => {
  const [animalData, setAnimalData] = useState<AnimalData | null>(null);

  console.log("Animal Data:", animalData);

  return (
    <AnimalContext.Provider value={{ animalData, setAnimalData }}>
      {children}
    </AnimalContext.Provider>
  );
};
