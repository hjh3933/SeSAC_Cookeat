"use strict";

const Sequelize = require("sequelize");
console.log("cross-env>>", process.env.NODE_ENV); //prod or development

let config;
if (process.env.NODE_ENV) {
    //npm run dev - local에서 development or npm start - server에서 prod
    config = require(__dirname + "/../config/config.json")[process.env.NODE_ENV];
} else {
    config = require(__dirname + "/../config/config.json")["development"];
}
const db = {};

config.timezone = "+09:00"; // 한국 시간으로 설정, 현재는 UTC 시간으로 설정되어 있었음 한국이랑 9시간 차이

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
    as: "writtenPosts", // 별칭을 'writtenPosts'로 설정합니다.
});
Posts.belongsTo(Users, {
    foreignKey: "id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    as: "author", // 별칭을 'author'로 설정합니다.
});

// (allie 추가) Users와 Boookmarks는 1:N 관계
// 하나의 사용자는 여러 개의 북마크를 가지고 있을 수 있음
Users.hasMany(Bookmarks, {
    foreignKey: "id", // bookmarks에서 사용할 컬럼이름 (userId 로 이름을 지어주면 좋겠지만 이미 id 라고 사용하는 곳이 많을 것이기 때문에 id로 사용)
    sourceKey: "id", // users table에서 참조할 컬럼
    as: "bookmarks", // 별칭을 'bookmarks'로 설정합니다.
});

Bookmarks.belongsTo(Users, {
    foreignKey: "id",
    targetKey: "id",
});

// (allie 추가) Posts와 Bookmarks는 1:N관계
// 하나의 포스트는 여러 개의 북마크를 가지고 있을 수 있음
Posts.hasMany(Bookmarks, {
    foreignKey: "postId",
    sourceKey: "postId", // posts table에서 참조할 컬럼
    as: "bookmarks", // 별칭을 'bookmarks'로 설정합니다.
});

Bookmarks.belongsTo(Posts, {
    foreignKey: "postId",
    targetKey: "postId", // posts table에서 참조할 컬럼
    as: "post", // 별칭을 'post'로 설정합니다.
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
