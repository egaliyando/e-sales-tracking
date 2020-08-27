import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";
import axios from "configs";

function Dashboard(props) {
  const [listTrip, setListTrip] = useState([]);

  const [product, setProduct] = useState();
  const [totalProductSold, setTotalProductSold] = useState();
  const [totalTrip, setTotalTrip] = useState();
  const [tripSuccess, setTripSuccess] = useState();

  // const chatSupervisor = () => {
  //   let url = 'https://api.whatsapp.com/send?phone=085382925115'
  //   + number
  //   "&text="
  // }

  const getDashboard = () => {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;

    axios
      .get(`/dashboard/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("dashboard");
        console.log(res);
        setProduct(res.data.totalProduct);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`/sales/dashboard/${sales_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("dashboardssss");
        console.log(res);
        setTotalTrip(res.data.total_trip);
        setTotalProductSold(res.data.total_product);
        setTripSuccess(res.data.trip_success);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
    getDashboard();
  }, []);
  return (
    <Container>
      <Header hSalesWithToggle={true} />
      <div style={{ paddingTop: "4rem" }}>
        <p className="ml-3 mt-3 text-gray-600">Dashboard</p>
        <div className="grid grid-cols-2 gap-3 px-3 pt-2">
          <div className="bg-white w-full h-auto rounded-lg p-3">
            <img className="ml-auto" src={require(`assets/icons/dashboard/ic_map_mark.svg`)} alt="map" />
            <p className="text-xs mt-2 text-gray-600">Total Trip</p>
            <p className="text-lg font-bold text-gray-600">{totalTrip}</p>
          </div>
          <div className="bg-white w-full h-auto rounded-lg p-3">
            <img className="ml-auto" src={require(`assets/icons/dashboard/ic_dollar.svg`)} alt="map" />
            <p className="text-xs mt-2 text-gray-600">Trip Success</p>
            <p className="text-lg font-bold text-gray-600">{tripSuccess}</p>
          </div>
          <div className="bg-white w-full h-auto rounded-lg p-3">
            <img className="ml-auto" src={require(`assets/icons/dashboard/ic_skull.svg`)} alt="map" />
            <p className="text-xs mt-2 text-gray-600">All Product</p>
            <p className="text-lg font-bold text-gray-600">{product}</p>
          </div>
          <div className="bg-white w-full h-auto rounded-lg p-3">
            <img className="ml-auto" src={require(`assets/icons/dashboard/ic_speed.svg`)} alt="map" />
            <p className="text-xs mt-2 text-gray-600">Product Sold</p>
            <p className="text-lg font-bold text-gray-600">{totalProductSold}</p>
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

      <button
        onClick={() => (window.location.href = "https://wa.me/6285382925115?text=%7B0%7D+Hello+Supervisor")}
        className="absolute bottom-0 right-0 z-20 mb-16 focus:outline-none"
      >
        <img src={require(`assets/icons/dashboard/ic_chat.svg`)} alt="chat" />
      </button>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default Dashboard;
