const models = require("../models");
const jwt = require("jsonwebtoken");
const SECRET = "DWB0jOga2jrAozUXUsLCQ1e4EeeQH8"; //랜덤문자열 env관리 예정
const bcrypt = require("bcrypt");
const path = require("path");
const multer = require("multer");
const uploadDetail = multer({
    storage: multer.diskStorage({
        // 저장할 경로 profileUploads 폴더
        destination(req, file, done) {
            done(null, "profileUploads/");
        },
        filename(req, file, done) {
            // 파일 확장자 추출
            const ext = path.extname(file.originalname);
            // 파일 이름을 원본 파일 이름의 베이스 이름, 현재 날짜의 타임스탬프, 확장자로
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    // 파일 크기 제한 설정 (5MB)
    limits: { fileSize: 5 * 1024 * 1024 },
});

exports.profileUpload = (req, res) => {
    // "userfile"은 파일 업로드 필드의 name과 일치시켜야함
    console.log(req.file);
    console.log(req.body);
    res.send("업로드 완료");
};
// routes/index.js에서 사용할 수 있게 내보내기
exports.uploadDetail = uploadDetail;

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
    res.render("creatRecipeForm");
};
// exports.postJoin = (req, res) => {
//     console.log("회원가입 정보", req.body);
//     //암호화
//     const hashedPw = hashPw(req.body.password);
//     models.Users.create({
//         userId: req.body.userId,
//         password: hashedPw,
//         userName: req.body.userName,
//     }).then((result) => {
//         console.log(result);
//         res.send({ msg: "회원가입 완료!", statusCode: 200 });
//     });
// };
exports.postJoin = (req, res) => {
    console.log("회원가입 정보", req.body);
    // 암호화
    const hashedPw = hashPw(req.body.password);
    models.Users.create({
        userId: req.body.userId,
        password: hashedPw,
        userName: req.body.userName,
    })
        .then((result) => {
            console.log(result);
            console.log("회원가입 성공! 생성된 사용자 정보:", result);

            res.send({ msg: "회원가입 완료!", statusCode: 200 });
        })
        .catch((error) => {
            console.error("회원가입 중 에러 발생:", error);
            res.status(500).send("서버 오류로 회원가입에 실패하였습니다.");
        });
};

// exports.postLogin = (req, res) => {
//     //{userId, password}
//     console.log("로그인 데이터", req.body);
//     const { userId, password } = req.body;
//     models.Users.findOne({
//         where: { userId: userId },
//     }).then((result) => {
//         console.log("로그인 password 조회 결과:", result);
//         if (result) {
//             //result.password = 해시된 비밀번호
//             const hashedPw = result.password;
//             const id = result.id;
//             const loginResult = comparePw(password, hashedPw);
//             if (loginResult) {
//                 const token = jwt.sign({ id }, SECRET);
//                 console.log("token", token);
//                 console.log("loginResult", loginResult);
//                 res.send({
//                     result: loginResult,
//                     msg: "로그인 완료",
//                     statusCode: 200,
//                     token: token,
//                 });
//             } else {
//                 //비밀번호 오류
//                 res.send({ msg: "로그인 실패", result: false });
//             }
//         } else {
//             //아이디 오류
//             res.send({ msg: "로그인 실패", result: false });
//         }
//     });
// };
exports.postLogin = (req, res) => {
    // {userId, password}
    console.log("로그인 데이터", req.body);
    const { userId, password } = req.body;

    models.Users.findOne({
        where: { userId: userId },
    }).then((result) => {
        console.log("로그인 password 조회 결과:", result);
        if (result) {
            const hashedPw = result.password;

            // 비밀번호 비교
            bcrypt.compare(password, hashedPw, (err, passwordMatch) => {
                if (passwordMatch) {
                    const id = result.id;
                    const user = { id, userId: result.userName };
                    const token = jwt.sign(user, SECRET, {
                        expiresIn: "10m",
                    });
                    console.log("token", token);
                    console.log("loginResult", true);

                    // 로그인 성공 시 유저 이름과 함께 응답
                    res.send({
                        id,
                        result: true,
                        msg: `환영합니다, ${result.userName}님!`,
                        statusCode: 200,
                        token: token,
                    });
                } else {
                    // 비밀번호 오류
                    res.send({ msg: "로그인 실패! 비밀번호를 확인해주세요", result: false });
                }
            });
        } else {
            // 아이디 오류
            res.send({ msg: "로그인 실패! 아이디를 확인해주세요", result: false });
        }
    });
};

//로그아웃 기능 추가중..(3/3, 명현)
exports.logout = (req, res) => {
    // 클라이언트의 쿠키를 삭제
    res.clearCookie("login");

    const token = localStorage.getItem("user");

    // 서버에서 로그아웃 관련 작업 수행
    if (!token) {
        // 로그인되어 있는 토큰이 없을 경우
        return res.send({
            msg: "로그인을 해주세요!",
            statusCode: 400,
            tokenDeleted: true,
        });
    }

    res.send({ msg: "로그아웃 완료", statusCode: 200, tokenDeleted: true });
};

exports.getPosts = (req, res) => {
    //전체 게시글 조회

    try {
        models.Users.findAll().then((res) => {
            console.log("======================");
            console.log(res);
        });
        console.log(allUser);
        models.Posts.findAll({
            attributes: ["postId", "id", "title", "createdAt"],
            include: [{ model: models.Users }],
        }).then((result) => {
            console.log("user data``````````", models.Users);
            console.log("result", result);
            if (result.length > 0) {
                // res.json({ posts: result });
                res.send(result);
                // res.render("posts", { isData: true, posts: result });
            } else {
                // res.send("게시글이 존재하지 않습니다");
                res.render("posts", { isData: false, message: "게시글이 존재하지 않습니다" });
            }
        });
    } catch (err) {
        console.log("err", err);
        res.status(500).send("서버 에러");
    }
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
        const tokenWithBearer = req.headers.authorization;
        const token = tokenWithBearer.split(" ")[1];
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
        console.error("게시글 작성 중 에러가 발생했습니다.", err);
        // 토큰 유효성 검사 에러
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "로그인이 필요합니다." });
        }
        res.status(500).send("서버 에러", err);
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
            include: [
                {
                    model: models.Users,
                    as: "author", // 별칭을 'author'로 설정합니다.
                    attributes: ["userName"], // 필요한 필드만 선택하여 가져옵니다.
                },
            ],
        });

        const dateString = postDetail.createdAt;
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);

        // 게시글이 존재하지 않는 경우
        if (!postDetail) {
            return res.status(404).json({ error: "게시글이 존재하지 않습니다." });
        }
        // res.json(postDetail);
        res.render("post", { post: postDetail, formattedDate });
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
        const tokenWithBearer = req.headers.authorization;
        const token = tokenWithBearer.split(" ")[1];
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
        const tokenWithBearer = req.headers.authorization;
        const token = tokenWithBearer.split(" ")[1];
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
exports.getProfile = (req, res) => {
    res.render("profile");
};

