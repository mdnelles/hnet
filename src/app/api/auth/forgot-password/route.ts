import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";
import { prisma } from "@/lib/prisma"; // Make sure your Prisma client is correctly imported

dotenv.config({ path: ".env" });

export async function POST(request: Request) {
   try {
      const { email } = await request.json();
      console.log("📨 Received password reset request for:", email);

      // Check if user exists
      const user = await prisma.users.findUnique({
         where: { email },
      });

      if (!user) {
         return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
         );
      }

      // Generate token and expiry
      const resetToken = crypto.randomBytes(32).toString("hex");
      const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

      // Update user with token
      await prisma.users.update({
         where: { email },
         data: {
            resetToken,
            resetTokenExpiry,
         },
      });

      // Configure email transport
      const transporter = nodemailer.createTransport({
         host: process.env.EMAIL_HOST,
         port: Number(process.env.EMAIL_PORT),
         secure: false,
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
         },
      });

      // Send the reset email
      await transporter.sendMail({
         from: `"Website App" <${process.env.EMAIL_FROM}>`,
         to: email,
         subject: "Password Reset for Website",
         html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 40px 20px;">
               <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                  <div style="text-align: center; margin-bottom: 30px;">
                     <div style="
                        display: inline-block;
                        padding: 10px 20px;
                        background-color: #ffffff;
                        border-radius: 8px;
                        font-size: 28px;
                        font-weight: 900;
                        color: #1e40af;
                        text-transform: uppercase;
                     ">Website</div>
                  </div>

                  <h2 style="color: #333;">Password Reset Request</h2>
                  <p style="color: #555;">You requested to reset your Website password. Click the button below. This link expires in <strong>1 hour</strong>.</p>

                  <div style="text-align: center; margin: 30px 0;">
                     <a href="${process.env.NODE_HOST_SITE}/forgot-password?token=${resetToken}"
                        style="background-color: #1e40af; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px;">
                        Reset Password
                     </a>
                  </div>

                  <p style="color: #555;">Or paste this link into your browser:</p>
                  <p style="color: #1e40af;">${process.env.NODE_HOST_SITE}/forgot-password?token=${resetToken}</p>

                  <hr style="margin: 30px 0; border-top: 1px solid #eee;" />
                  <p style="color: #999; font-size: 12px; text-align: center;">
                     If you didn't request this, you can safely ignore this email.
                  </p>
               </div>
            </div>
         `,
      });

      console.log("✅ Reset email sent to:", email);
      return NextResponse.json(
         { message: "Password reset email sent" },
         { status: 200 }
      );
   } catch (error) {
      console.error("❌ Password reset error:", error);
      return NextResponse.json(
         { message: "An error occurred" },
         { status: 500 }
      );
   }
}
