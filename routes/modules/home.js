const express = require("express");

const router = express.Router();

const Shorten = require("../../models/shorten");

// 首頁
router.get("/", (req, res) => {
  res.render("index");
});

// 前往被縮短網址的頁面
router.get("/:shortURL", (req, res) => {
  Shorten.findOne({ shortURL: req.params.shortURL }).then((shorten) => {
    res.redirect(shorten.URL);
  });
});

module.exports = router;
