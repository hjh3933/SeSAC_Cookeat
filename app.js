const express = require("express");
const app = express();
const PORT = 8080;
const db = require("./models");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/static", express.static(__dirname + "/static"));

const indexRouter = require("./routes");
app.use("/", indexRouter);

db.sequelize.sync({ force: false }).then(() => {
    console.log("db연결 성공");
});

// --------------------------------------------------------------
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
