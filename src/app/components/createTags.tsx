
"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import createTag from "@/src/services/createTagService";

const CreateTagPage: React.FC = () => {
  const [createTagData, setCreateTagData] = useState({ Species: "", Gender: "", Name:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateTagData({ ...createTagData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!createTagData.Species || !createTagData.Gender || !createTagData.Name) {
      alert("Please enter both Species and Gender.");
      return;
    }

    setLoading(true);
    try {
      const data = await createTag(createTagData);
      console.log("createTag successful:", data);
      alert("Tag created successfully!");
    } catch (err) {
      setError(err as string);
      console.error("createTag failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[950px] h-[620.20px] bg-white flex">
      <div className="w-[260.01px] h-[527.63px] relative ">
        <div className="absolute top-[31.04px] text-[#3f9758] ml-10 text-[24.83px] font-bold font-['Inter']">
          Create Tag
        </div>
<div className="ml-56 flex justify-center items-center">
  {/* Species Input */}
        <div className="absolute top-[130.97px] w-[260.01px] h-[37.11px] bg-white rounded-md border border-[#201c1c]">
          <span className="p-float-label">
            <InputText
              id="Species"
              name="Species"
              value={createTagData.Species}
              onChange={handleCreateTagChange}
              className="w-[260.01px] h-[37.11px] px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
            />
            <label htmlFor="Species" className="text-[15.47px]">
              Species
            </label>
          </span>
        </div>

        {/* Gender Input */}
        <div className="absolute top-[200.97px] w-[260.01px] h-[37.11px] bg-white rounded-md border border-[#201c1c]">
          <span className="p-float-label">
            <InputText
              id="Name"
              name="Name"
              value={createTagData.Name}
              onChange={handleCreateTagChange}
              className="w-[260.01px] h-[37.11px] px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
            />
            <label htmlFor="Name" className="text-[15.47px]">
              Name
            </label>
          </span>
        </div>
        <div className="absolute top-[270.97px] w-[260.01px] h-[37.11px] bg-white rounded-md border border-[#201c1c]">
          <span className="p-float-label">
            <InputText
              id="Gender"
              name="Gender"
              value={createTagData.Gender}
              onChange={handleCreateTagChange}
              className="w-[260.01px] h-[37.11px] px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
            />
            <label htmlFor="Gender" className="text-[15.47px]">
              Gender
            </label>
          </span>
        </div>
          {/* Submit Button */}
         <div
          className="absolute top-[350.53px] w-[96.23px] h-[27.94px] bg-[#3f9758] rounded-md border border-[#201c1c]"
          onClick={handleSubmit}
        >
          <div className="absolute flex text-base font-bold font-['Inter'] px-4">
            Submit
          </div>
        </div>
        </div>
        
      
       
      </div>
    </div>
  );
};

export default CreateTagPage;
