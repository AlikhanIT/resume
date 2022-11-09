const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router/index");
const errorsMiddleware = require("./middlewares/errorMiddleware");
const app = express();
require("./authGoogle");
require("./authvk");
const path = require("path");

require("dotenv").config();

app.use(express.json());
app.use(session({ secret: "cats", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(errorsMiddleware);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", router);

const port = process.env.PORT || 5000;

isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/user/auth/protected",
    failureRedirect: "/api/user/auth/failure",
  })
);

const start = async () => {
  try {
    await app.listen(port, () => {
      console.log("Server started on", port);
    });
  } catch (e) {
    console.warn(e);
  }
};

start();
