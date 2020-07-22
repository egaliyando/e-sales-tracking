import React from "react";
import Navigation from "components/Navigation";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);

  if (token === "") {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex">
      <Navigation />
      <div
        style={{ backgroundColor: "#F7F7F7" }}
        className="w-11/12 h-screen p-3"
      >
        <p className="my-3 font-bold">Dashboard</p>
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white rounded-lg p-3 flex">
            <img
              className="w-1/4"
              src={require(`assets/icons/ic_bag.svg`)}
              alt="ic"
            />
            <div className="self-center ml-3">
              <p className="font-bold fonts-gray">Semua Produk</p>
              <p className="font-bold fonts-gray">120</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 flex">
            <img
              className="w-10"
              src={require(`assets/icons/ic_bag4.svg`)}
              alt="ic"
            />
            <div className="self-center ml-3">
              <p className="font-bold fonts-gray">Terjual</p>
              <p className="font-bold fonts-gray">120</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 flex">
            <img
              className="w-1/4"
              src={require(`assets/icons/ic_bag2.svg`)}
              alt="ic"
            />
            <div className="self-center ml-3">
              <p className="font-bold fonts-gray">Kadarluasa</p>
              <p className="font-bold fonts-gray">120</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 flex">
            <img
              className="w-12"
              src={require(`assets/icons/ic_bag3.svg`)}
              alt="ic"
            />
            <div className="self-center ml-3">
              <p className="font-bold fonts-gray">Sales</p>
              <p className="font-bold fonts-gray">120</p>
            </div>
          </div>
        </div>
        <p className="my-3">Lokasi Sales</p>
        <div
          style={{ height: "28rem" }}
          className="w-full bg-gray-500 rounded-lg"
        ></div>
      </div>
    </div>
  );
}

export default Dashboard;
