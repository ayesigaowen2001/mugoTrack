"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

const ViewAccess: React.FC = () => {
  const [accessData, setAccessData] = useState<
    { email: string; role: string }[]
  >([]);
  const [newAccess, setNewAccess] = useState<{ email: string; role: string }>({
    email: "",
    role: "",
  });

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
  ];

  const handleAddAccess = () => {
    if (newAccess.email && newAccess.role) {
      setAccessData([...accessData, newAccess]);
      setNewAccess({ email: "", role: "" });
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Manage Access</h2>
      <div className="mb-4">
        <div className="flex mb-2">
          <InputText
            value={newAccess.email}
            onChange={(e) =>
              setNewAccess({ ...newAccess, email: e.target.value })
            }
            placeholder="Email"
            className="mr-2"
          />
          <Dropdown
            value={newAccess.role}
            options={roles}
            onChange={(e) => setNewAccess({ ...newAccess, role: e.value })}
            placeholder="Select Role"
            className="mr-2"
          />
          <Button label="Add" onClick={handleAddAccess} />
        </div>
        <ul>
          {accessData.map((access, index) => (
            <li key={index} className="mb-2">
              {access.email} - {access.role}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewAccess;
