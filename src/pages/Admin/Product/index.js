import React, { useEffect } from "react";
import Navigation from "components/Navigation";
import Table from "components/Table";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "store/actions/product";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "configs";

export default function Product(props) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const product = useSelector((state) => state.product.product);
  // console.log(product);
  const MySwal = withReactContent(Swal);

  const getProduct = () => {
    dispatch(fetchProduct());
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
            // console.log(response);
            getProduct();
            props.history.push("/admin/product");
          })
          .catch(function (error) {
            console.log(error.response);
          });
      }
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
      <div style={{ backgroundColor: "#F7F7F7" }} className="w-11/12 p-3 relative">
        <p className="my-3 font-bold">Product</p>
        {/* MODAL */}
        <Table
          data={product.data}
          thead={["No", "Product Name", "Expired", "Price", "Stock", "Image", "Action"]}
          tbody={["id", "name", "tgl_ex", "price", "stock", "image"]}
          editUrl={"/admin/product/edit"}
          deleteAction={(id) => {
            handleDelete(id);
          }}
        />
      </div>
      <Link to="/admin/product/add" className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
        <img className="w-12 rounded-full shadow-lg " src={require(`assets/icons/ic_add.svg`)} alt="add" />
      </Link>
    </div>
  );
}
