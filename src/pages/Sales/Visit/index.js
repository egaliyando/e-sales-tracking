import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import axios from "configs";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
function Visit(props) {
  const token = useSelector((state) => state.users.token);

  const [status, setstatus] = useState();

  //untuk cek today
  const date = new Date();
  //ubah format tanggalnya
  const dateFormat = moment(date).format("DD-MM-YYYY");
  //bikin state untuk mapping
  const [dayTrip, setDayTrip] = useState([]);
  console.log("dayTrip");
  console.log(dayTrip);

  const sales_id = localStorage.sales_id;

  const getUser = () => {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;
    axios
      .get(`/users/${sales_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setstatus(res.data.data.status);
        console.log(res.data.data.status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        let arrayTemp = [...dayTrip];
        for (let i = 0; i < res.data.data.length; i++) {
          arrayTemp.push([
            res.data.data[i].id,
            //ini poin pentinf dalam filter nya
            moment(res.data.data[i].trip.day).format("DD-MM-YYYY"),
            res.data.data[i].trip.apotik.name,
            res.data.data[i].trip.apotik.address,
            res.data.data[i].trip.apotik.image,
            res.data.data[i].trip.apotik.id,
          ]);
        }
        setDayTrip(arrayTemp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
    getRute();
  }, []);
  if (token === "") {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <Header hSalesNormal={true} />
      <div style={{ paddingTop: "4.7rem" }} className="px-3">
        <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
          {status === "Open" ? (
            dayTrip.length > 0 ? (
              //sebelum di mapping di filter dulu kek gini
              dayTrip
                .filter((days) => days.includes(dateFormat))
                .map((item, i) => {
                  return (
                    <div className="mt-2" key={i}>
                      <Link to={`/sales/visit/detail-visit/${sales_id}/${item[0]}/${item[5]}`}>
                        <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                          <div className="flex">
                            <img
                              className="self-center h-16 w-16"
                              src={`${process.env.REACT_APP_HOST_HEROKU}${item[4]}`}
                              alt="img"
                            />
                            <div className="ml-3">
                              <p className="font-bold text-gray-600">{item[2]}</p>
                              <p className="text-xs text-gray-600">{item[3]}</p>
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
            ) : (
              ""
            )
          ) : (
            <p className="ml-3 text-red-500 font-bold">Open Day First!</p>
          )}
        </div>
      </div>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default Visit;
