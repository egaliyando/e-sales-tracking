import React, { useState } from "react";
import Header from "components/Header";
import Container from "components/Container";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";

const listProduct = [
  {
    id: 1,
    name: "Broncitin",
    price: "Rp. 200.000",
    stock: "12",
  },
  {
    id: 2,
    name: "Bodrex",
    price: "Rp. 10.000",
    stock: "120",
  },
  {
    id: 3,
    name: "Ultraflu",
    price: "Rp. 25.000",
    stock: "120",
  },
];

function Order() {
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <Container>
      <Header hSales={true} />

      <div className="h-auto p-3">
        <div className="bg-white flex justify-between rounded-lg text-sm p-2 text-gray-500">
          <input className="focus:outline-none ml-1" placeholder="Search product.." type="text" />
          <img src={require(`assets/icons/visit/ic_search.svg`)} alt="search" />
        </div>

        <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
          {listProduct.map((item) => (
            <div className="mt-2" key={item.id} onClick={() => setShowModal(true)}>
              {/* <Link to="/sales/visit/order"> */}
              <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                <div className="flex">
                  <img src={require(`assets/image/obat.png`)} alt="img" />
                  <div className="ml-3">
                    <p className="font-bold text-gray-600">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.price}</p>
                    <p className="text-xs text-gray-600">{item.stock}</p>
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </div>
          ))}
        </div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-md">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*body*/}
                  <div className="relative p-3 flex-auto">
                    <div className="w-64 p-2 justify-between rounded-lg bg-white h-auto flex">
                      <div className="flex">
                        <img src={require(`assets/image/obat.png`)} alt="img" />
                        <div className="ml-3">
                          <p className="font-bold text-gray-600">Broncitin</p>
                          <p className="text-xs text-gray-600">Rp. 200.000</p>
                          <p className="text-xs text-gray-600">Stock: 2000</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-around p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      className="focus:outline-none bg-red-400 text-white py-1 px-2"
                      onClick={() => setCount(count - 1)}
                    >
                      -
                    </button>
                    <div className="bg-gray-100 px-16 py-1">
                      <p>{count}</p>
                    </div>
                    <button
                      className="focus:outline-none bg-green-400 text-white py-1 px-2"
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </button>
                    <Link
                      to="/sales/visit/detail-visit"
                      className="bg-orange-400 ml-10 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Add
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-50 max-w-md m-auto fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
      <Link to="/sales/visit/detail-visit/" className="absolute bottom-0 right-0 z-20 mb-16 focus:outline-none">
        <img src={require(`assets/icons/visit/ic_close.svg`)} alt="add" />
      </Link>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} />
      </div>
    </Container>
  );
}

export default Order;
