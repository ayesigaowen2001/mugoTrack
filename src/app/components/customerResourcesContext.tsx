import React, { createContext, useState, ReactNode } from "react";

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

// export interface AnimalData {
//   resources: Resources;
// }
interface AnimalData {
  profile: {
    email: string;
    first_name: string;
    last_name: string;
    [key: string]: any; // Optional if there are additional fields
  };
  resources: {
    animals: any[];
    token: string;
    workers: any;
  };
}

export interface UserData {
  customer_id: number | null; // Store the logged-in customer's ID
  access_token: string | null; // Store the access token for API calls
}

// Define the context type for AnimalContext
export interface AnimalContextType {
  animalData: AnimalData | null; // `null` initially if no data is available
  userData: UserData;
  setAnimalData: (data: AnimalData) => void;
  setUserData: (data: UserData) => void;
}

// Create AnimalContext with initial default values
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

  return (
    <AnimalContext.Provider
      value={{ animalData, setAnimalData, userData, setUserData }}
    >
      {children}
    </AnimalContext.Provider>
  );
};

// --- NotificationContext Implementation ---

// Notification context type
export interface NotificationContextType {
  notifications: string[]; // List of notification messages
  showNotification: (message: string, type?: "success" | "error" | "info") => void;
  clearNotifications: () => void;
}

// Create NotificationContext
export const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  showNotification: () => {},
  clearNotifications: () => {},
});

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<string[]>([]);

  const showNotification = (
    message: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    const formattedMessage = `[${type.toUpperCase()}] ${message}`;
    setNotifications((prev) => [...prev, formattedMessage]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, showNotification, clearNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
