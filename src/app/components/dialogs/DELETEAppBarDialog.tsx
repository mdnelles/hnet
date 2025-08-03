"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface AppBarDialogProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   handleAuthAction: (action: string) => void;
   setShowForgot: (show: boolean) => void;
   showForgot: boolean;
}

export default function AppBarDialog({
   open,
   onOpenChange,
   handleAuthAction,
   setShowForgot,
   showForgot,
}: AppBarDialogProps) {
   const [activeTab, setActiveTab] = useState("signin");

   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
   });

   const [showPassword, setShowPassword] = useState(false);
   const [forgotEmail, setForgotEmail] = useState("");

   const togglePassword = () => setShowPassword((prev) => !prev);

   const handleInput = (field: string, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
   };

   const handleSignUp = async () => {
      const { name, email, password } = form;
      if (!name || !email || !password) {
         toast.error("All fields are required.");
         return;
      }

      try {
         const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
         });

         const data = await res.json();
         if (res.ok) {
            toast.success("Verification email sent. Please check your inbox.");
            setForm({ name: "", email: "", password: "" });
            setActiveTab("signin");
         } else {
            toast.error(data.message || "Signup failed.");
         }
      } catch (err) {
         toast.error("Signup error.");
      }
   };

   const handleForgot = async () => {
      if (!forgotEmail) return toast.error("Email is required.");

      try {
         const res = await fetch("/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: forgotEmail }),
         });

         const data = await res.json();
         if (res.ok) {
            toast.success("Password reset email sent.");
            setShowForgot(false);
            setForgotEmail("");
         } else {
            toast.error(data.message || "Error sending reset email.");
         }
      } catch (err) {
         toast.error("Forgot password error.");
      }
   };

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className='max-w-sm'>
            <DialogTitle className='text-center text-lg font-bold'>
               Sign In or Sign Up
            </DialogTitle>

            <Tabs
               value={activeTab}
               onValueChange={setActiveTab}
               className='w-full'
            >
               <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='signin'>Sign In</TabsTrigger>
                  <TabsTrigger value='signup'>Sign Up</TabsTrigger>
               </TabsList>

               <TabsContent value='signin'>
                  <div className='flex flex-col gap-3 mt-4'>
                     <Input
                        placeholder='Email address'
                        value={form.email}
                        onChange={(e) => handleInput("email", e.target.value)}
                     />
                     <div className='relative'>
                        <Input
                           placeholder='Password'
                           type={showPassword ? "text" : "password"}
                           value={form.password}
                           onChange={(e) =>
                              handleInput("password", e.target.value)
                           }
                           className='pr-12'
                        />
                        <button
                           type='button'
                           onClick={togglePassword}
                           className='absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600'
                        >
                           {showPassword ? "Hide" : "Show"}
                        </button>
                     </div>
                     <Button onClick={() => handleAuthAction("sign in")}>
                        Sign In
                     </Button>
                     <button
                        className='text-sm underline text-left'
                        onClick={() => setShowForgot(true)}
                     >
                        Forgot password?
                     </button>
                  </div>
               </TabsContent>

               <TabsContent value='signup'>
                  <div className='flex flex-col gap-3 mt-4'>
                     <Input
                        placeholder='Name'
                        value={form.name}
                        onChange={(e) => handleInput("name", e.target.value)}
                     />
                     <Input
                        placeholder='Email address'
                        value={form.email}
                        onChange={(e) => handleInput("email", e.target.value)}
                     />
                     <div className='relative'>
                        <Input
                           placeholder='Password'
                           type={showPassword ? "text" : "password"}
                           value={form.password}
                           onChange={(e) =>
                              handleInput("password", e.target.value)
                           }
                           className='pr-12'
                        />
                        <button
                           type='button'
                           onClick={togglePassword}
                           className='absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-blue-600'
                        >
                           {showPassword ? "Hide" : "Show"}
                        </button>
                     </div>
                     <Button onClick={handleSignUp}>Sign Up</Button>
                  </div>
               </TabsContent>
            </Tabs>

            {showForgot && (
               <div className='flex flex-col gap-3 mt-4'>
                  <Input
                     placeholder='Enter your email'
                     value={forgotEmail}
                     onChange={(e) => setForgotEmail(e.target.value)}
                  />
                  <Button onClick={handleForgot}>Reset Password</Button>
               </div>
            )}
         </DialogContent>
      </Dialog>
   );
}
