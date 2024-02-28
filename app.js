const express = require("express");
const path = require("path");
const db = require("./models");
const app = express();
const PORT = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.sequelize.sync({ force: false }).then((result) => {
    console.log("db연결 성공");
});
app.use("/static", express.static(path.join(__dirname, "static")));

const indexRouter = require("./routes");
app.use("/", indexRouter);

exports.teamMembers = [
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
        googleEmail: "scar0329@gmail.com",
    },
    // Add other team members here...
];
// -----------------------------------------------------------------
app.get("*", (req, res) => {
    res.render("404");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
