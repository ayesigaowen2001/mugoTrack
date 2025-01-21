"use client";

import React, { useEffect, useRef, useState } from "react";
import * as atlas from "azure-maps-control";
import * as atlasDrawing from "azure-maps-drawing-tools";

const Geofence: React.FC = () => {
  const mapRef = useRef<atlas.Map | null>(null);
  const drawingManagerRef = useRef<atlasDrawing.drawing.DrawingManager | null>(null);
  const [drawnShapes, setDrawnShapes] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    if (typeof window !== "undefined" && !mapRef.current) {
      // Initialize the map
      const map = new atlas.Map("myMap", {
        authOptions: {
          authType: atlas.AuthenticationType.subscriptionKey,
          subscriptionKey: apiKey!,
        },
        center: [-122.33, 47.6],
        zoom: 12,
        view: "Auto",
      });

      mapRef.current = map;

      // Wait for the map resources to load
      map.events.add("ready", () => {
        console.log("Map is ready");

        // Initialize the Drawing Manager
        const drawingManager = new atlasDrawing.drawing.DrawingManager(map, {
          toolbar: new atlasDrawing.control.DrawingToolbar({
            position: "top-right",
            style: "light",
          }),
        });
        drawingManagerRef.current = drawingManager;
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.dispose();
        mapRef.current = null;
      }
    };
  }, [apiKey]);

  const getDrawnShapes = () => {
    if (drawingManagerRef.current) {
      const source = drawingManagerRef.current.getSource();
      const shapesJSON = JSON.stringify(source.toJson(), null, 2); // Get shapes as JSON
      setDrawnShapes(shapesJSON);
    } else {
      console.error("Drawing manager not initialized");
    }
  };

  return (
    <div className="flex">
      {/* Side Panel */}
      <div className="p-4 w-1/3 bg-gray-100 h-[600px] overflow-y-auto">
        <fieldset className="mb-4 border rounded p-4">
          <legend className="font-bold">Get Drawn Shapes</legend>
          This tool retrieves shapes drawn on the map and displays them as JSON.
        </fieldset>
        <button
          onClick={getDrawnShapes}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-4"
        >
          Get Drawn Shapes
        </button>
        <textarea
          className="w-full h-64 p-2 border rounded-md"
          readOnly
          value={drawnShapes || "No shapes drawn yet."}
        />
      </div>

      {/* Map Container */}
      <div id="myMap" className="w-2/3 h-[600px] bg-gray-300"></div>
    </div>
  );
};

export default Geofence;
