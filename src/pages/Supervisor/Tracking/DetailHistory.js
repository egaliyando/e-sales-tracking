import React, { useState, useEffect } from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import axios from "configs";

function DetailHistorySV(props) {
  //deklarasi state product order
  const [listProduct, setListProduct] = useState([]);
  console.log("listProduct");
  console.log(listProduct);

  const [idApotik, setIdApotik] = useState("");
  const { apotik_id } = props.match.params;

  const getCheckout = () => {
    const token = localStorage.token;
    const { id } = props.match.params;
    const apotik = [...idApotik];
    axios
      .get(`/apotik/${apotik_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        apotik.push(res.data.data.id);
        apotik.push(res.data.data.name);
        apotik.push(res.data.data.address);
        apotik.push(res.data.data.image);
        setIdApotik(apotik);
      })
      .catch((err) => {
        console.log(err);
      });

    // axios
    //   .get(`/product/`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("res product");
    //     console.log(res.data.data.data);
    //     let getId = [...idProduct];
    //     for (let i = 0; i < res.data.data.data.length; i++) {
    //       getId.push(res.data.data.data[i].name);
    //     }
    //     setIdProduct(getId);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    axios
      .get(`/supervisor/tracking-sales/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
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
                src={`${process.env.REACT_APP_HOST_HEROKU}${idApotik[3]}`}
                alt="img"
              />
              <div className="ml-3">
                <p className="font-bold text-gray-600">{idApotik[1]}</p>
                <p className="text-xs text-gray-600">{idApotik[2]}</p>
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 p-3">
            <div>
              <p className="font-bold text-gray-600">Waktu tempuh</p>
              <p className="text-gray-600">09:98</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">Jarak tempuh</p>
              <p className="text-gray-600">4 Km</p>
            </div>
            <div>
              <div className="flex mt-5">
                <div>
                  <p className="font-bold text-gray-600">Masuk</p>
                  <p className="text-gray-600">09:98</p>
                </div>
                <div className="ml-2">
                  <p className="font-bold text-gray-600">Selesai</p>
                  <p className="text-gray-600">09:98</p>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <p className="font-bold text-gray-600">Menit/outlet</p>
              <p className="text-gray-600">09:98</p>
            </div>
          </div> */}
        </div>
        <div className="overflow-y-auto h-64 pb-10">
          {listProduct.map((item) => (
            <div className="mt-2" key={item.id}>
              {/* <Link to="/sales/visit/order"> */}
              <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                <div className="flex">
                  <img src={require(`assets/image/obat.png`)} alt="img" />
                  <div className="ml-3">
                    <p className="font-bold text-gray-600">{item.id}</p>
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

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSupervisor={true} {...props} />
      </div>
    </Container>
  );
}

export default DetailHistorySV;
