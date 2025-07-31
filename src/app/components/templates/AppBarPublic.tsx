// app/components/AppBar.tsx
"use client";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Dialog,
   DialogContent,
   DialogTrigger,
   DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";
import AppBarDialog from "../dialogs/AppBarDialog";

export default function AppBarPublic() {
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

   const handleAuthAction = (action: string) => {
      alert(`${action} was clicked`);
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
