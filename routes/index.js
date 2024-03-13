const express = require("express");
const router = express.Router();
const controller = require("../controller/Cmain");
// multer - Cmain에서 profileUpload 미들웨어와 uploadDetail 핸들러 가져오기
const { profileUpload, uploadProfileImg } = require("../controller/Cmain");
const { recipeUpload, uploadRecipeImage } = require("../controller/Cmain"); // `recipeUpload`와 `uploadImage` 가져오기

// const app = require("../app");
// router작성
router.get("/", controller.main);
router.get("/login", controller.getLogin);
router.get("/join", controller.getJoin);
router.get("/post", controller.getCreatePost);
router.get("/posts", controller.getPosts);
//특정 유저 id를 params로 받아서 게시글 출력기능
router.get("/userPosts/:id", controller.getUserPosts);
// 로그아웃 라우터
router.get("/logout", controller.logout);

router.post("/checkUsername", controller.checkUsername);
router.post("/checkNickname", controller.checkNickname);

//회원가입  및 로그인 - 주희
router.post("/postJoin", controller.postJoin);
router.post("/login", controller.postLogin);

// 회원정보 페이지 렌더 및 조회 - 형석
router.get("/profile/:userId", controller.getProfile);
router.post("/profile/:userId", controller.profile);

// 회원정보 수정 페이지 렌더  - 보아
router.get("/profileEdit", controller.getProfileEdit);

// 회원정보 수정, 탈퇴 - 형석
router.patch("/profileUpdate/:userId", controller.profileUpdate);
router.delete("/profile/:userId", controller.profileDelete);

// 게시글 수정페이지 라우터
router.get("/postEdit/:postId", controller.getPostEdit);

// multer 설정
// 프로필 이미지 업로드
// "userfile"은 파일 업로드 필드의 name과 일치시켜야 함
router.post("/profileUpload", profileUpload.single("userfile"), uploadProfileImg);
// 게시글 이미지 업로드 - 한개의 input에 여러 파일 업로드
router.post("/recipeUploadImg", recipeUpload.array("file"), uploadRecipeImage);

// 프로필 이미지 조회 및 유저네임 조회 - login.ejs
router.post("/profileImg", controller.getProfileImage);
// 프로필 이미지 추가 - profile.ejs => 서버 DB img 속성으로 넣을때!
router.post("/profileImgCreate", controller.createProfileImg);

// 북마크 추가
router.post("/bookmarkInsert/:postId", controller.bookmarkInsert);
// 북마크 조회 - 프로필 페이지에서 북마크 목록 조회
router.get("/profile/:userId/bookmarks", controller.getAllBookMarks);
// 북마크 삭제 - 형석
router.delete("/bookmarkDelete/:postId", controller.bookmarkDelete);

router.get("/followersPage", controller.getfollowersPage);
router.get("/followingsPage", controller.getfollowingsPage);
// 팔로잉 삭제 - 형석
router.delete("/followDelete", controller.followDelete);
// 팔로우 추가
router.post("/followInsert", controller.followInsert);
// 팔로워 조회
router.post("/followers", controller.getFollowers);
// 팔로잉 조회
router.post("/followings", controller.getFollowings);

//게시글 CRUD - 보아
router.post("/post", controller.postRecipe);
router.post("/postData/:postId", controller.postData);
router.get("/post/:postId", controller.getPostDetail);
router.patch("/post/:postId", controller.patchPost);
router.delete("/post/:postId", controller.deletePost);

// 제목 + 내용 검색 - 보아
router.get("/searchResults", controller.getTitleAndContent);
// 작성자만 검색 - 보아
router.get("/searchResultsByAuthor", controller.getSearchByAuthor);

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
router.get("/bookMark", (req, res) => {
    res.render("bookmark");
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
        imageUrl: "https://i.imgur.com/bg7MG3j.jpeg",
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
