import React, { useState, useEffect } from "react";
import Navigation from "components/Navigation";
import { Redirect } from "react-router-dom";
import axios from "configs";
const token = localStorage.token;

function Detail(props) {
  const [detail, setDetail] = useState([]);

  //detail order sales state
  const [idOrder, setIdOrder] = useState("");
  const [apotikName, setApotikName] = useState([]);
  console.log("apotikName");
  console.log(apotikName);

  const [address, setAddress] = useState("");
  const [sales, setSales] = useState("");
  const [total, setTotal] = useState("");

  const { id } = props.match.params;
  const getDetail = () => {
    const token = localStorage.token;
    axios
      .get(`/checkout/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log("response");
        console.log(response.data.checkout.sale);
        let ttl = [...total];
        ttl.push(response.data.data[0].checkout.total_harga);
        let id = [...idOrder];
        id.push(response.data.data[0].checkout.id);
        setIdOrder(id);
        setTotal(ttl);
        setApotikName(response.data.checkout.apotik.name);
        setAddress(response.data.checkout.apotik.address);
        setSales(response.data.checkout.sale.fullname);

        //list product set
        setDetail(response.data.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
  };

  useEffect(() => {
    getDetail();
  }, []);

  if (token === "") {
    return <Redirect to="/" />;
  }
  return (
    <div className="flex">
      <Navigation />
      <div className="w-11/12">
        <div className="mx-5 p-5 mt-5 bg-white rounded-lg h-auto shadow-md">
          <p className="font-bold pb-5">Detail Order</p>
          <div className="w-full grid grid-cols-2 gap-3 pb-5">
            <p className="text-sm">id_order : {idOrder}</p>
            <p className="text-sm">Apotik : {apotikName}</p>
            <p className="text-sm">Alamat : {address}</p>
            <p className="text-sm">Sales : {sales}</p>
          </div>
          <div style={{ height: "25rem" }} className="overflow-scroll">
            <table className="table-fixed w-full">
              <thead>
                <tr style={{ backgroundColor: "#D5D5D5" }}>
                  <th className="text-left text-sm pl-2 py-2">No</th>
                  <th className="text-left text-sm pl-2 py-2">Produk</th>
                  <th className="text-left text-sm pl-2 py-2">Jumlah</th>
                  <th className="text-left text-sm pl-2 py-2">Harga</th>
                </tr>
              </thead>
              <tbody>
                {detail.map((data, i) => {
                  return (
                    <tr className="border" key={i}>
                      <td className="text-left text-sm pl-2 py-2">
                        <p>{i + 1}</p>
                      </td>
                      <td className="text-left text-sm pl-2 py-2">
                        {" "}
                        <p>{data.product.name}</p>
                      </td>
                      <td className="text-left text-sm pl-2 py-2">
                        {" "}
                        <p>{data.qty}</p>
                      </td>
                      <td className="text-left text-sm pl-2 py-2">
                        <p>{data.price}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="font-bold mt-5">Total Harga : {total}</p>
        </div>
        <button className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
          <img className="w-12 rounded-full shadow-lg" src={require(`assets/icons/ic_print.svg`)} alt="add" />
        </button>
      </div>
    </div>
  );
}

export default Detail;
