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
          <Marker position={[data[0], data[1]]} icon={iconSales} key={i}>
            <Popup>
              <div style={{ width: 200, height: 200 }} className="overflow-y-scroll">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-gray-500">NIK</span> <br />
                    <span className="text-sm">124343</span>
                    <br />
                    <span className="text-xs text-gray-500">Nama Sales</span>
                    <br />
                    <span className="text-sm">Budi Sales</span>
                    <br />
                    <span className="text-xs text-gray-500">No HP</span>
                    <br />
                    <span className="text-sm">0988788878</span>
                  </div>
                  <div className="w-16 h-16 pb-5 ml-5">
                    <img className="m-auto" src={require(`assets/image/sales.png`)} alt="sales" />
                  </div>
                </div>
                <br />
                <br />
                <div>
                  <span className="text-sm">{data[2]}</span> <br /> {data[3]}
                </div>
                <br />
                <span>Dikunjungi : 12/12/20</span>
                <br /> <p className="text-md text-green-500">Status : Telah Dikunjungi</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </Map>
  );
}
