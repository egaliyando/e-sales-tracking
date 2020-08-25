import React, { useEffect, useState } from "react";
import Navigation from "components/Navigation";
import { Link, Redirect } from "react-router-dom";
import axios from "configs";
import moment from "moment";

export default function DetailTrip(props) {
  const { id } = props.match.params;
  const token = localStorage.token;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [address, setAddress] = useState("");
  const [dayTrip, setDayTrip] = useState("");

  const dateFormat = moment(dayTrip).format("YYYY-MM-DD");

  const getProduct = () => {
    const token = localStorage.token;
    axios
      .get(`/trip/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setImage(res.data.data.apotik.image);
        setDayTrip(res.data.data.day);
        setName(res.data.data.apotik.name);
        setAddress(res.data.data.apotik.address);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (token === "") {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex">
      <Navigation />
      <div className="w-11/12">
        <div className="mx-5 p-5 mt-5 bg-white rounded-lg h-auto shadow-md">
          <p className="font-bold text-lg pb-5">Detail Trip</p>
          <div className="w-full grid grid-cols-2 gap-3 pb-5">
            <p className="text-md">Trip Name : {name}</p>
            <p className="text-md">Address : {address}</p>
            <p className="text-md">Trip Date : {dateFormat}</p>
            <img className="self-center h-32 w-32" src={`${process.env.REACT_APP_HOST_HEROKU}${image}`} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
}
