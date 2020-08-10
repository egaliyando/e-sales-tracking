import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import axios from "configs";

function VisitSV(props) {
  const listSales = [
    {
      id: 1,
      name: "Budi",
      status: "Active",
    },
    {
      id: 2,
      name: "Arif",
      status: "Close",
    },
    {
      id: 3,
      name: "Melati",
      status: "Active",
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [enable, setEnable] = useState(false);

  const [list, setList] = useState([]);
  console.log("list");
  console.log(list);

  const getTrip = () => {
    const token = localStorage.token;
    axios
      .get(`/trip`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getTrip();
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
                    <img src={require(`assets/image/apotek.png`)} alt="img" />
                    <div className="ml-3">
                      <p className="font-bold text-gray-600">{list.name_apotik}</p>
                      <p className="text-xs text-gray-600">{list.address_apotik}</p>
                    </div>
                  </div>
                  <button className="mr-3 focus:outline-none" onClick={() => setShowModal(true)}>
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
                  {listSales.map((item) => (
                    <div className="mt-3 px-3" key={item.id}>
                      <div style={{ width: "20rem" }} className="p-2 rounded-lg justify-between bg-white h-auto flex">
                        <div className="flex">
                          <img src={require(`assets/image/sales_list.png`)} alt="img" />
                          <div className="ml-3">
                            <p className="font-bold text-gray-600">{item.name}</p>
                            <p className="text-xs text-gray-600">Status : {item.status}</p>
                          </div>
                        </div>

                        <button
                          className={
                            enable
                              ? "bg-orange-400 text-white h-10 px-2 font-bold uppercase text-sm rounded-md focus:outline-none"
                              : "bg-white text-black h-10 px-2 font-bold uppercase text-sm rounded-md focus:outline-none"
                          }
                          onClick={() => setEnable(!enable)}
                        >
                          {enable ? <p>Add</p> : <p>Added</p>}
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
