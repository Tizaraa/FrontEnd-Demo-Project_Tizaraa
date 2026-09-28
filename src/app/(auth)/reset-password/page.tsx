import { Suspense } from "react";
import type { Metadata } from "next";
import ResetPassword from "@sections/auth/ResetPassword";

export const metadata: Metadata = {
 title: "Reset Password - Tizaraa",
};

export default function ResetPasswordPage() {
 return (
  <Suspense fallback={null}>
   <ResetPassword />
  </Suspense>
 );
}
