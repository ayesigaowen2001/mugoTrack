"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Filter from "./filter";
import Image from "next/image"; // Use Next.js Image component
import FilteredMapComponent from "./filteredMap";
import Geofilter from "./geoFilter";

const BasicMapComponent = dynamic(() => import("./location"), { ssr: false });
const CreateTags = dynamic(() => import("./createTags"), { ssr: false });
const ViewTags = dynamic(() => import("./viewTags"), { ssr: false });
const Geofence = dynamic(() => import("./geoFence"), { ssr: false });
const FilterAnimal = dynamic(() => import("./trackAnimal"), { ssr: false });
const RouteMap = dynamic(() => import("./gpsAnimation"), { ssr: false });
const Notifications = dynamic(() => import("./notifications"), { ssr: false });
const GeoStatus = dynamic(() => import("./geoStatusMap"), { ssr: false });
const Report = dynamic(() => import("./report"), { ssr: false });
const ViewAccess = dynamic(() => import("./viewAccess"), { ssr: false });
const AccountInformation = dynamic(() => import("./accountInformation"), {
  ssr: false,
});
const Logout = dynamic(() => import("./logout"), { ssr: false });

interface MainContentProps {
  selectedItem: string;
  setFilteredData: React.Dispatch<React.SetStateAction<any[]>>; // New prop
  filteredData: any[]; // New prop
  isSidebarOpen: boolean;
}

const MainContent: React.FC<MainContentProps> = ({
  selectedItem,
  setFilteredData,
  filteredData,
  isSidebarOpen,
}) => {
  const [filterApplied, setFilterApplied] = useState(false);
  const [gpsLocations, setGpsLocations] = useState<any[]>([]); // Shared state
  const [geoLocations, setGeoLocations] = useState<any[]>([]);
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
        return <Geofence />;
      case "Track":
        return (
          <>
            <FilterAnimal setGpsLocations={setGpsLocations} />
            <RouteMap gpsData={gpsLocations} />
          </>
        );
      case "Create tags":
        return <CreateTags />;
      case "View tags":
        return <ViewTags />;
      case "View notifications":
        return <Notifications />;
      case "Report":
        return <Report />;
      case "Geo-Status":
        return (
          <>
            <Geofilter setGeoLocations={setGeoLocations} />
            <GeoStatus geoData={geoLocations} />
          </>
        );
      case "View access":
        return <ViewAccess />;
      case "Bio data":
        return <AccountInformation />;
      case "Logout":
        return <Logout />;
      default:
        return <div>Content Not Available</div>;
    }
  };

  return (
    <div
      style={{
        height: "h-full",
        width: isSidebarOpen ? "100%" : "calc(100% - 236.33px)",
        marginLeft: isSidebarOpen ? "5px" : "5px",
        background: "#FFFFFF",
        transition: "margin-left 0.3s ease, width 0.3s ease",
      }}
      className="main-content"
    >
      {renderContent()}
    </div>
  );
};

export default MainContent;
