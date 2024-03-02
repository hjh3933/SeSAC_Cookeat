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
        // 제목, 내용, 카테고리 유효성 검사
        if (!title || !content || !category) {
            return res.status(400).json({ error: "제목, 내용, 카테고리는 필수입니다." });
        }

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
        res.send({ msg: "게시글 작성 완료" });
    } catch (err) {
        console.error("게시글 작성 중 에러가 발생했습니다.", err);
        // 토큰 유효성 검사 에러
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "로그인이 필요합니다." });
        }
        res.status(500).send("서버 에러");
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
        res.status(500).send("서버 에러");
    }
};

// 게시글 수정 PATCH
exports.patchPost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content, img, category } = req.body;

        // 로그인한 사용자의 id를 토큰에서 추출
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, SECRET);
        const userId = decodedToken.id;

        // 게시글이 존재하는지 확인
        const existingPost = await models.Posts.findOne({
            where: { postId },
        });

        // 게시글이 존재하지 않는 경우
        if (!existingPost) {
            return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
        }

        // 로그인한 사용자가 게시글을 작성한 사용자인지 확인
        if (existingPost.id !== userId) {
            return res.status(403).json({ error: "게시글을 수정할 권한이 없습니다." });
        }

        // 게시글 업데이트
        await models.Posts.update(
            {
                title,
                content,
                img,
                category,
            },
            {
                where: { postId },
            }
        );
        res.send({ msg: "게시글 수정 완료" });
    } catch (err) {
        console.log("게시글 수정 중에 에러가 발생했습니다.", err);

        // 토큰 유효성 검사 에러
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "로그인이 필요합니다." });
        }
        res.status(500).send("서버 에러");
    }
};

// 게시글 삭제 DELETE
exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.params;

        // 로그인한 사용자의 id를 토큰에서 추출
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, SECRET);
        const userId = decodedToken.id;

        // 게시글이 존재하는지 확인
        const existingPost = await models.Posts.findOne({
            where: { postId },
        });

        // 게시글이 존재하지 않는 경우
        if (!existingPost) {
            return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
        }

        // 로그인한 사용자가 게시글을 작성한 사용자인지 확인
        if (existingPost.id !== userId) {
            return res.status(403).json({ error: "게시글을 삭제할 권한이 없습니다." });
        }

        const isDeleted = await models.Posts.destroy({
            where: { postId },
        });
        if (isDeleted) {
            res.send({ msg: "게시글 삭제 완료" });
        } else {
            res.send({ msg: "게시글 삭제 실패" });
        }
    } catch (err) {
        console.log("err", err);
        // 토큰 유효성 검사 에러
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "로그인이 필요합니다." });
        }
        res.status(500).send("게시글 삭제 중에 오류가 발생했습니다.");
    }
};

// 회원정보 및 수정 페이지 조회 - 형석
exports.profile = (req, res) => {
    // res.render("profile");
    try {
        // 요청 헤더에서 토큰 추출
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).send("로그인이 필요합니다.");
        }
        // 토큰을 검증하고 사용자 ID 추출
        const decodedToken = jwt.verify(token, SECRET);
        const userId = decodedToken.id;
        // 추출한 사용자 ID로 데이터베이스에서 사용자 정보 조회
        models.Users.findOne({
            where: { id: userId },
        })
            .then((user) => {
                if (user) {
                    // 사용자 정보가 있으면 프로필 페이지를 렌더링
                    res.render("profile", { user });
                } else {
                    // 사용자 정보가 없는 경우
                    res.status(404).send("사용자를 찾을 수 없습니다.");
                }
            })
            .catch((err) => {
                // 데이터베이스 조회 중 오류 발생
                console.error("프로필 조회 중 에러 발생", err);
                res.status(500).send("서버 에러");
            });
    } catch (error) {
        // JWT 검증 실패
        res.status(401).send("유효하지 않은 토큰");
    }
};
exports.profileEdit = (req, res) => {
    res.render("profileEdit");
};
