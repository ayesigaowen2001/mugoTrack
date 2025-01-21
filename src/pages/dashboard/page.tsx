"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import components with SSR disabled
const NavBar = dynamic(() => import("@/src/app/components/navbar"), { ssr: false });
const MainContent = dynamic(() => import("@/src/app/components/mainContent"), { ssr: false });
// Uncomment the following if you re-enable ViewTags
// const ViewTags = dynamic(() => import("@/src/app/components/viewTags"), { ssr: false });

const Dashboard: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("View location");
  const [filteredData, setFilteredData] = useState<any[]>([]);

  return (
    <div className="flex">
      <NavBar onMenuItemSelect={setSelectedItem} />
      <MainContent selectedItem={selectedItem} setFilteredData={setFilteredData} filteredData={filteredData} />
      {/* Uncomment if needed */}
      {/* <ViewTags selectedItem={selectedItem}/> */}
    </div>
  );
};

export default Dashboard;

