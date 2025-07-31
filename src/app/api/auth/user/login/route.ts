import { NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
   try {
      const { email, password } = await request.json();
      return await authenticateUser(prisma.users, email, password);
   } catch (error) {
      console.error("Admin login error:", error);
      return NextResponse.json(
         { message: "Internal server error" },
         { status: 500 }
      );
   }
}
