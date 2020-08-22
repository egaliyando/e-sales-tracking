import React from "react";
import { Link } from "react-router-dom";

function Sales(props) {
  const sales_id = localStorage.sales_id;
  const getNavigationActive = (path) => {
    return props.location.pathname === path ? "self-center" : "self-center";
  };

  return (
    <div className="w-full h-16 shadow-md bg-white grid grid-cols-4 gap-3">
      <Link className={`${getNavigationActive("/sales/dashboard")}`} to="/sales/dashboard">
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="23.024"
          height="25.249"
          viewBox="0 0 23.024 25.249"
        >
          <g id="Icon_feather-home" data-name="Icon feather-home" transform="translate(1.5 1.5)">
            <path
              id="Path_25"
              data-name="Path 25"
              d="M4.5,10.787,14.512,3l10.012,7.787V23.024A2.225,2.225,0,0,1,22.3,25.249H6.725A2.225,2.225,0,0,1,4.5,23.024Z"
              transform="translate(-4.5 -3)"
              fill="none"
              stroke={`${props.location.pathname === "/sales/dashboard" ? "#FF8E48" : "#bcbcbc"}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <path
              id="Path_26"
              data-name="Path 26"
              d="M13.5,29.124V18h6.675V29.124"
              transform="translate(-6.825 -6.876)"
              fill="none"
              stroke={`${props.location.pathname === "/sales/dashboard" ? "#FF8E48" : "#bcbcbc"}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </g>
        </svg>
      </Link>
      <Link className={`${getNavigationActive("/sales/visit")}`} to="/sales/visit">
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="20.024"
          height="26.699"
          viewBox="0 0 20.024 26.699"
        >
          <path
            id="Icon_awesome-map-marker-alt"
            data-name="Icon awesome-map-marker-alt"
            d="M8.983,26.16C1.406,15.176,0,14.049,0,10.012a10.012,10.012,0,1,1,20.024,0c0,4.037-1.406,5.164-8.983,16.148a1.252,1.252,0,0,1-2.058,0Zm1.029-11.976A4.172,4.172,0,1,0,5.84,10.012,4.172,4.172,0,0,0,10.012,14.184Z"
            fill={`${props.location.pathname === "/sales/visit" ? "#FF8E48" : "#bcbcbc"}`}
          />
        </svg>
      </Link>
      <Link className={`${getNavigationActive(`/sales/history/${sales_id}`)}`} to={`/sales/history/${sales_id}`}>
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="25.864"
          height="25.864"
          viewBox="0 0 25.864 25.864"
        >
          <path
            id="Icon_awesome-history"
            data-name="Icon awesome-history"
            d="M26.427,13.47A12.933,12.933,0,0,1,5.379,23.563a1.251,1.251,0,0,1-.1-1.857l.588-.588a1.254,1.254,0,0,1,1.663-.1A9.6,9.6,0,1,0,6.921,6.5L9.567,9.15a.834.834,0,0,1-.59,1.424H1.4A.834.834,0,0,1,.563,9.74V2.16a.834.834,0,0,1,1.424-.59L4.561,4.144A12.932,12.932,0,0,1,26.427,13.47Zm-9.434,4.108.512-.659a1.251,1.251,0,0,0-.22-1.756l-2.122-1.651V8.071A1.251,1.251,0,0,0,13.912,6.82h-.834a1.251,1.251,0,0,0-1.251,1.251v7.074L15.237,17.8a1.252,1.252,0,0,0,1.756-.22Z"
            transform="translate(-0.563 -0.563)"
            fill={`${props.location.pathname === `/sales/history/${sales_id}` ? "#FF8E48" : "#bcbcbc"}`}
          />
        </svg>
      </Link>
      <Link className={`${getNavigationActive(`/sales/history/${sales_id}`)}`} to="/sales/profile">
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="24.894"
          height="24.894"
          viewBox="0 0 24.894 24.894"
        >
          <path
            id="Icon_awesome-user-alt"
            data-name="Icon awesome-user-alt"
            d="M12.447,14a7,7,0,1,0-7-7A7,7,0,0,0,12.447,14Zm6.223,1.556H15.991a8.464,8.464,0,0,1-7.089,0H6.223A6.223,6.223,0,0,0,0,21.782v.778a2.334,2.334,0,0,0,2.334,2.334H22.56a2.334,2.334,0,0,0,2.334-2.334v-.778A6.223,6.223,0,0,0,18.67,15.559Z"
            fill={`${props.location.pathname === "/sales/profile" ? "#FF8E48" : "#bcbcbc"}`}
          />
        </svg>
      </Link>
    </div>
  );
}

function Supervisor(props) {
  const getNavigationActive = (path) => {
    return props.location.pathname === path ? "self-center" : "self-center";
  };
  return (
    <div className="w-full h-16 shadow-md bg-white grid grid-cols-5 gap-3">
      <Link className={`${getNavigationActive("/supervisor/home")}`} to="/supervisor/home">
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="23.024"
          height="25.249"
          viewBox="0 0 23.024 25.249"
        >
          <g id="Icon_feather-home" data-name="Icon feather-home" transform="translate(1.5 1.5)">
            <path
              id="Path_25"
              data-name="Path 25"
              d="M4.5,10.787,14.512,3l10.012,7.787V23.024A2.225,2.225,0,0,1,22.3,25.249H6.725A2.225,2.225,0,0,1,4.5,23.024Z"
              transform="translate(-4.5 -3)"
              fill="none"
              stroke={`${props.location.pathname === "/supervisor/home" ? "#FF8E48" : "#bcbcbc"}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
            <path
              id="Path_26"
              data-name="Path 26"
              d="M13.5,29.124V18h6.675V29.124"
              transform="translate(-6.825 -6.876)"
              fill="none"
              stroke={`${props.location.pathname === "/supervisor/home" ? "#FF8E48" : "#bcbcbc"}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </g>
        </svg>
      </Link>
      <Link className={`${getNavigationActive("/supervisor/product-sv")}`} to="/supervisor/product-sv">
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="19.162"
          height="25.549"
          viewBox="0 0 19.162 25.549"
        >
          <path
            id="Icon_awesome-file-download"
            data-name="Icon awesome-file-download"
            d="M11.178,6.787V0H1.2A1.2,1.2,0,0,0,0,1.2V24.352a1.2,1.2,0,0,0,1.2,1.2H17.964a1.2,1.2,0,0,0,1.2-1.2V7.984H12.375A1.2,1.2,0,0,1,11.178,6.787Zm3.815,10.547-4.811,4.776a.851.851,0,0,1-1.2,0L4.17,17.334a.8.8,0,0,1,.561-1.365H7.984V11.976a.8.8,0,0,1,.8-.8h1.6a.8.8,0,0,1,.8.8v3.992H14.43A.8.8,0,0,1,14.993,17.334ZM18.813,5.24,13.927.349A1.2,1.2,0,0,0,13.079,0h-.3V6.387h6.387v-.3A1.194,1.194,0,0,0,18.813,5.24Z"
            fill={`${props.location.pathname === "/supervisor/product-sv" ? "#FF8E48" : "#bcbcbc"}`}
          />
        </svg>
      </Link>
      <Link className={`${getNavigationActive("/supervisor/visit-sv")}`} to="/supervisor/visit-sv">
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="20.024"
          height="26.699"
          viewBox="0 0 20.024 26.699"
        >
          <path
            id="Icon_awesome-map-marker-alt"
            data-name="Icon awesome-map-marker-alt"
            d="M8.983,26.16C1.406,15.176,0,14.049,0,10.012a10.012,10.012,0,1,1,20.024,0c0,4.037-1.406,5.164-8.983,16.148a1.252,1.252,0,0,1-2.058,0Zm1.029-11.976A4.172,4.172,0,1,0,5.84,10.012,4.172,4.172,0,0,0,10.012,14.184Z"
            fill={`${props.location.pathname === "/supervisor/visit-sv" ? "#FF8E48" : "#bcbcbc"}`}
          />
        </svg>
      </Link>
      <Link className={`${getNavigationActive("/supervisor/sales-track")}`} to="/supervisor/sales-track">
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="31.274"
          height="27.799"
          viewBox="0 0 31.274 27.799"
        >
          <path
            id="Icon_awesome-map-marked-alt"
            data-name="Icon awesome-map-marked-alt"
            d="M15.637,0A6.841,6.841,0,0,0,8.8,6.841c0,3.055,4.471,8.622,6.184,10.643a.856.856,0,0,0,1.314,0c1.713-2.021,6.184-7.588,6.184-10.643A6.841,6.841,0,0,0,15.637,0Zm0,9.122a2.28,2.28,0,1,1,2.28-2.28A2.28,2.28,0,0,1,15.637,9.122Zm-14.545,2.6A1.738,1.738,0,0,0,0,13.338V26.93a.869.869,0,0,0,1.191.807l7.5-3.412V11.669a16.443,16.443,0,0,1-1.154-2.52Zm14.545,7.8a2.594,2.594,0,0,1-1.982-.921c-1.067-1.26-2.2-2.694-3.23-4.166v9.882L20.85,27.8V14.443c-1.027,1.471-2.162,2.906-3.23,4.166A2.6,2.6,0,0,1,15.637,19.529ZM30.083,8.75l-7.5,3.412V27.8l7.595-3.038a1.737,1.737,0,0,0,1.092-1.613V9.557A.869.869,0,0,0,30.083,8.75Z"
            fill={`${props.location.pathname === "/supervisor/sales-track" ? "#FF8E48" : "#bcbcbc"}`}
          />
        </svg>
      </Link>
      <Link className={`${getNavigationActive("/supervisor/profile")}`} to="/supervisor/profile">
        <svg
          className="m-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="24.894"
          height="24.894"
          viewBox="0 0 24.894 24.894"
        >
          <path
            id="Icon_awesome-user-alt"
            data-name="Icon awesome-user-alt"
            d="M12.447,14a7,7,0,1,0-7-7A7,7,0,0,0,12.447,14Zm6.223,1.556H15.991a8.464,8.464,0,0,1-7.089,0H6.223A6.223,6.223,0,0,0,0,21.782v.778a2.334,2.334,0,0,0,2.334,2.334H22.56a2.334,2.334,0,0,0,2.334-2.334v-.778A6.223,6.223,0,0,0,18.67,15.559Z"
            fill={`${props.location.pathname === "/supervisor/profile" ? "#FF8E48" : "#bcbcbc"}`}
          />
        </svg>
      </Link>
    </div>
  );
}

function MobileNav(props) {
  const isSales = props.isSales;
  const isSupervisor = props.isSupervisor;
  if (isSales) {
    return <Sales {...props} />;
  }
  if (isSupervisor) {
    return <Supervisor {...props} />;
  }
  return <div>Null</div>;
}
export default MobileNav;
