import React, { useState, useEffect } from "react";
import Container from "components/Container";
import MobileNav from "components/Navigation/MobileNav";
import Header from "components/Header";
import axios from "configs";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function ProductSV(props) {
  //deklarasi state untuk search
  const [searchTerm, setSearchTerm] = useState("");
  //state data product dengan search
  const [searchResults, setSearchResults] = useState([]);

  //handle change search
  const handleChange = (e) => {
    if (e.target.value === "") {
      getProduct();
      setSearchTerm(e.target.value);
    } else {
      setSearchTerm(e.target.value);
    }
  };
  const getProduct = () => {
    const token = localStorage.token;
    axios
      .get(`/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSearchResults(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const results = searchResults.filter((data) => data.name.toLowerCase().includes(searchTerm));
    setSearchResults(results);
  }, [searchTerm]);

  useEffect(() => {
    getProduct();
  }, []);

  const token = useSelector((state) => state.users.token);
  if (token === "") {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Header hSupervisor={true} />
      <div style={{ paddingTop: "4.5rem" }} className="px-3">
        <div className="bg-white flex justify-between rounded-lg text-sm p-2 text-gray-500">
          <input
            value={searchTerm}
            onChange={handleChange}
            className="focus:outline-none ml-1"
            placeholder="Search product.."
            type="text"
          />
          <img src={require(`assets/icons/visit/ic_search.svg`)} alt="search" />
        </div>
      </div>
      <div className="px-3">
        <div style={{ height: "33rem" }} className="overflow-y-auto pb-20">
          {searchResults.map((data, i) => {
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
