const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const port = 3000;

// template
app.engine("hbs", exphbs({ defaultLayout: "main", extname: "hbs" }));
app.set("view engine", "hbs");

// 引用圖片
app.use(express.static("public"));

// 首頁
app.get("/", (req, res) => {
  res.render("index");
});

// 監聽
app.listen(port, () => {
  console.log(`this is running on http://localhost:${port}`);
});
