import React, { useState } from "react";
import "./Main.css";
import { StoreContext } from "../App";
import { Link } from "react-router-dom";
import Dogdrydata from "./Dogdry_data.js";

const List = (props) => {
  return (
    <div className="cell nav">
      <Link to={"/dogdrydetail/" + props.index}>
        <div className="img-box">
          <img src={props.dogdry.img} width="220px" height="220px" />
        </div>
        <p className="title">{props.dogdry.title}</p>
        <p className="price">{props.dogdry.price}</p>
      </Link>
    </div>
  );
};

function Dry() {
  const { loginUser } = React.useContext(StoreContext);

  let [dogdry, setDogdry] = useState(Dogdrydata);

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
            <p>강아지 / 건식 사료</p>
          </div>
          <div className="feed-con row">
            {Dogdrydata.map((products, index) => {
              return <List dogdry={products} index={index} key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dry;
