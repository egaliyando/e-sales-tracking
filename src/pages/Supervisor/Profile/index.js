import React from "react";
import Container from "components/Container";
import Header from "components/Header";
import MobileNav from "components/Navigation/MobileNav";

function ProfileSV(props) {
  return (
    <Container>
      <Header hSupervisor={true} />

      <div style={{ paddingTop: "5rem" }} className="px-3">
        <div className="h-64 w-full rounded-lg flex flex-col justify-center bg-white">
          <img className="m-auto" src={require(`assets/image/sales.png`)} alt="sales" />
          <div className="mb-5">
            <p className="text-2xl text-gray-600 text-center font-bold">Supervisor</p>
            <p className="text-center text-gray-600">21323132</p>
          </div>
        </div>
        <div className="mt-3 bg-white w-full p-5 h-auto flex flex-col justify-center rounded-lg">
          <div className="flex">
            <p className="font-bold  text-gray-600">Address :</p>
            <p className=" ml-10 text-gray-600">Jl. Abdul muis</p>
          </div>
          <div className="flex mt-3">
            <p className="font-bold  text-gray-600">Birthday :</p>
            <p className=" ml-10 text-gray-600">20/12/1998</p>
          </div>
          <div className="flex mt-3">
            <p className="font-bold  text-gray-600">Role :</p>
            <p className="ml-20 text-gray-600">Supervisor</p>
          </div>
        </div>
      </div>

      <div style={{ width: "-webkit-fill-available" }} className="fixed bg-white bottom-0 max-w-md">
        <MobileNav isSupervisor={true} {...props} />
      </div>
    </Container>
  );
}

export default ProfileSV;
