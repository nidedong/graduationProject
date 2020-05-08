var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mysql = require("mysql");
var sqlConfig = require("./db/dbconfig");
var query = require("./db/sqlFn");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var exploreRouter = require("./routes/explore");
var messageRouter = require("./routes/message");
var connection = mysql.createConnection(sqlConfig.mysql);
var md5 = require("md5");
var ws = require("ws");
var http = require("http");
// console.log(ws);

//链接数据库
connection.connect(function (err) {
  if (err) return console.log("数据库连接失败!!!", err);
  console.log("数据库连接成功...");
});

// 启动socket服务器
let wss = new ws.Server({ port: 9001 });
wss.on("connection", function (ws) {
  console.log("服务器socket连接成功...");
  ws.on("message", function (message) {
    console.log(message, "---------");
  });
});

global.con = connection;
global.query = query;
global.md5 = md5;
var app = express();
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (req.method == "OPTIONS") {
    res.send(200);
  } else {
    next();
  }
});

// view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/explore", exploreRouter);
app.use("/message", messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
