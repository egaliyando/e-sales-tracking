import React from "react";
import Container from "components/Container";
import MobileNav from "components/Navigation/MobileNav";
import Header from "components/Header";

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

function ProductSV() {
  return (
    <Container>
      <Header hSupervisor={true} />
      <div className="p-3">
        <div className="bg-white flex justify-between rounded-lg text-sm p-2 text-gray-500">
          <input className="focus:outline-none ml-1" placeholder="Search product.." type="text" />
          <img src={require(`assets/icons/visit/ic_search.svg`)} alt="search" />
        </div>

        <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
          {listProduct.map((item) => (
            <div className="mt-2" key={item.id}>
              {/* <Link to="/sales/visit/order"> */}
              <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                <div className="flex">
                  <img src={require(`assets/image/obat.png`)} alt="img" />
                  <div className="ml-3">
                    <p className="font-bold text-gray-600">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.price}</p>
                    <p className="text-xs text-gray-600">{item.stock}</p>
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSupervisor={true} />
      </div>
    </Container>
  );
}

export default ProductSV;
