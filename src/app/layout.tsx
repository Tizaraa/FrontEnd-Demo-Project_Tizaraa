// import type { Metadata } from "next";
// import { Open_Sans } from "next/font/google";
// // THEME PROVIDER
// import StyledComponentsRegistry from "@lib/registry";
// // APP PROVIDER
// import { AppProvider } from "@context/app-context";
// import StyledContext from "@context/StyledContext";
// //import { useNavigation } from "next/navigation";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const openSans = Open_Sans({ subsets: ["latin"] });
// //const navigation = useNavigation()

// export const metadata: Metadata = {
//   title: "Tizaraa - The Best React eCommerce Template",
//   description:
//     "Tizaraa is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
//   authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
//   keywords: ["e-commerce", "e-commerce template", "next.js", "react", "tizaraa"]
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   //console.log(navigation);
  
//   return (
//     <html lang="en">
//       <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
//       <body className={openSans.className}>
//         <StyledComponentsRegistry>
//           <AppProvider>
//             <StyledContext>{children}</StyledContext>
//             <ToastContainer />

//           </AppProvider>
//         </StyledComponentsRegistry>
//       </body>
//     </html>
//   );
// }
//import type { Metadata } from "next";
// import { Open_Sans } from "next/font/google";
// import StyledComponentsRegistry from "@lib/registry";
// import { AppProvider } from "@context/app-context";
// import StyledContext from "@context/StyledContext";
// import { ToastContainer } from 'react-toastify';
// import ApiBaseUrl from "api/ApiBaseUrl";
// import 'react-toastify/dist/ReactToastify.css';

// const openSans = Open_Sans({ subsets: ["latin"] });

// const defaultMetadata = {
//   title: "Tizaraa - The Best React eCommerce Template",
//   description: "Tizaraa is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
//   authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
//   keywords: ["e-commerce", "e-commerce template", "next.js", "react", "tizaraa"]
// };

// // Async function to fetch SEO data from the API
// async function fetchSEOData() {
//   try {
//     const response = await fetch(`${ApiBaseUrl.baseUrl}frontend/parent/seo`, {
//       next: { revalidate: 60 }, // Revalidate every 60 seconds
//     });
//     const data = await response.json();
//     return data?.seo || null;
//   } catch (error) {
//     console.error("Failed to fetch SEO data", error);
//     return null;
//   }
// }

// export async function generateMetadata() {
//   const seo = await fetchSEOData();

//   return {
//     title: seo?.title || defaultMetadata.title,
//     description: seo?.description || defaultMetadata.description,
//     keywords: seo?.keywords,
//     openGraph: {
//       title: seo?.title || defaultMetadata.title,
//       description: seo?.description || defaultMetadata.description,
//       url: seo?.url || defaultMetadata.authors[0].url,
//       images: seo?.image || "/default-image.jpg",
//     },
//   };
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
//       <body className={openSans.className}>
//         <StyledComponentsRegistry>
//           <AppProvider>
//             <StyledContext>{children}</StyledContext>
//             <ToastContainer />
//           </AppProvider>
//         </StyledComponentsRegistry>
//       </body>
//     </html>
//   );
// }

// import { Open_Sans } from "next/font/google";
// import StyledComponentsRegistry from "@lib/registry";
// import { AppProvider } from "@context/app-context";
// import StyledContext from "@context/StyledContext";
// import { ToastContainer } from 'react-toastify';
// import ApiBaseUrl from "api/ApiBaseUrl";
// import 'react-toastify/dist/ReactToastify.css';

// const openSans = Open_Sans({ subsets: ["latin"] });

// const defaultMetadata = {
//   title: "Tizaraa - The Best React eCommerce Template",
//   description: "Tizaraa is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
//   authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
//   keywords: ["e-commerce", "e-commerce template", "next.js", "react", "tizaraa"]
// };

// // Async function to fetch global SEO data from the API
// async function fetchGlobalSEOData() {
//   try {
//     const response = await fetch(`${ApiBaseUrl.baseUrl}frontend/parent/seo`, {
//       next: { revalidate: 60 }, // Revalidate every 60 seconds
//     });
//     const data = await response.json();
//     return data?.seo || null;
//   } catch (error) {
//     console.error("Failed to fetch SEO data", error);
//     return null;
//   }
// }

// export async function generateMetadata() {
//   const seo = await fetchGlobalSEOData();

//   return {
//     title: seo?.title || defaultMetadata.title,
//     description: seo?.description || defaultMetadata.description,
//     keywords: seo?.keywords || defaultMetadata.keywords,
//     openGraph: {
//       title: seo?.title || defaultMetadata.title,
//       description: seo?.description || defaultMetadata.description,
//       url: seo?.url || defaultMetadata.authors[0].url,
//       images: seo?.image || "/default-image.jpg",
//     },
//   };
// }

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
//       <body className={openSans.className}>
//         <StyledComponentsRegistry>
//           <AppProvider>
//             <StyledContext>{children}</StyledContext>
//             <ToastContainer />
//           </AppProvider>
//         </StyledComponentsRegistry>
//       </body>
//     </html>
//   );
// }

import { Open_Sans } from "next/font/google";
import StyledComponentsRegistry from "@lib/registry";
import { AppProvider } from "@context/app-context";
import StyledContext from "@context/StyledContext";
import { ToastContainer } from 'react-toastify';
import ApiBaseUrl from "api/ApiBaseUrl";
import 'react-toastify/dist/ReactToastify.css';
import Head from "next/head";

// Load font
const openSans = Open_Sans({ subsets: ["latin"] });

// Default metadata
const defaultMetadata = {
  title: "Tizaraa - The Best React eCommerce Template",
  description: "Tizaraa is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store",
  authors: [{ name: "UI-LIB", url: "https://ui-lib.com" }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react", "tizaraa"],
  siteFavIcon: "/default-favicon.ico"  // default favicon path
};

// Async function to fetch global SEO data from the API
async function fetchGlobalSEOData() {
  try {
    const response = await fetch(`${ApiBaseUrl.baseUrl}frontend/parent/seo`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    const data = await response.json();
    return data?.seo || null;
  } catch (error) {
    console.error("Failed to fetch SEO data", error);
    return null;
  }
}

// Generate metadata asynchronously
export async function generateMetadata() {
  const seo = await fetchGlobalSEOData();

  return {
    title: seo?.title || defaultMetadata.title,
    description: seo?.description || defaultMetadata.description,
    keywords: seo?.keywords || defaultMetadata.keywords,
    openGraph: {
      title: seo?.title || defaultMetadata.title,
      description: seo?.description || defaultMetadata.description,
      url: seo?.url || defaultMetadata.authors[0].url,
      images: seo?.image || "/default-image.jpg",
    },
    favicon: seo?.site_fav_icon || defaultMetadata.siteFavIcon,
  };
}

// Root layout
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Await metadata asynchronously before rendering
  const metadata = await generateMetadata();

  return (
    <html lang="en">
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      {/* <link rel="icon" href={metadata.favicon} type="image/x-icon" /> */}
      <Head>
        <link rel="icon" href={metadata.favicon} type="image/x-icon" />
        {/* <link rel="preload" href={metadata.favicon} /> */}
      </Head>
      <body className={openSans.className}>
        <StyledComponentsRegistry>
          <AppProvider>
            <StyledContext>{children}</StyledContext>
            <ToastContainer />
          </AppProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}


