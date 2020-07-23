import React, { useEffect, useRef } from "react";
import L from "leaflet";

const style = {
  width: "100%",
  height: "32rem",
};

function Map({ markerPosition }) {
  // create map
  const mapRef = useRef(null);
  useEffect(() => {
    mapRef.current = L.map("map", {
      center: [-5.45, 105.26667],
      zoom: 16,
      layers: [
        L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        }),
      ],
    });
  }, []);

  // add marker
  const markerRef = useRef(null);
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLatLng(markerPosition);
    } else {
      markerRef.current = L.marker(markerPosition).addTo(mapRef.current);
    }
  }, [markerPosition]);

  return <div id="map" style={style} />;
}

export default Map;
