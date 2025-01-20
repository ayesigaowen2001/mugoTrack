"use client";

import React, { useEffect } from "react";
import * as atlasDrawing from "azure-maps-drawing-tools";
import * as atlas from "azure-maps-control";
import { toFormData } from "axios";

interface DrawingToolbarProps {
  map: atlas.Map | null;
  drawingManager: atlasDrawing.drawing.DrawingManager | null;
}

const DrawingToolbar: React.FC<DrawingToolbarProps> = ({ map, drawingManager }) => {
  useEffect(() => {
    if (map && drawingManager) {
      // Add the Drawing Toolbar via the DrawingManager
      const toolbar = new atlasDrawing.control.DrawingToolbar({
        position: "top-right",
        style: "dark",
        visible: true,
      });toolbar.onAdd

      // drawingManager.setOptions.(toolbar);

      // Cleanup toolbar when component unmounts
      return () => {
        // drawingManager.(toolbar);
      };
    }
  }, [map, drawingManager]);

  return null; // This component does not render any visible DOM elements
};

export default DrawingToolbar;
