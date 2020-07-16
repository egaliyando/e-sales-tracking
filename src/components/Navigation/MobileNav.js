import React from "react";

function MobileNav() {
  return (
    <div className="w-full h-16 shadow-md bg-white grid grid-cols-4 gap-3">
      <img className="m-auto" src={require(`assets/icons/nav/ic_home.svg`)} alt="menu" />
      <img className="m-auto" src={require(`assets/icons/nav/ic_map.svg`)} alt="menu" />
      <img className="m-auto" src={require(`assets/icons/nav/ic_history.svg`)} alt="menu" />
      <img className="m-auto" src={require(`assets/icons/nav/ic_user.svg`)} alt="menu" />
    </div>
  );
}
export default MobileNav;
