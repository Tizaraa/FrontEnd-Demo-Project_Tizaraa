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
import styled from "styled-components";
import ApiBaseUrl from "api/ApiBaseUrl";
import Image from "next/image";
import { menuShadow, thinScrollbar } from "../styles";

interface SubCategoryMenuProps {
 subCategories: Array<{
  title: string;
  href: string;
  imgUrl: string; // Added imgUrl to each subcategory
  subSubCategories?: Array<{ title: string; href: string }>;
 }>;
 // The level 2 category these belong to, for the panel header
 parent?: { title: string; href?: string } | null;
}

export default function SubCategoryMenu({
 subCategories,
 parent,
}: SubCategoryMenuProps) {
 const [hoveredSubCategory, setHoveredSubCategory] = useState<string | null>(
  null
 );

 return (
  <Panel>
   {parent?.title && (
    <PanelHeader>
     <h4 title={parent.title}>{parent.title}</h4>
     {parent.href && (
      <Link className="view-all" href={`/category/${parent.href}`}>
       View all <span aria-hidden="true">&rarr;</span>
      </Link>
     )}
    </PanelHeader>
   )}

   <TileGrid>
    {subCategories.map((sub, subIndex) => (
     <div
      key={subIndex}
      onMouseEnter={() => setHoveredSubCategory(sub.title)}
      onMouseLeave={() => setHoveredSubCategory(null)}
     >
      <Link className="tile" href={`/category/${sub.href}`}>
       <span className="thumb">
        {/* image cache  */}
        {sub.imgUrl && (
         <Image
          src={sub.imgUrl?.startsWith("http") ? sub.imgUrl : `${ApiBaseUrl.ImgUrl}${sub.imgUrl}`}
          alt={sub.title}
          width={200}
          height={200}
          objectFit="cover"
         />
        )}
       </span>

       <span className="name">{sub.title}</span>
      </Link>
     </div>
    ))}
   </TileGrid>
  </Panel>
 );
}

// Level 3: joined to the right edge of the level 2 panel
const Panel = styled.div`
 box-sizing: border-box;
 position: absolute;
 left: 100%;
 top: 0;
 z-index: 100;
 width: 645px;
 height: 450px;
 display: flex;
 flex-direction: column;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-left: none;
 border-radius: 0 16px 16px 0;
 box-shadow: ${menuShadow};
 overflow: hidden;
`;

const PanelHeader = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
 gap: 12px;
 padding: 14px 20px 12px;
 border-bottom: 1px solid ${({ theme }) => theme.tz.color.lineSoft};

 h4 {
  margin: 0;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.ink};
 }

 .view-all {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  text-decoration: none;
  outline: none;
  transition: background-color 120ms cubic-bezier(0.2, 0, 0, 1);

  span {
   display: inline-block;
   transition: transform 160ms cubic-bezier(0.2, 0, 0, 1);
  }

  &:hover {
   background: ${({ theme }) => theme.tz.color.emberTint};
   color: ${({ theme }) => theme.tz.color.emberDark};
  }
  &:hover span {
   transform: translateX(3px);
  }
  &:focus-visible {
   box-shadow: ${({ theme }) => theme.tz.focusRing};
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .view-all,
  .view-all span {
   transition: none;
  }
  .view-all:hover span {
   transform: none;
  }
 }
`;

const TileGrid = styled.div`
 flex: 1;
 min-height: 0;
 overflow-y: auto;
 display: grid;
 grid-template-columns: repeat(auto-fill, minmax(112px, 1fr));
 grid-auto-rows: min-content;
 align-content: start;
 gap: 8px;
 padding: 14px 14px 18px;
 ${thinScrollbar}

 .tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px 6px;
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
  outline: none;
  transition: transform 180ms cubic-bezier(0.2, 0, 0, 1);
 }

 .thumb {
  width: 68px;
  height: 68px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.mist};
  overflow: hidden;

  img {
   width: 56px;
   height: 56px;
   border-radius: 50%;
   object-fit: cover;
   transition: transform 220ms cubic-bezier(0.2, 0, 0, 1);
  }
 }

 .name {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  transition: color 120ms cubic-bezier(0.2, 0, 0, 1);
 }

 .tile:hover,
 .tile:focus-visible {
  transform: translateY(-3px);

  .thumb img {
   transform: scale(1.08);
  }
  .name {
   color: ${({ theme }) => theme.tz.color.emberDeep};
  }
 }

 .tile:focus-visible {
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (prefers-reduced-motion: reduce) {
  .tile,
  .thumb img,
  .name {
   transition: none;
  }
  .tile:hover,
  .tile:focus-visible {
   transform: none;

   .thumb img {
    transform: none;
   }
  }
 }
`;
