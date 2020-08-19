import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import axios from "configs";
import { Link } from "react-router-dom";

function Visit(props) {
  const [listRute, setListRute] = useState([]);

  const getRute = () => {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;

    axios
      .get(`/sales/trip-single-sales/${sales_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListRute(res.data.data);
        console.log("sales rute");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRute();
  }, []);

  return (
    <Container>
      <Header hSalesNormal={true} />
      <div style={{ paddingTop: "4.7rem" }} className="px-3">
        <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
          {listRute.length > 0
            ? listRute.map((item, i) => {
                return (
                  <div className="mt-2" key={i}>
                    <Link to={`/sales/visit/detail-visit/${item.id}`}>
                      <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                        <div className="flex">
                          <img
                            className="self-center h-16 w-16"
                            src={`${process.env.REACT_APP_HOST_HEROKU}${item.trip.apotik.image}`}
                            alt="img"
                          />
                          <div className="ml-3">
                            <p className="font-bold text-gray-600">{item.trip.apotik.name}</p>
                            <p className="text-xs text-gray-600">{item.trip.apotik.address}</p>
                          </div>
                        </div>
                        <button className="mr-3 focus:outline-none">
                          <img src={require(`assets/icons/card/ic_arrow.svg`)} alt="img" />
                        </button>
                      </div>
                    </Link>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default Visit;
