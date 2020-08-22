import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { iconSales, iconApotik } from "components/MapComponent/IconMarker";
import axios from "configs";

export default function MapsHook(props) {
  const [arrayTest, setArrayTest] = useState([]);
  const dataMaps = {
    dataApotik: [],
    lat: -5.45,
    lng: 105.26667,
    zoom: 12,
  };
  const position = [dataMaps.lat, dataMaps.lng];

  const getData = () => {
    const token = localStorage.token;
    axios
      .get(`/apotik`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let arrayTemp = [...arrayTest];
        for (let i = 0; i < res.data.data.data.length; i++) {
          arrayTemp.push([
            parseFloat(res.data.data.data[i].lat),
            parseFloat(res.data.data.data[i].long),
            res.data.data.data[i].name,
            res.data.data.data[i].address,
          ]);
        }

        setArrayTest(arrayTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Map style={{ width: "100%", height: "100%" }} center={position} zoom={dataMaps.zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {arrayTest.map((data, i) => {
        return (
          <Marker position={[data[0], data[1]]} icon={iconApotik} key={i}>
            <Popup>
              <span className="text-xl">{data[2]}</span> <br /> {data[3]}
            </Popup>
          </Marker>
        );
      })}
    </Map>
  );
}
