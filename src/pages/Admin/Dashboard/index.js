import React, { useState, useEffect } from "react";
import Navigation from "components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import MapsHook from "components/MapComponent/MapsHook";
import axios from "configs";

function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const [product, setProduct] = useState("");
  const [sales, setSales] = useState("");
  const [stock, setStock] = useState([]);
  const [sold, setSold] = useState();
  const [trip, setTrip] = useState();

  const getDashboard = () => {
    const token = localStorage.token;
    axios
      .get(`/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTrip(res.data.totalTrip);
        setSold(res.data.totalProductBuy);
        setSales(res.data.totalSales);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProduct = () => {
    const token = localStorage.token;
    axios
      .get(`/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProduct(res.data.data.data.length);
        let ArrayStock = [...stock];
        for (let i = 0; i < res.data.data.data.length; i++) {
          ArrayStock.push(res.data.data.data[i].stock);
        }
        setStock(ArrayStock);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getDashboard();
    getProduct();
  }, []);
  if (token === "") {
    return <Redirect to="/admin/auth" />;
  }
  return (
    <div className="flex">
      <Navigation />
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 h-screen p-3">
        <p className="my-3 font-bold">Dashboard</p>
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white rounded-lg p-3 flex">
            <img className="w-1/5" src={require(`assets/icons/ic_bag.svg`)} alt="ic" />
            <div className="self-center ml-3">
              <p className="font-bold fonts-gray">Total Product</p>
              <p className="font-bold fonts-gray">{product}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 flex">
            <img className="w-12" src={require(`assets/icons/ic_bag4.svg`)} alt="ic" />
            <div className="self-center ml-3">
              <p className="font-bold fonts-gray">Product Sold</p>
              <p className="font-bold fonts-gray">{sold}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 flex">
            <img className="w-1/5" src={require(`assets/icons/ic_bag2.svg`)} alt="ic" />
            <div className="self-center ml-3">
              <p className="font-bold fonts-gray">Total Trip</p>
              <p className="font-bold fonts-gray">{trip}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 flex">
            <img className="w-12" src={require(`assets/icons/ic_bag3.svg`)} alt="ic" />
            <div className="self-center ml-3">
              <p className="font-bold fonts-gray">Total Sales</p>
              <p className="font-bold fonts-gray">{sales}</p>
            </div>
          </div>
        </div>
        <p className="my-3 font-bold">Lokasi Sales</p>
        <div style={{ height: "32rem" }} className="w-full bg-gray-500 rounded-lg">
          <MapsHook />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
