import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AppBarDialogProps {
   handleAuthAction: (action: string) => void;
   setShowForgot: (show: boolean) => void;
   showForgot: boolean;
}

export default function AppBarDialog(props: AppBarDialogProps) {
   const { handleAuthAction, setShowForgot, showForgot } = props;
   return (
      <>
         <DialogContent className='max-w-sm'>
            <DialogTitle className='text-center text-lg font-bold'>
               Sign In or Sign Up
            </DialogTitle>

            <Tabs defaultValue='signin' className='w-full'>
               <TabsList className='grid w-full grid-cols-2'>
                  <TabsTrigger value='signin'>Sign In</TabsTrigger>
                  <TabsTrigger value='signup'>Sign Up</TabsTrigger>
               </TabsList>

               <TabsContent value='signin'>
                  <div className='flex flex-col gap-3 mt-4'>
                     <Input placeholder='Email address' />
                     <Input placeholder='Password' type='password' />
                     <Button onClick={() => handleAuthAction("sign in")}>
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
                     <Input placeholder='Password' type='password' />
                     <Button onClick={() => handleAuthAction("sign up")}>
                        Sign Up
                     </Button>
                  </div>
               </TabsContent>

               {showForgot && (
                  <div className='flex flex-col gap-3 mt-4'>
                     <Input placeholder='Enter your email' />
                     <Button
                        onClick={() => handleAuthAction("forgot password")}
                     >
                        Reset Password
                     </Button>
                  </div>
               )}
            </Tabs>
         </DialogContent>
      </>
   );
}
