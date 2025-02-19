"use client";

import React, { useEffect, useRef, useState } from "react";
import * as atlas from "azure-maps-control";

interface RouteMapProps {
  geoData: {
    timestamp: string;
    latitude: string;
    longitude: string;
    animal_number: string;
  }[];
}

const GeoStatus: React.FC<RouteMapProps> = ({ geoData }) => {
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
          if (geoData.length > 0) {
            const positions = geoData.map((point) => [
              parseFloat(point.longitude),
              parseFloat(point.latitude),
            ]);

            const line = new atlas.data.LineString(positions);

            const lineSource = new atlas.source.DataSource();
            map.sources.add(lineSource);
            lineSource.add(new atlas.data.Feature(line));

            const lineLayer = new atlas.layer.LineLayer(lineSource, undefined, {
              strokeColor: "red",
              strokeWidth: 4,
            });

            map.layers.add(lineLayer);

            // Arrow marker
            const marker = new atlas.HtmlMarker({
              position: positions[0],
              htmlContent: `
                <div style="transform: rotate(0deg); font-size: 24px;">➤</div>
              `,
            });
            map.markers.add(marker);

            // Animate the marker along the path
            const animateMarker = (index: number) => {
              if (index < positions.length) {
                const nextIndex = index + 1;
                if (nextIndex < positions.length) {
                  const currentPos = positions[index];
                  const nextPos = positions[nextIndex];
                  const rotation = calculateRotation(currentPos, nextPos);

                  marker.setOptions({
                    position: nextPos,
                    htmlContent: `
                      <div style="transform: rotate(${rotation}deg); font-size: 24px;">➤</div>
                    `,
                  });

                  map.setCamera({
                    center: nextPos,
                    zoom: 12,
                  });

                  setTimeout(() => {
                    animateMarker(nextIndex);
                  }, 500); // Adjust the speed here
                }
              }
            };

            animateMarker(0); // Start the animation
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
  }, [apiKey, geoData]);

  const calculateRotation = (
    [lng1, lat1]: number[],
    [lng2, lat2]: number[]
  ) => {
    const dx = lng2 - lng1;
    const dy = lat2 - lat1;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

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

export default GeoStatus;
