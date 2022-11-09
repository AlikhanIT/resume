const passport = require("passport");
const userService = require("./services/userService");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID =
  "111446507791-adssi0m2h0lpdtg0jnvk2ht8dga5oro2.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
      passReqToCallback: true,
    },
    (request, accessToken, refreshToken, profile, done) => {
      console.log("request", request);
      console.log("accessToken", accessToken);
      console.log("refreshToken", refreshToken);
      console.log("profile", profile);
      console.log("done", done);
      userService.loginByGoogle(
        profile.id,
        profile.photos[0].value,
        profile.email
      );
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
