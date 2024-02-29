const models = require("../models");
const jwt = require("jsonwebtoken");
const SECRET = "DWB0jOga2jrAozUXUsLCQ1e4EeeQH8"; //랜덤문자열 env관리 예정
const bcrypt = require("bcrypt");

const saltRounds = 10;

function hashPw(pw) {
    return bcrypt.hashSync(pw, saltRounds);
}
function comparePw(inputPw, hashedPw) {
    return bcrypt.compareSync(inputPw, hashedPw);
}

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
    //암호화
    const hashedPw = hashPw(req.body.password);
    models.Users.create({
        userId: req.body.userId,
        password: hashedPw,
        userName: req.body.userName,
    }).then((result) => {
        console.log(result);
        res.send({ msg: "회원가입 완료!", statusCode: 200 });
    });
};
exports.postLogin = (req, res) => {
    //{userId, password}
    console.log("로그인 데이터", req.body);
    const { userId, password } = req.body;
    models.Users.findOne({
        where: { userId: userId },
    }).then((result) => {
        console.log("로그인 password 조회 결과:", result);
        if (result) {
            //result.password = 해시된 비밀번호
            const hashedPw = result.password;
            const id = result.id;
            const loginResult = comparePw(password, hashedPw);
            if (loginResult) {
                const token = jwt.sign({ id }, SECRET);
                console.log("token", token);
                console.log("loginResult", loginResult);
                res.send({
                    result: loginResult,
                    msg: "로그인 완료",
                    statusCode: 200,
                    token: token,
                });
            } else {
                //비밀번호 오류
                res.send({ msg: "로그인 실패", result: false });
            }
        } else {
            //아이디 오류
            res.send({ msg: "로그인 실패", result: false });
        }
    });
};
