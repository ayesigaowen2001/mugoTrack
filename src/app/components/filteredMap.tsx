// "use client";

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import * as atlas from "azure-maps-control";
// import MapControls from "./mapControls"; // Import MapControls component

// interface BasicMapProps {
//   filteredData: any[]; // Accept filtered data as a prop
// }

// const FilteredMapComponent: React.FC<BasicMapProps> = ({ filteredData }) => {
//   const mapRef = useRef<atlas.Map | null>(null);
//   const divRef = useRef<HTMLDivElement | null>(null);
//   const apiKey = process.env.NEXT_PUBLIC_API_KEY;
//   const [error, setError] = useState<string | null>(null);

//   const processAnimalLocations = useCallback(() => {
//     return filteredData?.map((animal) => {
//       const gpsLocations = animal.gps_locations;
//       if (gpsLocations && gpsLocations.length > 0) {
//         return {
//           name: animal.animal_name,
//           species: animal.animal_species,
//           number: animal.animal_number,
//           ...gpsLocations[gpsLocations.length - 1], // Last GPS location
//         };
//       }
      
//       return null;
//     }).filter(Boolean);
//   }, [filteredData]);
// useEffect(() => {
//   console.log("Filtered Data in Map Component:", filteredData);
// }, [filteredData]);
//   useEffect(() => {
//     if (typeof window !== "undefined" && divRef.current && !mapRef.current) {
//       try {
//         const map = new atlas.Map(divRef.current, {
//           authOptions: {
//             authType: atlas.AuthenticationType.subscriptionKey,
//             subscriptionKey: apiKey!,
//           },
//           center: [0, 0],
//           zoom: 2,
//         });

//         mapRef.current = map;
        
//         map.events.add("ready", () => {
//           const locations = processAnimalLocations();

//           if (locations && locations.length > 0) {
//             locations.forEach((location) => {
//               if (location) {
//                 const longitude = parseFloat(location.longitude ?? "0");
//                 const latitude = parseFloat(location.latitude ?? "0");

//                 const popup = new atlas.Popup({
//                   content: `
//                     <div style="padding: 10px;">
//                       <h4>${location.name ?? "Unknown"}</h4>
//                       <p><b>Species:</b> ${location.species ?? "Unknown"}</p>
//                       <p><b>Number:</b> ${location.number ?? "N/A"}</p>
//                       <p><b>Coordinates:</b> (${latitude}, ${longitude})</p>
//                     </div>
//                   `,
//                   pixelOffset: [0, -30],
//                 });

//                 const marker = new atlas.HtmlMarker({
//                   position: [longitude, latitude],
//                   htmlContent: `
//                     <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
//                       <div style="background-color: #0078D4; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-bottom: 6px;">
//                         ${location.name ?? "Unknown"}
//                       </div>
//                       <div style="
//                         width: 16px;
//                         height: 16px;
//                         background-color: red;
//                         border: 2px solid white;
//                         border-radius: 50%;
//                         box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
//                       "></div>
//                     </div>
//                   `,
//                 });

//                 map.events.add("click", marker, () => {
//                   popup.setOptions({
//                     position: [longitude, latitude],
//                   });
//                   popup.open(map);
//                 });

//                 map.markers.add(marker);
//               }
//             });

//             const positions = locations.map((loc) =>
//               loc ? [parseFloat(loc.longitude ?? "0"), parseFloat(loc.latitude ?? "0")] : null
//             ).filter(Boolean) as atlas.data.Position[];

//             if (positions.length > 0) {
//               map.setCamera({
//                 bounds: atlas.data.BoundingBox.fromPositions(positions),
//                 padding: 50,
//               });
//             }
//           }
//         });

//         map.events.add("error", (e) => {
//           setError("Map failed to load. Please check the API key or network connection.");
//           console.error("Map rendering error: ", e);
//         });
//       } catch (err) {
//         setError("An error occurred while initializing the map.");
//         console.error("Map initialization error: ", err);
//       }
//     }

