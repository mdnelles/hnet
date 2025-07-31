// app/verify-email/client.tsx
"use client";

import React, { Suspense } from "react";
import VerifyEmailContent from "../components/VerifyEmailContent";
export default function VerifyEmailClient() {
   return (
      <Suspense fallback={<div>Verifying...</div>}>
         <VerifyEmailContent />
      </Suspense>
   );
}
