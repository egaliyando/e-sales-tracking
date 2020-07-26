import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";

const listchat = [
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
  {
    id: 4,
    name: "Budi",
    status: "Active",
  },
  {
    id: 5,
    name: "Arif",
    status: "Close",
  },
  {
    id: 6,
    name: "Melati",
    status: "Active",
  },
  {
    id: 7,
    name: "Melati",
    status: "Active",
  },
];

function ListChat(props) {
  return (
    <Container>
      <Header hSupervisor={true} />

      <div style={{ paddingTop: "4.7rem" }} className="px-3">
        <div className="bg-white flex justify-between rounded-lg text-sm p-2 text-gray-500">
          <input className="focus:outline-none ml-1" placeholder="Search chat.." type="text" />
          <img src={require(`assets/icons/visit/ic_search.svg`)} alt="search" />
        </div>
        <div style={{ height: "33rem" }} className="overflow-y-auto pb-20">
          {listchat.map((item) => (
            <Link to="/supervisor/chat/detail">
              <div className="mt-2" key={item.id}>
                <div className="w-full p-2 rounded-lg bg-white h-auto flex">
                  <img src={require(`assets/image/sales_list.png`)} alt="img" />
                  <div className="ml-3">
                    <p className="font-bold text-gray-600">{item.name}</p>
                    <p className="text-xs text-gray-600">Status : {item.status}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSupervisor={true} {...props} />
      </div>
    </Container>
  );
}

export default ListChat;
