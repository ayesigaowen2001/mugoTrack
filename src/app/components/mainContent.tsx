import React from "react";
import Filter from "./filter";
import Image from "next/image"; // Use Next.js Image component

import dynamic from "next/dynamic";
function MainContent() {
  const BasicMapComponent = dynamic(() => import("./location"), {
    ssr: false, // Disable server-side rendering
  });

  return (
    <div
      style={{
        height: "560.64px",
        width: "1000px",
        marginLeft: "5px",
        background: "#FFFFFF",
      }}
    >
      <Image
        src="/images/icons/image 3.png"
        alt="filter"
        width={18}
        height={18}
        className="mt-8 ml-4"
      />
      <Filter />
      <BasicMapComponent />
    </div>
  );
}

export default MainContent;
