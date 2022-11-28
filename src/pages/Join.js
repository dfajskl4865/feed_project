import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Join() {
  const navigation = useNavigate();

  const [data, setData] = React.useState({
    id: "",
    pw: "",
  });

  const DataChange = (evnet) => {
    const cloneData = { ...data };
    cloneData[evnet.target.name] = evnet.target.value;
    setData(cloneData);
  };

  const Signup = async () => {
    await axios({
      url: "http://localhost:4000/join",
      method: "POST",
      data: data,
    })
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
        }

        if (response.data.code === "success") {
          navigation("/Login");
        }
      })
      .catch((e) => {
        console.log("join error", e);
      });
  };

  return (
    <div>
      <input
        type="text"
        name="id"
        placeholder="아이디를 입력해주세요"
        onChange={DataChange}
      ></input>
      <input
        type="text"
        name="nickname"
        placeholder="닉네임을 입력해주세요"
        onChange={DataChange}
      ></input>
      <input
        type="password"
        name="pw"
        placeholder="비밀번호를 입력해주세요"
        onChange={DataChange}
      ></input>
      <button type="button" onClick={Signup}>
        회원가입
      </button>
    </div>
  );
}

export default Join;
