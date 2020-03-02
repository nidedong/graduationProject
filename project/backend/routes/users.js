var express = require("express");
var router = express.Router();

/* GET users listing. */
//登陆接口
router.post("/login", async function(req, res, next) {
  let { password, username } = req.body;
  let queryRes = await query(`select * from user where username='${username}'`);
  if (!queryRes[0]) return res.send({ status: 200, message: ["用户名不存在"] });
  if (queryRes[0].password === password) {
    console.log(req.cookies);
    // 登陆成功时设置cookie
    res.cookie("mycookie", "1231231", {
      maxAge: 1000 * 60 * 1000,
      httpOnly: true
    });
    res.send({ status: 100, message: "登陆成功" });
  } else {
    res.send({ status: 200, message: [undefined, "密码错误"] });
  }
});

router.post("/register", async function(req, res, next) {
  let { username, password } = req.body;
  let queryRes = await query(`select * from user where username='${username}'`);
  if (queryRes[0].username)
    return res.send({ status: 200, message: "用户名已存在" });
  let insertRes = await query(
    `insert into user (username, password) values ('${username}', '${password}')`
  );
  if (insertRes.affectRows > 0) res.send({ status: 100, message: "注册成功" });
});

module.exports = router;
