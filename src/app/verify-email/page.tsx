"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PublicTemplate from "../components/templates/PublicTemplate";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
   const searchParams = useSearchParams();
   const router = useRouter();
   const token = searchParams.get("token");

   const [loading, setLoading] = useState(true);
   const [success, setSuccess] = useState(false);
   const [error, setError] = useState("");

   useEffect(() => {
      if (!token) {
         setError("Invalid or missing verification token.");
         setLoading(false);
         return;
      }

      const verifyEmail = async () => {
         try {
            const res = await fetch(`/api/verify-email?token=${token}`, {
               method: "GET",
            });

            const data = await res.json();

            if (res.ok) {
               setSuccess(true);
               toast.success("Email verified!");
               setTimeout(() => router.push("/login"), 3000);
            } else {
               setError(data.message || "Verification failed.");
            }
         } catch (err) {
            console.error("Verification error:", err);
            setError("An error occurred during verification.");
         } finally {
            setLoading(false);
         }
      };

      verifyEmail();
   }, [token, router]);

   return (
      <PublicTemplate>
         <Card className='w-full max-w-md mx-auto p-6 text-center'>
            <h2 className='text-2xl font-bold mb-4'>Email Verification</h2>

            {loading ? (
               <div className='flex justify-center items-center gap-2 text-blue-700'>
                  <Loader2 className='h-5 w-5 animate-spin' />
                  Verifying your email...
               </div>
            ) : success ? (
               <p className='text-green-700 font-semibold'>
                  ✅ Your email has been successfully verified!
               </p>
            ) : (
               <div>
                  <p className='text-red-600 font-medium mb-2'>{error}</p>
                  <Button onClick={() => router.push("/forgot-password")}>
                     Try Again
                  </Button>
               </div>
            )}
         </Card>
      </PublicTemplate>
   );
}