// 회원정보 및 수정 페이지 조회 - 형석
exports.profile = async (req, res) => {
    // res.render("profile");
    try {
        // 요청 헤더에서 토큰 추출
        console.log(req.headers.authorization);
        const tokenWithBearer = req.headers.authorization;
        const token = tokenWithBearer.split(" ")[1];
        // jwt.verify(token, SECRET)
        // const decodedToken1 = jwt.verify(token, SECRET);
        // console.log("decodedToken>>", decodedToken);
        if (!token) {
            return res.status(401).send("로그인이 필요합니다.");
        }
        // 토큰을 검증하고 사용자 ID 추출
        const decodedToken = jwt.verify(token, SECRET);
        console.log("decodedToken", decodedToken);
        const userId = decodedToken.id;
        // 추출한 사용자 ID로 데이터베이스에서 사용자 정보 조회
        models.Users.findOne({
            where: { id: userId },
        })
            .then((user) => {
                if (user) {
                    // 사용자 정보가 있으면 프로필 페이지를 렌더링
                    res.json({ user: user.dataValues, userId });
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
        // if (error) throw error;
        // JWT 검증 실패
        res.status(401).send("유효하지 않은 토큰");
        // const msg = `alert("로그인을 진행해주세요!")`;
        // res.render("index");
    }
};

exports.profileEdit = (req, res) => {
    res.render("profileEdit");
};

// 회원 탈퇴
exports.profileDelete = async (req, res) => {
    try {
        // 로그인한 사용자의 id를 토큰에서 추출
        const tokenWithBearer = req.headers.authorization;
        const token = tokenWithBearer.split(" ")[1];
        const decodedToken = jwt.verify(token, SECRET);
        const userId = decodedToken.id;
        const isDeleted = await models.Users.destroy({
            where: { id: userId },
        });
        if (isDeleted) {
            res.send({ msg: "회원탈퇴 완료" });
        }
    } catch (err) {
        console.log("err", err);
        // 토큰 유효성 검사 에러
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "로그인이 필요합니다." });
        }
        res.status(500).send("회원 탈퇴 중 오류 발생.");
    }
};

