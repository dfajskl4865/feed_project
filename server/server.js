const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mysql = require("mysql2");
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
  }

  if (result.code === "fail") {
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
  }

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  await dbstart(
    `INSERT INTO user(id,password,nickname) VALUES('${id}','${pw}','${nickname}')`
  );

  res.send(result);
});

app.listen(port, () => {
  console.log("서버가 시작되었습니다");
});
