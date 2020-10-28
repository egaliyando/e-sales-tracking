import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import axios from "configs";
import { useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import moment from "moment";

function Dashboard(props) {
  const token = useSelector((state) => state.users.token);
  const [listTrip, setListTrip] = useState([]);

  const [product, setProduct] = useState();
  const [totalProductSold, setTotalProductSold] = useState();
  const [totalTrip, setTotalTrip] = useState();
  const [tripSuccess, setTripSuccess] = useState();

  const [phoneSpv, setPhoneSpv] = useState("");
  const [status, setstatus] = useState();

  //untuk cek today
  const date = new Date();
  //ubah format tanggalnya
  const dateFormat = moment(date).format("DD-MM-YYYY");
  const getUser = () => {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;
    axios
      .get(`/users/${sales_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setstatus(res.data.data.status);
        console.log(res.data.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSpv = () => {
    const token = localStorage.token;
    axios
      .get(`/users/1`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPhoneSpv(res.data.data.user.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        let arrayTemp = [...listTrip];
        for (let i = 0; i < res.data.data.length; i++) {
          arrayTemp.push([
            res.data.data[i].id,
            //ini poin pentinf dalam filter nya
            moment(res.data.data[i].trip.day).format("DD-MM-YYYY"),
            res.data.data[i].trip.apotik.name,
            res.data.data[i].trip.apotik.address,
            res.data.data[i].trip.apotik.image,
            res.data.data[i].trip.apotik.id,
            parseFloat(res.data.data[i].trip.apotik.lat),
            parseFloat(res.data.data[i].trip.apotik.long),
          ]);
        }
        setListTrip(arrayTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
    getTrip();
    getDashboard();
    getSpv();
  }, []);
  if (token === "") {
    return <Redirect to="/" />;
  }
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
        {status === "Open" ? (
          listTrip
            .filter((days) => days.includes(dateFormat))
            .map((data, i) => {
              return (
                <div
                  className="mt-2 px-3"
                  key={i}
                  // onClick={() => (window.location.href = `https://www.google.com/maps/@-${data[6]},${data[7]},4z`)}
                >
                  <div className="w-full p-2 rounded-lg bg-white h-auto flex">
                    <img
                      className="self-center h-16 w-16"
                      src={`${process.env.REACT_APP_HOST_HEROKU}${data[4]}`}
                      alt="img"
                    />
                    <div className="ml-3">
                      <p className="font-bold text-gray-600">{data[2]}</p>
                      <p className="text-xs text-gray-600">{data[3]}</p>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <p className="ml-3 text-red-500 font-bold">Open Day First!</p>
        )}
      </div>

      <Link
        to="/sales/chat"
        // onClick={() => (window.location.href = `https://wa.me/${phoneSpv}?text=%7B0%7D+Hello+Supervisor`)}
        className="absolute bottom-0 right-0 z-20 mb-16 focus:outline-none"
      >
        <img src={require(`assets/icons/dashboard/ic_chat.svg`)} alt="chat" />
      </Link>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default Dashboard;
