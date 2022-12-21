import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import "./Article.css";

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
    <div className="ui-wrap">
      <div className="ui-body-wrap">
        <h2>{article.title}</h2>
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

        <form className="ui-reply-form">
          <textarea onChange={Savecomments}></textarea>
          <button type="button" className="ui-blue-button" onClick={writing}>
            댓글쓰기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Article_reply;
