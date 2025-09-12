import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";

import { Strategy as LocalStrategy } from "passport-local";
import bcryptjs from "bcryptjs";

import httpStatus from "http-status-codes";
import AppError from "../errorHelpers/AppError";
import { IsActive, Role } from "../modules/user/user.interface";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done) => {
      try {
        const userExists = await User.findOne({ email });
        if (!userExists) {
          return done(null, false, { message: "User does not exist" });
        }

        const userIsGoogleAuthenticated = userExists.auths.some(
          (providerObj) => providerObj.provider === "google"
        );

        if (userIsGoogleAuthenticated) {
          return done(null, false, {
            message: "This email is Logged in with google.",
          });
        }
        const passwordMatched = await bcryptjs.compare(
          password as string,
          userExists.password as string
        );

        if (!passwordMatched) {
          throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
        }

        return done(null, userExists);
      } catch (error) {
        console.log(error);
        return done(error);
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

        if (
          (isUserExists && isUserExists.isActive === IsActive.BLOCKED) ||
          isUserExists.isActive === IsActive.INACTIVE
        ) {
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
