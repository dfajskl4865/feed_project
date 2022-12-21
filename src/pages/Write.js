import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Write.css";

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
        <div className="feed">
          <div className="write-bar">
            <div className="write">
              <h2>게시글 작성</h2>
              <button onClick={writing} type="button" style={{ marginTop: 12 }}>
                작성하기
              </button>
            </div>
            <h3>제목</h3>
            <div className="text-box">
              <input
                name="title"
                placeholder="제목을 입력해주세요"
                onChange={Changedata}
              />
            </div>
            <h3>내용</h3>
            <textarea
              name="body"
              placeholder="내용을 입력해주세요"
              onChange={Changedata}
              cols="50"
              rows="30"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}

export default Write;
