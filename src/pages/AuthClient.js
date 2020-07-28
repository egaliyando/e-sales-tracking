import React from "react";
import Container from "components/Container";
import { Link } from "react-router-dom";

function AuthClient() {
  return (
    <Container>
      <div className="w-full absolute top-0">
        {/* <img
          // style={{ width: "-webkit-fill-available" }}
          className="w-full"
          src={require(`assets/image/auth_style_top.png`)}
          alt="top"
        /> */}
      </div>
      <div style={{ backgroundColor: "#F8F8F8" }} className="flex flex-col h-screen">
        <div className="p-5 m-auto">
          <img className="mx-auto mb-5" src={require(`assets/image/logo.png`)} alt="logo" />
          <input
            style={{ backgroundColor: "#F8F8F8" }}
            className="w-full mb-5 p-3 neumorphism rounded-lg focus:outline-none"
            placeholder="NIK"
            type="text"
          />
          <input
            style={{ backgroundColor: "#F8F8F8" }}
            className="w-full mb-5 p-3 neumorphism rounded-lg focus:outline-none"
            placeholder="Password"
            type="password"
          />
          <Link to="/supervisor/home">
            <button
              style={{ backgroundColor: "#FFA14B" }}
              className="w-full text-white font-bold neumorphism p-3 rounded-lg focus:outline-none"
            >
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* <div className="w-full absolute bottom-0">
        <img
          // style={{ width: "-webkit-fill-available" }}
          className="w-full"
          src={require(`assets/image/auth_style_bot.png`)}
          alt="bot"
        />
      </div> */}
    </Container>
  );
}
export default AuthClient;
