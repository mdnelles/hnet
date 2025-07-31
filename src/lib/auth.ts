import { compare } from "bcryptjs";
import { createToken } from "./jwt";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function authenticateUser(
   prismaClient: typeof prisma,
   email: string,
   password: string
) {
   if (!email || !password) {
      return NextResponse.json(
         { message: "Email and password are required" },
         { status: 400 }
      );
   }

   const user = await prismaClient.users.findUnique({
      where: { email },
   });

   if (!user) {
      return NextResponse.json(
         { message: "Invalid credentials" },
         { status: 401 }
      );
   }

   // ✅ Check if the user is active
   if (!user.isActive) {
      return NextResponse.json(
         {
            message:
               "Your account is not verified yet. Please check your email to verify your account.",
         },
         { status: 403 }
      );
   }

   const isPasswordValid = await compare(password, user.password);

   if (!isPasswordValid) {
      return NextResponse.json(
         { message: "Invalid credentials" },
         { status: 401 }
      );
   }

   const token = await createToken({
      id: user.id,
      email: user.email,
      userLevel: user.userLevel,
   });

   return NextResponse.json(
      {
         message: "Login successful",
         token,
         user: {
            id: user.id,
            email: user.email,
            name: user.name,
            userLevel: user.userLevel,
         },
      },
      { status: 200 }
   );
}