// ID중복 확인 기능 추가중
exports.checkUsername = (req, res) => {
    const { userId } = req.body;

    models.Users.findOne({
        where: { userId },
    })
        .then((result) => {
            if (result) {
                // 이미 존재하는 ID인 경우
                res.send({ exists: true });
            } else {
                // 사용 가능한 ID인 경우
                res.send({ exists: false });
            }
        })
        .catch((error) => {
            console.error("ID 중복 확인 중 에러 발생:", error);
            res.status(500).send("서버 오류로 ID 중복 확인에 실패하였습니다.");
        });
};
// 닉네임 중복 확인 기능 추가중
exports.checkNickname = (req, res) => {
    const { userName } = req.body;

    models.Users.findOne({
        where: { userName },
    })
        .then((result) => {
            if (result) {
                // 이미 존재하는 닉네임인 경우
                res.send({ exists: true });
            } else {
                // 사용 가능한 닉네임인 경우
                res.send({ exists: false });
            }
        })
        .catch((error) => {
            console.error("ID 중복 확인 중 에러 발생:", error);
            res.status(500).send("서버 오류로 ID 중복 확인에 실패하였습니다.");
        });
};

exports.profileUpdate = async (req, res) => {
    try {
        const tokenWithBearer = req.headers.authorization;
        const token = tokenWithBearer.split(" ")[1];

        if (!token) {
            return res.status(401).send("로그인이 필요합니다.");
        }
        const decodedToken = jwt.verify(token, SECRET);
        const userId = decodedToken.id;

        // 요청 바디에서 업데이트할 사용자 정보 추출
        // (일단 userName과 password만)
        const { userId: id, userName, password } = req.body;

        // 비밀번호 암호화
        const hashedPw = password ? hashPw(password) : undefined;

        // DB에서 사용자 정보 업데이트
        const [updated] = await models.Users.update(
            { userId: id, userName, password: hashedPw },
            { where: { id: userId }, individualHooks: true }
        );
        if (updated) {
            res.status(200).json({ updated, meg: "회원정보가 수정되었습니다." });
        } else {
            res.status(404).send("사용자를 찾을 수 없습니다.");
        }
    } catch (err) {
        console.error("회원정보 수정 중 에러 발생", err);
        res.status(500).send("서버 에러");
    }
};
// 북마크 추가
exports.bookmarkInsert = async (req, res) => {
    try {
        const { postId } = req.params;
        console.log("postId", postId);
        const tokenWithBearer = req.headers.authorization;
        const token = tokenWithBearer.split(" ")[1];
        console.log("token", token);
        if (!token) {
            return res.status(401).send("로그인이 필요합니다.");
        }
        const decodedToken = jwt.verify(token, SECRET);
        const userId = decodedToken.id;

        //bookmark - id, postId
        const bookmarkCreate = await models.Bookmarks.create({
            id: userId,
            postId: postId,
        });
        let result;
        let msg;
        if (bookmarkCreate) {
            //북마크 생성 성공
            msg = "북마크 추가가 완료되었습니다";
            result = true;
        } else {
            //북마크 생성 실패
            msg = "북마크 추가 실패했습니다";
            result = false;
        }
        res.send({ msg, result });
    } catch (e) {
        console.log("error발생", e);
        // return res.status(500).send("server error");
        console.log("토큰이 만료되었습니다");
        res.send("다시 로그인해주세요");
    }
};
// 내 북마크 목록 전체 조회 /profile/:userId/bookmarks
exports.getAllBookMarks = async (req, res) => {
    try {
        // 로그인한 사용자의 id를 토큰에서 추출
        const tokenWithBearer = req.headers.authorization;
        const token = tokenWithBearer.split(" ")[1];

        // 토큰 없는 경우
        if (!token) {
            return res.status(401).send("로그인이 필요합니다.");
        }
        const decodedToken = jwt.verify(token, SECRET);
        const userId = decodedToken.id;

        const user = await models.Users.findByPk(userId, {
            include: [
                {
                    model: models.Posts,
                    as: "bookmarkedPosts", // 별칭을 'bookmarkedPosts'로 설정합니다.
                    through: { attributes: ["createdAt"] }, // // Bookmarks 테이블의 타임스탬프 정보
                    attributes: ["postId", "title"], // 필요한 필드만 선택하여 가져옵니다.
                    include: [
                        {
                            model: models.Users,
                            as: "author", // 별칭을 'author'로 설정합니다.
                            attributes: ["userName"], // 필요한 필드만 선택하여 가져옵니다.
                        },
                    ],
                },
            ],
        });

        if (!user) {
            return res.status(404).json({ message: "회원을 찾을 수 없습니다." });
        }

        const bookmarks = user.bookmarkedPosts.map((post) => ({
            postId: post.postId,
            title: post.title,
            authorName: post.author.userName, // 'author' 별칭을 사용하여 접근합니다.
            bookmarkCreatedAt: post.Bookmarks.createdAt, // Bookmarks 테이블의 createdAt 정보
        }));

        return res.status(200).json(bookmarks);
    } catch (err) {
        console.error("북마크 목록 조회 중 에러 발생", err);
        res.send({ message: "에러 발생", error: err });
        // 어떤 에러 인지 확인 해야함!! 토큰이 만료되었는지, 시퀄라이즈 에러인지 여러 변수가 많음
    }
};

