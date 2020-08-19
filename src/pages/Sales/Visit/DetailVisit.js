import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";
import axios from "configs";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function DetailVisit(props) {
  const [detailTrip, setDetailTrip] = useState([]);
  // console.log("detailTrip");
  // console.log(detailTrip);
  const [showModal, setShowModal] = useState(false);
  const MySwal = withReactContent(Swal);

  const { id } = props.match.params;
  // console.log(id);
  const getDetailTrip = () => {
    const token = localStorage.token;
    axios
      .get(`/sales/cart-sales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setDetailTrip(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handle delete product
  function handleDelete(id) {
    // console.log(id);
    const token = localStorage.token;
    axios
      .delete(`/sales/cart-sales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        getDetailTrip();
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }
  function handleDone() {
    return MySwal.fire({
      title: "Done visited?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        MySwal.fire("Done!", "Success Visit!", "Canceled");
        window.location.href = "/sales/history";
      }
    });
  }

  useEffect(() => {
    getDetailTrip();
  }, []);
  return (
    <Container>
      <Header hSalesNormal={true} />
      {/* Apotik Name Detail */}
      <div style={{ paddingTop: "4.5rem", width: "-webkit-fill-available" }} className="fixed top-0 max-w-md px-3">
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
        <p className="text-gray-600 text-xs mb-1">Product Order</p>
        {/* LIST PRODUCT IS ORDER */}
        <div style={{ height: "28rem" }} className="overflow-y-auto pb-64">
          {detailTrip.map((item, i) => {
            return (
              <div key={i} className="w-full p-2 mt-2 justify-between rounded-lg bg-white h-auto flex">
                <div className="flex justify-between w-full">
                  <div className="flex">
                    <img
                      className="h-16 w-16"
                      src={`${process.env.REACT_APP_HOST_HEROKU}${item.product.image}`}
                      alt="img"
                    />
                    <div className="ml-3 self-center">
                      <p className="font-bold text-gray-600">{item.product.name}</p>
                      <p className="text-xs text-gray-600">{item.qty}</p>
                    </div>
                  </div>
                  <button className="focus:outline-none" onClick={() => handleDelete(item.id)}>
                    <img className="w-4 mr-3" src={require(`assets/icons/ic_trash.svg`)} alt="img" />
                  </button>
                </div>
              </div>
            );
          })}
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
                    className="focus:outline-none bg-orange-400 ml-10 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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

      <div style={{ width: "-webkit-fill-available" }} className="fixed mb-16 bottom-0 max-w-md">
        <div className="flex justify-center">
          <Link to={`/sales/visit/detail-visit/order/${id}`} className="focus:outline-none">
            <img src={require(`assets/icons/visit/ic_add.svg`)} alt="add" />
          </Link>
          <button onClick={() => setShowModal(true)} className="focus:outline-none">
            <img src={require(`assets/icons/visit/ic_note.svg`)} alt="note" />
          </button>
          <button className="focus:outline-none" onClick={handleDone}>
            <img src={require(`assets/icons/visit/ic_done.svg`)} alt="close" />
          </button>
        </div>
      </div>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default DetailVisit;
