// import React, { useEffect, useState } from "react";
// import MegaMenu1 from "./mega-menu/MegaMenu1";
// import MegaMenu2 from "./mega-menu/MegaMenu2";
// import CategoryMenuItem from "./CategoryMenuItem";
// import { StyledCategoryDropdown } from "./styles";
// import ApiBaseUrl from "api/ApiBaseUrl";

// // =========================================
// type CategoryDropdownProps = {
//   open: boolean;
//   position?: "absolute" | "relative";
// };
// // =========================================

// const CACHE_KEY = "navigations";
// const CACHE_TIMESTAMP_KEY = `${CACHE_KEY}_timestamp`;
// const CACHE_EXPIRY_MS = 1 * 60 * 1000; // 1 minute in milliseconds

// export default function CategoryDropdown({ open, position = "absolute" }: CategoryDropdownProps) {
//   const [navigations, setNavigations] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchNavigations = async () => {
//       try {
//         const cachedData = localStorage.getItem(CACHE_KEY);
//         const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

//         if (cachedData && cachedTimestamp) {
//           const isCacheExpired =
//             Date.now() - parseInt(cachedTimestamp, 10) > CACHE_EXPIRY_MS;

//           if (!isCacheExpired) {
//             setNavigations(JSON.parse(cachedData));
//             setLoading(false);

//             // Schedule cache removal after 1 minute
//             const timeoutId = setTimeout(() => {
//               localStorage.removeItem(CACHE_KEY);
//               localStorage.removeItem(CACHE_TIMESTAMP_KEY);
//             }, CACHE_EXPIRY_MS - (Date.now() - parseInt(cachedTimestamp, 10)));

//             return () => clearTimeout(timeoutId); // Clear timeout on unmount or re-render
//           } else {
//             // Clear expired cache
//             localStorage.removeItem(CACHE_KEY);
//             localStorage.removeItem(CACHE_TIMESTAMP_KEY);
//           }
//         }

//         // Fetch data from API
//         const response = await fetch(`${ApiBaseUrl.baseUrl}categories`);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();

//         // Cache data with a timestamp
//         localStorage.setItem(CACHE_KEY, JSON.stringify(data));
//         localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

//         setNavigations(data);

//         // Schedule cache removal after 1 minute
//         const timeoutId = setTimeout(() => {
//           localStorage.removeItem(CACHE_KEY);
//           localStorage.removeItem(CACHE_TIMESTAMP_KEY);
//         }, CACHE_EXPIRY_MS);

//         return () => clearTimeout(timeoutId); // Clear timeout on unmount or re-render
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNavigations();
//   }, []);

//   const megaMenu = { MegaMenu1, MegaMenu2 };

//   if (loading) return <div>Loading...</div>;
//   if (error && !navigations.length) return <div>Error: {error}</div>;

//   return (
//     <StyledCategoryDropdown open={open} position={position}>
//       {navigations.map((item) => {
//         const MegaMenu = megaMenu[item.menuComponent as keyof typeof megaMenu];

//         return (
//           <CategoryMenuItem
//             key={item.title}
//             href={item.href}
//             icon={item.icon}
//             title={item.title}
//             caret={!!item.menuData}
//           >
//             {MegaMenu ? <MegaMenu data={item.menuData || {}} /> : null}
//           </CategoryMenuItem>
//         );
//       })}
//     </StyledCategoryDropdown>
//   );
// }


import React, { useEffect, useState } from "react";
import MegaMenu1 from "./mega-menu/MegaMenu1";
import MegaMenu2 from "./mega-menu/MegaMenu2";
import CategoryMenuItem from "./CategoryMenuItem";
import { StyledCategoryDropdown } from "./styles";
import ApiBaseUrl from "api/ApiBaseUrl";

// =========================================
type CategoryDropdownProps = {
  open: boolean;
  position?: "absolute" | "relative";
};
// =========================================

const CACHE_KEY = "navigations";
const CACHE_TIMESTAMP_KEY = `${CACHE_KEY}_timestamp`;
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000;
// const CACHE_EXPIRY_MS = 1 * 60 * 1000;  

export default function CategoryDropdown({ open, position = "absolute" }: CategoryDropdownProps) {
  const [navigations, setNavigations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavigations = async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (cachedData && cachedTimestamp) {
          const isCacheExpired =
            Date.now() - parseInt(cachedTimestamp, 10) > CACHE_EXPIRY_MS;

          if (!isCacheExpired) {
            setNavigations(JSON.parse(cachedData));
            setLoading(false);

            // Schedule cache removal after 24 hours
            const timeoutId = setTimeout(() => {
              localStorage.removeItem(CACHE_KEY);
              localStorage.removeItem(CACHE_TIMESTAMP_KEY);
            }, CACHE_EXPIRY_MS - (Date.now() - parseInt(cachedTimestamp, 10)));

            return () => clearTimeout(timeoutId); // Clear timeout on unmount or re-render
          } else {
            // Clear expired cache
            localStorage.removeItem(CACHE_KEY);
            localStorage.removeItem(CACHE_TIMESTAMP_KEY);
          }
        }

        // Fetch data from API
        const response = await fetch(`${ApiBaseUrl.baseUrl}categories`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Cache data with a timestamp
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());

        setNavigations(data);

        // Schedule cache removal after 24 hours
        const timeoutId = setTimeout(() => {
          localStorage.removeItem(CACHE_KEY);
          localStorage.removeItem(CACHE_TIMESTAMP_KEY);
        }, CACHE_EXPIRY_MS);

        return () => clearTimeout(timeoutId); // Clear timeout on unmount or re-render
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigations();
  }, []);

  const megaMenu = { MegaMenu1, MegaMenu2 };

  if (loading) return <div>Loading...</div>;
  if (error && !navigations.length) return <div>Error: {error}</div>;

  return (
    <StyledCategoryDropdown open={open} position={position}>
      {navigations.map((item) => {
        const MegaMenu = megaMenu[item.menuComponent as keyof typeof megaMenu];

        return (
          <CategoryMenuItem
            key={item.title}
            href={item.href}
            icon={item.icon}
            title={item.title}
            caret={!!item.menuData}
          >
            {MegaMenu ? <MegaMenu data={item.menuData || {}} /> : null}
          </CategoryMenuItem>
        );
      })}
    </StyledCategoryDropdown>
  );
}
