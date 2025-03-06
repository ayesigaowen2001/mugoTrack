"use client";
import React, { useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { AnimalContext } from "./customerResourcesContext";

const AccountInformation: React.FC = () => {
  const { userData, setUserData } = useContext(AnimalContext);
  const [biodata, setBiodata] = useState(userData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBiodata({ ...biodata, [name]: value });
  };

  const handleSubmit = () => {
    setUserData(biodata);
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Account Information</h2>
      <div className="mb-4">
        <InputText
          name="first_name"
          value={biodata.first_name || ""}
          onChange={handleInputChange}
          placeholder="First Name"
          className="mb-2 w-full"
        />
        <InputText
          name="last_name"
          value={biodata.last_name || ""}
          onChange={handleInputChange}
          placeholder="Last Name"
          className="mb-2 w-full"
        />
        <InputText
          name="email"
          value={biodata.email || ""}
          onChange={handleInputChange}
          placeholder="Email"
          className="mb-2 w-full"
        />
        <InputText
          name="contact"
          value={biodata.contact || ""}
          onChange={handleInputChange}
          placeholder="Contact"
          className="mb-2 w-full"
        />
        <Button label="Update Profile" onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default AccountInformation;
