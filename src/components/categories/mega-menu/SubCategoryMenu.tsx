// import React, { useState } from "react";
// import Link from "next/link";
// import Box from "@component/Box";
// import Icon from "@component/icon/Icon";
// import { StyledCategoryMenuItem } from "../styles";

// interface SubCategoryMenuProps {
//   subCategories: Array<{
//     title: string;
//     href: string;
//     subSubCategories?: Array<{ title: string; href: string }>;
//   }>;
// }

// export default function SubCategoryMenu({ subCategories }: SubCategoryMenuProps) {
//   const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null);

//   return (
//     <StyledCategoryMenuItem>
//     <Box
//       style={{
//         position: "absolute",
//         left: "210%",
//         top: 0,
//         backgroundColor: "white",
//         boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         padding: "8px",
//         minWidth: "200px",
//         zIndex: 1000,
//       }}
//     >
//       {subCategories.map((sub, subIndex) => (
//         <div
//           key={subIndex}
//           onMouseEnter={() => setHoveredSubCategory(sub.title)}
//           onMouseLeave={() => setHoveredSubCategory(null)}
//           style={{ position: "relative", padding: "8px 0" }}
//         >
//           <Link href={`/category/${sub.href}`}>
//             <span
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 color: "black",
//                 textDecoration: "none",
//               }}
//             >
//               <span>{sub.title}</span>
//               {sub.subSubCategories && <Icon variant="small">chevron-right</Icon>}
//             </span>
//           </Link>

//           {/* Render sub-subcategories when a subcategory is hovered */}
//           {hoveredSubCategory === sub.title && sub.subSubCategories && (
//             <Box
//               style={{
//                 position: "absolute",
//                 left: "100%",
//                 top: 0,
//                 backgroundColor: "white",
//                 boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 padding: "8px",
//                 minWidth: "200px",
//                 zIndex: 1000,
//               }}
//             >
//               {sub.subSubCategories.map((subSub, subSubIndex) => (
//                 <Link key={subSubIndex} href={`/category/${subSub.href}`}>
//                   <span
//                     style={{
//                       display: "block",
//                       padding: "8px 0",
//                       color: "black",
//                       textDecoration: "none",
//                     }}
//                   >
//                     {subSub.title}
//                   </span>
//                 </Link>
//               ))}
//             </Box>
//           )}
//         </div>
//       ))}
//     </Box>
//     </StyledCategoryMenuItem>
//   );
// }


import React, { useState } from "react";
import Link from "next/link";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import { StyledCategoryMenuItem } from "../styles";

interface SubCategoryMenuProps {
  subCategories: Array<{
    title: string;
    href: string;
    subSubCategories?: Array<{ title: string; href: string }>;
  }>;
}

export default function SubCategoryMenu({ subCategories }: SubCategoryMenuProps) {
  const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null);

  return (
    <StyledCategoryMenuItem>
      <Box
        style={{
          position: "absolute",
          left: "100%", // Position beside MegaMenu1
          top: 0,
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "8px",
          minWidth: "200px",
          zIndex: 1000,
        }}
      >
        {subCategories.map((sub, subIndex) => (
          <div
            key={subIndex}
            onMouseEnter={() => setHoveredSubCategory(sub.title)}
            onMouseLeave={() => setHoveredSubCategory(null)}
            style={{ position: "relative", padding: "8px 0" }}
          >
            <Link href={`/category/${sub.href}`}>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <span>{sub.title}</span>
                {sub.subSubCategories && <Icon variant="small">chevron-right</Icon>}
              </span>
            </Link>

            {/* Render sub-subcategories when a subcategory is hovered */}
            {hoveredSubCategory === sub.title && sub.subSubCategories && (
              <Box
                style={{
                  position: "absolute",
                  left: "100%", // Position beside the current subcategory
                  top: 0,
                  backgroundColor: "white",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  padding: "8px",
                  minWidth: "200px",
                  zIndex: 1000,
                }}
              >
                {sub.subSubCategories.map((subSub, subSubIndex) => (
                  <Link key={subSubIndex} href={`/category/${subSub.href}`}>
                    <span
                      style={{
                        display: "block",
                        padding: "8px 0",
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      {subSub.title}
                    </span>
                  </Link>
                ))}
              </Box>
            )}
          </div>
        ))}
      </Box>
    </StyledCategoryMenuItem>
  );
}
