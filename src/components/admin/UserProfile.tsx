"use client";

import { User, LogOut, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import Link from "next/link";

export function UserProfile() {
   const darkMode = useSelector((state: RootState) => state.session.darkMode); // ✅ Get dark mode from Redux state

   const router = useRouter();

   const handleLogout = () => {
      console.log("Logging out...");

      setTimeout(() => (window.location.href = "/login"), 200);
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               size='sm'
               className='p-1 h-6 w-6 flex items-center justify-center bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-blue-900 dark:text-white shadow-none border-none'
            >
               <User className='h-5 w-5' />
               <span className='sr-only'>User profile</span>
            </Button>
         </DropdownMenuTrigger>

         <DropdownMenuContent
            align='end'
            className='bg-white border border-gray-200 shadow-md rounded-md text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white'
         >
            <DropdownMenuItem asChild>
               <Link href='/admin/profile' className='flex items-center'>
                  <Edit className='mr-2 h-4 w-4' />
                  <span>Edit Profile</span>
               </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={handleLogout}>
               <LogOut className='mr-2 h-4 w-4' />
               <span>Logout</span>
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
