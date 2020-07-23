import React, { useState, useEffect, useRef } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";
import L from "leaflet";

const style = {
  width: "100%",
  height: "100%",
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

function Dashboard() {
  //map
  const [markerPosition, setMarkerPosition] = useState({
    lat: -5.45,
    lng: 105.26667,
  });
  //map
  return (
    <Container>
      <Header hSupervisor={true} />

      <div className="absolute z-0 w-full h-screen">
        <Map markerPosition={markerPosition} />
      </div>

      <Link to="/supervisor/chat" className="absolute bottom-0 right-0 z-20 mb-16 focus:outline-none">
        <img src={require(`assets/icons/dashboard/ic_chat.svg`)} alt="chat" />
      </Link>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white z-20 bottom-0 max-w-md">
        <MobileNav isSupervisor={true} />
      </div>
    </Container>
  );
}

export default Dashboard;
