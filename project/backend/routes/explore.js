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

module.exports = router;
