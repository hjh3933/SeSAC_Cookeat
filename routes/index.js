const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");
// const app = require("../app");
// router작성
router.get("/", controller.main);
router.get("/login", controller.getLogin);
router.get("/join", controller.getJoin);
router.get("/post", controller.getCreatePost);

//회원가입 - 주희
router.post("/join", controller.postJoin);

// 회원정보 페이지 조회 미들웨어
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        // `req.isAuthenticated()` 사용자 인증 상태를 확인
        return next();
    } else {
        res.redirect("/login"); // 인증되지 않은 사용자는 로그인 페이지로 리디렉션
    }
}
router.get("/profile", isAuthenticated, controller.postProfile);
router.get("/profileEdit", isAuthenticated, controller.editProfile);

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

const teamMembers = [
    {
        name: "김명현",
        title: "Front-End Developer",
        imageUrl: "https://i.imgur.com/jtXnFZc.png",
        githubUsername: "Myun9hyun",
        googleEmail: "kimmh970808@gmail.com",
    },
    {
        name: "윤대정",
        title: "Front-End Developer",
        imageUrl: "https://i.imgur.com/jtXnFZc.png",
        githubUsername: "beussae",
        googleEmail: "dbseowjd12@gmail.com",
    },
    {
        name: "홍주희",
        title: "Back-End Developer",
        teamleader: "TeamLeader",
        imageUrl: "https://i.imgur.com/jtXnFZc.png",
        githubUsername: "hjh3933",
        googleEmail: "hkh3933@naver.com",
    },
    {
        name: "김보아",
        title: "Back-End Developer",
        imageUrl: "https://i.imgur.com/jtXnFZc.png",
        githubUsername: "SOROKKIM",
        googleEmail: "ksl7593@gmail.com",
    },
    {
        name: "이형석",
        title: "Back-End Developer",
        imageUrl: "https://i.imgur.com/jtXnFZc.png",
        githubUsername: "yhs0329",
        googleEmail: "scar9983@gmail.com",
    },
];
router.get("/team", (req, res) => {
    console.log("ㅇㄱ기기", teamMembers);
    res.render("team", {
        teamMembers,
        faGithub: "faGithub",
        faGoogle: "faGoogle",
    });
});

module.exports = router;
