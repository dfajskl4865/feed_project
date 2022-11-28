import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Login() {
  const navigation = useNavigate();

  const [data, setData] = React.useState({
    id: "",
    pw: "",
  });

  const DataChang = (evnet) => {
    const name = evnet.target.name;
    const cloneData = { ...data };
    cloneData[name] = evnet.target.value;
    setData(cloneData);
  };

  const login = async () => {
    await axios({
      url: "http://localhost:4000/login",
      method: "POST",
      data: data,
    })
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        }

        if (response.data.code === "success") {
          navigation("/Main");
        }
      })
      .catch((e) => {
        console.log("login error", e);
      });
  };

  return (
    <div>
      <input
        type="text"
        name="id"
        placeholder="아이디"
        onChange={DataChang}
      ></input>
      <input
        type="password"
        name="pw"
        placeholder="비밀번호"
        onChange={DataChang}
      ></input>
      <button type="button" onClick={login}>
        로그인
      </button>
    </div>
  );
}

export default Login;
