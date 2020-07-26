import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";

function DetailHistory(props) {
  return (
    <Container>
      <Header hSalesNormal={true} />

      {/* Apotik Name Detail */}
      <div style={{ paddingTop: "4.6rem" }} className="p-3">
        <div className="mt-2">
          <p className="text-gray-600 text-xs mb-1">Detail History</p>

          <div className="w-full p-2 bg-white justify-between rounded-lg h-auto flex">
            <div className="flex">
              <img src={require(`assets/image/apotek.png`)} alt="img" />
              <div className="ml-3">
                <p className="font-bold text-gray-600">Apotik Rossa</p>
                <p className="text-xs text-gray-600">Jl. Abdul muis</p>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-3" />

        {/* LIST PRODUCT IS ORDER */}
        <div className="mt-2">
          <p className="text-gray-600 text-xs mb-1">Product Order</p>

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
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default DetailHistory;
