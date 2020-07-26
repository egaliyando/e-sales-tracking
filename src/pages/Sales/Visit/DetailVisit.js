import React, { useState } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";

function DetailVisit(props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Header hSalesNormal={true} />
      {/* Apotik Name Detail */}
      <div style={{ paddingTop: "4.5rem" }} className="p-3">
        <div className="mt-2">
          <p className="text-gray-600 text-xs mb-1">Detail Visit</p>
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
        <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
          <p className="text-gray-600 text-xs mb-1">Product Order</p>
          <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
            <div className="flex justify-between w-full">
              <div className="flex">
                <img src={require(`assets/image/obat.png`)} alt="img" />
                <div className="ml-3">
                  <p className="font-bold text-gray-600">Broncitin</p>
                  <p className="text-xs text-gray-600">Order : 12</p>
                </div>
              </div>
              <img className="w-4 mr-3" src={require(`assets/icons/ic_trash.svg`)} alt="img" />
            </div>
          </div>

          <div className="w-full p-2 mt-2 justify-between rounded-lg bg-white h-auto flex">
            <div className="flex justify-between w-full">
              <div className="flex">
                <img src={require(`assets/image/obat.png`)} alt="img" />
                <div className="ml-3">
                  <p className="font-bold text-gray-600">Broncitin</p>
                  <p className="text-xs text-gray-600">Order : 12</p>
                </div>
              </div>
              <img className="w-4 mr-3" src={require(`assets/icons/ic_trash.svg`)} alt="img" />
            </div>
          </div>
        </div>
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-md">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <div className="w-64 bg-gray-200 p-3">
                    <input className="focus:outline-none" type="file" />
                  </div>
                  <div className="w-64 mt-5 bg-gray-200 p-3">
                    <input
                      className="w-auto bg-gray-200 p-1 text-sm focus:outline-none"
                      type="area"
                      placeholder="Note"
                    />
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="bg-orange-400 ml-10 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setShowModal(false)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 max-w-md m-auto fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <Link
        to="/sales/visit/"
        style={{ marginBottom: "11rem" }}
        className="absolute bottom-0 right-0 z-20 focus:outline-none"
      >
        <img src={require(`assets/icons/visit/ic_done.svg`)} alt="close" />
      </Link>
      <button
        onClick={() => setShowModal(true)}
        style={{ marginBottom: "7.5rem" }}
        className="absolute bottom-0 right-0 z-20 focus:outline-none"
      >
        <img src={require(`assets/icons/visit/ic_note.svg`)} alt="note" />
      </button>
      <Link to="/sales/visit/detail-visit/order" className="absolute bottom-0 right-0 z-20 mb-16 focus:outline-none">
        <img src={require(`assets/icons/visit/ic_add.svg`)} alt="add" />
      </Link>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default DetailVisit;
