"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["prod"];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// (2) 모델 불러오기, sequelize 인스턴스와 Sequelize 모듈을 전달
const Bookmarks = require("./Bookmarks")(sequelize, Sequelize);
const Follows = require("./Follows")(sequelize, Sequelize);
const Posts = require("./Posts")(sequelize, Sequelize);
const Users = require("./Users")(sequelize, Sequelize);

Users.hasMany(Posts, {
    foreignKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
});
Posts.belongsTo(Users, {
    foreignKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
});

Users.belongsToMany(Posts, {
    through: Bookmarks,
    foreignKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
});
Posts.belongsToMany(Users, {
    through: Bookmarks,
    foreignKey: "postId",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
});
Users.belongsToMany(Users, {
    foreignKey: "followingId",
    as: "Followers",
    through: Follows,
});
Users.belongsToMany(Users, {
    foreignKey: "followerId",
    as: "Followings",
    through: Follows,
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Users = Users;
db.Bookmarks = Bookmarks;
db.Follows = Follows;
db.Posts = Posts;

module.exports = db;
