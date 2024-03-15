const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./models");
const cors = require("cors");
const app = express();
const PORT = 8080;

// 프로필 이미지를 저장할 디렉토리
const profileDir = path.join(__dirname, "./static/profileUploads");
if (!fs.existsSync(profileDir)) {
    fs.mkdirSync(profileDir, { recursive: true });
}

// 게시글 이미지를 저장할 디렉토리
const recipeDir = path.join(__dirname, "./static/recipeUploadImg");
if (!fs.existsSync(recipeDir)) {
    fs.mkdirSync(recipeDir, { recursive: true });
}

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cors({
        origin: "http://cookeat.shop:8080", // 클라이언트의 도메인
        credentials: true, // `Authorization` 헤더를 포함한 요청을 허용함
    })
);

db.sequelize.sync({ force: false }).then((result) => {
    console.log("db연결 성공");
});
// app.use("/static", express.static(__dirname + "/static"));
app.use("/static", express.static(path.join(__dirname + "/static")));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js")); // bootstrap JS
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css")); // bootstrap CSS

const indexRouter = require("./routes");
app.use("/", indexRouter);

// -----------------------------------------------------------------
app.get("*", (req, res) => {
    res.render("404");
});
app.listen(PORT, () => {
    // localhost
    console.log(`Server is running on http://localhost:${PORT}`);
    // npc 공인ip: 118.67.133.199
    console.log(`http://cookeat.shop:${PORT}`);
});
