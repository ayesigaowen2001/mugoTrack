"use client";

import React, { useEffect, useRef, useState } from "react";
import * as atlas from "azure-maps-control";

interface RouteMapProps {
  gpsData: {
    timestamp: string;
    latitude: string;
    longitude: string;
    animal_number: string;
  }[];
}

const RouteMap: React.FC<RouteMapProps> = ({ gpsData }) => {
    const mapRef = useRef<atlas.Map | null>(null);
    const divRef = useRef<HTMLDivElement | null>(null);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (!apiKey) {
        setError("API key is missing. Please check your environment variables.");
        return;
      }
  
      if (typeof window !== "undefined" && divRef.current && !mapRef.current) {
        try {
          const map = new atlas.Map(divRef.current, {
            authOptions: {
              authType: atlas.AuthenticationType.subscriptionKey,
              subscriptionKey: apiKey,
            },
            center: [33.8425, 3.7316],
            zoom: 10,
          });
  
          mapRef.current = map;
  
          map.events.add("ready", () => {
            if (gpsData.length > 0) {
              const positions = gpsData.map((point) => [
                parseFloat(point.longitude),
                parseFloat(point.latitude),
              ]);
  
              const line = new atlas.data.LineString(positions);
  
              const lineSource = new atlas.source.DataSource();
              map.sources.add(lineSource);
              lineSource.add(new atlas.data.Feature(line));
  
              const lineLayer = new atlas.layer.LineLayer(lineSource,  undefined, {
                strokeColor: "blue",
                strokeWidth: 4,
              });
  
              map.layers.add(lineLayer);
  
              const marker = new atlas.HtmlMarker({
                position: positions[0],
                htmlContent: `<div class="marker-style"></div>`,
              });
              map.markers.add(marker);
  
              let index = 0;
  
              const animateMarker = () => {
                if (index < positions.length) {
                  marker.setOptions({
                    position: positions[index],
                  });
  
                  map.setCamera({
                    center: positions[index],
                  });
  
                  index++;
                  requestAnimationFrame(animateMarker);
                }
              };
  
              animateMarker();
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
    }, [apiKey, gpsData]);
  
    return (
      <div>
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
          }}
          className="bg-gray-200 mapContainer"
        ></div>
      </div>
    );
  };
  
  export default RouteMap;