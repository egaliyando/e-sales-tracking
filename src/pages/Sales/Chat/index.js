import React, { useState, useEffect } from "react";
import Header from "components/Header";
import Container from "components/Container";
import MobileNav from "components/Navigation/MobileNav";
import axios from "configs";

function ChatSales(props) {
  const [listSpv, setlistSpv] = useState([]);
  console.log(listSpv);
  const getSpv = async () => {
    const token = localStorage.getItem("token");
    try {
      const spv = await axios.get(`/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let _temp = [...listSpv];
      for (let i = 0; i < spv.data.data.user.length; i++) {
        if (spv.data.data.user[i].role === "supervisor") {
          _temp.push(spv.data.data.user[i]);
        }
      }
      setlistSpv(_temp);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getSpv();
  }, []);
  return (
    <Container>
      <Header hSalesNormal={true} />
      <div style={{ paddingTop: "4.7rem" }} className="px-3">
        {/* <div className="bg-white flex justify-between rounded-lg text-sm p-2 text-gray-500">
          <input className="focus:outline-none ml-1" placeholder="Search chat.." type="text" />
          <img src={require(`assets/icons/visit/ic_search.svg`)} alt="search" />
        </div> */}
        <div style={{ height: "33rem" }} className="overflow-y-auto pb-20">
          {listSpv.map((data, i) => {
            return (
              <div
                onClick={() => (window.location.href = `https://wa.me/${data.username}?text=%7B0%7D+Hello+Supervisor`)}
                key={i}
                className="mt-2"
              >
                <div className="w-full p-2 self-center rounded-lg bg-white h-auto flex">
                  <img className="h-16 w-16" src={`${process.env.REACT_APP_HOST_HEROKU}${data.image}`} alt="img" />
                  <div className="ml-3">
                    <p className="font-bold text-gray-600">{data.fullname}</p>
                    <p className="text-xs text-gray-600">Nik : {data.nik}</p>
                    <p className="text-xs text-gray-600">Supervisor</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MobileNav isSales={true} {...props} />
    </Container>
  );
}

export default ChatSales;

//done gausah
