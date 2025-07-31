import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const USER_ADMIN = 1;
export const USER_AGENT = 3;
export const USER_USER = 5;
export const USER_ANONYMOUS = 10;

export const emailConfig = {
   host: process.env.EMAIL_HOST,
   port: Number(process.env.EMAIL_PORT),
   user: process.env.EMAIL_USER,
   pass: process.env.EMAIL_PASS,
   from: process.env.EMAIL_FROM,
};
