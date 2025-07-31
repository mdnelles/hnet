// app/forgot-password/page.tsx
import React, { Suspense } from "react";
import ForgotPasswordContent from "../components/ForgotPassowrdContent";
export default function ForgotPasswordClient() {
   return (
      <Suspense fallback={<div>Loading...</div>}>
         <ForgotPasswordContent />
      </Suspense>
   );
}
