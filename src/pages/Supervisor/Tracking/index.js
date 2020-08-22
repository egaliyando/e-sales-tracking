import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";
import axios from "configs";

function Tracking(props) {
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

      <div style={{ paddingTop: "4.5rem" }} className="px-3">
        <div className="bg-white flex justify-between rounded-lg text-sm p-2 text-gray-500">
          <input className="focus:outline-none ml-1" placeholder="Search sales.." type="text" />
          <img src={require(`assets/icons/visit/ic_search.svg`)} alt="search" />
        </div>

        <div style={{ height: "33rem" }} className="overflow-y-auto pb-10">
          {listSales.map((item) => (
            <div className="mt-2" key={item.id}>
              <Link to={`/supervisor/sales-track/detail/${item.id}`}>
                <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                  <div className="flex">
                    <img src={require(`assets/image/sales_list.png`)} alt="img" />
                    <div className="ml-3">
                      <p className="font-bold text-gray-600">{item.fullname}</p>
                      <p className="text-xs text-green-600">{item.status}</p>
                    </div>
                  </div>
                </div>
              </Link>
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
export default Tracking;
