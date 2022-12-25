import axios from "axios";
import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Main.css";

axios.defaults.withCredentials = true;

function Article_reply() {
  const { seq } = useParams();

  const [article, setArticle] = React.useState({});
  const [reply, setReply] = React.useState([]);

  const Bulletinboard = async () => {
    await axios({
      url: "http://localhost:4000/article_row",
      params: {
        seq: seq,
      },
    }).then((response) => {
      setArticle(response.data.article);
      setReply(response.data.reply);
    });
  };

  React.useEffect(() => {
    Bulletinboard();
  }, []);

  const [replyText, setReplyText] = React.useState("");
  const Savecomments = (event) => {
    setReplyText(event.target.value);
  };

  const writing = async () => {
    await axios({
      url: "http://localhost:4000/reply",
      method: "POST",
      data: {
        replyText: replyText,
        seq: seq,
      },
    }).then((response) => {});
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

          <div className="ui-wrap">
            <div className="ui-body-wrap">
              <h2 className="article-title">{article.title}</h2>
              <div className="ui-body">
                <p>{article.body}</p>
              </div>

              <h3>댓글</h3>

              <div className="ui-reply">
                {reply.length > 0 &&
                  reply.map((item, index) => {
                    return <div>{item.body}</div>;
                  })}
              </div>

              <div className="reply-form">
                <div className="text-box">
                  <textarea
                    className="reply-text"
                    onChange={Savecomments}
                    placeholder="댓글을 입력해주세요"
                  ></textarea>
                </div>
                <div className="btn-box">
                  <button className="ui-button" onClick={writing}>
                    댓글쓰기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Article_reply;
