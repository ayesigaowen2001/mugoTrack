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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const handleToggleSidebar = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <div className="flex">
      <NavBar onToggleSidebar={handleToggleSidebar} onMenuItemSelect={setSelectedItem} />
      <MainContent selectedItem={selectedItem} isSidebarOpen={isSidebarOpen} setFilteredData={setFilteredData} filteredData={filteredData} />
      {/* Uncomment if needed */}
      {/* <ViewTags selectedItem={selectedItem}/> */}
    </div>
  );
};

export default Dashboard;

