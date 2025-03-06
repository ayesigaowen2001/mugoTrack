"use client";
import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { fetchSpecies } from "@/src/services/speciesService"; // Import the service function
import createTag from "@/src/services/createTagService";
import Image from "next/image";
import * as XLSX from "xlsx";

const CreateTagPage: React.FC = () => {
  const [createTagData, setCreateTagData] = useState({
    species: "",
    subspecies: "",
    gender: "",
    name: "",
  });
  const [speciesOptions, setSpeciesOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSpecies = async () => {
      try {
        const speciesData = await fetchSpecies();
        setSpeciesOptions(
          speciesData.map((species: any) => ({
            label: species.name,
            value: species.name,
            subspecies: species.subspecies.map((sub: any) => ({
              label: sub,
              value: `${species.name} - ${sub}`,
            })),
          }))
        );
      } catch (error) {
        console.error("Error loading species data:", error);
      }
    };

    loadSpecies();
  }, []);

  const handleSpeciesChange = (e: any) => {
    const [species, subspecies] = e.value.split(" - ");
    setCreateTagData({ ...createTagData, species, subspecies });
  };

  const handleCreateTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateTagData({ ...createTagData, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      if (binaryStr) {
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: Array<{
          species: string;
          subspecies: string;
          gender: string;
          name: string;
        }> = XLSX.utils.sheet_to_json(worksheet);
        console.log("Parsed Excel Data:", jsonData);

        // Automatically call createTag service for each entry
        jsonData.forEach(async (tagData) => {
          try {
            setLoading(true);
            const response = await createTag({
              Species: tagData.species,
              Subspecies: tagData.subspecies,
              Gender: tagData.gender,
              Name: tagData.name,
            });
            console.log("Tag created successfully:", response);
          } catch (err) {
            console.error("Error creating tag:", err);
          } finally {
            setLoading(false);
          }
        });

        alert("Tags created successfully!");
      }
    };

    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    if (
      !createTagData.species ||
      !createTagData.subspecies ||
      !createTagData.gender ||
      !createTagData.name
    ) {
      alert("Please enter Species, Subspecies, Gender, and Name.");
      return;
    }

    setLoading(true);
    try {
      const data = await createTag({
        Species: createTagData.species,
        Subspecies: createTagData.subspecies,
        Gender: createTagData.gender,
        Name: createTagData.name,
      });
      console.log("createTag successful:", data);
      alert("Tag created successfully!");
    } catch (err) {
      console.error("createTag failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[950px] h-[620.20px] bg-white flex create-tag-page">
      <div className="w-[260.01px] h-[527.63px] relative">
        <div className="absolute top-[31.04px] text-[#3f9758] ml-10 text-[24.83px] font-bold font-['Inter']">
          Create Tag
        </div>
        <div className="ml-56 flex justify-center items-center">
          {/* Species and Subspecies Dropdown */}
          <div className="absolute top-[130.97px] w-[260.01px] h-[37.11px] bg-white rounded-md border border-[#201c1c]">
            <Dropdown
              value={`${createTagData.species} - ${createTagData.subspecies}`}
              options={speciesOptions.flatMap((species) => [
                { label: species.label, value: species.value, disabled: true },
                ...species.subspecies,
              ])}
              onChange={handleSpeciesChange}
              placeholder="Select Species and Subspecies"
              className="w-full"
            />
          </div>

          {/* Gender Dropdown */}
          <div className="absolute top-[200.97px] w-[260.01px] h-[37.11px] bg-white rounded-md border border-[#201c1c]">
            <Dropdown
              value={createTagData.gender}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
              ]}
              onChange={(e) =>
                setCreateTagData({ ...createTagData, gender: e.value })
              }
              placeholder="Select Gender"
              className="w-full"
            />
          </div>

          {/* Name Input */}
          <div className="absolute top-[270.97px] w-[260.01px] h-[37.11px] bg-white rounded-md border border-[#201c1c]">
            <InputText
              id="name"
              name="name"
              value={createTagData.name}
              onChange={handleCreateTagChange}
              placeholder="Enter Name"
              className="w-full"
            />
          </div>

          {/* Submit Button */}
          <div
            className="absolute top-[340.53px] w-[96.23px] h-[27.94px] bg-[#3f9758] rounded-md border border-[#201c1c]"
            onClick={handleSubmit}
          >
            <div className="absolute flex text-base font-bold font-['Inter'] px-4">
              Submit
            </div>
          </div>
        </div>

        {/* Excel File Upload */}
        <div className="absolute top-[30px] left-[300px] flex items-center">
          <input
            type="file"
            id="excelFile"
            accept=".xlsx, .xls"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Image
            src="/images/icons/excel.png"
            alt="Logo"
            width={30.17}
            height={30.87}
          />
          <label
            htmlFor="excelFile"
            className="flex items-center cursor-pointer bg-white rounded-md  px-3 py-1 text-[#3f9758]"
            style={{ width: "50px" }}
          >
            Create multiple Tags
          </label>
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .create-tag-page {
            flex-direction: column;
            align-items: center;
          }
          .create-tag-page > div {
            width: 100%;
            height: auto;
          }
          .create-tag-page .absolute {
            position: static;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default CreateTagPage;
