import React, { useState, useEffect } from "react";
import axios from "configs";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
// import { Link } from "react-router-dom";

function ListChat(props) {
  //deklarasi state sales open
  const [listSales, setListSales] = useState([]);

  const getSales = () => {
    const token = localStorage.token;
    axios
      .get(`/supervisor/sales-open`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setListSales(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSales();
  }, []);

  return (
    <Container>
      <Header hSupervisor={true} />

      <div style={{ paddingTop: "4.7rem" }} className="px-3">
        <div className="bg-white flex justify-between rounded-lg text-sm p-2 text-gray-500">
          <input className="focus:outline-none ml-1" placeholder="Search chat.." type="text" />
          <img src={require(`assets/icons/visit/ic_search.svg`)} alt="search" />
        </div>
        <div style={{ height: "33rem" }} className="overflow-y-auto pb-20">
          {listSales.map((item) => (
            <div
              onClick={() =>
                (window.location.href = `https://wa.me/${item.user.username}?text=%7B0%7D+Hello+Supervisor`)
              }
              className="mt-2"
              key={item.id}
            >
              <div className="w-full p-2 rounded-lg bg-white h-auto flex">
                <img className="h-16 w-16" src={`${process.env.REACT_APP_HOST_HEROKU}${item.image}`} alt="img" />
                <div className="ml-3">
                  <p className="font-bold text-gray-600">{item.fullname}</p>
                  <p className="text-xs text-gray-600">Status : {item.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSupervisor={true} {...props} />
      </div>
    </Container>
  );
}

export default ListChat;
