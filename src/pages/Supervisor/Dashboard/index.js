import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <Container>
      <Header hSupervisor={true} />

      <Link to="/supervisor/chat" className="absolute bottom-0 right-0 z-20 mb-16 focus:outline-none">
        <img src={require(`assets/icons/dashboard/ic_chat.svg`)} alt="chat" />
      </Link>
      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSupervisor={true} />
      </div>
    </Container>
  );
}

export default Dashboard;
