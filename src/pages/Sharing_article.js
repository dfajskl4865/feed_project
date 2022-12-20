import axios from "axios";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Article.css";

function Sharing_article() {
  const navigation = useNavigate();

  const [article, setArticle] = React.useState([]);

  const 게시글정보가져와 = async () => {
    await axios({
      url: "http://localhost:4000/article",
      method: "GET",
    }).then((response) => {
      setArticle(response.data);
    });
  };

  React.useEffect(() => {
    게시글정보가져와();
  }, []);

  const 글등록페이지이동 = () => {
    navigation("/write");
  };

  return (
    <div className="ui-wrap">
      <button className="ui-green-button" onClick={글등록페이지이동}>
        글등록
      </button>
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
    </div>
  );
}
export default Sharing_article;