//     return () => {
//       if (mapRef.current) {
//         mapRef.current.dispose();
//       }
//     };
//   }, [apiKey, processAnimalLocations]);

//   return (
//     <div>
//       {error && (
//         <div className="bg-red-200 text-red-700 p-2 rounded-md mb-4">
//           {error}
//         </div>
//       )}
//       <MapControls mapRef={mapRef} />
//       <div
//         ref={divRef}
//         style={{
//           width: "100%",
//           height: "430px",
//           marginTop: "20px",
//           marginLeft: "20px",
//         }}
//         className="bg-gray-200 mapContainer"
//       ></div>
//     </div>
//   );
// };

// export default FilteredMapComponent;

"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import * as atlas from "azure-maps-control";
import MapControls from "./mapControls"; // Import MapControls component

interface BasicMapProps {
  filteredData: any[];
}

const FilteredMapComponent: React.FC<BasicMapProps> = ({ filteredData }) => {
  const mapRef = useRef<atlas.Map | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const [error, setError] = useState<string | null>(null);
  const addedMarkers = useRef<atlas.HtmlMarker[]>([]); // Store markers for cleanup

  const processAnimalLocations = useCallback(() => {
    return filteredData?.map((animal) => {
      const gpsLocations = animal.gps_locations;
      if (gpsLocations?.length) {
        return {
          name: animal.animal_name,
          species: animal.animal_species,
          number: animal.animal_number,
          ...gpsLocations[gpsLocations.length - 1], // Last known location
        };
      }
      return null;
    }).filter(Boolean);
  }, [filteredData]);

  // Initialize map once
  useEffect(() => {
    if (typeof window !== "undefined" && divRef.current && !mapRef.current) {
      try {
        const map = new atlas.Map(divRef.current, {
          authOptions: {
            authType: atlas.AuthenticationType.subscriptionKey,
            subscriptionKey: apiKey!,
          },
          center: [0, 0],
          zoom: 2,
        });

        mapRef.current = map;
        map.events.add("error", (e) => {
          setError("Map failed to load. Please check the API key or network connection.");
          console.error("Map error: ", e);
        });
      } catch (err) {
        setError("An error occurred while initializing the map.");
        console.error("Map initialization error: ", err);
      }
    }
  }, [apiKey]);

  // Update markers when filteredData changes
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Remove old markers
    addedMarkers.current.forEach((marker) => map.markers.remove(marker));
    addedMarkers.current = [];

    const locations = processAnimalLocations();
    if (locations.length > 0) {
      locations.forEach((location) => {
        if (location) {
          const { longitude, latitude, name, species, number } = location;
          const lng = parseFloat(longitude ?? "0");
          const lat = parseFloat(latitude ?? "0");

          const marker = new atlas.HtmlMarker({
            position: [lng, lat],
            htmlContent: `
              <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
                <div style="background-color: #0078D4; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-bottom: 6px;">
                  ${name ?? "Unknown"}
                </div>
                <div style="width: 16px; height: 16px; background-color: red; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);"></div>
              </div>
            `,
          });

          map.markers.add(marker);
          addedMarkers.current.push(marker);
        }
      });

      // Adjust map bounds to fit filtered markers
      const positions = locations.map((loc) => [parseFloat(loc.longitude), parseFloat(loc.latitude)]);
      if (positions.length > 0) {
        map.setCamera({
          bounds: atlas.data.BoundingBox.fromPositions(positions),
          padding: 50,
        });
      }
    }
  }, [filteredData, processAnimalLocations]); // Only update markers when filteredData changes

  return (
    <div>
      {error && <div className="bg-red-200 text-red-700 p-2 rounded-md mb-4">{error}</div>}
      <MapControls mapRef={mapRef} />
      <div ref={divRef} className="bg-gray-200 mapContainer" style={{ width: "100%", height: "430px", marginTop: "20px", marginLeft: "20px" }} />
    </div>
  );
};

export default FilteredMapComponent;
