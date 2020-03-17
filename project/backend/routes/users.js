var express = require("express");
var router = express.Router();
const commonKey = "1999522";

/* GET users listing. */
//登陆接口
router.post("/login", async function(req, res, next) {
  let { password, username } = req.body;
  let queryRes = await query(`select * from user where username='${username}'`);
  if (!queryRes[0]) return res.send({ status: 200, message: ["用户名不存在"] });
  if (queryRes[0].password === password) {
    let token = md5(commonKey + new Date().getTime());
    res.send({ status: 100, message: "登陆成功", token });
  } else {
    res.send({ status: 200, message: [undefined, "密码错误"] });
  }
});

router.post("/register", async function(req, res, next) {
  let { username, password, name, birthday, phone } = req.body;
  let queryRes = await query(`select * from user where username='${username}'`);
  if (queryRes[0] && queryRes[0].username)
    return res.send({ status: 200, message: "用户名已存在" });
  let uid = md5(commonKey + new Date().getTime());
  let insertRes = await query(
    `insert into user (username, password, name, birthday, phone, uid) values ('${username}', '${password}', '${name}', '${birthday}', '${phone}', '${uid}')`
  );
  if (insertRes.affectedRows > 0)
    res.send({ status: 100, message: "注册成功", username });
});

module.exports = router;
