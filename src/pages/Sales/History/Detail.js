import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";

function DetailHistory() {
  return (
    <Container>
      <Header hSales={true} />

      {/* Apotik Name Detail */}
      <div className="p-3">
        <div className="mt-2">
          <div className="w-full p-2 justify-between rounded-lg h-auto flex">
            <div className="flex">
              <img src={require(`assets/image/apotek.png`)} alt="img" />
              <div className="ml-3">
                <p className="font-bold text-gray-600">Apotik Rossa</p>
                <p className="text-xs text-gray-600">Jl. Abdul muis</p>
              </div>
            </div>
          </div>
        </div>

        {/* LIST PRODUCT IS ORDER */}
        <div className="mt-2">
          {/* <Link to="/sales/visit/order"> */}
          <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
            <div className="flex">
              <img src={require(`assets/image/obat.png`)} alt="img" />
              <div className="ml-3">
                <p className="font-bold text-gray-600">Broncitin</p>
                <p className="text-xs text-gray-600">Order : 12</p>
              </div>
            </div>
          </div>
          {/* </Link> */}
        </div>
        <div className="mt-2">
          {/* <Link to="/sales/visit/order"> */}
          <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
            <div className="flex">
              <img src={require(`assets/image/obat.png`)} alt="img" />
              <div className="ml-3">
                <p className="font-bold text-gray-600">Broncitin</p>
                <p className="text-xs text-gray-600">Order : 12</p>
              </div>
            </div>
          </div>
          {/* </Link> */}
        </div>
      </div>

      <Link to="/sales/history/" className="absolute bottom-0 right-0 z-20 mb-16 focus:outline-none">
        <img src={require(`assets/icons/visit/ic_close.svg`)} alt="add" />
      </Link>

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} />
      </div>
    </Container>
  );
}

export default DetailHistory;
