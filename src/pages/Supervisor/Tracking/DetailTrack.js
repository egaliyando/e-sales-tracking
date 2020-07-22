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

//list apotik
const list = [
  {
    id: 1,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 2,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 3,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 4,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 5,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 6,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 7,
    apotik: "Apotik",
    address: "Address",
  },
];

//componrnt tab
const tabItems = [
  {
    id: 1,
    title: "Tracking",
    content: <Tracking />,
  },
  {
    id: 2,
    title: "History",
    content: <History />,
  },
];
const TabItemComponent = ({
  title = "",
  onItemClicked = () => console.error("You passed no action to the component"),
}) => {
  return (
    <div onClick={onItemClicked}>
      <p>{title}</p>
    </div>
  );
};
//componrnt tab

function Tracking() {
  //map
  const [markerPosition, setMarkerPosition] = useState({
    lat: -5.45,
    lng: 105.26667,
  });
  //map
  return (
    <>
      <div className="bg-white rounded-lg grid grid-cols-2 gap-5 justify-between mt-3 p-3">
        <div>
          <p className="font-bold text-gray-600 text-lg">Budi</p>
          <p className="text-gray-600 tex-md">0876767688</p>
          <p className="text-green-400">Active</p>
        </div>
        <div>
          <p className="font-bold text-gray-600 text-lg">Detail Address</p>
          <p className="text-gray-600 tex-md">Jl. Abdul Muis no 06 </p>
        </div>
      </div>
      <div style={{ height: "21rem" }} className="rounded-lg w-full bg-gray-500 mt-2">
        <Map markerPosition={markerPosition} />
      </div>
    </>
  );
}
function History() {
  return (
    <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
      {list.map((item) => (
        <Link to="/supervisor/sales-track/detail/detail-history">
          <div className="mt-2" key={list.id}>
            <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
              <div className="flex">
                <img src={require(`assets/image/apotek.png`)} alt="img" />
                <div className="ml-3">
                  <p className="font-bold text-gray-600">{item.apotik}</p>
                  <p className="text-xs text-gray-600">{item.address}</p>
                </div>
              </div>
              <button className="mr-3 focus:outline-none">
                <img src={require(`assets/icons/card/ic_arrow.svg`)} alt="img" />
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function DetailTrack() {
  const [active, setActive] = useState(0);

  return (
    <Container>
      <Header hSupervisor={true} />

      <div className="h-auto p-3">
        <div className="bg-white rounded-lg flex h-auto justify-around text-sm p-2 font-bold text-gray-500">
          {tabItems.map(({ id, title }) => (
            <TabItemComponent key={title} title={title} onItemClicked={() => setActive(id)} isActive={active === id} />
          ))}
        </div>
        {tabItems.map(({ id, content }) => {
          return active === id ? content : "";
        })}
      </div>

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSupervisor={true} />
      </div>
    </Container>
  );
}

export default DetailTrack;
