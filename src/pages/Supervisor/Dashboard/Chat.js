import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";

function ChatSupervisor() {
  return (
    <Container>
      <Header hSupervisor={true} />

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <div className="w-full h-12 bg-white flex justify-between py-2 px-5 mb-1">
          <input className="focus:outline-none w-full" type="text" placeholder="Write Something.." />

          <button className="focus:outline-none">
            <img src={require(`assets/icons/ic_send.svg`)} alt="send" />
          </button>
        </div>
        <MobileNav isSupervisor={true} />
      </div>
    </Container>
  );
}

export default ChatSupervisor;
