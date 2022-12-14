import React from "react";
import "./App.css";
import qs from "qs";

import Login from "./pages/Login";
import Join from "./pages/Join";
import Main from "./pages/Main";
import Dogdry from "./pages/Dogdry";
import Detail from "./pages/Detail";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export const StoreContext = React.createContext({});

// REST API 키
const REST_API_KEY = "60a7b0eae81f3c34c3242c0ba90b9f88";

// 자바스크립트 키
const JAVASCRIPT_KEY = "b7149c6fb7fd5b6999c9fabdfecafb01";

// 리다이렉트 주소
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

const 카카오소셜로그인링크 = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function 카카오데이터받는곳() {
  const code = new URL(window.location.href).searchParams.get("code");

  const getKAKAO = async () => {
    const data = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: JAVASCRIPT_KEY,
    });

    const result = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      data: data,
    });

    // kakao Javascript SDK 초기화
    window.Kakao.init(REST_API_KEY);

    window.Kakao.Auth.setAccessToken(result.data.access_token);

    const kakaoData = await window.Kakao.API.request({
      url: "/v2/user/me",
    });

    console.log(kakaoData);

    /**
     * 1.
     *  - 우리 Node.js 호출 !
     *  - kakaData 넣어주기~
     * 2.
     *  - LocalStorage 사용
     * 3.
     *  - 전역변수 설정 LoginUser !
     */
  };

  React.useEffect(() => {
    getKAKAO();
  }, []);
  return <div>카카오 테이터 받는 곳</div>;
}

function LLogin() {
  const 카카오데이터받는곳 = () => {
    console.log("카카오 로그인 준비");
    window.location.href = 카카오소셜로그인링크;
  };
  <button type="button" onClick={카카오데이터받는곳}>
    카카오 데이터 받기
  </button>;
}

function App() {
  const [loginUser, setLoginUser] = React.useState({});
  return (
    <StoreContext.Provider
      value={{
        loginUser: loginUser,
      }}
    >
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/main" element={<Main />} />
        <Route
          exact
          path="http://localhost:3000/oauth/callback/kakao"
          element={<카카오데이터받는곳 />}
        />
        <Route exact path="/dogdry" element={<Dogdry />} />
        <Route exact path="/detail/:id" element={<Detail />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
