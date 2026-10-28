import type { Metadata } from "next";
import Login from "@sections/auth/Login";

export const metadata: Metadata = {
 title: "Log in - Tizaraa",
 description:
  "Shop from trusted sellers across Bangladesh on Tizaraa, with fast delivery and secure payment.",
 authors: [{ name: "Tizaraa", url: "https://www.tizaraa.com" }],
};

export default function LoginPage() {
 return <Login />;
}
