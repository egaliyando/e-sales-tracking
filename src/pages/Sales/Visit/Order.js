import React, { useState, useEffect } from "react";
import Header from "components/Header";
import Container from "components/Container";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";
import axios from "configs";

function Order(props) {
  //parsing id trip
  const { id } = props.match.params;
  const { apotik_id } = props.match.params;
  const { checkout_id } = props.match.params;

  //deklarasi state id product
  const [idProduct, setIdProduct] = useState([]);
  //deklarasi modal
  const [showModal, setShowModal] = useState(false);
  //deklarasi counter qty
  const [count, setCount] = useState(0);
  //deklarasi data product
  const [data, setData] = useState([]);

  const [idTrip, setIdTrip] = useState("");

  //deklarasi modal
  const handleModal = (id) => {
    setShowModal(true);
    handleGetIdProduct(id);
  };

  // handle get id product ketika klik modal
  const handleGetIdProduct = (id) => {
    getProduct(id);
    getSingleProduct(id);
  };

  //ambil data single product
  const getSingleProduct = (id) => {
    const token = localStorage.token;
    axios
      .get(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("detail product");
        console.log(res);
        setIdProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //ambil semua data product
  const getProduct = () => {
    const token = localStorage.token;
    axios
      .get(`/product/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getIdTrip = () => {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;
    axios
      .get(`/sales/trip-single-sales/${sales_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res.data.data");
        setIdTrip(res.data.data[0].trip.apotik.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handle tambah product
  const handleAddProduct = () => {
    const token = localStorage.token;
    axios
      .post(
        `/sales/cart-sales/${id}`,
        {
          product_id: idProduct.id,
          qty: count,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        props.history.push(`/sales/visit/detail-visit/${id}/${checkout_id}/${apotik_id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProduct();
    getIdTrip();
  }, []);

  return (
    <Container>
      <Header hSalesNormal={true} />

      <div style={{ paddingTop: "6rem" }} className="p-3">
        <div className="bg-white flex justify-between rounded-lg text-sm p-2 text-gray-500">
          <input className="focus:outline-none ml-1" placeholder="Search product.." type="text" />
          <img src={require(`assets/icons/visit/ic_search.svg`)} alt="search" />
        </div>

        <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
          {data.map((item, i) => (
            <div className="mt-4" key={i} onClick={() => handleModal(item.id)}>
              {/* <Link to="/sales/visit/order"> */}
              <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                <div className="flex">
                  <img className="h-16 w-16" src={`${process.env.REACT_APP_HOST_HEROKU}${item.image}`} alt="img" />
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
                    <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                      <div className="flex justify-between">
                        <img
                          className="h-16 w-16"
                          src={`${process.env.REACT_APP_HOST_HEROKU}${idProduct.image}`}
                          alt="img"
                        />
                        <div className="ml-3">
                          <p className="font-bold text-gray-600">{idProduct.name}</p>
                          <p className="text-xs text-gray-600">{idProduct.price}</p>
                          <p className="text-xs text-gray-600">{idProduct.stock}</p>
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
                  </div>
                  <div className="flex justify-around">
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-orange-400 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddProduct}
                      className="bg-green-400 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      style={{ transition: "all .15s ease" }}
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
      </div>
      <Link
        to={`/sales/visit/detail-visit/${id}/${checkout_id}/${apotik_id}`}
        className="absolute bottom-0 right-0 z-20 mb-16 focus:outline-none"
      >
        <img src={require(`assets/icons/visit/ic_close.svg`)} alt="add" />
      </Link>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default Order;
