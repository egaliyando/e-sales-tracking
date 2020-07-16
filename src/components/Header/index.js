import React, { useState } from "react";

function Header() {
  const [enable, setEnable] = useState(false);
  return (
    <div className="w-full h-16 flex justify-between px-3 bg-white">
      <button className="self-center focus:outline-none" onClick={() => setEnable(!enable)}>
        {enable ? (
          <img src={require(`assets/icons/header/ic_open.svg`)} alt="btn" />
        ) : (
          <img src={require(`assets/icons/header/ic_close.svg`)} alt="btn" />
        )}
      </button>
      <img className="mr-10" src={require(`assets/icons/header/icon_sales.svg`)} alt="img" />
      <button className="self-center">
        <img src={require(`assets/icons/header/ic_more.svg`)} alt="img" />
      </button>
    </div>
  );
}

export default Header;

//cetak aja dibagian order
//chat ilangin
//ubah english all
