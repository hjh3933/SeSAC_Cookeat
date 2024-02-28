const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");
const teamMembers = require("../app");

//router작성
router.get("/", controller.main);
router.get("/login", controller.getLogin);
router.get("/join", controller.getJoin);
router.get("/post", controller.getCreatePost);

//회원가입 - 주희
router.post("/join", controller.postJoin);
router.post("/login", controller.postLogin);

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

module.exports = router;
