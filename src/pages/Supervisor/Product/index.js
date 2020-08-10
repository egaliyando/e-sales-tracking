import React, { useState, useEffect } from "react";
import Container from "components/Container";
import MobileNav from "components/Navigation/MobileNav";
import Header from "components/Header";
import axios from "configs";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function ProductSV(props) {
  const [data, setData] = useState([]);
  console.log("product");
  console.log(data);
  const getProduct = () => {
    const token = localStorage.token;
    axios
      .get(`/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Container>
      <Header hSupervisor={true} />
      <div style={{ paddingTop: "4.5rem" }} className="px-3">
        <div className="bg-white flex justify-between rounded-lg text-sm p-2 text-gray-500">
          <input className="focus:outline-none ml-1" placeholder="Search product.." type="text" />
          <img src={require(`assets/icons/visit/ic_search.svg`)} alt="search" />
        </div>
      </div>
      <div className="px-3">
        <div style={{ height: "33rem" }} className="overflow-y-auto pb-20">
          {data.map((data, i) => {
            return (
              <div className="mt-2" key={i}>
                <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                  <div className="flex">
                    <img className="h-16 w-16" src={`${process.env.REACT_APP_HOST_HEROKU}${data.image}`} alt="img" />
                    <div className="ml-3">
                      <p className="font-bold text-gray-600">{data.name}</p>
                      <p className="text-xs text-gray-600">{data.price}</p>
                      <p className="text-xs text-gray-600">Stock : {data.stock}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSupervisor={true} {...props} />
      </div>
    </Container>
  );
}

export default ProductSV;
