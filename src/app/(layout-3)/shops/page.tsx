
"use client";
import { Fragment, useEffect, useState, useRef } from "react";
import Grid from "@component/grid/Grid";
import axios from "axios";
import FlexBox from "@component/FlexBox";
import ShopCard1 from "@sections/shop/ShopCard1";
import { H2, SemiSpan, Span } from "@component/Typography";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";
import SearchBoxStyle from "@component/search-box/styled";
import Icon from "@component/icon/Icon";
import TextField from "@component/text-field";
import Box from "@component/Box";
import { debounce } from "lodash";
import Card from "@component/Card";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoShopMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 1.5rem;
  color: gray;
`;

export default function ShopList() {
  const [shopList, setShopList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalShops, setTotalShops] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [noShopsFound, setNoShopsFound] = useState(false);
  const observerRef = useRef(null);

  const [searchValue, setSearchValue] = useState("");

  // Function to fetch shops data
  const fetchShops = async (page: number, searchQuery = "") => {
    setIsLoading(true);
    try {
      let response;
      if (searchQuery) {
        // If there's a search query, use POST method to fetch search results
        response = await axios.post(
          `${ApiBaseUrl.baseUrl}all/seller/profile?search?page=${page}`,
          { search: searchQuery, page }
        );
      } 
      else {
        // Else fetch all shops
        response = await axios.post(
          `${ApiBaseUrl.baseUrl}all/seller/profile?page=${page}`
        );
      }

      const data = response.data;

      if (data.data.length === 0) {
        setNoShopsFound(true); // Set to true if no shops found
      } else {
        setNoShopsFound(false); // Set to false if shops found
      }

      if (page === 1) {
        setShopList(data.data); // If first page, replace the shop list
      } else {
        setShopList((prevShops) => [...prevShops, ...data.data]); // Append for more pages
      }

      setTotalShops(data.total);
      setLastPage(data.last_page);
    } catch (error) {
      console.error("Error fetching shop list", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function to reduce API calls
  const searchShops = debounce((value: string) => {
    if (!value) {
      setShopList([]); // Clear the current list before showing all shops again
      setIsSearching(false);
      fetchShops(1); // Fetch all shops if search is cleared
    } else {
      setIsSearching(true);
      fetchShops(1, value); // Fetch shops based on search value
    }
  }, 300);

  // Handle search input change
  const handleSearch = (e: any) => {
    const value = e.target?.value;
    setSearchValue(value);
    searchShops(value); // Trigger debounced search
  };

  // Infinite scrolling logic
  useEffect(() => {
    if (isLoading || currentPage >= lastPage || isSearching) return;

    const handleScroll = (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isLoading, currentPage, lastPage, isSearching]);

  useEffect(() => {
    if (currentPage > 1 && !isSearching) {
      fetchShops(currentPage); // Load more shops when currentPage changes, only if not searching
    }
  }, [currentPage, isSearching]);

  useEffect(() => {
    fetchShops(1); // Initial fetch when component loads
  }, []);

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <H2 mb="10px">All Shops</H2>
        <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
          <SearchBoxStyle>
            <Icon className="search-icon" size="18px">
              search
            </Icon>
            <TextField
              fullwidth
              value={searchValue}
              onChange={handleSearch}
              className="search-field"
              placeholder="Search for a shop..."
            />
          </SearchBoxStyle>
        </Box>
      </div>

      {noShopsFound && searchValue ? (
        <NoShopMessage>No shop found with this name</NoShopMessage>
      ) : (
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
      )}

      {isLoading && (
        <LoaderWrapper>
          <Vortex />
        </LoaderWrapper>
      )}

      <div ref={observerRef} style={{ height: "1px", width: "100%" }}></div>
    </Fragment>
  );
}



