// route.ts
import { authenticateUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
   try {
      const { email, password } = await request.json();
      return await authenticateUser(prisma, email, password);
   } catch (error) {
      console.error("Login error:", error);
      return NextResponse.json(
         { message: "Internal server error" },
         { status: 500 }
      );
   }
}
