import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Main.css";

axios.defaults.withCredentials = true;
function Write() {
  const navigation = useNavigate();

  const [data, setData] = React.useState({
    title: "",
    body: "",
  });

  const Changedata = (event) => {
    const name = event.target.name;
    const cloneData = { ...data };
    cloneData[name] = event.target.value;
    setData(cloneData);
  };

  const writing = async () => {
    await axios({
      url: "http://localhost:4000/article",
      method: "POST",
      data: data,
    }).then((response) => {
      if (response.data.code === "success") {
        alert(response.data.message);
        navigation("/Sharing_article");
      }
    });
  };

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
            <p>게시글 작성</p>
          </div>

          <div className="conti">
            <div className="feed">
              <div className="write-bar">
                <div className="write">
                  <h2 className="t-title">제목</h2>
                  <button
                    onClick={writing}
                    type="button"
                    className="save-btn"
                    style={{ marginTop: 12 }}
                  >
                    작성하기
                  </button>
                </div>

                <div className="text-box2">
                  <input
                    className="text-title"
                    name="title"
                    placeholder="제목을 입력해주세요"
                    onChange={Changedata}
                  />
                </div>
                <h3 className="t-body">내용</h3>
                <textarea
                  className="text-body"
                  name="body"
                  placeholder="내용을 입력해주세요"
                  onChange={Changedata}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Write;
