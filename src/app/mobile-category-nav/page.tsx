"use client";

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import clsx from "clsx";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import Icon from "@component/icon/Icon";
import Divider from "@component/Divider";
import { Header } from "@component/header";
import Scrollbar from "@component/Scrollbar";
import Typography from "@component/Typography";
import MobileNavigationBar from "@component/mobile-navigation";
import { Accordion, AccordionHeader } from "@component/accordion";
// CUSTOM HOOK
import useWindowSize from "@hook/useWindowSize";

import { MobileCategoryNavStyle } from "./styles";
import MobileCategoryImageBox from "./MobileCategoryImageBox";

// import navigations from "@data/navigations";

// ==============================================================
// Define the structure of Suggestion and Category
interface Suggestion {
  href: string;
  title: string;
  imgUrl: string;
}

interface Category {
  title: string;
  href: string;
  icon?: string;
  menuComponent?: string;
  menuData?: {
    categories?: any[];
  };
}
// ==============================================================

export default function MobileCategoryNav() {
  const width = useWindowSize();
  const [navigations, setNavigations] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [subCategoryList, setSubCategoryList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCategoryClick = (cat: any) => () => {
    let menuData = cat.menuData;
  
    // Check if menuData has a 'categories' field
    if (Array.isArray(menuData?.categories)) {
      setSubCategoryList(menuData.categories);
    } 
    // Check if menuData is an array itself
    else if (Array.isArray(menuData)) {
      setSubCategoryList(menuData);
    } 
    // Set an empty array if no valid data is found
    else {
      setSubCategoryList([]);
    }
  
    setCategory(cat);
  };
  

  useEffect(() => {
    const fetchNavigations = async () => {
      try {
        const response = await fetch("https://frontend.tizaraa.com/api/categories"); // Fetch categories from API
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNavigations(data); 
        console.log("categories:", data);

        // Automatically select the first category if available
        if (data.length > 0) {
          setCategory(data[0]); 
          setSubCategoryList(data[0]?.menuData?.categories || []);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNavigations();
  }, []);

  // HIDDEN IN LARGE DEVICE
  if (width > 900) return null;

  return (
    <MobileCategoryNavStyle>
      <Header className="header" />

      <div className="main-category-holder">
        <Scrollbar>
          {navigations.map((item) => (
            <div
              key={item.title}
              className={clsx({ "main-category-box": true, active: category?.href === item.href })}
              onClick={handleCategoryClick(item)}
            >
              <Icon size="28px" mb="0.5rem">
                {item.icon}
              </Icon>

              <Typography className="ellipsis" textAlign="center" fontSize="11px" lineHeight="1">
                {item.title}
              </Typography>
            </div>
          ))}
        </Scrollbar>
      </div>

      <div className="container">
        {category?.menuComponent === "MegaMenu1" ? (
          subCategoryList.map((item, ind) => (
            <Fragment key={ind}>
              <Divider />
              <Accordion>
                <AccordionHeader px="0px" py="10px">
                  <Typography fontWeight="600" fontSize="15px">
                    {item.title}
                  </Typography>
                </AccordionHeader>

                <Box mb="2rem" mt="0.5rem">
                  <Grid container spacing={3}>
                    {item.subCategories?.map((subItem: any, ind: number) => (
                      <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                        <Link href={`/category/${subItem.href}`}>
                          <MobileCategoryImageBox {...subItem} />
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Accordion>
            </Fragment>
          ))
        ) : (
          <Box mb="2rem">
            <Grid container spacing={3}>
              {subCategoryList.map((item, ind) => (
                <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                  <Link href={`/category/${item.href}`}>
                    <MobileCategoryImageBox {...item} />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </div>

      <MobileNavigationBar />
    </MobileCategoryNavStyle>
  );
}
