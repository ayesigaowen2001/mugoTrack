"use client";

import React, { useState, useContext } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { AnimalContext } from "./customerResourcesContext"; // Adjust the path to your context
import { fetchGpsLocations } from "@/src/services/animalTrackingService"; // Import the service function

interface FilterProps {
  setGpsLocations: React.Dispatch<React.SetStateAction<any[]>>; // State to store the fetched GPS data
}

const FilterAnimal: React.FC<FilterProps> = ({ setGpsLocations }) => {
  const { animalData, userData } = useContext(AnimalContext); // Access animal and user data from context
  const animals = animalData?.resources.animals || [];

  const [animalId, setAnimalId] = useState<string | null>(null);
  const [hours, setHours] = useState<number | null>(null);

  // Options for dropdowns (unique values from animal data)
  const animalIdOptions = Array.from(
    new Set(animals.map((animal) => animal.animal_number))
  ).map((id) => ({ label: id, value: id }));

  const handleFetchGpsLocations = async () => {
    if (!animalId || !hours || !userData.customer_id) {
      alert("Please select Animal ID, and input Hours.");
      return;
    }
    if (!userData.access_token) {
        alert("Access token is missing. Please log in again.");
        return;
      }
      console.log(userData)
    try {
      const gpsLocations = await fetchGpsLocations({
        animalId,
        customerId: userData.customer_id, // Use customer_id from context
        hours,
        access_token: userData.access_token,
      });
      setGpsLocations(gpsLocations); // Pass data to parent state
    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="flex rounded-md flex-row bg-gray-100 p-4 w-full">
        {/* Animal ID Dropdown */}
        <div className="flex-col px-2 w-1/3">
          <h3>Animal ID</h3>
          <Dropdown
            value={animalId}
            options={animalIdOptions}
            onChange={(e) => setAnimalId(e.value)}
            placeholder="Select Animal ID"
            filter
            className="border rounded-md w-full"
          />
        </div>

        {/* Hours Input */}
        <div className="flex-col px-2 w-1/3">
          <h3>Hours</h3>
          <InputNumber
            value={hours}
            onValueChange={(e) => setHours(e.value ?? null)}
            placeholder="Enter Hours"
            className="border rounded-md w-full"
            min={1}
          />
        </div>

        {/* Fetch Data Button */}
        <div className="flex items-end px-2">
          <Button
            label="Fetch Data"
            onClick={handleFetchGpsLocations}
            className="p-button-success w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FilterAnimal;