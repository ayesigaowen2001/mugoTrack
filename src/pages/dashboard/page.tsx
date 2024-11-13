"use client";
import React from "react";
import NavBar from "@/src/app/components/navbar";
import filter from "@/src/app/components/filter";
import Filter from "@/src/app/components/filter";
import MainContent from "@/src/app/components/mainContent";
const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <NavBar />
      <MainContent />
    </div>
  );
};

export default Dashboard;
