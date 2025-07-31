"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setSession } from "@/store/slices/sessionSlice";
import { Loader2, Eye, EyeOff } from "lucide-react";
// import CaptchaComponent from "@/components/CaptchaComponent";
import { Card } from "@/components/ui/card";

export default function LoginForm() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(false);
   const [isVerified, setIsVerified] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const dispatch = useDispatch();
   const darkMode = useSelector((state: RootState) => state.session.darkMode); // ✅ Get dark mode from Redux state

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      // if (!isVerified) {
      //    toast.error("Please complete the verification");
      //    return;
      // }

      setIsLoading(true);
      toast.loading("Checking credentials...");

      try {
         const response = await fetch("/api/auth/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
         });

         const data = await response.json();
         console.log("Login response:", data);
         console.log(data.user);

         if (response.ok) {
            toast.dismiss();
            toast.success("Login successful!");

            const user = {
               token: data.token || "",
               name: data.user.name || "",
               email: data.user.email || "",
               id: data.user.id || null,
               isAdmin: data.user.userLevel === 1 ? true : false, // 1 admin, 3 agent, 5 user
               userLevel: data.user.userLevel || 10,
               profileImg: data.user.profileImg,
            };

            // ✅ Dispatch Redux action to update session state
            dispatch(setSession({ user }));

            localStorage.setItem("user", JSON.stringify(user)); // ✅ Store token locally

            router.push(
               data.user.userLevel === 1 ? "/admin/dashboard" : "/profile"
            );
         } else {
            toast.dismiss();
            toast.error(data.message || "Login failed. Please try again.");
         }
      } catch (error) {
         console.error("Login error:", error);
         toast.dismiss();
         toast.error("An error occurred. Please try again.");
      } finally {
         setIsLoading(false);
      }
   };

   const handleVerify = (verified: boolean) => {
      setIsVerified(verified);
      if (verified) {
         toast.success("Verification successful!");
      }
   };

   return (
      <div>
         <Card className='w-full max-w-md mx-auto border-0'>
            <div className='pb-4'>
               <h2
                  className={`text-xl sm:text-2xl font-bold text-center ${
                     darkMode ? "text-white" : "text-gray-900"
                  }`}
               >
                  Login
               </h2>
            </div>
            <div>
               <form
                  onSubmit={handleSubmit}
                  className={`space-y-4 p-6 rounded-lg ${
                     darkMode
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-900"
                  }`}
               >
                  <div className='space-y-2'>
                     <Label htmlFor='email'>Email</Label>
                     <Input
                        id='email'
                        type='email'
                        placeholder='admin@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={
                           darkMode
                              ? "bg-gray-700 text-white"
                              : "bg-white text-gray-900"
                        }
                     />
                  </div>
                  <div className='space-y-2'>
                     <Label htmlFor='password'>Password</Label>
                     <div className='relative'>
                        <Input
                           id='password'
                           type={showPassword ? "text" : "password"}
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                           className={`${
                              darkMode
                                 ? "bg-gray-700 text-white"
                                 : "bg-white text-gray-900"
                           } pr-10`}
                        />
                        <button
                           type='button'
                           onClick={() => setShowPassword(!showPassword)}
                           className='absolute inset-y-0 right-0 pr-3 flex items-center  bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-200'
                           aria-label={
                              showPassword ? "Hide password" : "Show password"
                           }
                        >
                           {showPassword ? (
                              <EyeOff className='h-5 w-5' />
                           ) : (
                              <Eye className='h-5 w-5' />
                           )}
                        </button>
                     </div>
                  </div>
                  {/* <CaptchaComponent onVerify={handleVerify} /> */}
                  <Button
                     type='submit'
                     className='w-full bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-200'
                     disabled={isLoading}
                  >
                     {isLoading ? (
                        <>
                           <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                           Logging in...
                        </>
                     ) : (
                        "Log in"
                     )}
                  </Button>

                  <div className='text-center'>
                     <p className='text-sm text-gray-500'>
                        Don`t have an account?
                        <a
                           href='/register'
                           className='text-blue-600 hover:underline'
                        >
                           Register
                        </a>
                     </p>

                     <p className='text-sm text-gray-500'>
                        <a
                           href='/forgot-password'
                           className='text-blue-600 hover:underline'
                        >
                           Forgot password?
                        </a>
                     </p>
                  </div>
               </form>
            </div>
         </Card>
      </div>
   );
}
