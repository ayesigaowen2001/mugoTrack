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
  const { animalData } = useContext(AnimalContext);
  const animals = Array.isArray(animalData?.resources.animals.data)
    ? animalData.resources.animals.data
    : [];

  // States for filter inputs
  const [tagId, setTagId] = useState<string | null>(null);
  const [species, setSpecies] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);

  // Options for dropdowns (add "None" option)
  const tagIdOptions = [
    { label: "None", value: null },
    ...Array.from(new Set(animals.map((animal) => animal.animal_number))).map(
      (tag) => ({ label: tag, value: tag })
    ),
  ];

  const speciesOptions = [
    { label: "None", value: null },
    ...Array.from(new Set(animals.map((animal) => animal.animal_species))).map(
      (species) => ({ label: species, value: species })
    ),
  ];

  const genderOptions = [
    { label: "None", value: null },
    ...Array.from(new Set(animals.map((animal) => animal.gender))).map(
      (gender) => ({ label: gender, value: gender })
    ),
  ];

  // Dynamic Filter Logic
  const handleFilter = () => {
    const filtered = animals.filter((animal) => {
      const matchesTagId =
        tagId !== null ? animal.animal_number === tagId : true;
      const matchesSpecies =
        species !== null ? animal.animal_species === species : true;
      const matchesGender = gender !== null ? animal.gender === gender : true;
      return matchesTagId && matchesSpecies && matchesGender;
    });

    setFilteredData(filtered);
    if (onFilterApply) {
      onFilterApply(true);
    }
  };

  return (
    <div>
      <div
        className="flex rounded-md flex-row bg-gray-100 p-4 ml-5"
        style={{ width: "100%" }}
      >
        {/* Tag ID Dropdown */}
        <div className="flex-col px-2 w-1/3">
          <h3>Tag ID</h3>
          <Dropdown
            value={tagId}
            options={tagIdOptions}
            onChange={(e) => setTagId(e.value)}
            placeholder="Select Tag ID"
            filter
            className="border rounded-md w-full"
          />
          <Button
            label="Clear"
            onClick={() => setTagId(null)}
            className="p-button-secondary mt-2"
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
            filter
            className="border rounded-md w-full"
          />
          <Button
            label="Clear"
            onClick={() => setSpecies(null)}
            className="p-button-secondary mt-2"
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
            filter
            className="border rounded-md w-full"
          />
          <Button
            label="Clear"
            onClick={() => setGender(null)}
            className="p-button-secondary mt-2"
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
    </div>
  );
};

export default Filter;
