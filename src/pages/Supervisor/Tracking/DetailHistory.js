import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";

const listProduct = [
  {
    id: 1,
    name: "Broncitin",
    price: "Rp. 200.000",
    stock: "12",
  },
  {
    id: 2,
    name: "Bodrex",
    price: "Rp. 10.000",
    stock: "120",
  },
  {
    id: 3,
    name: "Ultraflu",
    price: "Rp. 25.000",
    stock: "120",
  },
];

function DetailHistorySV(props) {
  return (
    <Container>
      <Header hSupervisor={true} />

      <div style={{ paddingTop: "4.5rem" }} className="px-3">
        <div className="bg-white rounded-lg w-full">
          <div className="w-full px-3 pt-3 justify-between rounded-lg h-auto flex">
            <div className="flex">
              <img src={require(`assets/image/apotek.png`)} alt="img" />
              <div className="ml-3">
                <p className="font-bold text-gray-600">Apotik Rossa</p>
                <p className="text-xs text-gray-600">Jl. Abdul muis</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 p-3">
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
          </div>
        </div>
        <div className="overflow-y-auto h-64 pb-10">
          {listProduct.map((item) => (
            <div className="mt-2" key={item.id}>
              {/* <Link to="/sales/visit/order"> */}
              <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                <div className="flex">
                  <img src={require(`assets/image/obat.png`)} alt="img" />
                  <div className="ml-3">
                    <p className="font-bold text-gray-600">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.price}</p>
                    <p className="text-xs text-gray-600">Order : {item.stock}</p>
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
