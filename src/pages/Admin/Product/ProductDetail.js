import React, { useEffect, useState } from "react";
import Navigation from "components/Navigation";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "configs";
import moment from "moment";

export default function ProductDetail(props) {
  const { id } = props.match.params;
  const token = localStorage.token;

  // `${moment("tgl_ex").format("YYYY-MM-DD")}`

  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const formatDate = moment(date).format("YYYY-MM-DD");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");

  const getProduct = () => {
    const token = localStorage.token;
    axios
      .get(`/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setImage(res.data.data.image);
        setDate(res.data.data.date);
        setName(res.data.data.name);
        setStock(res.data.data.stock);
        setPrice(res.data.data.price);
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
          <p className="font-bold text-lg pb-5">Detail Product</p>
          <div className="w-full grid grid-cols-2 gap-3 pb-5">
            <p className="text-md">Product Name : {name}</p>
            <p className="text-md">Price : {price}</p>
            <p className="text-md">Stock : {stock}</p>
            <p className="text-md">Expired : {formatDate}</p>
            <img className="self-center h-32 w-32" src={`${process.env.REACT_APP_HOST_HEROKU}${image}`} alt="img" />
          </div>
        </div>
      </div>
    </div>
  );
}
