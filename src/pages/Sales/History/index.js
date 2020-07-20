import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";

function History() {
  return (
    <Container>
      <Header hSales={true} />

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} />
      </div>
    </Container>
  );
}

export default History;
