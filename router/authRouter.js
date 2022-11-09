const express = require("express");
const passport = require("passport");
const router = express();
require("../authGoogle");
require("../authVk");

isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

router.get("/vkontakte", passport.authenticate("vkontakte"));

router.get(
  "/vkontakte/callback",
  passport.authenticate("vkontakte", {
    successRedirect: "/api/user/auth/protected",
    failureRedirect: "/api/user/auth/failure",
  })
);

router.get("/", (req, res) => {
  res.send(
    '<a style="display: block" href="/api/user/auth/google">Authenticate with Google</a><a href="/api/user/auth/vkontakte">Authenticate with Vkontakte</a>'
  );
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/api/user/auth/protected",
    failureRedirect: "/api/user/auth/failure",
  })
);

router.get("/protected", isLoggedIn, (req, res) => {
  // console.log(req.user);
  res.send(`Hello ${req.user.displayName}`);
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("Goodbye!");
});

router.get("/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

router.get("/test", (req, res) => {
  res.render("room", { roomId: "testing" });
});

module.exports = router;
