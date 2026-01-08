// import React, { useState } from "react";
// import Link from "next/link";
// import Box from "@component/Box";
// import Icon from "@component/icon/Icon";
// import { StyledCategoryMenuItem } from "../styles";

// interface SubCategoryMenuProps {
//   subCategories: Array<{
//     title: string;
//     href: string;
//     imgUrl: string;
//     subSubCategories?: Array<{ title: string; href: string }>;
//   }>;
// }

// export default function SubCategoryMenu({ subCategories }: SubCategoryMenuProps) {
//   const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(null);

//   return (
//     <StyledCategoryMenuItem>
//       <Box
//         style={{
//           position: "absolute",
//           left: "100%",  // This makes the subcategory menu appear beside the parent category
//           top: 0,
//           backgroundColor: "white",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           padding: "8px",
//           minWidth: "615px",  // Set a fixed width if needed
//           zIndex: 9999,  // Ensure it's above other elements
//         }}
//       >
//         {subCategories.map((sub, subIndex) => (
//           <div
//             key={subIndex}
//             onMouseEnter={() => setHoveredSubCategory(sub.title)}
//             onMouseLeave={() => setHoveredSubCategory(null)}
//             style={{ position: "relative", padding: "8px 0" }}
//           >
//             <Link href={`/category/${sub.href}`}>
//               <span
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   color: "black",
//                   textDecoration: "none",
//                 }}
//               >
//                 <img src={sub.imgUrl} alt={sub.title} />
//                 <span>{sub.title}</span>
//                 {sub.subSubCategories && <Icon variant="small">chevron-right</Icon>}
//               </span>
//             </Link>
//           </div>
//         ))}
//       </Box>
//     </StyledCategoryMenuItem>
//   );
// }

import React, { useState } from "react";
import Link from "next/link";
import Box from "@component/Box";
import Icon from "@component/icon/Icon";
import { StyledCategoryMenuItem } from "../styles";
import ApiBaseUrl from "api/ApiBaseUrl";
import Image from "next/image";

interface SubCategoryMenuProps {
 subCategories: Array<{
  title: string;
  href: string;
  imgUrl: string; // Added imgUrl to each subcategory
  subSubCategories?: Array<{ title: string; href: string }>;
 }>;
}

export default function SubCategoryMenu({
 subCategories,
}: SubCategoryMenuProps) {
 const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(
  null
 );

 return (
  <>
   <Box
    style={{
     position: "absolute",
     left: "100%",
     top: 0,
     backgroundColor: "white",
     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
     padding: "8px",
     minWidth: "645px",
     zIndex: 9999,
     height: "450px",
     //  display: "grid",
     //  gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
     //  overflowY: "auto",
     //  gap: "16px"
    }}
   >
    <div
     style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      gridAutoRows: "min-content",
      overflowY: "auto",
      height: "400px",
      gap: "16px",
      justifyItems: "center",
      alignContent: "start",
     }}
    >
     {subCategories.map((sub, subIndex) => (
      <div
       key={subIndex}
       onMouseEnter={() => setHoveredSubCategory(sub.title)}
       onMouseLeave={() => setHoveredSubCategory(null)}
       style={{ position: "relative" }}
      >
       <Link href={`/category/${sub.href}`}>
        <span
         style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          color: "black",
          textDecoration: "none",
         }}
        >
         {/* <img 
                  src={`${ApiBaseUrl.ImgUrl}${sub.imgUrl}`} 
                  alt={sub.title} 
                  style={{
                    width: "50px",   
                    height: "50px",  
                    borderRadius: "50%",  
                    marginRight: "8px", 
                  }} 
                /> */}

         {/* image cache  */}
         <Image
          src={`${ApiBaseUrl.ImgUrl}${sub.imgUrl}`}
          alt={sub.title}
          width={200}
          height={200}
          objectFit="cover"
          style={{
           width: "50px",
           height: "50px",
           borderRadius: "50%",
           objectFit: "cover",
          }}
         />

         <span>{sub.title}</span>
        </span>
       </Link>
      </div>
     ))}
    </div>
   </Box>
  </>
 );
}
