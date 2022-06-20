import { Request, Response, NextFunction, RequestHandler } from "express";
import createHttpError from "http-errors";
import User, { IUser } from "../model/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
import { emailAdd, JWT_KEY, pass } from "../config/config";

export const signupUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password }: IUser = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(createHttpError(422, "User already exists!"));

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "User created successfully!" }).status(201);
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const signinUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password }: IUser = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return next(createHttpError(404, "User does not exists!"));

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return next(createHttpError(401, "Incorrect Password"));

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
    });
    res.json({ name: user.name }).status(200);
  } catch (error) {
    return next(createHttpError.InternalServerError);
  }
};

export const contactUs = (req: Request, res: Response, next: NextFunction) => {
  //destructuring
  const { name, email, message } = req.body;
  console.log(req.body);
  try {
    const transporter: nodeMailer.Transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: emailAdd,
        pass: pass,
      },
    });

    const mailOptions: nodeMailer.SendMailOptions = {
      from: '"Sujan"',
      to: "sujan.poudel210@gmail.com",
      subject: "Email sent using nodemailer.",
      //text: Hi! I am ${name}. \n ${message}
      html: `<h2>Hi! I am ${name}. \n ${message}</h2>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(`Email sent: ${info.response}`);
        res.json({ message: "Success" });
      }
    });
  } catch (error) {
    res.send(error);
  }
};
