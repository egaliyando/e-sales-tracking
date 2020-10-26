import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import axios from "configs";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile(props) {
  const token = useSelector((state) => state.users.token);

  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [address, setAddress] = useState("");
  const [birthDay, setBirthday] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");

  const formatBirthday = moment(birthDay).format("DD-MM-YYYY");

  const getProfile = () => {
    const token = localStorage.token;
    const sales_id = localStorage.sales_id;
    axios
      .get(`/users/${sales_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setName(res.data.data.fullname);
        setNik(res.data.data.user.nik);
        setAddress(res.data.data.address);
        setBirthday(res.data.data.ttl);
        setRole(res.data.data.user.role);
        setImage(res.data.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfile();
  });
  if (token === "") {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <Header hSalesNormal={true} />

      <div className="px-3 pt-20">
        <div className="h-64 w-full rounded-lg flex flex-col justify-center bg-white">
          <img
            className="self-center mt-5 h-24 w-25 rounded-full"
            src={`${process.env.REACT_APP_HOST_HEROKU}${image}`}
            alt="img"
          />
          <div className="mb-5 mt-3">
            <p className="text-2xl text-gray-600 text-center font-bold">{name}</p>
            <p className="text-center text-gray-600">{nik}</p>
          </div>
        </div>
        <div className="mt-3 bg-white w-full p-5 h-auto flex flex-col justify-center rounded-lg">
          <div className="flex">
            <p className="font-bold  text-gray-600">Address :</p>
            <p className=" ml-10 text-gray-600">{address}</p>
          </div>
          <div className="flex mt-3">
            <p className="font-bold  text-gray-600">Birthday :</p>
            <p className=" ml-10 text-gray-600">{formatBirthday}</p>
          </div>
          <div className="flex mt-3">
            <p className="font-bold  text-gray-600">Role :</p>
            <p className="ml-20 text-gray-600">{role}</p>
          </div>
        </div>
      </div>

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default Profile;
