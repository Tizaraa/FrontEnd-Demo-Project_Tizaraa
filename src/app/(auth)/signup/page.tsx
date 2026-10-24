import type { Metadata } from "next";
import Signup from "@sections/auth/Signup";

export const metadata: Metadata = {
 title: "Create account - Tizaraa",
 description:
  "Shop from trusted sellers across Bangladesh on Tizaraa, with fast delivery and secure payment.",
 authors: [{ name: "Tizaraa", url: "https://www.tizaraa.com" }],
};

export default function SignUpPage() {
 return <Signup />;
}
