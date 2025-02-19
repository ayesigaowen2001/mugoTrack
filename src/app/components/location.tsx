"use client";

import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import * as atlas from "azure-maps-control";
import MapControls from "./mapControls"; // Import the MapControls component
import { AnimalContext, AnimalContextType } from "./customerResourcesContext";

const BasicMapComponent: React.FC = () => {
  const mapRef = useRef<atlas.Map | null>(null);
  const divRef = useRef<HTMLDivElement | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const { animalData } = useContext<AnimalContextType>(AnimalContext);
  const [error, setError] = useState<string | null>(null);

  const getLastGpsLocations = useCallback(() => {
    const animals = Array.isArray(animalData?.resources?.animals.data)
      ? animalData.resources.animals.data
      : [];
    return animals
      ?.map((animal) => {
        const gpsLocations = animal.gps_locations;
        if (gpsLocations && gpsLocations.length > 0) {
          return {
            name: animal.animal_name,
            species: animal.animal_species,
            number: animal.animal_number,
            ...gpsLocations[gpsLocations.length - 1], // Last GPS location
          };
        }
        return null;
      })
      .filter(Boolean);
  }, [animalData]);

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

        map.events.add("ready", () => {
          console.log("Map is ready");

          const lastGpsLocations = getLastGpsLocations();
          if (lastGpsLocations && lastGpsLocations.length > 0) {
            lastGpsLocations.forEach((location) => {
              if (location) {
                const longitude = parseFloat(location.longitude ?? "0");
                const latitude = parseFloat(location.latitude ?? "0");

                // Create a popup for each marker
                const popup = new atlas.Popup({
                  content: `
                    <div style="padding: 10px;">
                      <h4>${location.name ?? "Unknown"}</h4>
                      <p><b>Species:</b> ${location.species ?? "Unknown"}</p>
                      <p><b>Number:</b> ${location.number ?? "N/A"}</p>
                      <p><b>Coordinates:</b> (${latitude}, ${longitude})</p>
                    </div>
                  `,
                  pixelOffset: [0, -30], // Offset the popup to appear above the marker
                });

                // Create an HTML marker with a consistent style and a label above it
                const marker = new atlas.HtmlMarker({
                  position: [longitude, latitude],
                  htmlContent: `
                    <div style="position: relative; display: flex; flex-direction: column; align-items: center;">
                      <!-- Name Label -->
                      <div style="background-color: #0078D4; color: #fff; padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-bottom: 6px;">
                        ${location.name ?? "Unknown"}
                      </div>
                      <!-- Circular Marker -->
                      <div style="
                        width: 16px;
                        height: 16px;
                        background-color: red;
                        border: 2px solid white;
                        border-radius: 50%;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                      "></div>
                    </div>
                  `,
                });

                // Add a click event listener to the marker to show the popup
                map.events.add("click", marker, () => {
                  popup.setOptions({
                    position: [longitude, latitude],
                  });
                  popup.open(map);
                });

                map.markers.add(marker);
              }
            });

            // Center map around the markers
            const positions = lastGpsLocations
              .map((loc) =>
                loc
                  ? [
                      parseFloat(loc.longitude ?? "0"),
                      parseFloat(loc.latitude ?? "0"),
                    ]
                  : null
              )
              .filter(Boolean) as atlas.data.Position[];

            if (positions.length > 0) {
              map.setCamera({
                bounds: atlas.data.BoundingBox.fromPositions(positions),
                padding: 50,
              });
            }
          }
        });

        map.events.add("error", (e) => {
          setError(
            "Map failed to load. Please check the API key or network connection."
          );
          console.error("Map rendering error: ", e);
        });
      } catch (err) {
        setError("An error occurred while initializing the map.");
        console.error("Map initialization error: ", err);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.dispose();
        mapRef.current = null;
      }
    };
  }, [apiKey, animalData, getLastGpsLocations]);

  return (
    <div>
      {error && (
        <div className="bg-red-200 text-red-700 p-2 rounded-md mb-4">
          {error}
        </div>
      )}
      <MapControls mapRef={mapRef} />
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
