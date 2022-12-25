import React from "react";
import "./Main.css";
import { StoreContext } from "../App";
import { Link } from "react-router-dom";
import { useState } from "react";

function Main() {
  const { loginUser } = React.useContext(StoreContext);

  return (
    <>
      <div className="f-head">
        <div className="pagename">
          <Link to="/">사료커뮤니티</Link>
        </div>
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

      <div className="f-bar">
        <div className="feed">
          <ul>
            <li>
              <img
                className="dog"
                src="https://mblogthumb-phinf.pstatic.net/MjAxNzExMjRfMjQ4/MDAxNTExNTAwMDI5MDc0.0yZ3581qq8GRZKaqqySiI0MIAPIP-3eM-NEmimAaUhUg.CEXLFCqWgu7N47Ig7zzBHEUHfBxklSjagu3kosoeRxMg.JPEG.knightsws/%EB%AC%B4%EB%A3%8C_%EA%B0%95%EC%95%84%EC%A7%80_%EC%95%84%EC%9D%B4%EC%BD%98_3.JPEG?type=w800"
              ></img>
              <Link to="/Dogdry">강아지 사료</Link>
            </li>
            <li>
              <img
                className="cat"
                src="https://st4.depositphotos.com/18494398/39984/v/450/depositphotos_399848838-stock-illustration-cat-black-silhouette-illustration-isolated.jpg"
              ></img>
              <Link to="/Catdry">고양이 사료</Link>
            </li>
            <li>
              <Link to="/Sharing_article">커뮤니티</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Main;
