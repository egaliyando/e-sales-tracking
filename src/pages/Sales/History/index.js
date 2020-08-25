import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";
import axios from "configs";
import moment from "moment"

//maps
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { iconSales, iconApotik } from "components/MapComponent/IconMarker";

function History(props) {
  //maps component
  //deklarasi state tagging sales history
  const [arrayTag, setArrayTag] = useState([]);
  //deklarasi data tagging all trip/apotik
  const [dataApotik, setDataApotik] = useState([]);

  const dataMaps = {
    dataApotik: [],
    lat: -5.4,
    lng: 105.26667,
    zoom: 13,
    radius: 50,
  };
  const position = [dataMaps.lat, dataMaps.lng];
  //maps component

  //deklarasi state list history
  const [listHistory, setListHistory] = useState([]);

  //deklarasi id sales dari local storage
  const sales_id = localStorage.sales_id;

  //get all apotik or trip
  const getData = () => {
    const token = localStorage.token;
    axios
      .get(`/sales/trip-single-sales/${sales_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let arrayTemp = [...dataApotik];
        for (let i = 0; i < res.data.data.length; i++) {
          arrayTemp.push([
            parseFloat(res.data.data[i].trip.apotik.lat),
            parseFloat(res.data.data[i].trip.apotik.long),
            res.data.data[i].trip.apotik.name,
            res.data.data[i].trip.apotik.address,
          ]);
        }

        setDataApotik(arrayTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //get data history
  const getHistory = () => {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;
    axios
      .get(`/supervisor/tracking-sales/${sales_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let Arrays = [...listHistory];
        let TagMap = [...arrayTag];
        for (let i = 0; i < res.data.tracking.length; i++) {
          Arrays.push(res.data.tracking[i].apotik);
          TagMap.push([
            parseFloat(res.data.tracking[i].apotik.lat),
            parseFloat(res.data.tracking[i].apotik.long),
            res.data.tracking[i].apotik.name,
            res.data.tracking[i].apotik.address,
          ]);
        }
        //list history
        setListHistory(Arrays);
        //tag map
        setArrayTag(TagMap);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    getHistory();
  }, []);
  return (
    <Container>
      <Header hSalesNormal={true} />

      <div style={{ paddingTop: "4.6rem" }} className="p-3">
        <p className="text-gray-600 font-bold">History kunjungan</p>
        {/* MAPS History */}
        <div className="w-full h-64 bg-gray-400 mt-3 rounded-md">
          <Map style={{ width: "100%", height: "100%" }} center={position} zoom={dataMaps.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {dataApotik.map((data, i) => {
              return (
                <Marker position={[data[0], data[1]]} icon={iconApotik} key={i}>
                  <Popup>
                    <span className="text-xl">{data[2]}</span> <br /> {data[3]}
                    <br /> <p className="text-md">Status : Belum Dikunjungi</p>
                  </Popup>
                  <Circle center={[data[0], data[1]]} fillColor="blue" radius={dataMaps.radius} />
                </Marker>
              );
            })}
            {arrayTag.map((data, i) => {
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
                  <Circle center={[data[0], data[1]]} fillColor="blue" radius={dataMaps.radius} />
                </Marker>
              );
            })}
          </Map>
        </div>
        <div className="overflow-y-auto h-64 pb-12">
          {listHistory.map((item, i) => (
            <Link to={`/sales/history/detail/${sales_id}`} key={i}>
              <div className="mt-2">
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
