// app/components/AppBar.tsx
"use client";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";
import AppBarDialog from "../dialogs/AppBarDialog";

export default function AppBarAdmin() {
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [sessionToken, setSessionToken] = useState<string | null>(null);
   const [showForgot, setShowForgot] = useState(false);
   const [dialogOpen, setDialogOpen] = useState(false);

   useEffect(() => {
      const dark = localStorage.getItem("isDarkMode") === "TRUE";
      setIsDarkMode(dark);

      if (dark) {
         document.documentElement.classList.add("dark");
      } else {
         document.documentElement.classList.remove("dark");
      }

      const session = JSON.parse(localStorage.getItem("session") || "null");
      if (session?.token) setSessionToken(session.token);
   }, []);

   const toggleDarkMode = () => {
      const newVal = !isDarkMode;
      setIsDarkMode(newVal);
      localStorage.setItem("isDarkMode", newVal ? "TRUE" : "FALSE");

      if (typeof document !== "undefined") {
         document.documentElement.classList.toggle("dark", newVal);
      }
   };

   const handleAuthAction = async (action: string) => {
      if (action === "sign in") {
         const emailInput = document.querySelector(
            'input[placeholder="Email address"]'
         ) as HTMLInputElement;
         const passwordInput = document.querySelector(
            'input[placeholder="Password"]'
         ) as HTMLInputElement;

         const email = emailInput?.value.trim();
         const password = passwordInput?.value.trim();

         if (!email || !password) {
            toast.error("Email and password are required");
            return;
         }

         try {
            const res = await fetch("/api/auth/user/login", {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
               toast.success("Login successful");

               // Save session to localStorage
               const sessionData = {
                  token: data.token,
                  user: data.user,
               };
               localStorage.setItem("session", JSON.stringify(sessionData));

               setSessionToken(data.token);
               setDialogOpen(false); // Close dialog
            } else {
               toast.error(data.message || "Invalid credentials");
            }
         } catch (err) {
            console.error("Login error:", err);
            toast.error("Something went wrong");
         }
      }

      if (action === "forgot password") {
         toast("Forgot password handler not yet implemented");
      }

      if (action === "sign up") {
         toast("Signup is handled in AppBarDialog");
      }
   };

   return (
      <div className='w-full flex justify-between items-center p-4 border-b bg-background'>
         {/* Left: Logo */}
         <div className='font-bold text-xl'>Hoops Net</div>

         {/* Center: Search */}
         <div className='w-1/2'>
            <Input placeholder='Search player or team...' className='w-full' />
         </div>

         {/* Right: Dark Mode + Avatar */}
         <div className='flex items-center gap-4'>
            <Button variant='ghost' size='icon' onClick={toggleDarkMode}>
               {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>

            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                     <User size={18} />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align='end'>
                  {sessionToken ? (
                     <DropdownMenuItem
                        onClick={() => handleAuthAction("logout")}
                     >
                        Logout
                     </DropdownMenuItem>
                  ) : (
                     <>
                        <DropdownMenuItem onClick={() => setDialogOpen(true)}>
                           Login
                        </DropdownMenuItem>
                     </>
                  )}
                  <DropdownMenuItem
                     onClick={() => handleAuthAction("favorites")}
                  >
                     Favorites
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
            <AppBarDialog
               handleAuthAction={handleAuthAction}
               setShowForgot={setShowForgot}
               showForgot={showForgot}
               open={dialogOpen}
               onOpenChange={setDialogOpen}
            />
         </div>
      </div>
   );
}
