const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");
const teamMembers = require("../app");

//router작성
router.get("/", (req, res) => {
    res.render("index");
});

router.get("/food", (req, res) => {
    res.render("food");
});
router.get("/fryingPan", (req, res) => {
    res.render("fryingPan");
});
router.get("/nav", (req, res) => {
    res.render("nav");
});
router.get("/footer", (req, res) => {
    res.render("footer");
});

router.get("/team", (req, res) => {
    res.render("team", {
        teamMembers,
        faGithub: "faGithub",
        faGoogle: "faGoogle",
    });
});

router.get("/login", (req, res) => {
    res.render("login", { username: "", password: "" });
});

router.get("/join", (req, res) => {
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

module.exports = router;
