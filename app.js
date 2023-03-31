const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const Shorten = require("./models/shorten");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected");
});

const port = 3000;

// template
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

// 引用圖片
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// 首頁
app.get("/", (req, res) => {
  res.render("index");
});

// 前往被縮短網址的頁面
app.get("/:shortURL", (req, res) => {
  Shorten.findOne({ shortURL: req.params.shortURL }).then((shorten) => {
    res.redirect(shorten.URL);
  });
});

// 縮短網址
app.post("/shortener", (req, res) => {
  const URL = req.body.url;
  const randomQuantity = 5;
  // 建立所有数字数组
  const numbers = Array.from(Array(10).keys());

  // 建立所有小写字母数组
  const lowerCaseLetters = Array.from(Array(26), (_, i) =>
    String.fromCharCode("a".charCodeAt(0) + i)
  );

  // 建立所有大写字母数组
  const upperCaseLetters = Array.from(Array(26), (_, i) =>
    String.fromCharCode("A".charCodeAt(0) + i)
  );

  // 建立所有数字和字母数组
  const randomWord = [...numbers, ...lowerCaseLetters, ...upperCaseLetters];

  let randomNumber = "";
  for (let i = 0; i < randomQuantity; i++) {
    randomNumber += randomWord[Math.floor(Math.random() * randomWord.length)];
  }
  const shortURL = `${randomNumber}`;
  Shorten.findOne({ URL })
    .then((shorten) => {
      if (!shorten) {
        Shorten.create({ URL, shortURL })
          .then((shorten) => {
            res.redirect(`/shortener/${shorten._id}`);
          })
          .catch((err) => console.log(err));
      } else {
        res.redirect(`/shortener/${shorten._id}`);
      }
    })
    .catch((err) => console.log(err));
});

// 縮短網址頁面
app.get("/shortener/:id", (req, res) => {
  const id = req.params.id;
  Shorten.findById(id)
    .lean()
    .then((shorten) => {
      res.render("shortener", { shorten });
    })
    .catch((err) => console.log(err));
});

// 監聽
app.listen(port, () => {
  console.log(`this is running on http://localhost:${port}`);
});
