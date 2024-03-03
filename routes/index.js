const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");
// const app = require("../app");
// router작성
router.get("/", controller.main);
router.get("/login", controller.getLogin);
router.get("/join", controller.getJoin);
router.get("/post", controller.getCreatePost);
router.get("/posts", controller.getPosts);
// 로그아웃 라우터
// router.get("/logout", cmainController.logout);

router.post("/checkUsername", controller.checkUsername);
router.post("/checkNickname", controller.checkNickname);

//회원가입 - 주희
router.post("/join", controller.postJoin);
router.post("/login", controller.postLogin);

// 회원정보 및 수정 페이지 조회 - 형석
router.get("/profile", controller.profile);
router.get("/profileEdit", controller.profileEdit);
// 회원정보 수정 - 형석
router.patch("/profileUpdate", controller.profileUpdate);

//게시글 CRUD - 보아
router.post("/post", controller.postRecipe);
router.get("/post/:postId", controller.getPostDetail);
router.patch("/post/:postId", controller.patchPost);
router.delete("/post/:postId", controller.deletePost);

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
