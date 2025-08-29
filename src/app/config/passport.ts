import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
// import { IsActive, Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs";
// import AppError from "../errorHelpers/appError";
import httpStatus from "http-status-codes";
import AppError from "../errorHelpers/AppError";
import { Role } from "../modules/user/user.interface";
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      console.log(email, password);
      try {
        const isUserExists = await User.findOne({ email });
        console.log(isUserExists, "from line 23");
        if (!isUserExists) {
          return done("User does not exist");
        }

        if (isUserExists.isBlocked) {
          done(`User is blocked`);
        }

        if (!isUserExists.isVerified) {
          done(" User is not verified");
        }
        if (isUserExists.isDeleted) {
          throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
        }
        const isGoogleAuthenticated = isUserExists.auths.some(
          (providerObjects) => providerObjects.provider === "google"
        );
        if (isGoogleAuthenticated && !isUserExists.password) {
          return done(
            "You have authenticated with google. If you want to login with password, first login with google and then set a password to login with a password for next time"
          );
        }
        const isPasswordMatched = bcryptjs.compare(
          password as string,
          isUserExists.password as string
        );

        if (!isPasswordMatched) {
          return done(null, false, { message: "Password does not match" });
        }
        return done(null, isUserExists);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  new GoogleStrategy(
    {
      clientID: envVars.GOOGLE_CLIENT_ID,
      clientSecret: envVars.GOOGLE_CLIENT_SECRET,
      callbackURL: envVars.GOOGLE_CALLBACK_URL,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) {
          return done(null, false, { message: "No email Found" });
        }

        let isUserExists = await User.findOne({ email });

        if (!isUserExists) {
          isUserExists = await User.create({
            email,
            name: profile.displayName,
            picture: profile.photos?.[0].value,
            role: Role.USER,
            isVerified: true,
            auths: [
              {
                provider: "google",
                providerId: profile.id,
              },
            ],
          });
        }

        if (isUserExists && isUserExists.isBlocked) {
          return done(null, false, {
            message: `User is blocked`,
          });
        }

        if (isUserExists && !isUserExists.isVerified) {
          return done(null, false, { message: "User is not verified" });
        }
        if (isUserExists && isUserExists.isDeleted) {
          return done(null, false, { message: "User is deleted" });
        }
        return done(null, isUserExists, {
          message: "User created successfully",
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (user: any, done: (err: any, id?: unknown) => void) => {
    done(null, user?._id);
  }
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
