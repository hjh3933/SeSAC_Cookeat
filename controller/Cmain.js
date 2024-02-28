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
    // {
    //     ”userId” : “cocoa1234” ,
    //     "password" : "cocoa@1234",
    //      "username" : "코코아"
    //      }
    console.log("회원가입 정보", req.body);
};
