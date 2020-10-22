import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link, Redirect } from "react-router-dom";
import axios from "configs";
import { useSelector } from "react-redux";

function DetailHistory(props) {
  const sales_id = localStorage.sales_id;

  const [listProduct, setListProduct] = useState([]);
  const token = useSelector((state) => state.users.token);

  const getCheckout = () => {
    const token = localStorage.token;
    const { checkout_id } = props.match.params;

    axios
      .get(`/supervisor/tracking-sales/detail/${checkout_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res.data.data");
        console.log(res.data.data);
        setListProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCheckout();
  }, []);
  if (token === "") {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <Header hSalesNormal={true} />

      {/* Apotik Name Detail */}
      <div className="px-3 pt-16">
        <div className="mt-2">
          <p className="text-gray-600 text-xs mb-1">Detail History</p>

          <div className="w-full p-2 bg-white justify-between rounded-lg h-auto flex">
            <div className="flex">
              <img
                className="self-center h-16 w-16"
                src={`${process.env.REACT_APP_HOST_HEROKU}${
                  listProduct.length > 0 ? listProduct[0].checkout.apotik.image : ""
                }`}
                alt="img"
              />
              <div className="ml-3">
                <p className="font-bold text-gray-600">
                  {listProduct.length > 0 ? listProduct[0].checkout.apotik.name : ""}
                </p>
                <p className="text-xs text-gray-600">
                  {listProduct.length > 0 ? listProduct[0].checkout.apotik.address : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-3" />

        {/* LIST PRODUCT IS ORDER */}
        <div className="mt-2">
          <p className="text-gray-600 text-xs mb-1">Product Order</p>

          {listProduct.map((item, i) => (
            <div key={i} className="w-full mt-2 p-2 justify-between rounded-lg bg-white h-auto flex">
              <div className="flex">
                <img
                  className="self-center h-16 w-16"
                  src={`${process.env.REACT_APP_HOST_HEROKU}${item.product ? item.product.image : ""}`}
                  alt="img"
                />
                <div className="ml-3">
                  <p className="font-bold text-gray-600">{item.product ? item.product.name : ""}</p>
                  <p className="text-xs text-gray-600">Price : {item.price}</p>
                  <p className="text-xs text-gray-600">Order : {item.qty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link to={`/sales/history/${sales_id}`} className="absolute bottom-0 right-0 z-20 mb-16 focus:outline-none">
        <img src={require(`assets/icons/visit/ic_close.svg`)} alt="add" />
      </Link>

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default DetailHistory;
