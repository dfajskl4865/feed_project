import React, { useState } from "react";
import { StoreContext } from "../App";
import { useParams } from "react-router-dom";
import Dogdrydata from "./Dogdry_data.js";
import { Link } from "react-router-dom";

function Detail(props) {
  const { loginUser } = React.useContext(StoreContext);

  let { id } = useParams();
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
              <p>
                <Link to="/Dogdry">강아지</Link>
              </p>
              <li>
                <Link to="/Dogdry">건식 사료</Link>
              </li>
              <li>
                <Link to="/Dogdry">습식 사료</Link>
              </li>
              <p>
                <Link to="/Dogdry">고양이</Link>
              </p>
              <li>
                <Link to="/Dogdry">건식 사료</Link>
              </li>
              <li>
                <Link to="/Dogdry">습식 사료</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="feed">
          <div className="feed-bar">
            <p>강아지 / 건식 사료</p>
          </div>
          <div className="feed-con">
            <div className="row">
              <div className="imgbox cell">
                <img src={props.dryfeed[id].img} width="80%" />
              </div>
              <div className="imgbox cell">
                <p>{props.dryfeed[id].title}</p>
                <p>{props.dryfeed[id].price}</p>
                <button>
                  <Link to={props.dryfeed[id].site}>주문하기</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
