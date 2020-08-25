import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";
import axios from "configs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useGeolocation from "react-hook-geolocation";
import * as geolib from "geolib";

function DetailVisit(props) {
  // deklarasi sweetalert
  const MySwal = withReactContent(Swal);
  //deklarasi geolocation
  const geolocation = useGeolocation();
  //state trip & apotik
  const [idApotik, setIdApotik] = useState("");

  const userLat = parseFloat(geolocation.latitude);
  const userLong = parseFloat(geolocation.longitude);
  const lats = parseFloat(idApotik[4]);
  const longs = parseFloat(idApotik[5]);

  //geolib
  const test = geolib.isPointWithinRadius(
    { latitude: lats, longitude: longs },
    { latitude: userLat, longitude: userLong },
    1000000000
  );
  console.log("tes");
  console.log(test);
  //deklarasi state detail trip
  const [detailTrip, setDetailTrip] = useState([]);

  const [image, setImage] = useState();
  const [notes, setNotes] = useState();

  // deklarasi state modal
  const [showModal, setShowModal] = useState(false);

  const dataMaps = {
    lat: -5.4,
    lng: 105.26667,
    radius: idApotik[4],
  };
  console.log("dataMaps.radius");
  console.log(dataMaps.radius);

  //parsing id memalui params
  const { id } = props.match.params;
  const { apotik_id } = props.match.params;

  const sales_id = localStorage.sales_id;

  //function untuk get data detail trip melalui api
  const getDetailTrip = () => {
    const token = localStorage.token;
    const apotik = [...idApotik];
    axios
      .get(`/apotik/${apotik_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        apotik.push(res.data.data.id);
        apotik.push(res.data.data.name);
        apotik.push(res.data.data.address);
        apotik.push(res.data.data.image);
        apotik.push(res.data.data.lat);
        apotik.push(res.data.data.long);
        setIdApotik(apotik);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`/sales/cart-sales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setDetailTrip(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handle delete product
  function handleDelete(id) {
    const token = localStorage.token;
    axios
      .delete(`/sales/cart-sales/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        getDetailTrip();
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }

  function handleDone() {
    const { id } = props.match.params;
    const token = localStorage.token;
    let formData = new FormData();
    formData.append("image", image);
    formData.append("sales_id", sales_id);
    formData.append("notes", notes);
    return MySwal.fire({
      title: "Done visited?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (test == true) {
        axios
          .post(`/sales/checkout/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            MySwal.fire("Done!", "Success Visit!", "info", "Canceled");
            props.history.push("/sales/visit");
            console.log(res);
          })
          .catch(function (error) {
            console.log(error.data);
            // let err = [];
            // for (let i = 0; i < error.response.data.error.length; i++) {
            //   err.push(error.response.data.error[i].param);
            // }
            // MySwal.fire("Pastikan Data Terisi");
          });
      } else
        MySwal.fire({
          position: "top",
          icon: "error",
          title: "Maaf Anda diluar jangkauan Trip",
          showConfirmButton: false,
          timer: 1500,
        });
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
              <img
                className="self-center h-16 w-16"
                src={`${process.env.REACT_APP_HOST_HEROKU}${idApotik[3]}`}
                alt="img"
              />
              <div className="ml-3">
                <p className="font-bold text-gray-600">{idApotik[1]}</p>
                <p className="text-xs text-gray-600">{idApotik[2]}</p>
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
            <div className="relative overflow-x-hidden w-auto my-6 mx-auto max-w-md">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*body*/}
                <div className="relative p-3 flex-auto">
                  <div className="w-64 bg-gray-200 p-3">
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      className="focus:outline-none overflow-x-hidden"
                      type="file"
                    />
                  </div>
                  <div className="w-64 mt-5 bg-gray-200 p-3">
                    <input
                      className="w-auto bg-gray-200 p-1 text-sm focus:outline-none"
                      type="area"
                      placeholder="Note"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
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
