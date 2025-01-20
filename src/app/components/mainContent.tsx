"use client";

import React from "react";
import dynamic from "next/dynamic";
import Filter from "./filter";
import Image from "next/image"; // Use Next.js Image component

const BasicMapComponent = dynamic(() => import("./location"), { ssr: false });
const CreateTags = dynamic(() => import("./createTags"), { ssr: false });
const ViewTags = dynamic(() => import("./viewTags"), { ssr: false });

interface MainContentProps {
  selectedItem: string;
}

const MainContent: React.FC<MainContentProps> = ({ selectedItem }) => {
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
            <Filter />
            <BasicMapComponent />
          </>
        );
      case "Geofence":
        return <div>Geofence Component</div>;
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
