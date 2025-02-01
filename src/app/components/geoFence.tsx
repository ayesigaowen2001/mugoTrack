
"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import * as atlas from "azure-maps-control";
import * as atlasDrawing from "azure-maps-drawing-tools";
import axios from "axios";
import { AnimalContext } from "./customerResourcesContext";

const Geofence: React.FC = () => {
  const mapRef = useRef<atlas.Map | null>(null);
  const drawingManagerRef = useRef<atlasDrawing.drawing.DrawingManager | null>(null);
  const [drawnShapes, setDrawnShapes] = useState<string | null>(null);
  const [geofenceId, setGeofenceId] = useState<number | null>(null);
  const { userData } = useContext(AnimalContext);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (typeof window !== "undefined" && !mapRef.current) {
      const map = new atlas.Map("myMap", {
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: apiKey!,
        },
        center: [33.8425, 3.7316],
        zoom: 12,
        view: "Auto",
      });

      mapRef.current = map;

      map.events.add("ready", async () => {
        console.log("Map is ready");

        const drawingManager = new atlasDrawing.drawing.DrawingManager(map, {
          toolbar: new atlasDrawing.control.DrawingToolbar({
            position: "top-right",
            style: "light",
          }),
        });
        drawingManagerRef.current = drawingManager;

        await fetchGeofences();
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.dispose();
        mapRef.current = null;
      }
    };
  }, [apiKey]);

  const fetchGeofences = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/geofence/ `, {
        headers: {
          "Content-Type": "application/json",
          token: userData.access_token,
        },
      });
      if ( response.data) {
        console.log("Fetched geofence data:", response.data);

        setGeofenceId(response.data[0].id);
        console.log(response.data[0].id)
        console.log(response.data[0].geometry)
        const source = drawingManagerRef.current?.getSource();
        if (source) {
          source.add({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: response.data[0].geometry, // Ensure this exists
            },
            
          });
        }
      } else {
        alert("No existing geofence found. Please create a new one.");
      }
    } catch (error) {
      console.error("Error fetching geofences:", error);
      alert("Failed to load existing geofences.");
    }
  };

  const getDrawnShapes = () => {
    if (drawingManagerRef.current) {
      const source = drawingManagerRef.current.getSource();
      const shapesJSON = JSON.stringify(source.toJson(), null, 2);
      setDrawnShapes(shapesJSON);
      console.log("Drawn shapes retrieved:", shapesJSON);
    } else {
      console.error("Drawing manager not initialized");
    }
  };

  const transformShapes = () => {
    if (!drawnShapes) {
      console.error("No shapes to transform");
      return [];
    }

    try {
      const geoJSON = JSON.parse(drawnShapes);
      if (geoJSON.type !== "FeatureCollection" || !geoJSON.features) {
        console.error("Invalid GeoJSON format");
        return [];
      }

      return geoJSON.features.map((feature: any) => ({
        name: feature.id || "Unnamed Geofence",
        description: "Geofence drawn on the map",
        geometry: feature.geometry.coordinates,
        
      }));
      
    } catch (error) {
      console.error("Error parsing GeoJSON:", error);
      return [];
    }
  };

  const updateGeofence = async () => {
    if (!geofenceId) {
      alert("No geofence ID found. Cannot update.");
      return;
    }

    const geofences = transformShapes();

    if (geofences.length === 0) {
      alert("No valid geofences to post.");
      return;
    }

    if (!userData?.access_token) {
      alert("User is not authenticated. Missing access token.");
      return;
    }
    console.log("Updated Geofence Data:", geofences[0]);
    try {
      const response = await axios.put(`${API_BASE_URL}/geofence/${geofenceId}`, geofences[0], {
        headers: {
          "Content-Type": "application/json",
          token: userData.access_token,
        },
      });

      console.log("Geofence successfully updated:", response.data);
      alert("Geofence successfully updated!");
    } catch (error: any) {
      console.error("Error updating geofences:", error);
      alert("Failed to update geofences.");
    }
  };

  return (
    <div className="flex">
      <div className="p-4 w-1/3 bg-gray-100 h-[600px] overflow-y-auto">
        <fieldset className="mb-4 border rounded p-4">
          <legend className="font-bold">Geofence Actions</legend>
          This tool retrieves existing geofences, allows editing, and posts updates.
        </fieldset>
        <button
          onClick={getDrawnShapes}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-4"
        >
          Get Edited Geofence
        </button>
        <button
          onClick={updateGeofence}
          className="bg-green-500 text-white px-4 py-2 rounded-md w-full mb-4"
        >
          Save Updated Geofence
        </button>
        <textarea
          className="w-full h-64 p-2 border rounded-md"
          readOnly
          value={drawnShapes || "No geofence data loaded yet."}
          aria-label="Geofences"
        />
      </div>
      <div id="myMap" className="w-2/3 h-[600px] bg-gray-300"></div>
    </div>
  );
};

export default Geofence;
