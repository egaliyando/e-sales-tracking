import React from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Order() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);

  if (token === "") {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex">
      <Navigation />
      <div
        style={{ backgroundColor: "#F7F7F7" }}
        className="w-11/12 p-3 relative"
      >
        <p className="my-3 font-bold">Order</p>
        {/* MODAL */}
        <Table
          thead={[
            "No",
            "Tanggal",
            "Nama Sales",
            // "Nama Apotik",
            "Address",
            // "Nama Produk",
            // "Jumlah Produk",
            "Total Harga",
            // "Notes",
            // "Image",
            "Status",
            "Aksi",
          ]}
          tbody={[
            "1",
            "12/12/20",
            "Okta",
            // "Apotik Rossa",
            "Jl, Z.A Pagaralam",
            // "Broncitin",
            // "12",
            "Rp.200.000",
            // "....",
            // "img.jpg", masuk detail
            "Order/Tidak",
            <Link
              to="/admin/order/detail"
              className="bg-green-500 px-2 py-1 rounded-lg text-white"
            >
              Detail
            </Link>,
          ]}
        />
      </div>
    </div>
  );
}

export default Order;
