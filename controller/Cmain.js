const models = require("../models");

exports.main = (req, res) => {
    res.render("index");
};
exports.getLogin = (req, res) => {
    res.render("login");
};
exports.getJoin = (req, res) => {
    res.render("join");
};
exports.getCreatePost = (req, res) => {
    res.render("createPost");
};
exports.postJoin = (req, res) => {
    console.log("회원가입 정보", req.body);
    models.Users.create({
        userId: req.body.userId,
        password: req.body.password,
        userName: req.body.userName,
    }).then((result) => {
        console.log(result);
        res.send({ msg: "회원가입 완료!", statusCode: 200 });
    });
};

// 회원정보 페이지 렌더링
exports.postProfile = (req, res) => {
    models.Users.findOne({
        where: {
            userId: req.body.userId,
        },
    }).then((result) => {
        console.log("프로필 페이지 요청", result);
        res.render("profile", { data: result });
    });
};

// 회원 정보 수정 페이지 이동
exports.editProfile = (req, res) => {
    models.Users.findOne({
        where: {
            userId: req.body.userId,
        },
    }).then((result) => {
        console.log("회원정보 수정 요청", result);
        res.render("profileEdit", { data: result });
    });
};

// 회원 정보 수정

exports.patchProfile = (req, res) => {
    if (!req.body.password || !req.body.userName) {
        return res.status(400).send("수정사항을 입력해주세요.");
    }
    models.Users.update(
        {
            password: req.body.password,
            userName: req.body.userName,
        },
        {
            where: {
                userId: req.body.userId,
            },
        }
    )
        .then((result) => {
            if (result[0] > 0) {
                res.send("회원 정보가 수정되었습니다.");
            } else {
                res.send("수정할 정보가 없습니다.");
            }
        })
        .catch((err) => {
            console.log("회원 정보 수정 중 err", err);
            res.status(500).send("회원 정보 수정 중 에러 발생");
        });
};
