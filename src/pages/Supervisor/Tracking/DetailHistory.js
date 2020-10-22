import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import axios from "configs";

function DetailHistorySV(props) {
  //deklarasi state product order
  const [listProduct, setListProduct] = useState([]);

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

  return (
    <Container>
      <Header hSupervisor={true} />

      <div style={{ paddingTop: "4.5rem" }} className="px-3">
        <div className="bg-white rounded-lg w-full">
          <div className="w-full px-3 py-3 justify-between rounded-lg h-auto flex">
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
        <hr className="mt-3" />
        <div className="overflow-y-auto h-64 pb-10">
          <p className="text-xs text-gray-500">Order</p>
          {listProduct.map((item) => (
            <div className="mt-2" key={item.id}>
              {/* <Link to="/sales/visit/order"> */}
              <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
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
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 z-50 max-w-md">
        <MobileNav isSupervisor={true} {...props} />
      </div>
    </Container>
  );
}

export default DetailHistorySV;
