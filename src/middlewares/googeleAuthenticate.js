const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");

const { usersServices } = require("../service");
const { getUuid, hashPassword } = require("../helpers");
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

const googleParams = {
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: REDIRECT_URI,
  passReqToCallback: true,
};

const googleCallback = async (request, accessToken, refreshToken, profile, done) => {
  try {
    const userInDb = await usersServices.findUser({ email: profile.email }, false);

    if (userInDb) {
      return done(null, userInDb);
    }

    const { displayName, email, picture, verified } = profile;
    const password = await hashPassword(getUuid());
    const verificationToken = getUuid();

    const newUserData = {
      name: displayName,
      email,
      password,
      avatarUrl: picture,
      verified,
      verificationToken,
    };

    const newUser = await usersServices.createUser(newUserData);

    return done(null, newUser);
  } catch (e) {
    done(e, false);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use("google", googleStrategy);
