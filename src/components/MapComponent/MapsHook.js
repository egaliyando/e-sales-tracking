import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { iconSales, iconApotik } from "components/MapComponent/IconMarker";
import axios from "configs";
import moment from "moment";

export default function MapsHook(props) {
  const today = new Date();
  const todayFormat = moment(today).format("DD-MM-YYYY");
  console.log("todayFormat", todayFormat);
  const [tripDone, setTripDone] = useState([]);
  console.log("tripDone", tripDone);
  const [trip, settrip] = useState([]);
  console.log("trip", trip);
  const dataMaps = {
    dataApotik: [],
    lat: -5.45,
    lng: 105.26667,
    zoom: 12,
    radius: 50,
  };
  const position = [dataMaps.lat, dataMaps.lng];

  const getTrip = () => {
    const token = localStorage.token;
    axios
      .get(`/supervisor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let arr = [...trip];
        for (let i = 0; i < res.data.data.length; i++) {
          arr.push([
            res.data.data[i].id,
            res.data.data[i].name_apotik,
            moment(res.data.data[i].day).format("DD-MM-YYYY"),
            res.data.data[i].address_apotik,
            res.data.data[i].image,
            res.data.data[i].sales_id,
            parseFloat(res.data.data[i].lat_apotik),
            parseFloat(res.data.data[i].long_apotik),
          ]);
        }
        settrip(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDashboard = () => {
    const token = localStorage.token;
    axios
      .get(`/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let arrayTrip = [...tripDone];
        for (let i = 0; i < res.data.trip_to_sales_done.length; i++) {
          arrayTrip.push([
            res.data.trip_to_sales_done[i].sale.user.nik,
            res.data.trip_to_sales_done[i].sale.fullname,
            res.data.trip_to_sales_done[i].sale.image,
            res.data.trip_to_sales_done[i].sale.user.username,
            res.data.trip_to_sales_done[i].apotik.name,
            res.data.trip_to_sales_done[i].apotik.address,
            parseFloat(res.data.trip_to_sales_done[i].apotik.lat),
            parseFloat(res.data.trip_to_sales_done[i].apotik.long),
            moment(res.data.trip_to_sales_done[i].updatedAt).format("LLLL"),
            res.data.trip_to_sales_done[i].apotik.image,
            moment(res.data.trip_to_sales_done[i].createdAt).format("DD-MM-YYYY"),
          ]);
        }
        setTripDone(arrayTrip);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDashboard();
    getTrip();
  }, []);

  return (
    <Map style={{ width: "100%", height: "100%" }} center={position} zoom={dataMaps.zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {tripDone
        .filter((days) => days.includes(todayFormat))
        .map((data, i) => {
          return (
            <Marker position={[data[6], data[7]]} icon={iconSales} key={i}>
              <Popup>
                <div style={{ width: 200, height: 200 }} className="overflow-y-scroll">
                  <div className="grid grid-cols-2 gap-2 p-2 shadow-lg rounded-lg">
                    <div>
                      <span className="text-xs text-gray-500">NIK</span> <br />
                      <span className="text-sm">{[data[0]]}</span>
                      <br />
                      <span className="text-xs text-gray-500">Sales</span>
                      <br />
                      <span className="text-sm">{[data[1]]}</span>
                      <br />
                      <span className="text-xs text-gray-500">Handphone</span>
                      <br />
                      <span className="text-sm">{[data[3]]}</span>
                    </div>
                    <div className="w-16 h-16 pb-5 ml-5">
                      <img className="h-12 w-12" src={`${process.env.REACT_APP_HOST_HEROKU}${[data[2]]}`} alt="img" />
                    </div>
                  </div>
                  <br />
                  <div className="p-2 rounded-lg">
                    <img
                      className="h-12 w-12 mb-3"
                      src={`${process.env.REACT_APP_HOST_HEROKU}${[data[9]]}`}
                      alt="img"
                    />
                    <div>
                      <span className="text-sm"> {data[4]}</span> <br /> Address : {data[5]}
                    </div>
                    <br />
                    <span className="text-md text-green-500">Status : Telah dikunjungi</span> <br />
                    <span>Visited at : {data[8]}</span>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      {trip
        .filter((days) => days.includes(todayFormat))
        .map((data, i) => {
          return (
            <Marker position={[data[6], data[7]]} icon={iconApotik} key={i}>
              <Popup>
                <div style={{ width: 200, height: 160 }} className="overflow-y-scroll">
                  <div className="w-12 h-12 bg-blue-200 mb-3">
                    <img className="h-12 w-12" src={`${process.env.REACT_APP_HOST_HEROKU}${[data[4]]}`} alt="img" />
                  </div>
                  <span className="text-xs"> {data[1]}</span> <br /> Address : {data[3]} <br />
                  <span className="text-md text-red-500">Status : Not Visited</span> <br />
                </div>
              </Popup>
            </Marker>
          );
        })}
    </Map>
  );
}
