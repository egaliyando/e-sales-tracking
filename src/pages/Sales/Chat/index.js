import React from "react";
import Header from "components/Header";
import Container from "components/Container";
import MobileNav from "components/Navigation/MobileNav";

function ChatSales() {
  return (
    <Container>
      <Header hSales={true} />

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-gray-200 bottom-0 max-w-md">
        <div className="w-full h-12 bg-white flex justify-between py-2 px-5 mb-1">
          <input className="focus:outline-none w-full" type="text" placeholder="Write Something.." />

          <button className="focus:outline-none">
            <img src={require(`assets/icons/ic_send.svg`)} alt="send" />
          </button>
        </div>
        <MobileNav isSales={true} />
      </div>
    </Container>
  );
}

export default ChatSales;

//done gausah
