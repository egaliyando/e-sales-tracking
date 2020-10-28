import React, { useState, useEffect, createRef } from "react";
import Navigation from "components/Navigation";
import { Redirect } from "react-router-dom";
import axios from "configs";
import moment from "moment";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ReactToPdf from "react-to-pdf";

const token = localStorage.token;

function Detail(props) {
  const [detail, setDetail] = useState([]);

  const ref = createRef();
  const options = {
    orientation: "landscape",
  };

  //detail order sales state
  const [idOrder, setIdOrder] = useState("");
  const [apotikName, setApotikName] = useState([]);
  const [address, setAddress] = useState("");
  const [sales, setSales] = useState("");
  const [total, setTotal] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState("");

  const dateFormat = moment(date).format("LLLL");

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
        console.log(response);
        let ttl = [...total];
        ttl.push(response.data.data[0].checkout.total_harga);
        let id = [...idOrder];
        id.push(response.data.data[0].checkout.id);
        setIdOrder(id);
        setTotal(ttl);
        setApotikName(response.data.checkout.apotik.name);
        setAddress(response.data.checkout.apotik.address);
        setSales(response.data.checkout.sale.fullname);
        setDate(response.data.checkout.updatedAt);
        setNote(response.data.checkout.notes);
        setImage(response.data.checkout.image);

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
          <div ref={ref} className="p-2">
            <p className="font-bold pb-5">Detail Order</p>
            <div className="w-full grid grid-cols-2 gap-3 pb-5">
              <p className="text-sm">id_order : {idOrder}</p>
              <p className="text-sm">Sales : {sales}</p>
              <p className="text-sm">Trip : {apotikName}</p>
              <p className="text-sm">Date Order : {dateFormat}</p>
              <p className="text-sm">Address : {address}</p>
              <div>
                <p className="text-sm">Note : {note}</p>
                <img
                  className="self-center h-16 w-16 mt-5"
                  src={`${process.env.REACT_APP_HOST_HEROKU}${image}`}
                  alt="img"
                />
              </div>
            </div>
            <div style={{ height: "16rem" }} className="overflow-scroll">
              <table id="table-to-xls" className="table-fixed w-full">
                <thead>
                  <tr style={{ backgroundColor: "#D5D5D5" }}>
                    <th className="text-left text-sm pl-2 py-2">NO</th>
                    <th className="text-left text-sm pl-2 py-2">Name</th>
                    <th className="text-left text-sm pl-2 py-2">Qty</th>
                    <th className="text-left text-sm pl-2 py-2">Price</th>
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
            <p className="font-bold mt-5">Total : {total}</p>
          </div>
        </div>

        <ReactToPdf targetRef={ref} options={options} filename="laporan-order.pdf">
          {({ toPdf }) => (
            <button onClick={toPdf} className="absolute bottom-0 focus:outline-none right-0 mb-10 mr-10">
              <img className="w-12 rounded-full shadow-lg" src={require(`assets/icons/ic_print.svg`)} alt="add" />
            </button>
          )}
        </ReactToPdf>
      </div>
    </div>
  );
}

export default Detail;
