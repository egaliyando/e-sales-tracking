import React from "react";
import { Link } from "react-router-dom";

const list = [
  {
    id: 1,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 2,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 3,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 4,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 5,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 6,
    apotik: "Apotik",
    address: "Address",
  },
  {
    id: 7,
    apotik: "Apotik",
    address: "Address",
  },
];

export function Rute() {
  return (
    <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
      {list.map((item) => (
        <Link to="/sales/visit/detail-visit">
          <div className="mt-2" key={list.id}>
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
        </Link>
      ))}
    </div>
  );
}
export function Nonrute() {
  return (
    <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
      {list.map((item) => (
        <div className="mt-2" key={list.id}>
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
      ))}
    </div>
  );
}
export function Done() {
  return (
    <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
      {list.map((item) => (
        <div className="mt-2" key={list.id}>
          <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
            <div className="flex">
              <img src={require(`assets/image/apotek.png`)} alt="img" />
              <div className="ml-3">
                <p className="font-bold text-gray-600">{item.apotik}</p>
                <p className="text-xs text-gray-600">{item.address}</p>
              </div>
            </div>
            <button className="mr-3 focus:outline-none">
              <img src={require(`assets/icons/card/ic_check.svg`)} alt="img" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
