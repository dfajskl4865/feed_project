import React, { useState } from "react";
import "./Main.css";
import { StoreContext } from "../App";
import { Link } from "react-router-dom";
import Dogmoistdata from "./Dogmoist_data.js";

const Moistlist = (props) => {
  return (
    <div className="cell nav">
      <Link to={"/dogmoistdetail/" + props.index}>
        <div className="img-box">
          <img src={props.dogmoist.img} width="220px" height="220px" />
        </div>
        <p className="title">{props.dogmoist.title}</p>
        <p className="price">{props.dogmoist.price}</p>
      </Link>
    </div>
  );
};

function Moist() {
  const { loginUser } = React.useContext(StoreContext);

  let [dogmoist, setDogmoist] = useState(Dogmoistdata);

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
            <p>강아지 / 습식 사료</p>
          </div>
          <div className="feed-con row">
            {Dogmoistdata.map((products, index) => {
              return (
                <Moistlist dogmoist={products} index={index} key={index} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Moist;
