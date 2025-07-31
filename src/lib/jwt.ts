import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function createToken(payload: any): Promise<string> {
   console.log("---payload---", payload);

   const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

   return token;
}

export async function verifyToken(token: string) {
   try {
      console.log("Verifying token:", token.substring(0, 10) + "...");

      const decoded = jwt.verify(token, JWT_SECRET);

      console.log("Token verified successfully", decoded);
      return decoded;
   } catch (error) {
      console.error("Token verification failed:", error);
      throw new Error(
         "Token verification failed: " +
            (error instanceof Error ? error.message : String(error))
      );
   }
}
