"use client";

import React from "react";
import * as atlas from "azure-maps-control";

interface MapControlsProps {
  mapRef: React.MutableRefObject<atlas.Map | null>;
}

const MapControls: React.FC<MapControlsProps> = ({ mapRef }) => {
  const zoomMap = (offset: number) => {
    const map = mapRef.current;
    if (map) {
      const cam = map.getCamera();
      const zoom = cam.zoom ?? 0; // Use 0 if zoom is undefined
      const minZoom = cam.minZoom ?? 0; // Use 0 if minZoom is undefined
      const maxZoom = cam.maxZoom ?? 22; // Use 22 (a typical max zoom level) if maxZoom is undefined

      map.setCamera({
        zoom: Math.max(minZoom, Math.min(maxZoom, zoom + offset)),
        type: "ease",
        duration: 250,
      });
    }
  };

  const pitchMap = (offset: number) => {
    const pitchStep = 10; // Degrees per step
    const map = mapRef.current;
    if (map) {
      const cam = map.getCamera();
      const pitch = cam.pitch ?? 0; // Use 0 if pitch is undefined

      map.setCamera({
        pitch: Math.max(0, Math.min(60, pitch + offset * pitchStep)),
        type: "ease",
        duration: 250,
      });
    }
  };

  const rotateMap = (offset: number) => {
    const bearingStep = 15; // Degrees per step
    const map = mapRef.current;
    if (map) {
      const cam = map.getCamera();
      const bearing = cam.bearing ?? 0; // Use 0 if bearing is undefined

      map.setCamera({
        bearing: bearing + offset * bearingStep,
        type: "ease",
        duration: 250,
      });
    }
  };

  const mapStyleChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const map = mapRef.current;
    if (map) {
      map.setStyle({ style: event.target.value });
    }
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 controlContainer">
      <button
        className="navButton"
        onClick={() => zoomMap(1)}
        title="Zoom In"
      >
        +
      </button>
      <button
        className="navButton"
        onClick={() => zoomMap(-1)}
        title="Zoom Out"
      >
        ⚊
      </button>
      <button
        className="navButton"
        onClick={() => pitchMap(-1)}
        title="Decrease Pitch"
      >
        🠗
      </button>
      <button
        className="navButton"
        onClick={() => pitchMap(1)}
        title="Increase Pitch"
      >
        🠕
      </button>
      <button
        className="navButton"
        onClick={() => rotateMap(-1)}
        title="Rotate Left"
      >
        ⟲
      </button>
      <button
        className="navButton"
        onClick={() => rotateMap(1)}
        title="Rotate Right"
      >
        ⟳
      </button>
      <select
        className="navButton navSelect"
        onChange={mapStyleChanged}
        title="Map Style"
      >
        <option value="road" defaultValue="road">
          Road
        </option>
        <option value="grayscale_dark">Dark Grayscale</option>
        <option value="grayscale_light">Light Grayscale</option>
        <option value="night">Night</option>
        <option value="satellite">Satellite</option>
        <option value="satellite_road_labels">Hybrid</option>
      </select>
    </div>
  );
};

export default MapControls;
