import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";

function Dashboard() {
  return (
    <Container>
      <Header />

      <div className="absolute bottom-0 w-full">
        <MobileNav />
      </div>
    </Container>
  );
}

export default Dashboard;
