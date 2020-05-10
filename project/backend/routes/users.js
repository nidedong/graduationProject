var express = require("express");
var router = express.Router();
const commonKey = "1999522";
var formidable = require("formidable");
const path = require("path");
const fs = require("fs");

/* GET users listing. */
//登陆接口
router.post("/login", async function (req, res, next) {
  let { password, username } = req.body;
  let queryRes = await query(`select * from user where username='${username}'`);
  if (!queryRes[0]) return res.send({ status: 200, message: ["用户名不存在"] });
  if (queryRes[0].password === password) {
    let token = md5(commonKey + new Date().getTime());
    res.send({
      status: 100,
      message: "登陆成功",
      token,
      data: { uid: queryRes[0].uid },
    });
  } else {
    res.send({ status: 200, message: [undefined, "密码错误"] });
  }
});

router.post("/register", async function (req, res, next) {
  let { username, password, name, birthday, phone } = req.body;
  let queryRes = await query(`select * from user where username='${username}'`);
  if (queryRes[0] && queryRes[0].username)
    return res.send({ status: 200, message: "用户名已存在" });
  // 用当前时间戳加上公钥生成uid
  let uid = md5(commonKey + new Date().getTime());
  // user表插入数据
  let insertRes = await query(
    `insert into user (username, password, name, birthday, phone, uid) values ('${username}', '${password}', '${name}', '${birthday}', '${phone}', '${uid}')`
  );
  // 往profile表中插入数据
  let profileRes = await query(
    `insert into profile (username, nickname, birthday, phone, uid, following, followers) values ('${username}', '${name}', '${birthday}', '${phone}', '${uid}', 0, 0)`
  );
  if (insertRes.affectedRows > 0)
    res.send({ status: 100, message: "注册成功", username });
});

// 获取profile信息
router.get("/getProfile", async (req, res) => {
  let { uid } = req.query;
  // 查询
  let profileRes = await query(`select * from profile where uid = '${uid}'`);
  res.send({ status: 200, message: "获取成功", data: profileRes[0] });
});

// 修改profile信息
router.post("/setProfile", async (req, res) => {
  let { uid, backgroundImg, headerImg, nickname, birthday, phone } = req.body;
  await query(
    `update profile set backgroundImg='${backgroundImg}', headerImg='${headerImg}', nickname='${nickname}', birthday='${birthday}', phone='${phone}' where uid='${uid}'`
  );
  let queryRes = await query(
    `select photoList from profile where uid='${uid}'`
  );
  queryRes = queryRes[0].photoList ? JSON.parse(queryRes) : [];
  backgroundImg && queryRes.push(backgroundImg);
  headerImg && queryRes.push(headerImg);
  await query(
    `update profile set photoList='${JSON.stringify(
      queryRes
    )}' where uid='${uid}'`
  );
  res.send({ status: 200, message: "修改成功" });
});

// 获取上传图片处理
router.post("/updateImg", async (req, res) => {
  var form = new formidable.IncomingForm();
  form.encoding = "utf-8";
  form.uploadDir = path.join(__dirname + "/../public/upload");
  form.keepExtensions = true; //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;
  //处理图片
  form.parse(req, function (err, fields, files) {
    var fileKey = Object.keys(files)[0];
    var filename = files[fileKey].name;
    var nameArray = filename.split(".");
    var type = nameArray[nameArray.length - 1];
    var name = "";
    for (var i = 0; i < nameArray.length - 1; i++) {
      name = name + nameArray[i];
    }
    var date = new Date();
    var time =
      "_" +
      date.getFullYear() +
      "_" +
      date.getMonth() +
      "_" +
      date.getDay() +
      "_" +
      date.getHours() +
      "_" +
      date.getMinutes();
    var avatarName = name + time + "." + type;
    var newPath = form.uploadDir + "/" + avatarName;
    fs.renameSync(files[fileKey].path, newPath); //重命名

    res.send({ data: "http://localhost:9999/upload/" + avatarName });
  });
});

router.post("/tweet", async (req, res) => {
  let { saySomething, photoList, uid, headerImg, time, nickname } = req.body;
  let length = photoList.length;
  let count = await query(`select count(*) as count from main`);
  if (length > 0) {
    let queryRes = await query(
      `select photoList from profile where uid='${uid}'`
    );
    let newPhotoList = (
      (queryRes[0].photoList && JSON.parse(queryRes[0].photoList)) ||
      []
    ).concat(photoList);
    await query(
      `update profile set photoList='${JSON.stringify(
        newPhotoList
      )}' where uid='${uid}'`
    );
  }
  photoList = JSON.stringify(photoList);
  await query(
    `insert into main (saySomething, photoList, uid, headerImg, time, nickname, id) values ('${saySomething}','${photoList}', '${uid}', '${headerImg}','${time}','${nickname}', ${
      count[0].count + 1
    }) `
  );
  res.send({ message: "上传成功" });
});
//获取我的博客
router.get("/getMyTweets", async (req, res) => {
  let { uid } = req.query;
  let queryRes = await query(
    `select * from main where uid='${uid}' order by time desc`
  );
  res.send({ message: "获取成功", data: queryRes });
});
//获取我的博客
router.get("/getAllTweets", async (req, res) => {
  let queryRes = await query(`select * from main order by time desc`);
  res.send({ message: "获取成功", data: queryRes });
});
//获取我的博客
router.get("/getMyPictures", async (req, res) => {
  let { uid } = req.query;
  let queryRes = await query(
    `select photoList from profile where uid='${uid}'`
  );
  res.send({
    message: "获取成功",
    data: queryRes[0].photoList ? JSON.parse(queryRes[0].photoList) : [],
  });
});
//获取我的喜欢
router.get("/getMyLikes", async (req, res) => {
  let { uid } = req.query;
  let queryRes = await query(`select mylike from profile where uid='${uid}'`);
  let mylike = queryRes[0].mylike ? JSON.parse(queryRes[0].mylike) : [];
  let mainRes = await query(
    `select * from main where find_in_set(id, '${mylike.toString()}')`
  );
  console.log(mainRes);
  res.send({
    message: "获取成功",
    data: mainRes,
  });
});

module.exports = router;
