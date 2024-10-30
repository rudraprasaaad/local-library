const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("respond with a source");
});

router.get("/cool", (req, res) => {
  res.send("You're so cool");
});

module.exports = router;
