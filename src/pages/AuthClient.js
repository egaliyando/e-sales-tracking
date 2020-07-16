import React from "react";
import Container from "components/Container";

function AuthClient() {
  return (
    <Container>
      <img
        style={{ width: "-webkit-fill-available" }}
        className="absolute top-0"
        src={require(`assets/image/auth_style_top.png`)}
        alt="top"
      />
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
          <button
            style={{ backgroundColor: "#FFA14B" }}
            className="w-full text-white font-bold neumorphism p-3 rounded-lg focus:outline-none"
          >
            Login
          </button>
        </div>
      </div>

      <img
        style={{ width: "-webkit-fill-available" }}
        className="absolute bottom-0"
        src={require(`assets/image/auth_style_bot.png`)}
        alt="bot"
      />
    </Container>
  );
}
export default AuthClient;
