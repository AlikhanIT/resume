const passport = require("passport");
const userService = require("./services/userService");
const VKontakteStrategy = require("passport-vkontakte").Strategy;

const VKONTAKTE_APP_ID = "51461969";
const VKONTAKTE_APP_SECRET = "lEjVYveuIr8HFP7ijVbf";

passport.use(
  new VKontakteStrategy(
    {
      clientID: VKONTAKTE_APP_ID, // VK.com docs call it 'API ID', 'app_id', 'api_id', 'client_id' or 'apiId'
      clientSecret: VKONTAKTE_APP_SECRET,
      callbackURL: "http://localhost:5000/api/user/auth/vkontakte/callback",
    },
    (req, accessToken, refreshToken, profile, done) => {
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
      console.log("profile", profile.photos[0].value);
      console.log("done", done);

      userService.loginByVk(profile.id, profile.photos[0].value);
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
