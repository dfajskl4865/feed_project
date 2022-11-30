import React from "react";
import "./Dogdry.css";
import { StoreContext } from "../App";
import { Link } from "react-router-dom";

function Dry() {
  const { loginUser } = React.useContext(StoreContext);

  return (
    <>
      <div className="f-head">
        <div className="pagename">사료커뮤니티</div>
        <div className="object">
          <div className="function">
            <ul>
              <li>
                <Link to="/Login">로그인</Link>
              </li>
              <li>
                <Link to="/Join">회원가입</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="con">
        <div className="menu">
          <div className="menu-bar">
            <ul>
              강아지
              <li>건식 사료</li>
              <li>습식 사료</li>
            </ul>
            <ul>
              고양이
              <li>건식 사료</li>
              <li>습식 사료</li>
            </ul>
          </div>
        </div>
        <div className="feed">
          <div className="feed-bar">
            <p>강아지 / 건식 사료</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dry;
