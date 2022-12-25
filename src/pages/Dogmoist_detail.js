import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Main.css";

axios.defaults.withCredentials = true;

function Dogmoistdetail(props) {
  let { id } = useParams();
  const { seq } = useParams();

  const [reply, setReply] = React.useState([]);

  const [replyText, setReplyText] = React.useState("");

  const 게시판상세정보가져오기 = async () => {
    await axios({
      url: "http://localhost:4000/article_row",
      params: {
        seq: seq,
      },
    }).then((response) => {
      setReply(response.data.reply);
    });
  };

  React.useEffect(() => {
    게시판상세정보가져오기();
  }, []);

  const 댓글정보저장 = (event) => {
    setReplyText(event.target.value);
  };

  const 댓글쓰기 = async () => {
    await axios({
      url: "http://localhost:4000/reply",
      method: "POST",
      data: {
        replyText: replyText,
        seq: seq,
      },
    }).then((response) => {
      console.log(response);
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
            <p>강아지 / 습식 사료</p>
          </div>
          <div className="feed-con">
            <div className="wrap">
              <div className="body-wrap">
                <div className="row">
                  <div className="imgbox cell">
                    <img src={props.dogmoist[id].img} width="50%" />
                  </div>
                  <div className="textbox cell">
                    <p className="detail-title">{props.dogmoist[id].title}</p>
                    <p className="detail-price">{props.dogmoist[id].price}</p>
                    <button
                      className="buy-btn"
                      onClick={() => {
                        window.location.href = props.dogmoist[id].site;
                      }}
                    >
                      주문하기
                    </button>
                  </div>
                </div>
                <div className="from">
                  <div className="reply">
                    <p>댓글</p>
                  </div>
                  {reply.length > 0 &&
                    reply.map((item, index) => {
                      return (
                        <table key={index}>
                          <tbody>
                            <tr>
                              <td>
                                <div className="nickname-box">
                                  {item.nickname}
                                </div>
                              </td>
                              <td>
                                <div className="body-box">{item.body}</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      );
                    })}
                </div>

                <div className="reply-form">
                  <div className="text-box">
                    <textarea
                      className="reply-body"
                      onChange={댓글정보저장}
                      placeholder="댓글을 입력해주세요"
                    ></textarea>
                  </div>
                  <div className="btn-box">
                    <button className="button" onClick={댓글쓰기}>
                      댓글쓰기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dogmoistdetail;
