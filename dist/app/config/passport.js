"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_1 = require("./env");
const user_model_1 = require("../modules/user/user.model");
// import { IsActive, Role } from "../modules/user/user.interface";
const passport_local_1 = require("passport-local");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import AppError from "../errorHelpers/appError";
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const user_interface_1 = require("../modules/user/user.interface");
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     async (email: string, password: string, done) => {
//       console.log(email, password);
//       try {
//         const isUserExists = await User.findOne({ email });
//         console.log(isUserExists, "from line 23");
//         if (!isUserExists) {
//           return done("User does not exist");
//         }
//         if (isUserExists.isBlocked) {
//           done(`User is blocked`);
//         }
//         if (!isUserExists.isVerified) {
//           done(" User is not verified");
//         }
//         if (isUserExists.isDeleted) {
//           throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");
//         }
//         const isGoogleAuthenticated = isUserExists.auths.some(
//           (providerObjects) => providerObjects.provider === "google"
//         );
//         if (isGoogleAuthenticated && !isUserExists.password) {
//           return done(
//             "You have authenticated with google. If you want to login with password, first login with google and then set a password to login with a password for next time"
//           );
//         }
//         const isPasswordMatched = bcryptjs.compare(
//           password as string,
//           isUserExists.password as string
//         );
//         if (!isPasswordMatched) {
//           return done(null, false, { message: "Password does not match" });
//         }
//         return done(null, isUserExists);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userExists = yield user_model_1.User.findOne({ email });
        if (!userExists) {
            return done(null, false, { message: "User does not exist" });
        }
        const userIsGoogleAuthenticated = userExists.auths.some((providerObj) => providerObj.provider === "google");
        if (userIsGoogleAuthenticated) {
            return done(null, false, {
                message: "This email is Logged in with google.",
            });
        }
        const passwordMatched = yield bcryptjs_1.default.compare(password, userExists.password);
        if (!passwordMatched) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Incorrect Password");
        }
        return done(null, userExists);
    }
    catch (error) {
        console.log(error);
        return done(error);
    }
})));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.envVars.GOOGLE_CLIENT_ID,
    clientSecret: env_1.envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: env_1.envVars.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const email = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value;
        if (!email) {
            return done(null, false, { message: "No email Found" });
        }
        let isUserExists = yield user_model_1.User.findOne({ email });
        if (!isUserExists) {
            isUserExists = yield user_model_1.User.create({
                email,
                name: profile.displayName,
                picture: (_b = profile.photos) === null || _b === void 0 ? void 0 : _b[0].value,
                role: user_interface_1.Role.USER,
                isVerified: true,
                auths: [
                    {
                        provider: "google",
                        providerId: profile.id,
                    },
                ],
            });
        }
        if ((isUserExists && isUserExists.isActive === user_interface_1.IsActive.BLOCKED) ||
            isUserExists.isActive === user_interface_1.IsActive.INACTIVE) {
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
    }
    catch (error) {
        return done(error);
    }
})));
passport_1.default.serializeUser(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(user, done) => {
    done(null, user === null || user === void 0 ? void 0 : user._id);
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
}));
