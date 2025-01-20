"use client";
import React, { useState } from "react";
import NavBar from "@/src/app/components/navbar";

import Filter from "@/src/app/components/filter";
import MainContent from "@/src/app/components/mainContent";
import ViewTags from "@/src/app/components/viewTags";


const Dashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("View location");
  const [filteredData, setFilteredData] = useState<any[]>([]); // Manage filtered data here
  return (
    
    <div className="flex">
    <NavBar onMenuItemSelect={setSelectedItem} />
    <MainContent selectedItem={selectedItem}
     setFilteredData={setFilteredData}
     filteredData={filteredData}/>
    {/* <ViewTags selectedItem={selectedItem}/> */}
   
  </div>
 
  );
};

export default Dashboard;
