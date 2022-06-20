import express from "express";
import {
  contactUs,
  signinUser,
  signupUser,
} from "../controller/userController";
import { authChecker } from "../middleware/authChecker";
import {
  signinUserValidation,
  signupUserValidation,
} from "../validation/userValidation";

const route = express.Router();

route.post("/signup", signupUserValidation, signupUser);
route.post("/signin", signinUserValidation, signinUser);
route.post("/contact", contactUs);

route.get("/check", authChecker, (req, res) => {
  res.json({ message: "Success" });
});

export default route;
