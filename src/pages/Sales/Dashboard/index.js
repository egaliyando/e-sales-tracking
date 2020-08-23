import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";
import axios from "configs";

function Dashboard(props) {
  const [listTrip, setListTrip] = useState([]);
  const getTrip = () => {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;

    axios
      .get(`/sales/trip-single-sales/${sales_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListTrip(res.data.data);
        console.log("sales rute");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTrip();
  }, []);
  return (
    <Container>
      <Header hSalesWithToggle={true} />
      <div style={{ paddingTop: "4rem" }}>
        <p className="ml-3 mt-3 text-gray-600">Dashboard</p>
        <div className="grid grid-cols-2 gap-3 px-3 pt-2">
          <div className="bg-white w-full h-auto rounded-lg p-3">
            <img className="ml-auto" src={require(`assets/icons/dashboard/ic_map_mark.svg`)} alt="map" />
            <p className="text-xs mt-2 text-gray-600">Total Visited</p>
            <p className="text-lg font-bold text-gray-600">22</p>
          </div>
          <div className="bg-white w-full h-auto rounded-lg p-3">
            <img className="ml-auto" src={require(`assets/icons/dashboard/ic_dollar.svg`)} alt="map" />
            <p className="text-xs mt-2 text-gray-600">Product Sold</p>
            <p className="text-lg font-bold text-gray-600">19</p>
          </div>
          <div className="bg-white w-full h-auto rounded-lg p-3">
            <img className="ml-auto" src={require(`assets/icons/dashboard/ic_skull.svg`)} alt="map" />
            <p className="text-xs mt-2 text-gray-600">Product Expired</p>
            <p className="text-lg font-bold text-gray-600">21</p>
          </div>
          <div className="bg-white w-full h-auto rounded-lg p-3">
            <img className="ml-auto" src={require(`assets/icons/dashboard/ic_speed.svg`)} alt="map" />
            <p className="text-xs mt-2 text-gray-600">Trip Success</p>
            <p className="text-lg font-bold text-gray-600">22</p>
          </div>
        </div>
        <p className="ml-3 mt-3 text-gray-600">Visit List</p>
      </div>

      {/* CARD LIST KUNJUNGAN */}
      <div className="overflow-y-auto h-64 pb-12">
        {listTrip.map((data, i) => {
          return (
            <div className="mt-2 px-3" key={i}>
              <div className="w-full p-2 rounded-lg bg-white h-auto flex">
                <img
                  className="self-center h-16 w-16"
                  src={`${process.env.REACT_APP_HOST_HEROKU}${data.trip.apotik.image}`}
                  alt="img"
                />
                <div className="ml-3">
                  <p className="font-bold text-gray-600">{data.trip.apotik.name}</p>
                  <p className="text-xs text-gray-600">{data.trip.apotik.address}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Link to="/sales/chat" className="absolute bottom-0 right-0 z-20 mb-16 focus:outline-none">
        <img src={require(`assets/icons/dashboard/ic_chat.svg`)} alt="chat" />
      </Link>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default Dashboard;
