// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import * as atlas from "azure-maps-control";

// const BasicMapComponent: React.FC = () => {
//   const mapRef = useRef<atlas.Map | null>(null);
//   const divRef = useRef<HTMLDivElement | null>(null);
//   const [mapError, setMapError] = useState<string | null>(null); // State to track map errors
//   const apiKey = process.env.NEXT_PUBLIC_API_KEY;

//   useEffect(() => {
//     if (typeof window !== "undefined" && divRef.current && !mapRef.current) {
//       try {
//         // Attempt to initialize the map
//         const map = new atlas.Map(divRef.current, {
//           authOptions: {
//             authType: atlas.AuthenticationType.subscriptionKey,
//             subscriptionKey: apiKey,
//           },
//           center: [0, 0], // Default center (longitude, latitude)
//           zoom: 2, // Default zoom level
//         });

//         mapRef.current = map;

//         map.events.add("ready", () => {
//           console.log("Map is ready");
//         });

//         // Error handling for failed CSS or rendering
//         if (!divRef.current.classList.contains("mapContainer")) {
//           throw new Error("Azure Maps CSS is not loaded properly.");
//         }
//       } catch (error) {
//         console.error("Error initializing map:", error);
//         setMapError(
//           "There was a problem loading the map. Please try again later."
//         );
//       }
//     }

//     // Cleanup on unmount
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.dispose();
//       }
//     };
//   }, [apiKey]);

//   return (
//     <div>
//       {mapError ? (
//         <div className="text-red-500">{mapError}</div> // Display error message if there's an issue
//       ) : (
//         <div
//           ref={divRef}
//           style={{
//             width: "100%",
//             height: "430px",
//             marginTop: "20px",
//             marginLeft: "20px",
//           }}
//           className="bg-gray-200 mapContainer"
//         ></div>
//       )}
//     </div>
//   );
// };

// export default BasicMapComponent;

"use client";

import React, { useEffect, useRef, useState } from "react";
import * as atlas from "azure-maps-control";

const BasicMapComponent: React.FC = () => {
  const mapRef = useRef<atlas.Map | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  // State to handle errors
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Ensure the code only runs on the client
    if (typeof window !== "undefined" && divRef.current && !mapRef.current) {
      try {
        const map = new atlas.Map(divRef.current, {
          authOptions: {
            authType: atlas.AuthenticationType.subscriptionKey,
            subscriptionKey: apiKey!,
          },
          center: [0, 0], // Default center (longitude, latitude)
          zoom: 2, // Default zoom level
        });

        mapRef.current = map;

        // Event listener for map readiness
        map.events.add("ready", () => {
          console.log("Map is ready");
        });

        // Event listener for any error during map rendering
        map.events.add("error", (e) => {
          setError(
            "Map failed to load. Please check the API key or network connection."
          );
          console.error("Map rendering error: ", e);
        });
      } catch (err) {
        // Handle any exceptions that might occur during initialization
        setError("An error occurred while initializing the map.");
        console.error("Map initialization error: ", err);
      }
    }

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.dispose();
      }
    };
  }, [apiKey]);

  return (
    <div>
      {/* Display error message if there is any */}
      {error && (
        <div className="bg-red-200 text-red-700 p-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <div
        ref={divRef}
        style={{
          width: "100%",
          height: "430px",
          marginTop: "20px",
          marginLeft: "20px",
        }}
        className="bg-gray-200 mapContainer"
      ></div>
    </div>
  );
};

export default BasicMapComponent;
