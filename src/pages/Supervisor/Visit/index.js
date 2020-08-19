import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import axios from "configs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function VisitSV(props) {
  const [listSales, setListSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [enable, setEnable] = useState(false);

  const MySwal = withReactContent(Swal);

  const [salesId, setSalesId] = useState("");

  // id trip
  const [trip_id, setId] = useState("");
  console.log("trip_id");
  console.log(trip_id);
  const [sales_id, setSales_Id] = useState("");
  // set detail trip
  const [detailTrip, setDetailTrip] = useState([]);
  console.log("detailTrip");
  console.log(detailTrip);

  const [list, setList] = useState([]);
  console.log("list");
  console.log(list);

  const getSales = () => {
    const token = localStorage.token;

    axios
      .get(`/supervisor/sales-open`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListSales(res.data.data);
        console.log("sales on");
        console.log(res.data.data);
        let arrayTemp = [...salesId];
        for (let i = 0; i < res.data.data.length; i++) {
          arrayTemp.push(res.data.data[i].id);
        }
        setSalesId(arrayTemp);
        console.log("sales id");
        console.log(arrayTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTrip = () => {
    const token = localStorage.token;
    axios
      .get(`/supervisor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setList(res.data.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDetailTrip = (id) => {
    const token = localStorage.token;
    axios
      .get(`/supervisor/show-detail-trip/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setDetailTrip(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGetIdTrip = (id, sales_id) => {
    setId(id);
    getDetailTrip(id);
  };

  const handleAddTrip = (salesid) => {
    const token = localStorage.token;
    console.log("sales pance o2" + sales_id);
    if (detailTrip.length > 0) {
      // console.log(sales_id);
      MySwal.fire({
        position: "top",
        icon: "error",
        title: "Sales telah tersedia",
        showConfirmButton: false,
        timer: 1500,
      });
      getDetailTrip(trip_id);
    } else {
      MySwal.fire({
        title: "Add Trip?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          MySwal.fire("Add Success!", "", "Canceled");
          axios
            .post(
              `/supervisor/add-sales-to-trip/${trip_id}`,
              {
                sales_id: salesid,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then(function (response) {
              getDetailTrip(trip_id);
            })
            .catch(async (error) => {});
        }
      });
    }
    setEnable(!enable);
  };

  const handleDeleteSales = (id) => {
    const token = localStorage.token;
    MySwal.fire({
      title: "Cancel Trip?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        MySwal.fire("Canceled!", ":)", "warning", "Canceled");
        axios
          .delete(
            `/supervisor/delete-sales-to-trip/${id}`,

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            getDetailTrip(trip_id);
          })
          .catch(async (error) => {});
      }
    });
  };

  useEffect(() => {
    getTrip();
    getSales();
  }, []);

  return (
    <Container>
      <Header hSupervisor={true} />

      <div style={{ paddingTop: "4.5rem" }} className="px-3">
        <div className="bg-white flex justify-between rounded-lg text-sm p-2 text-gray-500">
          <input className="focus:outline-none ml-1" placeholder="Search visit.." type="text" />
          <img src={require(`assets/icons/visit/ic_search.svg`)} alt="search" />
        </div>

        <div style={{ height: "33rem" }} className="overflow-y-auto pb-20">
          {list.map((list, i) => {
            return (
              <div className="mt-2" key={i}>
                <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                  <div className="flex">
                    <img
                      className="self-center h-16 w-16"
                      src={`${process.env.REACT_APP_HOST_HEROKU}${list.image}`}
                      alt="img"
                    />
                    <div className="ml-3">
                      <p className="font-bold text-gray-600">{list.name_apotik}</p>

                      <p className="text-xs text-gray-600">{list.address_apotik}</p>
                    </div>
                  </div>
                  <button
                    className="mr-3 focus:outline-none"
                    onClick={() => {
                      setShowModal(true);
                      handleGetIdTrip(list.id, list.sales_id);
                    }}
                  >
                    <img src={require(`assets/icons/ic_add_visit.svg`)} alt="img" />
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
                <div className="flex justify-between">
                  <p className="mt-3 ml-5">List Sales</p>
                  <p className="mr-5 mt-3 font-bold" onClick={() => setShowModal(false)}>
                    X
                  </p>
                </div>
                <div className="relative py-2 flex-auto">
                  {/* KASIH LOGIC DISINI */}
                  {detailTrip.map((item) => (
                    <div className="mt-3 px-3" key={item.id}>
                      <div style={{ width: "20rem" }} className="p-2 rounded-lg justify-between bg-white h-auto flex">
                        <div className="flex">
                          <img src={require(`assets/image/sales_list.png`)} alt="img" />
                          <div className="ml-3">
                            <p className="font-bold text-gray-600">{item.sale.fullname}</p>
                            <p className="text-xs text-gray-600">Status : {item.sale.status}</p>
                          </div>
                        </div>

                        <button
                          className={
                            "bg-green-400 text-white h-10 px-2 font-bold uppercase text-sm rounded-md focus:outline-none"
                          }
                          onClick={() => handleDeleteSales(item.id)}
                        >
                          {<p>Added</p>}
                        </button>
                      </div>
                    </div>
                  ))}
                  {listSales.map((item) => (
                    <div className="mt-3 px-3" key={item.id}>
                      <div style={{ width: "20rem" }} className="p-2 rounded-lg justify-between bg-white h-auto flex">
                        <div className="flex">
                          <img src={require(`assets/image/sales_list.png`)} alt="img" />
                          <div className="ml-3">
                            <p className="font-bold text-gray-600">{item.fullname}</p>
                            <p className="text-xs text-gray-600">Status : {item.status}</p>
                          </div>
                        </div>

                        <button
                          className={
                            "bg-orange-400 text-white h-10 px-2 font-bold uppercase text-sm rounded-md focus:outline-none"
                          }
                          onClick={() => handleAddTrip(item.id)}
                        >
                          {<p>Add</p>}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-50 max-w-md m-auto fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSupervisor={true} {...props} />
      </div>
    </Container>
  );
}

export default VisitSV;
