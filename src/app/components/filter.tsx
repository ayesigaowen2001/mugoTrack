"use client";
import React, { useState, useContext } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { AnimalContext } from "./customerResourcesContext"; // Adjust path to your context file

interface FilterProps {
  setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
  onFilterApply?: (applied: boolean) => void;
}

const Filter: React.FC<FilterProps> = ({ setFilteredData, onFilterApply }) => {
  const { animalData } = useContext(AnimalContext); // Access context values
  const animals = animalData?.resources.animals || [];

  // States for filter inputs
  const [tagId, setTagId] = useState<string | null>(null);
  const [species, setSpecies] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  // Options for dropdowns (unique values from animal data)
  const tagIdOptions = Array.from(
    new Set(animals.map((animal) => animal.animal_number))
  ).map((tag) => ({ label: tag, value: tag }));

  const speciesOptions = Array.from(
    new Set(animals.map((animal) => animal.animal_species))
  ).map((species) => ({ label: species, value: species }));

  const genderOptions = Array.from(
    new Set(animals.map((animal) => animal.gender))
  ).map((gender) => ({ label: gender, value: gender }));

  // Filter logic
  const handleFilter = () => {
    const filtered = animals.filter((animal) => {
      const matchesTagId = tagId ? animal.animal_number === tagId : true;
      const matchesSpecies = species ? animal.animal_species === species : true;
      const matchesGender = gender ? animal.gender === gender : true;
      return matchesTagId && matchesSpecies && matchesGender;
    });

    setFilteredData(filtered);
    if (onFilterApply) {
      onFilterApply(true); // Notify parent component
    }
  };

  return (
    <div>
      <div className="flex rounded-md flex-row bg-gray-100 p-4 ml-5" style={{ width: "100%" }}>
        {/* Tag ID Dropdown */}
        <div className="flex-col px-2 w-1/3">
          <h3>Tag ID</h3>
          <Dropdown
            value={tagId}
            options={tagIdOptions}
            onChange={(e) => setTagId(e.value)}
            placeholder="Select Tag ID"
            filter // Enables typing and suggestion
            className="border rounded-md w-full"
          />
        </div>

        <Divider layout="vertical" className="mx-2" />

        {/* Species Dropdown */}
        <div className="flex-col px-2 w-1/3">
          <h3>Species</h3>
          <Dropdown
            value={species}
            options={speciesOptions}
            onChange={(e) => setSpecies(e.value)}
            placeholder="Select Species"
            filter // Enables typing and suggestion
            className="border rounded-md w-full"
          />
        </div>

        <Divider layout="vertical" className="mx-2" />

        {/* Gender Dropdown */}
        <div className="flex-col px-2 w-1/3">
          <h3>Gender</h3>
          <Dropdown
            value={gender}
            options={genderOptions}
            onChange={(e) => setGender(e.value)}
            placeholder="Select Gender"
            filter // Enables typing and suggestion
            className="border rounded-md w-full"
          />
        </div>

        {/* Apply Filter Button */}
        <div className="flex items-end px-2">
          <Button
            label="Apply Filter"
            onClick={handleFilter}
            className="p-button-success w-full"
          />
        </div>
      </div>

      {/* Filtered Data Display */}
      {/* <div className="mt-5">
        <h3>Filtered Results:</h3>
        {animals.length > 0 ? (
          <ul>
            {animals.map((animal) => (
              <li key={animal.animal_number}>
                {animal.animal_number} - {animal.animal_name} -{" "}
                {animal.animal_species} - {animal.gender}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div> */}
    </div>
  );
};

export default Filter;
