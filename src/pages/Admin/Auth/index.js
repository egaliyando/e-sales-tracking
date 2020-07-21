import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { LOADING, LOADING_FINISH, SET_TOKEN } from "store/types";
import axios from "configs";

function Auth(props) {
  //this hook gives us redux store state
  const loading = useSelector((state) => state.loading.loading);
  const token = useSelector((state) => state.users.token);
  //this hook gives us dispatch method
  const dispatch = useDispatch();

  const [data, setData] = useState({
    username: "",
    password: "",
    isError: { status: false, message: "" },
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSingin = () => {
    dispatch({ type: LOADING });
    axios
      .post("/auth/signin", data)
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          localStorage.setItem("token", res.data.data.token);
          dispatch({ type: SET_TOKEN, token: res.data.data });
          dispatch({ type: LOADING_FINISH });
          props.history.push("/admin/dashboard");
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
        console.log(err);
        alert("error catch");
      });
  };
  return (
    <div className="flex h-screen w-full">
      <img
        className="w-2/5 m-auto"
        src={require(`assets/image/image_auth_adm.png`)}
        alt="img"
      />
      <div className="w-2/5 h-auto p-10 m-auto bg-gray-200 content-center justify-center flex flex-col rounded-lg">
        <input
          className="w-full rounded-lg mb-3 bg-white p-3"
          type="text"
          placeholder="Username"
          name="username"
          value={data.username}
          onChange={handleChange}
        />
        <input
          className="w-full rounded-lg mb-3 bg-white p-3"
          type="password"
          placeholder="Password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <div className="w-full">
          {loading === false ? (
            <button
              onClick={handleSingin}
              className="focus:outline-none rounded-lg bg-orange-500 text-white font-bold w-full shadow-lg p-3"
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
    </div>
  );
}

export default Auth;
