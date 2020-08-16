import React from "react";
import Popper from "popper.js";
import { Link } from "react-router-dom";

const Popover = ({ color }) => {
  const [popoverShow, setPopoverShow] = React.useState(false);
  const btnRef = React.createRef();
  const popoverRef = React.createRef();
  const openPopover = () => {
    new Popper(btnRef.current, popoverRef.current, {
      placement: "bottom",
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full text-center">
          <button
            className="self-center focus:outline-none"
            onClick={() => {
              popoverShow ? closePopover() : openPopover();
            }}
            ref={btnRef}
          >
            <img src={require(`assets/icons/header/ic_more.svg`)} alt="img" />
          </button>
          <div
            className={
              (popoverShow ? "" : "hidden ") +
              "bg-white shadow-lg  border-gray-200 mt-3 z-50 text-sm max-w-xs rounded-lg"
            }
            ref={popoverRef}
          >
            <Link to="/client/logout">
              <div>
                <div
                  className={
                    "text-black opacity-75 font-semibold p-3 mb-0 border-b border-solid border-gray-200 rounded-lg"
                  }
                >
                  Logout
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default function PopoverRender() {
  return <Popover />;
}
