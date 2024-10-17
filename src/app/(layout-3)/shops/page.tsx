"use client";
import { Fragment, useEffect, useState, useRef } from "react";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import ShopCard1 from "@sections/shop/ShopCard1";
import { H2, SemiSpan } from "@component/Typography";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import StyledSearchBox from "@component/search-box/styled";
import Icon from "@component/icon/Icon";
import TextField from "@component/text-field";
import Box from "@component/Box";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ShopList() {
  const [shopList, setShopList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalShops, setTotalShops] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const observerRef = useRef(null);

  // Fetch the shops data
  const fetchShops = async (page) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${ApiBaseUrl.baseUrl}all/seller/profile?page=${page}`
      );
      const data = await response.json();

      setShopList((prevShops) => [...prevShops, ...data.data]); // Append new shops to the list
      setTotalShops(data.total);
      setLastPage(data.last_page);
    } catch (error) {
      console.error("Error fetching shop list", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch the initial shops when component loads
    fetchShops(currentPage);
  }, []);

  useEffect(() => {
    if (isLoading || currentPage >= lastPage) return;

    const handleScroll = (entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleScroll, {
      root: null, // relative to the viewport
      rootMargin: "100px", // Start loading before reaching the bottom
      threshold: 0,
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isLoading, currentPage, lastPage]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchShops(currentPage); // Load more shops when currentPage changes
    }
  }, [currentPage]);

  return (
    <Fragment>
      <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "30px"}}>
      <H2 mb="24px">All Shops</H2>
      <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">

      <StyledSearchBox>
        <Icon className="search-icon" size="18px">search</Icon>
        <TextField
          fullwidth
          value="" 
          onChange=""
          onKeyDown=""
          className="search-field"
          placeholder="Search and hit enter..."
        />
        {/* <Menu direction="right" className="category-dropdown" handler={
          <FlexBox className="dropdown-handler" alignItems="center">
            <span>{category}</span>
            <Icon variant="small">chevron-down</Icon>
          </FlexBox>
        }>
          {categories.map((item) => (
            <MenuItem key={item.id} onClick={handleCategoryChange(item.title)}>
              {item.title}
            </MenuItem>
          ))}
        </Menu> */}
      </StyledSearchBox>
      </Box>
      </div>

      <Grid container spacing={6}>
        {shopList.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ShopCard1
              name={item.name}
              phone={item.phone}
              address={item.address || "Address not found"}
              rating={item.rating || 5}
              imgUrl={item.profilePicture}
              coverImgUrl={item.coverPicture}
              shopUrl={`/shops/${item.slug}`}
            />
          </Grid>
        ))}
      </Grid>

      {/* Loading Indicator */}
      {isLoading && (
        <LoaderWrapper>
        <Vortex />
      </LoaderWrapper>
        // <FlexBox justifyContent="center" mt="24px">
        //   {/* <SemiSpan>Loading more shops...</SemiSpan> */}
        //   <LoaderWrapper>
        //     <Vortex />
        //   </LoaderWrapper>
        //   ;
        // </FlexBox>
      )}

      {/* Empty div used as a scroll observer target */}
      <div ref={observerRef} style={{ height: "1px", width: "100%" }}></div>
    </Fragment>
  );
}
