const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const routes = require("./routes");

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

// body
app.use(express.urlencoded({ extended: true }));

// routes
app.use(routes);

//錯誤處理
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 監聽
app.listen(port, () => {
  console.log(`this is running on http://localhost:${port}`);
});
