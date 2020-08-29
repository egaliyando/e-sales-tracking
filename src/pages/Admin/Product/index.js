import React, { useEffect, useState } from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { Link, Redirect } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "configs";
import { useSelector } from "react-redux";

export default function Product(props) {
  const token = useSelector((state) => state.users.token);

  const [product, setProduct] = useState([]);

  const MySwal = withReactContent(Swal);

  const getProduct = () => {
    const token = localStorage.token;
    axios
      .get(`/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.data.length);
        setProduct(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.token;
    MySwal.fire({
      title: "Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        MySwal.fire("Delete Success!", "", "Canceled");
        axios
          .delete(`/product/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(function (response) {
            getProduct();
            props.history.push("/admin/product");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  if (token === "") {
    return <Redirect to="/admin/auth" />;
  }
  return (
    <div className="flex">
      <Navigation />
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
        <p className="my-3 font-bold">Product</p>
        {/* MODAL */}
        <Table
          data={product}
          thead={["ID", "Product Name", "Price", "Stock", "Action"]}
          tbody={["id", "name", "price", "stock"]}
          editUrl={"/admin/product/edit"}
          deleteAction={(id) => {
            handleDelete(id);
          }}
          customAction={"/admin/product/detail"}
        />
      </div>
      <Link to="/admin/product/add" className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
        <img className="w-12 rounded-full shadow-lg " src={require(`assets/icons/ic_add.svg`)} alt="add" />
      </Link>
    </div>
  );
}
