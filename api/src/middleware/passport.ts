import { JWT_KEY } from "../config/config";
import passportJwt from "passport-jwt";
import { PassportStatic } from "passport";
import { Request } from "express";
import UserModel from "../model/UserModel";

const { Strategy } = passportJwt;

const cookieExtractor = (req: Request) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies.jwt;
  }

  return jwt;
};

const strategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_KEY,
};
export default (passport: PassportStatic) => {
  passport.use(
    new Strategy(strategyOptions, (payload, done) => {
      //done is the callback function
      const user = UserModel.findById(payload.id)
        .then((user) => {
          if (user) {
            done(null, user); //first param for error, send for user found
          } else {
            done(null, false);
          }
        })
        .catch(() => done(null, false));
    })
  );
};
