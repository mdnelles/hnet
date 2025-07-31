"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store"; // Import your Redux store types

export default function AdminDashboard() {
   const dispatch = useDispatch();
   const session = useSelector((state: RootState) => state.session); // Get session from Redux
   const router = useRouter();
   const { token, email, name } = session.user;

   useEffect(() => {
      if (!session.user.token) {
         localStorage.clear();
         router.push("/login");
         return;
      }
   }, [session.user.token, router, dispatch]);

   if (!token) {
      return null;
   }

   return (
      <div className='p-6'>
         <h1 className='text-2xl font-bold mb-4'>Welcome, {name}</h1>
         <p className='text-gray-700 dark:text-gray-300'>
            You are logged in as {email}.
         </p>
         <p className='text-gray-700 dark:text-gray-300'>
            This is your admin dashboard. Here you can manage your application.
         </p>
      </div>
   );
}
