"use client";

import * as Tooltip from "@radix-ui/react-tooltip"; // ✅ Import Radix Tooltip
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
   Home,
   Users,
   Building2,
   MapPin,
   LinkIcon,
   UserCog,
   ShieldCheck,
   Image,
   Map as MapIcon,
   PlusCircle,
   Settings,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
// import { toggleDrawer } from "@/features/session/sessionSlice"; // ✅ Redux action

const menuSections = [
   {
      heading: "Players",
      items: [
         { icon: Home, label: "Residential List", href: "/admin/residential" },
         { icon: MapIcon, label: "Residential Map", href: "/admin/map" },
         {
            icon: Building2,
            label: "Commercial List",
            href: "/admin/commercial",
         },
      ],
   },
   {
      heading: "Feeback",
      items: [
         { icon: ShieldCheck, label: "Appraisal", href: "/admin/appraisal" },
         {
            icon: MapPin,
            label: "Management",
            href: "/admin/management",
         },
         {
            icon: Users,
            label: "Agent Connect",
            href: "/admin/connect_with_agent",
         },
      ],
   },
   {
      heading: "Members",
      items: [
         { icon: Users, label: "Agents", href: "/admin/agents" },
         {
            icon: Building2,
            label: "Offices",
            href: "/admin/offices",
         },
         { icon: UserCog, label: "Users", href: "/admin/users" },
      ],
   },
];

export function Drawer() {
   const dispatch = useDispatch();
   const isDrawerOpen = useSelector(
      (state: RootState) => state.session.isDrawerOpen
   ); // ✅ Get isDrawerOpen from Redux state
   const darkMode = useSelector((state: RootState) => state.session.darkMode); // ✅ Get darkMode from Redux state

   return (
      <div
         className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] transition-all duration-300 ease-in-out ${
            isDrawerOpen ? "w-[calc(160px*1.25)]" : "w-10"
         } ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
         } shadow-lg z-40 p-2`}
      >
         <nav className='flex-grow'>
            {menuSections.map((section, index) => (
               <div key={section.heading}>
                  {/* Section Heading - Only visible when drawer is open */}
                  {isDrawerOpen && (
                     <div
                        className={`font-bold text-sm uppercase mt-4 mb-2 px-2 ${
                           darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                     >
                        {section.heading}
                     </div>
                  )}
                  {/* Menu Items */}
                  {section.items.map((item) => (
                     <Link key={item.label} href={item.href} passHref>
                        {isDrawerOpen ? (
                           <Button
                              className={`w-full justify-start px-4 py-2 text-left ${
                                 darkMode
                                    ? "hover:bg-gray-700"
                                    : "hover:bg-gray-100"
                              }`}
                           >
                              <item.icon className='h-5 w-5 mr-2' />
                              {item.label}
                           </Button>
                        ) : (
                           <Tooltip.Provider delayDuration={200}>
                              <Tooltip.Root>
                                 <Tooltip.Trigger asChild>
                                    <Button
                                       variant='ghost'
                                       className={`w-full flex justify-center p-2 ${
                                          darkMode
                                             ? "hover:bg-gray-700"
                                             : "hover:bg-gray-100"
                                       }`}
                                    >
                                       <item.icon className='h-5 w-5' />
                                    </Button>
                                 </Tooltip.Trigger>
                                 <Tooltip.Portal>
                                    <Tooltip.Content
                                       side='right'
                                       align='center'
                                       className='bg-gray-900 text-white px-2 py-1 text-sm rounded-md shadow-lg'
                                    >
                                       {item.label}
                                       <Tooltip.Arrow className='fill-gray-900' />
                                    </Tooltip.Content>
                                 </Tooltip.Portal>
                              </Tooltip.Root>
                           </Tooltip.Provider>
                        )}
                     </Link>
                  ))}
                  {/* Section Divider */}
                  {index < menuSections.length - 1 && isDrawerOpen && (
                     <hr
                        className={`my-3 ${
                           darkMode ? "border-gray-700" : "border-gray-300"
                        }`}
                     />
                  )}
               </div>
            ))}
         </nav>
      </div>
   );
}