// 북마크 삭제
exports.bookmarkDelete = async (req, res) => {
    try {
        // 응답된 params 저장
        const { postId } = req.params;
        // 요청 헤더에서 Authorization 값 추출, (bearer[token] 형식)
        const tokenWithBearer = req.headers.authorization;
        // bearer와 token을 공백으로 분리해서 실제 토큰만 token 변수에 담음
        const token = tokenWithBearer.split(" ")[1];
        // 토큰 없는 경우
        if (!token) {
            return res.status(401).send("로그인이 필요합니다.");
        }
        // 토큰 디코드하고 디코드된 토큰에서 사용자 id 추출
        const decodedToken = jwt.verify(token, SECRET);
        const userId = decodedToken.id;
        // Bookmarks 모델에서 postIddhk userId가 위에서 응답값과 같은지 확인
        const checkBookmark = await models.Bookmarks.findOne({
            where: { postId: postId, id: userId },
        });
        // 북마크 id와 사용자 id 일치하지 않는 경우
        if (!checkBookmark) {
            return res.status(404).json({ error: "북마크가 없습니다." });
        }
        const isDeleted = await models.Bookmarks.destroy({
            where: { postId: postId },
        });
        if (isDeleted) {
            res.send({ msg: "북마크가 삭제되었습니다." });
        }
    } catch (err) {
        console.error("오류 상세 정보:", err);
        return res.status(500).send("서버 에러, 상세 정보를 확인하세요.");
    }
};
