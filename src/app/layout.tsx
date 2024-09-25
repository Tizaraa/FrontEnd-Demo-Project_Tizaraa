import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
// THEME PROVIDER
import StyledComponentsRegistry from "@lib/registry";
// APP PROVIDER
import { AppProvider } from "@context/app-context";
import StyledContext from "@context/StyledContext";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tizaraa - The Best React eCommerce Template",
  description:
    "Tizaraa is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react", "tizaraa"]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      <body className={openSans.className}>
        <StyledComponentsRegistry>
          <AppProvider>
            <StyledContext>{children}</StyledContext>
          </AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
