import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";

function Profile(props) {
  return (
    <Container>
      <Header hSalesNormal={true} />

      <div style={{ paddingTop: "4.6rem" }} className="p-3">
        <div className="h-64 w-full rounded-lg flex flex-col justify-center bg-white">
          <img className="m-auto" src={require(`assets/image/sales.png`)} alt="sales" />
          <div className="mb-5">
            <p className="text-2xl text-gray-600 text-center font-bold">Sales</p>
            <p className="text-center text-gray-600">21323132</p>
          </div>
        </div>
        <div className="mt-3 bg-white w-full h-16 flex flex-col justify-center rounded-lg">
          <div className="flex">
            <p className="font-bold m-auto text-gray-600">Address :</p>
            <p className="m-auto text-gray-600">Jl. Abdul muis</p>
          </div>
        </div>
      </div>

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSales={true} {...props} />
      </div>
    </Container>
  );
}

export default Profile;
