import React, { useState } from "react";
import { StoreContext } from "../App";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Dogdrydetail(props) {
  const { loginUser } = React.useContext(StoreContext);

  let { id } = useParams();
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
                <Link to="/Dogmoist">습식 사료</Link>
              </li>
              <p>
                <Link to="/Catdry">고양이</Link>
              </p>
              <li>
                <Link to="/Catdry">건식 사료</Link>
              </li>
              <li>
                <Link to="/Catmoist">습식 사료</Link>
              </li>
              <p>
                <Link to="/Sharing_article">커뮤니티</Link>
              </p>
            </ul>
          </div>
        </div>
        <div className="feed">
          <div className="feed-bar">
            <p>고양이 / 습식 사료</p>
          </div>
          <div className="feed-con">
            <div className="row">
              <div className="imgbox cell">
                <img src={props.catmoist[id].img} width="80%" />
              </div>
              <div className="imgbox cell">
                <p>{props.catmoist[id].title}</p>
                <p>{props.catmoist[id].price}</p>
                <button>
                  <Link to={props.catmoist[id].site}>주문하기</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dogdrydetail;
