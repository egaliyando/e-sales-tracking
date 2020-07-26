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

const list = [
  {
    id: 1,
    name: "Apotik Persada",
    address: "Jl. Z.A Pagaralam",
  },
  {
    id: 2,
    name: "Apotik Rossa",
    address: "Jl. Z.A Pagaralam",
  },
  {
    id: 3,
    name: "Apotik Mawar",
    address: "Jl. Z.A Pagaralam",
  },
  {
    id: 4,
    name: "Apotik Melati",
    address: "Jl. Z.A Pagaralam",
  },
];

function History(props) {
  //map
  const [markerPosition, setMarkerPosition] = useState({
    lat: -5.45,
    lng: 105.26667,
  });
  //map
  return (
    <Container>
      <Header hSalesNormal={true} />

      <div style={{ paddingTop: "4.6rem" }} className="p-3">
        <p className="text-gray-600">History kunjungan</p>
        {/* MAPS History */}
        <div className="w-full h-64 bg-gray-400 mt-3 rounded-md">
          <Map markerPosition={markerPosition} {...props} />
        </div>
        <div className="overflow-y-auto h-64 pb-12">
          {list.map((item) => (
            <Link to="/sales/history/detail">
              <div className="mt-2" key={item.id}>
                <div className="w-full p-2 rounded-lg bg-white h-auto flex">
                  <img src={require(`assets/image/apotek.png`)} alt="img" />
                  <div className="ml-3">
                    <p className="font-bold text-gray-600">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.address}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default History;
