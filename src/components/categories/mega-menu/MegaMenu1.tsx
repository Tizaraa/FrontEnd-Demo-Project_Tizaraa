import React, { useState } from "react";
import Link from "next/link";
import Box from "@component/Box";
import NextImage from "@component/NextImage";
import { StyledMegaMenu1 } from "./styles";
import { MegaMenu1Props } from "./type";
import Icon from "@component/icon/Icon";
import SubCategoryMenu from "../sub-mega-menu/SubCategoryMenu"; // Import the SubCategoryMenu
import { StyledCategoryMenuItem } from "../styles";
import ApiBaseUrl from "api/ApiBaseUrl";

export default function MegaMenu1({
 data: { categories, rightImage, bottomImage },
 minWidth = "278px",
}: MegaMenu1Props) {
 const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
 const [subCategoryData, setSubCategoryData] = useState<any | null>(null);
 // Last hovered level 2 row: kept highlighted and named in the level 3 header
 const [activeCategory, setActiveCategory] = useState<any | null>(null);

 // Function to set SubCategory data
 const handleCategoryHover = (category: any) => {
  setHoveredCategory(category.title);
  setSubCategoryData(category.subCategories);
  setActiveCategory(category);
 };

 return categories ? (
  <StyledMegaMenu1 className="mega-menu">
   <div
    className={subCategoryData ? "mega-panel is-joined" : "mega-panel"}
    style={{ minWidth }}
   >
    {categories.map((item, ind) => (
     <div
      key={ind}
      onMouseEnter={() => handleCategoryHover(item)} // Set hover state and subcategory data
      onMouseLeave={() => setHoveredCategory(null)} // Clear hover state
     >
      <StyledCategoryMenuItem
       className={activeCategory === item ? "is-active" : undefined}
      >
       <Link href={`/category/${item.href}`}>
        <div className="category-dropdown-link">
         <span className="title">{item.title}</span>
         <Icon className="chev" variant="small">
          chevron-right
         </Icon>
        </div>
       </Link>
      </StyledCategoryMenuItem>
     </div>
    ))}

    {rightImage && (
     <Link href={rightImage.href}>
      <Box position="relative" width="153px" height="100%">
       <NextImage
        src={`${ApiBaseUrl.ImgUrl}${rightImage.imgUrl}`}
        width={137}
        height={318}
        alt="offer"
       />
      </Box>
     </Link>
    )}
    {bottomImage && (
     <Link href={bottomImage.href}>
      <Box position="relative" height="100%">
       <NextImage
        src={`${ApiBaseUrl.ImgUrl}${bottomImage.imgUrl}`}
        width={711}
        height={162}
        alt="offer"
       />
      </Box>
     </Link>
    )}
   </div>

   {/* Render the SubCategoryMenu only when there is subCategoryData */}
   {subCategoryData && (
    <SubCategoryMenu
     subCategories={subCategoryData}
     parent={activeCategory}
    />
   )}
  </StyledMegaMenu1>
 ) : null;
}
