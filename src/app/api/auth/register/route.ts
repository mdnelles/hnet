import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: ".env" });

export async function POST(req: NextRequest) {
   try {
      const { email, password, name } = await req.json();

      if (!email || !password || !name) {
         return NextResponse.json(
            { message: "Email, password, and name are required" },
            { status: 400 }
         );
      }

      // Check if user exists
      const existingUser = await prisma.users.findUnique({
         where: { email },
      });

      if (existingUser) {
         return NextResponse.json(
            { message: "Email already in use" },
            { status: 400 }
         );
      }

      // Hash password and generate reset token
      const hashedPassword = await bcrypt.hash(password, 10);
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

      // Create new user
      const newUser = await prisma.users.create({
         data: {
            email,
            password: hashedPassword,
            name,
            userLevel: 10,
            profileImg: "profile.png",
            isActive: false, // Inactive until verified
            parentId: 0,
            resetToken,
            resetTokenExpiry,
         },
      });

      // Send verification email
      const transporter = nodemailer.createTransport({
         host: process.env.EMAIL_HOST,
         port: Number(process.env.EMAIL_PORT),
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
         },
      });

      await transporter.sendMail({
         from: `"${process.env.APP_NAME} App" <${process.env.EMAIL_FROM}>`,
         to: email,
         subject: `Verify Your ${process.env.APP_NAME} Account`,
         html: `
         <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
               <div style="text-align: center; margin-bottom: 30px;">
                  <div style="
                     display: inline-block;
                     padding: 10px 20px;
                     background-color: #ffffff;
                     border-radius: 8px;
                     font-family: Arial, sans-serif;
                     font-size: 28px;
                     font-weight: 900;
                     color: #1e40af;
                     letter-spacing: 1px;
                     text-transform: uppercase;
                  ">
                     ${process.env.APP_NAME}
                  </div>
               </div>
      
               <h2 style="color: #333; font-size: 20px; margin-bottom: 10px;">Verify Your Email Address</h2>
               <p style="color: #555; line-height: 1.5;">
                  Welcome to ${process.env.APP_NAME}! To activate your account and start using our services, please verify your email address by clicking the button below. This link will expire in <strong>1 hour</strong>.
               </p>
      
               <div style="text-align: center; margin: 30px 0;">
                  <a href="${process.env.NODE_HOST_SITE}/verify-email?token=${resetToken}"
                     style="background-color: #1e40af; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold; display: inline-block;">
                     Verify Email
                  </a>
               </div>
      
               <p style="color: #555; font-size: 14px;">
                  Or copy and paste the link below into your browser:
               </p>
               <p style="word-break: break-all; color: #1e40af; font-size: 14px;">
                  ${process.env.NODE_HOST_SITE}/verify-email?token=${resetToken}
               </p>
      
               <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
               <p style="color: #999; font-size: 12px; text-align: center;">
                  If you did not create an account, please ignore this email.
               </p>
            </div>
         </div>
      `,
      });

      // Exclude password from response using a different variable name
      const { password: excludedPassword, ...userData } = newUser;

      return NextResponse.json({ user: userData }, { status: 201 });
   } catch (error) {
      console.error("Error registering user:", error);
      return NextResponse.json(
         { message: "Internal Server Error" },
         { status: 500 }
      );
   }
}
