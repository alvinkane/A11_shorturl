const express = require("express");
const clipboard = require("clipboardy");

const router = express.Router();

const Shorten = require("../../models/shorten");

// 縮短網址
router.post("/", (req, res) => {
  if (!req.body.url.length) {
    return res.redirect("/");
  }
  const URL = req.body.url;
  const randomQuantity = 5;
  // 建立所有數字
  const numbers = Array.from(Array(10).keys());
  // 建立所有英文小寫
  const lowerCaseLetters = Array.from(Array(26), (_, i) =>
    String.fromCharCode("a".charCodeAt(0) + i)
  );
  // 建立所有英文大寫
  const upperCaseLetters = Array.from(Array(26), (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
  );
  let randomNumber = "";
  // 每種都包含一個
  randomNumber += numbers[Math.floor(Math.random() * numbers.length)];
  randomNumber +=
    lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
  randomNumber +=
    upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];

  for (let i = 3; i < randomQuantity; i++) {
    const allCharacters = [
      ...numbers,
      ...lowerCaseLetters,
      ...upperCaseLetters,
    ];
    randomNumber +=
      allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  // Fisher-Yates Shuffle
  const randomNumberArray = randomNumber.split("");
  for (let index = randomNumberArray.length - 1; index > 0; index--) {
    let randomIndex = Math.floor(Math.random() * (index + 1));
    [randomNumberArray[index], randomNumberArray[randomIndex]] = [
      randomNumberArray[randomIndex],
      randomNumberArray[index],
    ];
  }
  randomNumber = randomNumberArray.join("");
  const shortURL = `${randomNumber}`;
  Shorten.findOne({ URL })
    .then((shorten) => {
      if (!shorten) {
        Shorten.create({ URL, shortURL })
          .then((shorten) => {
            res.redirect(`/shorteners/${shorten._id}`);
          })
          .catch((err) => console.log(err));
      } else {
        res.redirect(`/shorteners/${shorten._id}`);
      }
    })
    .catch((err) => console.log(err));
});

// 縮短網址頁面
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Shorten.findById(id)
    .lean()
    .then((shorten) => {
      res.render("shortener", { shorten });
    })
    .catch((err) => console.log(err));
});

// 複製網址
router.get("/:id/copy", (req, res) => {
  const id = req.params.id;
  Shorten.findById(id).then((shorten) => {
    clipboard.writeSync(`http://localhost:3000/${shorten.shortURL}`);
    res.redirect(`/shorteners/${id}`);
  });
});

module.exports = router;
