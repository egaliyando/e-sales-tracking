import React, { useState } from "react";
import Container from "components/Container";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { LOADING, LOADING_FINISH, SET_TOKEN } from "store/types";
import axios from "configs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AuthClient(props) {
  const MySwal = withReactContent(Swal);
  //this hook gives us redux store state
  const loading = useSelector((state) => state.loading.loading);
  const token = useSelector((state) => state.users.token);
  //this hook gives us dispatch method
  const dispatch = useDispatch();

  const [data, setData] = useState({
    nik: "",
    password: "",
    isError: { status: false, message: "" },
  });
  // console.log(data);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSingin = async () => {
    try {
      dispatch({ type: LOADING });
      const auth = await axios.post("/sales/signin", data);
      if (auth.data.code === 404) {
        dispatch({ type: LOADING_FINISH });
        MySwal.fire("Username or Password is wrong");
      } else if (auth.data.code === 403) {
        dispatch({ type: LOADING_FINISH });
        MySwal.fire("Password is wrong");
      } else if (auth.data.data.checkUser.role === "sales") {
        localStorage.setItem("token", auth.data.data.token);
        localStorage.setItem("sales_id", auth.data.data.checkUser.sales[0].id);
        dispatch({ type: SET_TOKEN, token: auth.data.data });
        dispatch({ type: LOADING_FINISH });
        props.history.push("/sales/dashboard");
      } else if (auth.data.data.checkUser.role === "supervisor") {
        localStorage.setItem("token", auth.data.data.token);
        localStorage.setItem("spv_id", auth.data.data.checkUser.sales[0].id);
        dispatch({ type: SET_TOKEN, token: auth.data.data });
        dispatch({ type: LOADING_FINISH });
        props.history.push("/supervisor/home");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
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
            type="number"
            name="nik"
            value={data.nik}
            onChange={handleChange}
          />
          <input
            style={{ backgroundColor: "#F8F8F8" }}
            className="w-full mb-5 p-3 neumorphism rounded-lg focus:outline-none"
            placeholder="Password"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
          />
          {loading === false ? (
            <button
              onClick={handleSingin}
              style={{ backgroundColor: "#FFA14B" }}
              className="w-full text-white font-bold neumorphism p-3 rounded-lg focus:outline-none"
            >
              Login
            </button>
          ) : (
            <ClipLoader
              // css={override}
              size={30}
              color={"#123abc"}
              loading={loading}
            />
          )}
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
