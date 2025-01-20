"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Filter from "./filter";
import Image from "next/image"; // Use Next.js Image component
import FilteredMapComponent from "./filteredMap";

const BasicMapComponent = dynamic(() => import("./location"), { ssr: false });
const CreateTags = dynamic(() => import("./createTags"), { ssr: false });
const ViewTags = dynamic(() => import("./viewTags"), { ssr: false });
const Geofence = dynamic(() => import("./geoFence"), { ssr: false });

interface MainContentProps {
  selectedItem: string;
  setFilteredData: React.Dispatch<React.SetStateAction<any[]>>; // New prop
  filteredData: any[]; // New prop
}

const MainContent: React.FC<MainContentProps> = ({ selectedItem ,
  
  setFilteredData,
  filteredData, }) => {const [filterApplied, setFilterApplied] = useState(false);
    const handleFilterApply = (applied: boolean) => {
      setFilterApplied(applied);
    };
    useEffect(() => {
      console.log("Filtered Data in Map Component:", filteredData);
    }, [filteredData]);
  const renderContent = () => {
    switch (selectedItem) {
      case "View location":
        return (
          <>
            <div>
              <Image
                src="/images/icons/image 3.png"
                alt="Logo"
                width={19.17}
                height={20.87}
                className="mt-5 mb-5 ml-10"
              />
            </div>
            <Filter
              setFilteredData={setFilteredData}
              onFilterApply={handleFilterApply} // Pass the callback
            />
            {filterApplied ? (
              <FilteredMapComponent filteredData={filteredData} />
            ) : (
              <BasicMapComponent />
            )}
          </>
        );
      case "Geofence":
        return <Geofence/>
      case "Track":
        return <div>Track Component</div>;
      case "Create tags":
        return <CreateTags />;
      case "View tags":
        return <ViewTags />;
      case "Report":
        return <div>Analytics Report</div>;
      default:
        return <div>Content Not Available</div>;
    }
  };

  return (
    <div
      style={{
        height: "560.64px",
        width: "1000px",
        marginLeft: "5px",
        background: "#FFFFFF",
      }}
    >
      {renderContent()}
    </div>
  );
};

export default MainContent;
