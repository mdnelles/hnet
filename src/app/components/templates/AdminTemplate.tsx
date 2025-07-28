import React from "react";
import AppBarPublic from "./AppBarPublic";

import { ReactNode } from "react";

export default function AdminTemplate({ children }: { children: ReactNode }) {
   return (
      <div>
         <AppBarPublic />
         {children}
      </div>
   );
}
