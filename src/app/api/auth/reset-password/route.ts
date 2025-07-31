import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { subHours } from "date-fns";

export async function POST(req: NextRequest) {
   try {
      const { token, password } = await req.json();

      if (!token || !password) {
         return NextResponse.json(
            { message: "Token and new password are required." },
            { status: 400 }
         );
      }

      // Find user by token and ensure token hasn't expired
      const twentyFourHoursAgo = subHours(new Date(), 24);
      const user = await prisma.users.findFirst({
         where: {
            resetToken: token,
            resetTokenExpiry: {
               gte: twentyFourHoursAgo, // Token issued within the last 24 hours
            },
         },
      });

      if (!user) {
         return NextResponse.json(
            { message: "Invalid or expired token." },
            { status: 400 }
         );
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Update user password and clear token fields
      await prisma.users.update({
         where: { id: user.id },
         data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null,
         },
      });

      return NextResponse.json(
         { message: "Password has been reset successfully." },
         { status: 200 }
      );
   } catch (error) {
      console.error("Reset password error:", error);
      return NextResponse.json(
         { message: "Something went wrong." },
         { status: 500 }
      );
   }
}
