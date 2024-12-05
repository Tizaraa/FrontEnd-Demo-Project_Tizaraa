// // import navigations from "@data/navigations";
// // import MegaMenu1 from "./mega-menu/MegaMenu1";
// // import MegaMenu2 from "./mega-menu/MegaMenu2";
// // import CategoryMenuItem from "./CategoryMenuItem";
// // import { StyledCategoryDropdown } from "./styles";

// // // =========================================
// // type CategoryDropdownProps = {
// //   open: boolean;
// //   position?: "absolute" | "relative";
// // };
// // // =========================================

// // export default function CategoryDropdown({ open, position = "absolute" }: CategoryDropdownProps) {
// //   const megaMenu = { MegaMenu1, MegaMenu2 };

// //   return (
// //     <StyledCategoryDropdown open={open} position={position}>
// //       {navigations.map((item) => {
// //         let MegaMenu = megaMenu[item.menuComponent];

// //         return (
// //           <CategoryMenuItem
// //             key={item.title}
// //             href={item.href}
// //             icon={item.icon}
// //             title={item.title}
// //             caret={!!item.menuData}>
// //             <MegaMenu data={item.menuData || {}} />
// //           </CategoryMenuItem>
// //         );
// //       })}
// //     </StyledCategoryDropdown>
// //   );
// // }




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

// export default function CategoryDropdown({ open, position = "absolute" }: CategoryDropdownProps) {
//   const [navigations, setNavigations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch navigations data from the API
//     const fetchNavigations = async () => {
//       try {
//         const response = await fetch(`${ApiBaseUrl.baseUrl}categories`); // Adjust the API endpoint as needed
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         // console.log("main category:", data)
//         setNavigations(data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNavigations();
//   }, []);

//   const megaMenu = { MegaMenu1, MegaMenu2 };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

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

export default function CategoryDropdown({ open, position = "absolute" }: CategoryDropdownProps) {
  const [navigations, setNavigations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavigations = async () => {
      try {
        // Check if data exists in localStorage
        const cachedData = localStorage.getItem("navigations");
        if (cachedData) {
          setNavigations(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        // Fetch data from API
        const response = await fetch(`${ApiBaseUrl.baseUrl}categories`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Cache data in localStorage
        localStorage.setItem("navigations", JSON.stringify(data));
        setNavigations(data);
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
