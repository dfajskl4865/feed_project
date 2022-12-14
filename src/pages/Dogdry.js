import React, { useState } from "react";
import "./Dogdry.css";
import { StoreContext } from "../App";
import { Link } from "react-router-dom";
import Dogdrydata from "./Dogdry_data.js";

const List = (props) => {
  return (
    <ul>
      <li>
        <Link href={"detail/" + props.index}>
          <div>
            <img src={props.Dogdrydata.img} />
          </div>
          <p>{props.Dogdrydata.title}</p>
          <p>{props.Dogdrydata.price}</p>
        </Link>
      </li>
    </ul>
  );
};

function Dry() {
  const { loginUser } = React.useContext(StoreContext);

  let [dryfeed, setDryfeed] = useState(Dogdrydata);

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
            {dryfeed.map((products, index) => {
              return <List dryfeed={dryfeed[products]} i={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dry;
