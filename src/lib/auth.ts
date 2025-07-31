import { compare } from "bcryptjs";
import { createToken } from "./jwt";
import { NextResponse } from "next/server";
import type { Model } from "sequelize";
import { USER_ANONYMOUS } from "./var";

interface AuthenticatableUser extends Model {
   id: number;
   email: string;
   password: string;
   name: string;
   userLevel: number;
}

export async function authenticateUser(
   Model: { findOne: (arg: object) => Promise<AuthenticatableUser | null> },
   email: string,
   password: string
) {
   if (!email || !password) {
      return NextResponse.json(
         { message: "Email and password are required" },
         { status: 400 }
      );
   }

   const user: any = await Model.findOne({ where: { email } });

   if (!user) {
      return NextResponse.json(
         { message: "Invalid credentials" },
         { status: 401 }
      );
   }

   // ✅ Check if the user is active
   if (!user.isActive || user.isActive === 0 || user.isActive === false) {
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

// Get token from user object in localStorage
export function getToken(): string {
   if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.token || "";
   }
   return "";
}

// Set token in user object in localStorage
export function setToken(token: string): void {
   if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      user.token = token;
      localStorage.setItem("user", JSON.stringify(user));
   }
}

// Remove token from user object in localStorage
export function removeToken(): void {
   if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      user.token = "";
      localStorage.setItem("user", JSON.stringify(user));
   }
}
export function isAdminToken(token: string): boolean {
   if (token) {
      const userLevel = returnUserLevelToken(token);
      console.log("Checking if user is admin:", userLevel);
      return userLevel === 1; // Check if the user level is 1 (admin)
   }
   if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      console.log("Checking if user is admin:", user);
      return user.userLevel === 1; // Check if the user level is 1 (admin)
   }
   return false;
}

export function isAgentToken(token: string): boolean {
   if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.userLevel === 3; // Check if the user level is 3 (agent)
   }
   return false;
}

export function hasValidToken(token: string): boolean {
   if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.userLevel <= 5; // Check if the user level is 5 (user)
   }
   return false;
}

export function returnUserLevelToken(token: string): number {
   try {
      if (!token) return USER_ANONYMOUS;
      const decodedToken = JSON.parse(
         Buffer.from(token.split(".")[1], "base64").toString("utf-8")
      );
      return decodedToken.userLevel;
   } catch (error) {
      console.error("Invalid token:", error);
      return USER_ANONYMOUS;
   }
}
