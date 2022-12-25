const express = require("express");
const cors = require("cors");
const session = require("express-session");

const mysql = require("mysql2");
const { Form } = require("react-router-dom");
const db = mysql.createPoolCluster();

const app = express();
const port = 4000;

app.use(express.json());
app.use(
  session({
    secret: "SECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

db.add("feed_project", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "feed_project",
  port: 3306,
});

function dbstart(query) {
  return new Promise(function (resolve, reject) {
    db.getConnection("feed_project", function (error, connection) {
      if (error) {
        console.log("디비 연결 오류", error);
        reject(true);
      }
      connection.query(query, function (error, data) {
        if (error) {
          console.log("쿼리오류", error);
          reject(true);
        }
        resolve(data);
      });
      connection.release();
    });
  });
}

app.get("/", async (req, res) => {
  const 데이터 = await dbstart("SELECT * FROM user");

  console.log(데이터);

  res.send("여기로 옵니다!!");
});

app.get("/user", (req, res) => {
  res.send(req.session.loginUser);
});

app.post("/login", async (req, res) => {
  const { id, pw } = req.body;

  const result = {
    code: "success",
    message: "로그인 되었습니다",
  };

  if (id === "") {
    result.code = "fail";
    result.message = "아이디를 입력해주세요";
  }

  if (pw === "") {
    result.code = "fail";
    result.message = "비밀번호를 입력해주세요";
  }

  const user = await dbstart(
    `SELECT * FROM user WHERE id='${id}' AND password = '${pw}'`
  );

  if (user.length === 0) {
    result.code = "fail";
    result.message = "아이디가 존재하지 않습니다";
    res.send(result);
    return;
  }

  req.session.loginUser = user[0];
  req.session.save();

  res.send(result);
});

app.post("/join", async (req, res) => {
  const { id, nickname, pw } = req.body;

  const result = {
    code: "success",
    message: "회원가입 되었습니다",
  };

  if (id === "") {
    result.code = "fail";
    result.message = "아이디를 입력해주세요";
  }

  if (nickname === "") {
    result.code = "fail";
    result.message = "닉네임을 입력해주세요";
  }

  if (pw === "") {
    result.code = "fail";
    result.message = "비밀번호를 입력해주세요";
  }

  const user = await dbstart(`SELECT * FROM user WHERE id='${id}'`);

  if (user.length > 0) {
    result.code = "fail";
    result.message = "이미 동일한 아이디가 존재합니다";
    res.send(result);
    return;
  }

  await dbstart(
    `INSERT INTO user(id,password,nickname) VALUES('${id}','${pw}','${nickname}')`
  );

  res.send(result);
});

app.get("/article_row", async (req, res) => {
  const { seq } = req.query;

  const query = `SELECT * FROM article WHERE seq = '${seq}'`;

  const reply_query = `SELECT * FROM reply WHERE article_seq = '${seq}'`;

  const article = await dbstart(query);
  const reply = await dbstart(reply_query);

  res.send({
    article: article[0],
    reply: reply,
  });
});

app.get("/article", async (req, res) => {
  const query = `SELECT * FROM article , user WHERE article.user_seq = user.seq`;

  const article = await dbstart(query);
  res.send(article);
});

app.post("/article", async (req, res) => {
  const { title, body } = req.body;
  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "작성되었습니다",
  };

  if (title === "") {
    result.code = "fail";
    result.message = "제목을 작성해주세요";
  }

  if (body === "") {
    result.code = "fail";
    result.message = "내용을 작성해주세요";
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO article(title,body,user_seq) VALUES('${title}','${body}','${loginUser.seq}')`;
  await dbstart(query);
  res.send(result);
});

app.post("/reply", async (req, res) => {
  const { replyText, id } = req.body;
  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "댓글이 작성되었습니다",
  };

  if (replyText === "") {
    result.code = "errer";
    result.message = "댓글을 입력해주세요";
  }

  if (result.code === "errer") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO reply(body,article_seq,user_seq,user_nickname) VALUES('${replyText}','${id}','${loginUser.seq}','${loginUser.nickname}')`;

  console.log(query);
  await dbstart(query);

  res.send(result);
});

app.listen(port, () => {
  console.log("서버가 시작되었습니다");
});
