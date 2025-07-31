// components/DashboardLayout.tsx
"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import AppBarAdmin from "@/app/components/templates/AppBarAdmin";
import { Drawer } from "./Drawer";
import { SessionState } from "@/store/slices/sessionSlice";

export function DashboardLayout({
   children,
   title = "Admin",
}: {
   children: React.ReactNode;
   title?: string;
}) {
   const darkMode = useSelector((state: RootState) => state.session.darkMode);
   const isDrawerOpen = useSelector(
      (state: RootState) => state.session.isDrawerOpen
   );
   const user: any = useSelector((state: RootState) => state.session.user);
   const router = useRouter();

   useEffect(() => {
      if (!user?.id) {
         router.push("/login");
      }
   }, [user?.id]);

   useEffect(() => {
      if (!user.isAdmin) {
         router.push("/login");
      }
   }, [user, router]);

   if (!user.isAdmin) return null;

   return (
      <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"}`}>
         {/* <AppBarAdmin /> */}
         <div className='flex pt-14'>
            {/* Add pt-14 to account for AppBar height */}
            <Drawer />
            <main
               className={`mt-20 w-full transition-all duration-300 ease-in-out mr-5 ${
                  isDrawerOpen ? "ml-52" : "ml-12"
               } overflow-visible sm:overflow-visible`}
               style={{
                  maxWidth: "100%", // Prevents content from overflowing
                  overflowX: "auto", // Allows scrolling inside <main>
                  overflowY: "auto", // Enables vertical scrolling
                  maxHeight: "calc(100vh - 56px)", // Keeps scrolling within screen height
               }}
            >
               <div className='perspective-500 px-2 pt-7'>
                  <h3
                     className={`text-2xl font-bold mb-1 ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                     } animate-roll-in`}
                  >
                     {title}
                  </h3>
               </div>
               {children}
            </main>
         </div>
      </div>
   );
}
