import React, { useEffect, useState } from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { Redirect } from "react-router-dom";
import axios from "configs";
import { useDispatch, useSelector } from "react-redux";

function Order() {
  const token = useSelector((state) => state.users.token);

  const [order, setOrder] = useState([]);
  const getOrder = () => {
    const token = localStorage.token;

    axios
      .get(`/checkout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log("response");
        console.log(response);
        setOrder(response.data.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };
  useEffect(() => {
    getOrder();
  }, []);

  if (token === "") {
    return <Redirect to="/admin/auth" />;
  }
  return (
    <div className="flex">
      <Navigation />
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
        <p className="my-3 font-bold">Order</p>
        {/* MODAL */}
        <Table
          data={order}
          thead={["ID", "Date Visit", "Sales", "Address", "Total Price", "Action"]}
          tbody={["id", "address_apotik", "nama_sales", "tanggal", "total_harga"]}
          customAction={"/admin/order/detail"}
        />
      </div>
    </div>
  );
}

export default Order;
