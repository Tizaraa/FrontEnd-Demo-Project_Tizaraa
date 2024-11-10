import React, { useState } from "react";
import Link from "next/link";
import Box from "@component/Box";
import Card from "@component/Card";
import Grid from "@component/grid/Grid";
import NextImage from "@component/NextImage";
import { StyledMegaMenu1 } from "./styles";
import { MegaMenu1Props } from "./type";
import Icon from "@component/icon/Icon";
import SubCategoryMenu from "../sub-mega-menu/SubCategoryMenu"; // Import the SubCategoryMenu
import { StyledCategoryMenuItem } from "../styles";

export default function MegaMenu1({
  data: { categories, rightImage, bottomImage },
  minWidth = "278px",
}: MegaMenu1Props) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [subCategoryData, setSubCategoryData] = useState<any | null>(null);

  // Function to set SubCategory data
  const handleCategoryHover = (category: any) => {
    setHoveredCategory(category.title);
    setSubCategoryData(category.subCategories);
  };

  return categories ? (
    <StyledMegaMenu1 className="mega-menu">
      <Card ml="1rem" minWidth={minWidth} boxShadow="regular" overflow="hidden" borderRadius={8}>
        <Box style={{ position: "relative", height: "450px" }}>
          {categories.map((item, ind) => (
            <Grid item md={3} key={ind}>
              <div
                style={{ position: "relative" }}
                onMouseEnter={() => handleCategoryHover(item)}  // Set hover state and subcategory data
                onMouseLeave={() => setHoveredCategory(null)}  // Clear hover state
              >
                {/* <div className="category-dropdown-link">
                  <Link href={`/category/${item.href}`}>
                    <div style={{ display: 'flex',  alignItems: 'center', padding: '8px 0', textDecoration: 'none' }}>
                      <span>{item.title}</span>
                      <Icon variant="small">chevron-right</Icon>
                    </div>
                  </Link>
                </div> */}

<StyledCategoryMenuItem>
      <Link href={`/category/${item.href}`}>
        <div className="category-dropdown-link">
          {/* {icon && <Icon variant="small">{icon}</Icon>} */}
          <span className="title">{item.title}</span>
          <Icon variant="small">chevron-right</Icon>
        </div>
      </Link>
    </StyledCategoryMenuItem>
              </div>
            </Grid>
          ))}
        </Box>

        {rightImage && (
          <Link href={rightImage.href}>
            <Box position="relative" width="153px" height="100%">
              <NextImage src={rightImage.imgUrl} width={137} height={318} alt="offer" />
            </Box>
          </Link>
        )}
        {bottomImage && (
          <Link href={bottomImage.href}>
            <Box position="relative" height="100%">
              <NextImage src={bottomImage.imgUrl} width={711} height={162} alt="offer" />
            </Box>
          </Link>
        )}
      </Card>

      {/* Render the SubCategoryMenu only when there is subCategoryData */}
      {subCategoryData && <SubCategoryMenu subCategories={subCategoryData} />}
    </StyledMegaMenu1>
  ) : null;
}
