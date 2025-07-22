import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../modules/user/user.model";
import bcryptjs from "bcryptjs";
passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email: string, password: string, done) => {
      const isUserExists = await User.findOne({ email });
      if (!isUserExists) {
        return done("User does not exist");
      }
      const isGoogleAuthenticated = isUserExists.auths.some(
        (providerObject) => providerObject.provider === "google"
      );
      if (isGoogleAuthenticated) {
        done("You are authenticated with google. Please login with google");
      }
      // const isPasswordMatched = bcryptjs.compare(isUserExists.password, password)
    }
  )
);
