import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import axios from "configs";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//maps
import { Map, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { iconSales, iconApotik } from "components/MapComponent/IconMarker";
import DatePicker from "react-datepicker";

function History(props) {
  const token = useSelector((state) => state.users.token);
  //maps component
  //deklarasi state tagging sales history
  const [arrayTag, setArrayTag] = useState([]);
  console.log("arrayTag");
  console.log(arrayTag);
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
  console.log("listHistory");
  console.log(listHistory);

  //deklarasi id sales dari local storage
  const sales_id = localStorage.sales_id;

  const { id } = props.match.params;

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
            res.data.data[i].trip.apotik.image,
            res.data.tracking[i].updatedAt,
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
        console.log("res kuyyy");
        console.log(res);
        let Arrays = [...listHistory];
        let TagMap = [...arrayTag];
        for (let i = 0; i < res.data.tracking.length; i++) {
          Arrays.push([
            res.data.tracking[i].apotik.name,
            res.data.tracking[i].apotik.address,
            res.data.tracking[i].id,
            res.data.tracking[i].apotik.image,
            moment(res.data.tracking[i].createdAt).format("DD-MM-YYYY"),
            moment(res.data.tracking[i].createdAt).format("LLLL"),
          ]);
          TagMap.push([
            parseFloat(res.data.tracking[i].apotik.lat),
            parseFloat(res.data.tracking[i].apotik.long),
            res.data.tracking[i].apotik.name,
            res.data.tracking[i].apotik.address,
            res.data.tracking[i].apotik.image,
            moment(res.data.tracking[i].createdAt).format("DD-MM-YYYY"),
            moment(res.data.tracking[i].createdAt).format("LLLL"),
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
  const [day, setDay] = useState(new Date());
  //untuk cek today
  const dates = new Date();
  //ubah format tanggalnya
  const dateFormat = moment(day).format("DD-MM-YYYY");

  //CHANGE DAY
  const handleDay = (date) => {
    setDay(date);
  };

  useEffect(() => {
    getData();
    getHistory();
  }, []);
  if (token === "") {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <Header hSalesNormal={true} />

      <div className="px-3 pt-10">
        <p className="text-gray-600 font-bold">History kunjungan</p>
        {/* MAPS History */}
        <div className="w-full h-64 bg-gray-400 mt-3 rounded-md">
          <Map style={{ width: "100%", height: "100%" }} center={position} zoom={dataMaps.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {dataApotik
              .filter((days) => days.includes(dateFormat))
              .map((data, i) => {
                return (
                  <Marker position={[data[0], data[1]]} icon={iconApotik} key={i}>
                    <Popup>
                      <img
                        className="h-12 w-12 mb-3"
                        src={`${process.env.REACT_APP_HOST_HEROKU}${[data[4]]}`}
                        alt="img"
                      />
                      <span className="text-xl">{data[2]}</span> <br /> {data[3]}
                      <br /> <p className="text-md">Status : Belum Dikunjungi</p>
                    </Popup>
                    <Circle center={[data[0], data[1]]} fillColor="blue" radius={dataMaps.radius} />
                  </Marker>
                );
              })}
            {arrayTag
              .filter((days) => days.includes(dateFormat))
              .map((data, i) => {
                return (
                  <Marker position={[data[0], data[1]]} icon={iconSales} key={i}>
                    <Popup>
                      <div style={{ width: 200, height: 160 }} className="overflow-y-scroll">
                        <img
                          className="h-12 w-12 mb-3"
                          src={`${process.env.REACT_APP_HOST_HEROKU}${[data[4]]}`}
                          alt="img"
                        />
                        <span className="text-sm">{data[2]}</span> <br /> {data[3]}
                        <br />
                        <br />
                        <span>Visited at : {data[6]}</span>
                        <br /> <span className="text-md text-green-500">Status : Telah Dikunjungi</span>
                      </div>
                    </Popup>
                    <Circle center={[data[0], data[1]]} fillColor="blue" radius={dataMaps.radius} />
                  </Marker>
                );
              })}
          </Map>
        </div>
        <div className="overflow-y-auto h-64 pb-12">
          <DatePicker
            className="bg-white mt-2 w-full self-center p-2 rounded-lg border border-1 border-gray-300 focus:outline-none"
            onChange={handleDay}
            placeholderText="Select a day"
          />
          {listHistory
            .filter((days) => days.includes(dateFormat))
            .map((item, i) => {
              return (
                <Link to={`/sales/history/detail/${id}/${item[2]}`} key={i}>
                  <div className="mt-2">
                    <div className="w-full p-2 rounded-lg bg-white h-auto flex">
                      <img
                        className="h-16 w-16 mb-3"
                        src={`${process.env.REACT_APP_HOST_HEROKU}${item[3]}`}
                        alt="img"
                      />
                      <div className="ml-3">
                        <p className="font-bold text-gray-600">{item[0]}</p>
                        <p className="text-xs text-gray-600">{item[1]}</p>
                        <p className="text-xs text-gray-600">Visited at : {item[5]}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          {/* {listHistory.map((item, i) => (
          ))} */}
        </div>
      </div>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default History;
