import React, { useState } from "react";
import Container from "components/Container";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { LOADING, LOADING_FINISH, SET_TOKEN } from "store/types";
import axios from "configs";

function AuthClient(props) {
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
  console.log(data);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSingin = () => {
    dispatch({ type: LOADING });
    axios
      .post("/sales/signin", data)
      .then((res) => {
        console.log(res);

        if (res.data.data.checkUser.role === "sales") {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("sales_id", res.data.data.checkUser.sales[0].id);
          dispatch({ type: SET_TOKEN, token: res.data.data });
          dispatch({ type: LOADING_FINISH });
          props.history.push("/sales/dashboard");
        } else if (res.data.data.checkUser.role === "supervisor") {
          localStorage.setItem("token", res.data.data.token);
          dispatch({ type: SET_TOKEN, token: res.data.data });
          dispatch({ type: LOADING_FINISH });
          props.history.push("/supervisor/home");
        } else if (res.data.code === 404) {
          dispatch({ type: LOADING_FINISH });
          console.error(res.data);
          alert(res.data.message);
        } else if (res.data.code === 403) {
          dispatch({ type: LOADING_FINISH });
          alert(res.data.message);
        }
      })
      .catch((err) => {
        dispatch({ type: LOADING_FINISH });
        console.log(err.response);
        // alert("error catch");
      });
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
