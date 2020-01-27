var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/test", function(req, res) {
  con.query("select * from user", function(err, result, field) {
    if (err) return console.log(err);
    console.log(result);
    res.json(result);
  });
});
module.exports = router;
