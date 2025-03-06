"use client";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AnimalContext } from "./customerResourcesContext";

const Logout: React.FC = () => {
  const { setUserData } = useContext(AnimalContext);
  const router = useRouter();

  const handleLogout = () => {
    setUserData({ customer_id: null, access_token: null });
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Logout</h2>
      <button onClick={handleLogout} className="p-button p-button-danger">
        Logout
      </button>
    </div>
  );
};

export default Logout;
