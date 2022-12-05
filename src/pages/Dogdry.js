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
              <p>강아지</p>
              <li>건식 사료</li>
              <li>습식 사료</li>
              <p>고양이</p>
              <li>건식 사료</li>
              <li>습식 사료</li>
            </ul>
          </div>
        </div>
        <div className="feed">
          <div className="feed-bar">
            <p>강아지 / 건식 사료</p>
          </div>
          <div className="feed-con">
            <ul className="row">
              <li className="cell">
                <Link
                  to={
                    "https://www.coupang.com/vp/products/78748094?itemId=253999635&vendorItemId=3618396585&q=%EA%B1%B4%EC%A1%B0+%EC%82%AC%EB%A3%8C&itemsCount=36&searchId=08d811d7843d4552b011c16f3d25e18c&rank=1&isAddedCart="
                  }
                >
                  <div className="img-box">
                    <img src="https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/352159540286419-2bcac4bf-f726-45f5-8b01-d461cbcdb30f.jpg"></img>
                  </div>
                  <div className="feed-name">ANF 6FREE red 소고기 건식사료</div>
                </Link>
              </li>
              <li className="cell">
                <Link
                  to={
                    "https://www.coupang.com/vp/products/78748094?itemId=253999635&vendorItemId=3618396585&q=%EA%B1%B4%EC%A1%B0+%EC%82%AC%EB%A3%8C&itemsCount=36&searchId=08d811d7843d4552b011c16f3d25e18c&rank=1&isAddedCart="
                  }
                >
                  <div className="img-box">
                    <img src="https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/352159540286419-2bcac4bf-f726-45f5-8b01-d461cbcdb30f.jpg"></img>
                  </div>
                  <div className="feed-name">ANF 6FREE red 건식사료</div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dry;
