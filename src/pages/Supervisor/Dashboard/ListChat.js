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
];

function ListChat() {
  return (
    <Container>
      <Header hSupervisor={true} />

      {listchat.map((item) => (
        <Link to="/supervisor/chat/detail">
          <div className="mt-3 px-3" key={item.id}>
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

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSupervisor={true} />
      </div>
    </Container>
  );
}

export default ListChat;
