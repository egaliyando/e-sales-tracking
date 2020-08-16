import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "configs";

export function Rute(props) {
  const [listRute, setListRute] = useState([]);
  const getRute = () => {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;

    axios
      .get(`/sales/trip-single-sales/${sales_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListRute(res.data.data);
        console.log("sales rute");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getRute();
  }, []);

  return (
    <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
      {listRute.map((item, i) => {
        return (
          <div className="mt-2" key={i}>
            <Link to="/sales/visit/detail-visit">
              <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                <div className="flex">
                  <img
                    className="self-center h-16 w-16"
                    src={`${process.env.REACT_APP_HOST_HEROKU}${item.image}`}
                    alt="img"
                  />
                  <div className="ml-3">
                    <p className="font-bold text-gray-600">{item.name_apotik}</p>
                    <p className="text-xs text-gray-600">{item.address_apotik}</p>
                  </div>
                </div>
                <button className="mr-3 focus:outline-none">
                  <img src={require(`assets/icons/card/ic_arrow.svg`)} alt="img" />
                </button>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
export function Nonrute() {
  return (
    <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
      {/* {listRute.map((item) => (
        <div className="mt-2" key={listRute.id}>
          <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
            <div className="flex">
              <img src={require(`assets/image/apotek.png`)} alt="img" />
              <div className="ml-3">
                <p className="font-bold text-gray-600">{item.apotik}</p>
                <p className="text-xs text-gray-600">{item.address}</p>
              </div>
            </div>
            <button className="mr-3 focus:outline-none">
              <img src={require(`assets/icons/card/ic_arrow.svg`)} alt="img" />
            </button>
          </div>
        </div>
      ))} */}
    </div>
  );
}
