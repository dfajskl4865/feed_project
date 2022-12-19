import React from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
          navigation("/");
        }
      })
      .catch((e) => {
        console.log("login error", e);
      });
  };

  return (
    <div className="con">
      <form action="" className="from">
        <p className="sitename">사료커뮤니티</p>
        <div className="loginbox">
          <p>아이디</p>
          <input
            type="text"
            name="id"
            placeholder="아이디"
            onChange={DataChang}
          ></input>
          <p>비밀번호</p>
          <input
            type="password"
            name="pw"
            placeholder="비밀번호"
            onChange={DataChang}
          ></input>
          <button type="button" className="loginbtn" onClick={login}>
            <p className="login">로그인</p>
          </button>
          <button type="button" className="joinbtn">
            <Link to="/join">회원가입</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
