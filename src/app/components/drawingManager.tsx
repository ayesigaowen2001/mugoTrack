"use client";

import React, { useEffect } from "react";
import * as atlas from "azure-maps-control";
import * as atlasDrawing from "azure-maps-drawing-tools";

interface DrawingManagerProps {
  map: atlas.Map | null;
  onDrawingManagerReady: (drawingManager:  atlasDrawing.drawing.DrawingManager) => void;
}

export const DrawingManager: React.FC<DrawingManagerProps> = ({ map, onDrawingManagerReady }) => {
  useEffect(() => {
    if (map) {
      // Initialize the Drawing Manager
      const drawingManager = new atlasDrawing.drawing.DrawingManager(map);

      // Pass the initialized Drawing Manager to the parent component
      onDrawingManagerReady(drawingManager);

      // No cleanup needed for Drawing Manager as it attaches to the map directly
    }
  }, [map, onDrawingManagerReady]);

  return null; // This component does not render any visible DOM elements
};

