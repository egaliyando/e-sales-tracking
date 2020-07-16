import React from "react";

function Header() {
  return (
    <div className="w-full h-16 flex justify-between px-3 shadow-md bg-white">
      <img className="self-center" src={require(`assets/icons/header/ic_mores.svg`)} alt="img" />
      <button className="mr-6">
        <img src={require(`assets/icons/header/ic_open.svg`)} alt="btn" />
      </button>
      <img src={require(`assets/icons/header/ic_logo.svg`)} alt="img" />
    </div>
  );
}

export default Header;

//cetak aja dibagian order
//chat ilangin
//ubah english all
