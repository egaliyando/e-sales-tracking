import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
// import { Link } from "react-router-dom";

const listSales = [
  {
    id: 1,
    name: "Budi",
    status: "Active",
  },
  {
    id: 2,
    name: "Arif",
    status: "Close",
  },
  {
    id: 3,
    name: "Melati",
    status: "Active",
  },
];

function Tracking() {
  return (
    <Container>
      <Header hSupervisor={true} />

      <div className="p-3">
        <div className="bg-white flex justify-between rounded-lg text-sm p-2 text-gray-500">
          <input className="focus:outline-none ml-1" placeholder="Search sales.." type="text" />
          <img src={require(`assets/icons/visit/ic_search.svg`)} alt="search" />
        </div>

        <div style={{ height: "28rem" }} className="overflow-y-auto pb-10">
          {listSales.map((item) => (
            <div className="mt-2" key={item.id}>
              <div className="w-full p-2 justify-between rounded-lg bg-white h-auto flex">
                <div className="flex">
                  <img src={require(`assets/image/sales_list.png`)} alt="img" />
                  <div className="ml-3">
                    <p className="font-bold text-gray-600">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.status}</p>
                  </div>
                </div>
              </div>
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
export default Tracking;
