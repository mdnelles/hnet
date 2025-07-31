import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { subHours } from "date-fns";

export async function GET(req: NextRequest) {
   try {
      const { searchParams } = new URL(req.url);
      const token = searchParams.get("token");

      if (!token) {
         return NextResponse.json(
            { message: "Token is required" },
            { status: 400 }
         );
      }

      const twentyFourHoursAgo = subHours(new Date(), 24);

      const user = await prisma.users.findFirst({
         where: {
            resetToken: token,
            resetTokenExpiry: {
               gte: twentyFourHoursAgo,
            },
         },
      });

      if (!user) {
         return NextResponse.json(
            { message: "Invalid or expired token" },
            { status: 400 }
         );
      }

      await prisma.users.update({
         where: { id: user.id },
         data: {
            isActive: true,
            // resetToken: null,
            // resetTokenExpiry: null,
         },
      });

      return NextResponse.json(
         { message: "Email verified successfully" },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error verifying email:", error);
      return NextResponse.json(
         { message: "Internal Server Error" },
         { status: 500 }
      );
   }
}
