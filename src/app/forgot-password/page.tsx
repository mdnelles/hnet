"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PublicTemplate from "../components/templates/PublicTemplate";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
   const searchParams = useSearchParams();
   const router = useRouter();
   const token = searchParams.get("token");

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const togglePassword = () => setShowPassword((prev) => !prev);
   // 1️⃣ Scenario: Request password reset email
   const handleRequestReset = async (e: React.FormEvent) => {
      e.preventDefault();
      toast.loading("Requesting reset link...");

      try {
         const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
         });

         const data = await res.json();
         toast.dismiss();

         if (res.ok) {
            toast.success("Reset link sent to your email.");
         } else {
            toast.error(data.message || "Failed to send reset link.");
         }
      } catch (err) {
         toast.dismiss();
         toast.error("Something went wrong.");
         console.error(err);
      }
   };

   // 2️⃣ Scenario: Submit new password
   const handlePasswordReset = async (e: React.FormEvent) => {
      e.preventDefault();

      if (password !== confirmPassword) {
         toast.error("Passwords do not match.");
         return;
      }

      setIsSubmitting(true);
      toast.loading("Resetting your password...");

      try {
         const res = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
         });

         const data = await res.json();
         toast.dismiss();

         if (res.ok) {
            toast.success("Password reset successfully.");
            router.push("/login");
         } else {
            toast.error(data.message || "Failed to reset password.");
         }
      } catch (err) {
         toast.dismiss();
         toast.error("Something went wrong.");
         console.error(err);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div>
         <Card className='w-full max-w-md mx-auto p-6'>
            <h2 className='text-2xl font-bold text-center mb-4'>
               {token ? "Reset Your Password" : "Forgot Password"}
            </h2>

            {!token ? (
               // 🔹 Email input form
               <form onSubmit={handleRequestReset} className='space-y-4'>
                  <div>
                     <Label htmlFor='email'>Email</Label>
                     <Input
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                     />
                  </div>
                  <Button
                     type='submit'
                     className='w-full bg-blue-800 text-white'
                  >
                     Send Reset Link
                  </Button>
               </form>
            ) : (
               // 🔹 Reset password form
               <form onSubmit={handlePasswordReset} className='space-y-4'>
                  <div className='relative'>
                     <Label htmlFor='password'>New Password</Label>
                     <Input
                        id='password'
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                     />
                     <button
                        type='button'
                        onClick={togglePassword}
                        className='absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600'
                     >
                        {showPassword ? "Hide" : "Show"}
                     </button>
                  </div>
                  <div className='relative'>
                     <Label htmlFor='confirmPassword'>Confirm Password</Label>
                     <Input
                        id='confirmPassword'
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                     />
                     <button
                        type='button'
                        onClick={togglePassword}
                        className='absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600'
                     >
                        {showPassword ? "Hide" : "Show"}
                     </button>
                  </div>
                  <Button
                     type='submit'
                     className='w-full bg-blue-800 text-white'
                     disabled={isSubmitting}
                  >
                     {isSubmitting ? "Resetting..." : "Reset Password"}
                  </Button>
               </form>
            )}
         </Card>
      </div>
   );
}
