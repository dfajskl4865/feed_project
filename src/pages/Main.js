import React from "react";
import "./Main.css";
import { StoreContext } from "../App";

function Main() {
  const { loginUser } = React.useContext(StoreContext);

  return (
    <div className="f-head">
      <div className="pagename">사료커뮤니티</div>
      <div className="object">
        <div className="function">
          <p className="login flex-ai-c">로그인</p>
          <p className="join flex-ai-c">회원가입</p>
        </div>
      </div>
    </div>
  );
}

export default Main;
