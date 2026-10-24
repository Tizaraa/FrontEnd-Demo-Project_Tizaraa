import type { Metadata } from "next";
import Signup from "@sections/auth/Signup";
import VerifyEmail from "@sections/auth/VerifyEmail";

export const metadata: Metadata = {
 title: "Verify your account - Tizaraa",
 description:
  "Shop from trusted sellers across Bangladesh on Tizaraa, with fast delivery and secure payment.",
 authors: [{ name: "Tizaraa", url: "https://www.tizaraa.com" }],
};

export default function SignUpPage() {
 return <VerifyEmail></VerifyEmail>;
}
