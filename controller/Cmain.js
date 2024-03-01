const models = require("../models");
const jwt = require("jsonwebtoken");
const SECRET = "DWB0jOga2jrAozUXUsLCQ1e4EeeQH8"; //랜덤문자열 env관리 예정
const bcrypt = require("bcrypt");

//암호화, 비교 함수
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
exports.getPosts = (req, res) => {
    //전체 게시글 조회
    models.Posts.findAll({
        attributes: ["postId", "id", "title", "createdAt"],
        include: [{ model: models.Users }, { model: models.Users, attributes: ["userName"] }],
    }).then((result) => {
        if (result.length > 0) {
            res.render("posts", { posts: result });
            // res.send(result);
        } else {
            res.send("게시글이 존재하지 않습니다");
        }
    });
};

// 게시글 작성
exports.postRecipe = async (req, res) => {
    try {
        const { title, content, img, category } = req.body;

        // 로그인한 사용자의 id를 토큰에서 추출
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, SECRET);
        const userId = decodedToken.id;

        const newRecipe = await models.Posts.create({
            title,
            content,
            img: null,
            category,
            id: userId,
        });
        res.json(newRecipe);
    } catch (err) {
        console.log("err", err);
        res.status(500).send("server error");
    }
};
//단일 게시글 조회
exports.getPostDetail = async (req, res) => {
    try {
        const { postId } = req.params;

        // 게시글 조회
        const postDetail = await models.Posts.findOne({
            where: {
                postId,
            },
        });

        // 게시글이 존재하지 않는 경우
        if (!postDetail) {
            return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
        }
        res.json(postDetail);
    } catch (err) {
        console.log("err", err);
        res.status(500).send("server error");
    }
};
