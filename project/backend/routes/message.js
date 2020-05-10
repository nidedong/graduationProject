var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/getFriends", async function (req, res, next) {
  let { uid } = req.body;
  let queryRes = await query(`select * from profile where uid='${uid}'`);
  let friendsList = queryRes[0].friends;
  friendsList = friendsList ? JSON.parse(friendsList) : [];
  let friendRes = await query(
    `select headerImg, nickname, uid from profile where find_in_set(uid, '${friendsList.toString()}')`
  );
  res.send({ message: "0k", friends: friendRes });
});
router.get("/MessageList", async function (req, res, next) {
  let { uid } = req.query;
  let queryRes = await query(
    `select * from message where fromUid='${uid}' or toUid='${uid}'`
  );
  res.send({ message: "0k", messageList: queryRes });
});

module.exports = router;
