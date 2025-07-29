// app/components/AppBar.tsx
"use client";

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Moon, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function AppBarPublic() {
   const [isDarkMode, setIsDarkMode] = useState(false);
   const [sessionToken, setSessionToken] = useState<string | null>(null);
   const [showForgot, setShowForgot] = useState(false);

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
                     <Dialog>
                        <DialogTrigger asChild>
                           <DropdownMenuItem>Login</DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className='max-w-sm'>
                           <Tabs defaultValue='signin' className='w-full'>
                              <TabsList className='grid w-full grid-cols-2'>
                                 <TabsTrigger value='signin'>
                                    Sign In
                                 </TabsTrigger>
                                 <TabsTrigger value='signup'>
                                    Sign Up
                                 </TabsTrigger>
                              </TabsList>

                              <TabsContent value='signin'>
                                 <div className='flex flex-col gap-3 mt-4'>
                                    <Input placeholder='Email address' />
                                    <Input
                                       placeholder='Password'
                                       type='password'
                                    />
                                    <Button
                                       onClick={() =>
                                          handleAuthAction("sign in")
                                       }
                                    >
                                       Sign In
                                    </Button>
                                    <button
                                       className='text-sm underline'
                                       onClick={() => setShowForgot(true)}
                                    >
                                       Forgot password?
                                    </button>
                                 </div>
                              </TabsContent>

                              <TabsContent value='signup'>
                                 <div className='flex flex-col gap-3 mt-4'>
                                    <Input placeholder='First name' />
                                    <Input placeholder='Last name' />
                                    <Input placeholder='Email address' />
                                    <Input
                                       placeholder='Password'
                                       type='password'
                                    />
                                    <Button
                                       onClick={() =>
                                          handleAuthAction("sign up")
                                       }
                                    >
                                       Sign Up
                                    </Button>
                                 </div>
                              </TabsContent>

                              {showForgot && (
                                 <div className='flex flex-col gap-3 mt-4'>
                                    <Input placeholder='Enter your email' />
                                    <Button
                                       onClick={() =>
                                          handleAuthAction("forgot password")
                                       }
                                    >
                                       Reset Password
                                    </Button>
                                 </div>
                              )}
                           </Tabs>
                        </DialogContent>
                     </Dialog>
                  )}
                  <DropdownMenuItem
                     onClick={() => handleAuthAction("favorites")}
                  >
                     Favorites
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </div>
   );
}
