const express = require("express");
const path = require("path");
const db = require("./models");
const app = express();
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.sequelize.sync({ force: false }).then((result) => {
    console.log("db연결 성공");
});

app.use("/static", express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/food", (req, res) => {
    res.render("food");
});
app.get("/nav", (req, res) => {
    res.render("nav");
});

app.get("/login", (req, res) => {
    res.render("login", { username: "", password: "" });
});

app.get("/join", (req, res) => {
    res.render("join", {
        username: "",
        nickname: "",
        password: "",
        confirmPassword: "",
        number: "",
        email: "",
        isUsernameChecked: false,
        isNicknameChecked: false,
        passwordMatchError: false,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
