import dotenv from "dotenv";

dotenv.config();

export const port = process.env.port;
export const DB = process.env.DB!;
export const JWT_KEY = process.env.JWT_KEY!;
export const emailAdd = process.env.emailAdd;
export const pass = process.env.pass;
