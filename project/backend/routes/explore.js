var express = require("express");
var router = express.Router();

/* GET home page. */
router.post("/likeApi", async function (req, res, next) {
  let { id, likes, uid, status } = req.body;
  await query(
    `update main set likes='${JSON.stringify(likes)}' where id=${id}`
  );
  let profileRes = await query(`select mylike from profile where uid='${uid}'`);
  let mylike = profileRes[0].mylike ? JSON.parse(profileRes[0].mylike) : [];
  status
    ? mylike.splice(
        mylike.findIndex((item) => item === id),
        1
      )
    : mylike.push(id);
  await query(
    `update profile set mylike='${JSON.stringify(mylike)}' where uid='${uid}'`
  );
  res.send({ message: "0k" });
});
router.post("/comment", async function (req, res, next) {
  let { id, value, uid, avatar, nickname } = req.body;
  let mainRes = await query(`select comments from main where id='${id}'`);
  let commentList =
    mainRes[0].comments === null ? [] : JSON.parse(mainRes[0].comments);
  console.log(mainRes[0].comments, commentList);
  let commentObj = { uid, value, avatar, nickname };
  commentList.unshift(commentObj);
  query(
    `update main set comments='${JSON.stringify(commentList)}' where id='${id}'`
  );
  res.send({ message: "0k" });
});
router.post("/deleteTweet", async function (req, res, next) {
  let { id } = req.body;
  let mainRes = await query(`delete from main where id='${id}'`);
  res.send({ message: "0k" });
});
router.post("/addFriend", async function (req, res, next) {
  let { uid, otherUid } = req.body;
  let profileRes = await query(
    `select friends from profile where uid='${uid}'`
  );
  let friends = profileRes[0].friends ? JSON.parse(profileRes[0].friends) : [];
  friends.push(otherUid);
  await query(
    `update profile set friends='${JSON.stringify(friends)}' where uid='${uid}'`
  );
  res.send({ message: "0k" });
});

router.get("/recommend", async function (req, res, next) {
  let userRes = await query(`select * from user order by rand() limit 4 `);
  let arr = userRes.map((item) => item.uid);
  let profileRes = await query(
    `select headerImg, nickname, birthday, uid from profile where find_in_set(uid, '${arr.toString()}')`
  );
  res.send({ message: "0k", recommend: profileRes });
});
module.exports = router;
