import React, { useState } from "react";
import "./Dogdry.css";
import { StoreContext } from "../App";
import { Link } from "react-router-dom";
import Catdrydata from "./Catdry_data.js";

const List = (props) => {
  return (
    <div className="row">
      <div className="cell nav">
        <Link to={"/catdrydetail/" + props.index}>
          <div className="img-box">
            <img src={props.catdry.img} width="220px" height="220px" />
          </div>
          <p className="title">{props.catdry.title}</p>
          <p className="price">{props.catdry.price}</p>
        </Link>
      </div>
    </div>
  );
};

function Dry() {
  const { loginUser } = React.useContext(StoreContext);

  let [catdry, setCatdry] = useState(Catdrydata);

  return (
    <>
      <div className="f-head">
        <div className="pagename">
          <Link to={"/"}>사료커뮤니티</Link>
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
            <p>고양이 / 건식 사료</p>
          </div>
          <div className="feed-con">
            {Catdrydata.map((products, index) => {
              return <List catdry={products} index={index} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dry;
