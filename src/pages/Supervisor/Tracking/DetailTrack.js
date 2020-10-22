import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";
import axios from "configs";
import moment from "moment";
//maps
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { iconSales, iconApotik } from "components/MapComponent/IconMarker";
import useGeolocation from "react-hook-geolocation";

//ini library yang digunakan untuk metode lock gps nya
import * as geolib from "geolib";
function DetailTrack(props) {
  //id params
  const { id } = props.match.params;
  //maps component
  const dataMaps = {
    dataApotik: [],
    lat: -5.4,
    lng: 105.26667,
    zoom: 13,
  };
  const position = [dataMaps.lat, dataMaps.lng];
  //maps component

  //deklarasi state sales
  const [sales, setSales] = useState("");
  console.log("sales", sales);

  //list history trip
  const [listHistory, setListHistory] = useState([]);
  const [listLast, setlistLast] = useState("");
  const [idSingle, setidSingle] = useState("");
  console.log("listHistory", idSingle);
  //my loc
  const geolocation = useGeolocation();
  const userLat = parseFloat(geolocation.latitude);
  const userLong = parseFloat(geolocation.longitude);
  //lat long apotek
  const lats = parseFloat(idSingle.lat);
  const longs = parseFloat(idSingle.long);

  //get distance user to apotek/rs
  const dist = geolib.getPathLength([
    { latitude: userLat, longitude: userLong },
    { latitude: lats, longitude: longs },
  ]);
  //state all trip
  const [allTrip, setAllTrip] = useState([]);
  //get all apotik or trip
  const getTripSales = () => {
    const token = localStorage.token;
    axios
      .get(`/sales/trip-single-sales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("rev", res);
        let arrayTripAll = [...allTrip];
        for (let i = 0; i < res.data.data.length; i++) {
          arrayTripAll.push([
            parseFloat(res.data.data[i].trip.apotik.lat),
            parseFloat(res.data.data[i].trip.apotik.long),
            res.data.data[i].trip.apotik.name,
            res.data.data[i].trip.apotik.address,
          ]);
        }
        setAllTrip(arrayTripAll);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //state map tag trip
  const [tagTrip, setTagTrip] = useState([]);
  console.log("tag", tagTrip);
  //function get data history
  const getHistory = async () => {
    const token = localStorage.token;
    const { id } = props.match.params;
    await axios
      .get(`/supervisor/tracking-sales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let ArrayTrip = [...tagTrip];
        let LastArr = res.data.tracking[res.data.tracking.length - 1];

        for (let i = 0; i < res.data.tracking.length; i++) {
          ArrayTrip.push([
            parseFloat(res.data.tracking[i].apotik.lat),
            parseFloat(res.data.tracking[i].apotik.long),
            res.data.tracking[i].apotik.name,
            res.data.tracking[i].apotik.address,
            res.data.tracking[i].id,
          ]);
        }
        setidSingle(LastArr.apotik);
        setlistLast(LastArr);
        setTagTrip(ArrayTrip);
        setListHistory(res.data.tracking);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //function get sales open
  const getSales = () => {
    const token = localStorage.token;
    const { id } = props.match.params;
    axios
      .get(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSales(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTripSales();
    getHistory();
    getSales();
  }, []);

  //componrnt tab
  const tabItems = [
    {
      id: 1,
      title: "Tracking",
      content: (
        <>
          <div className="bg-white rounded-lg grid grid-cols-2 gap-5 justify-between mt-2 p-3">
            <div className="border-r-2">
              <img className="h-16 w-16 mb-3" src={`${process.env.REACT_APP_HOST_HEROKU}${sales.image}`} alt="img" />
              <p className="font-bold text-lg text-gray-600">{sales.fullname}</p>
              <div className="flex">
                <p className="text-gray-600 tex-sm">Status :</p>
                <p className="text-sm text-green-400 ml-3 self-center">{sales.status}</p>
              </div>

              <p className="text-gray-600 mt-3 font-bold text-md">Address :</p>
              <p className="text-sm text-green-400 self-center">{sales.address}</p>
            </div>
            <div>
              <div className="mb-3">
                <p className="font-bold text-md text-gray-600">Apotek/RS last visited</p>
                <p className="text-gray-600 tex-sm">{idSingle.name}</p>
              </div>
              <div className="mb-3">
                <p className="font-bold text-md text-gray-600">Lat - long</p>
                <p className="text-gray-600 tex-sm">
                  {listLast.lat} / {listLast.long}
                </p>
              </div>
              <div className="mb-3">
                <p className="font-bold text-lg text-gray-600">Distance user to apotek/rs :</p>
                <p className="text-gray-600 tex-sm">{dist} meter</p>
              </div>
            </div>

            {/* <div>
              <p className="font-bold text-gray-600">Detail Address :</p>
              <p className="text-gray-600 tex-sm">{sales.address} </p>
            </div> */}
          </div>
          <div style={{ height: "10rem" }} className="rounded-lg w-full bg-gray-500 mt-2">
            <Map style={{ width: "100%", height: "100%" }} center={position} zoom={dataMaps.zoom}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {allTrip.map((data, i) => {
                return (
                  <Marker position={[data[0], data[1]]} icon={iconApotik} key={i}>
                    <Popup>
                      <span className="text-xl">{data[2]}</span> <br /> {data[3]}
                      <br /> <p className="text-md">Status : Belum Dikunjungi</p>
                    </Popup>
                  </Marker>
                );
              })}
              {tagTrip.map((data, i) => {
                return (
                  <Marker position={[data[0], data[1]]} icon={iconSales} key={i}>
                    <Popup>
                      <span className="text-xl">{data[2]}</span> <br /> {data[3]}
                      <br /> <p className="text-md">Status : Telah Dikunjungi</p>
                    </Popup>
                  </Marker>
                );
              })}
            </Map>
          </div>
        </>
      ),
    },
    {
      id: 2,
      title: "History",
      content: (
        <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
          {listHistory.map((item) => (
            <Link to={`/supervisor/sales-track/detail/detail-history/${id}/${item.id}`}>
              <div className="mt-2" key={item.id}>
                <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                  <div className="flex">
                    <img
                      className="h-16 w-16"
                      src={`${process.env.REACT_APP_HOST_HEROKU}${item.apotik.image}`}
                      alt="img"
                    />
                    <div className="ml-3">
                      <p className="font-bold text-gray-600">{item.apotik.name}</p>
                      <p className="text-xs text-gray-600">{item.apotik.address}</p>
                      <p className="text-xs text-gray-600">Visited at : {moment(item.updatedAt).format("LLLL")}</p>
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
      ),
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
  //component tab

  const [active, setActive] = useState(1);
  return (
    <Container>
      <Header hSupervisor={true} />

      <div style={{ paddingTop: "4.5rem" }} className="px-3">
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
        <MobileNav isSupervisor={true} {...props} />
      </div>
    </Container>
  );
}

export default DetailTrack;
