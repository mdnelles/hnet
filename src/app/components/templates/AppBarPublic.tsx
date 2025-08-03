// app/components/AppBar.tsx
"use client";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation"; // ✅ Add this at the top

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function AppBarPublic() {
   const router = useRouter(); // ✅ Initialize router
   const pathname = usePathname();
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [userToken, setUserToken] = useState<string | null>(null);

   useEffect(() => {
      const existingSession = JSON.parse(
         localStorage.getItem("session") || "{}"
      );
      const dark = existingSession?.darkMode || false;
      setIsDarkMode(dark);

      dark
         ? document.documentElement.classList.add("dark")
         : document.documentElement.classList.remove("dark");

      const user = existingSession?.user || null;
      if (user?.token) setUserToken(user.token);
      else setUserToken(null);
   }, [pathname]);

   useEffect(() => {
      console.log("userToken: ", userToken);
   }, [userToken]);

   const favorites = () => {
      if (!userToken) {
         toast.error("No favorites avaialbe");
         return;
      }
   };

   const toggleDarkMode = () => {
      const newVal = !isDarkMode;
      setIsDarkMode(newVal);
      const existingSession = JSON.parse(
         localStorage.getItem("session") || "{}"
      );
      localStorage.setItem(
         "session",
         JSON.stringify({
            ...existingSession,
            darkMode: newVal,
         })
      );

      if (typeof document !== "undefined") {
         document.documentElement.classList.toggle("dark", newVal);
      }
   };

   const login = () => {
      router.push("/login");
   };

   const logout = () => {
      localStorage.removeItem("session");
      setUserToken(null);
      toast.success("Logged out successfully");
      router.push("/login");
   };

   return (
      <div className='w-full flex justify-between items-center p-4 border-b bg-background'>
         {/* Left: Logo */}
         <div className='font-bold text-xl'>HoopsNet.io</div>

         {/* Center: Search */}
         <div className='w-1/2'>
            <Input placeholder='Search player or team...' className='w-full' />
         </div>

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
                  {userToken ? (
                     <DropdownMenuItem onClick={() => logout()}>
                        Logout
                     </DropdownMenuItem>
                  ) : (
                     <>
                        <DropdownMenuItem onClick={() => login()}>
                           Login
                        </DropdownMenuItem>
                     </>
                  )}
                  <DropdownMenuItem onClick={() => favorites()}>
                     Favorites
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </div>
   );
}
