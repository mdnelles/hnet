"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface DashboardContextType {
   isDrawerOpen: boolean;
   toggleDrawer: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
   undefined
);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
   const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Change default to false

   const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

   // Add effect to handle initial state based on screen size
   useEffect(() => {
      const handleResize = () => {
         setIsDrawerOpen(window.innerWidth >= 1024); // Open by default on larger screens
      };

      handleResize(); // Set initial state
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return (
      <DashboardContext.Provider value={{ isDrawerOpen, toggleDrawer }}>
         <div style={{ marginTop: "-105px", width: "100%" }}>{children}</div>
      </DashboardContext.Provider>
   );
}

export function useDashboard() {
   const context = useContext(DashboardContext);
   if (context === undefined) {
      throw new Error("useDashboard must be used within a DashboardProvider");
   }
   return context;
}
