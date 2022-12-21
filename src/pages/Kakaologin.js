import React from "react";
import axios from "axios";
import qs from "qs";

// REST API 키
const REST_API_KEY = "60a7b0eae81f3c34c3242c0ba90b9f88";

// 자바스크립트 키
const JAVASCRIPT_KEY = "b7149c6fb7fd5b6999c9fabdfecafb01";

// 리다이렉트 주소
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

function Kakaologin() {
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
  };

  React.useEffect(() => {
    getKAKAO();
  }, []);
}

export default Kakaologin;
