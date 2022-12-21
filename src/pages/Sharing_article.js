import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Article.css";

function Sharing_article() {
  const navigation = useNavigate();

  const [article, setArticle] = React.useState([]);

  const Bulletinboard = async () => {
    await axios({
      url: "http://localhost:4000/article",
      method: "GET",
    }).then((response) => {
      setArticle(response.data);
    });
  };

  React.useEffect(() => {
    Bulletinboard();
  }, []);

  const Movingwrite = () => {
    navigation("/write");
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
            <p>커뮤니티</p>
          </div>

          <div className="ui-wrap">
            <table className="ui-table">
              <thead>
                <tr>
                  <th>제목</th>
                  <th>내용</th>
                  <th>작성자</th>
                </tr>
              </thead>
              <tbody>
                {article.length > 0 &&
                  article.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                        <td>{item.nickname}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            <div className="btn">
              <button className="ui-green-button" onClick={Movingwrite}>
                글등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sharing_article;
