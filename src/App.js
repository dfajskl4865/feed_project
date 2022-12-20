import React from "react";
import "./App.css";
import qs from "qs";

import Login from "./pages/Login";
import Join from "./pages/Join";
import Main from "./pages/Main";
import Write from "./pages/Write";
import Sharingarticle from "./pages/Sharing_article";
import Articlereply from "./pages/Article_reply";
import Dogdry from "./pages/Dogdry";
import Dogmoist from "./pages/Dogmoist";
import Catdry from "./pages/Catdry";
import Catmoist from "./pages/Catmoist";
import Catmoistdata from "./pages/Catmoist_data";
import Catdrydata from "./pages/Catdry_data";
import Dogdrydetail from "./pages/Dogdry_detail";
import Dogdrydata from "./pages/Dogdry_data";
import Dogmoistdata from "./pages/Dogmoist_data";
import Dogmoistdtail from "./pages/Dogmoist_detail";
import Catdrydetail from "./pages/Catdry_detail";
import Catmoistdetail from "./pages/Catmoist_detail";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
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
  let [dogdry, setDogdry] = useState(Dogdrydata);
  let [dogmoist, setDogmoist] = useState(Dogmoistdata);
  let [catdry, setCatdry] = useState(Catdrydata);
  let [catmoist, setCatmoist] = useState(Catmoistdata);

  const session = async () => {
    await axios({
      url: "http://localhost:4000/user",
    }).then((res) => {
      setLoginUser(res.data);
    });
  };

  React.useEffect(() => {
    session();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        loginUser: loginUser,
      }}
    >
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/" element={<Main />} />
        <Route exact path="/write" element={<Write />} />
        <Route exact path="/article/:seq" element={<Articlereply />} />
        <Route exact path="/sharing_article" element={<Sharingarticle />} />
        <Route
          exact
          path="http://localhost:3000/oauth/callback/kakao"
          element={<카카오데이터받는곳 />}
        />
        <Route exact path="/dogdry" element={<Dogdry />} />
        <Route exact path="/dogmoist" element={<Dogmoist />} />
        <Route
          exact
          path="/dogdrydetail/:id"
          element={<Dogdrydetail dogdry={dogdry} />}
        />
        <Route
          exact
          path="/dogmoistdetail/:id"
          element={<Dogmoistdtail dogmoist={dogmoist} />}
        />
        <Route exact path="/catdry" element={<Catdry />} />
        <Route exact path="/catmoist" element={<Catmoist />} />

        <Route
          exact
          path="/catdrydetail/:id"
          element={<Catdrydetail catdry={catdry} />}
        />
        <Route
          exact
          path="/catmoistdetail/:id"
          element={<Catmoistdetail catmoist={catmoist} />}
        />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
