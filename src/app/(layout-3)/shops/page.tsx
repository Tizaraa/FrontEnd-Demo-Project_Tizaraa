// "use client";
// import { Fragment, useEffect, useState, useRef, useCallback } from "react";
// import Grid from "@component/grid/Grid";
// import axios from "axios";
// import FlexBox from "@component/FlexBox";
// import ShopCard1 from "@sections/shop/ShopCard1";
// import { H2, SemiSpan } from "@component/Typography";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import ApiBaseUrl from "api/ApiBaseUrl";
// //import StyledSearchBox from "@component/search-box/styled";
// import SearchBoxStyle from "@component/search-box/styled";
// import Icon from "@component/icon/Icon";
// import TextField from "@component/text-field";
// import Box from "@component/Box";
// import { Button } from "@component/buttons";
// import { debounce } from "lodash";
// import Card from "@component/Card";
// import MenuItem from "@component/MenuItem";
// import { Span } from "@component/Typography";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// export default function ShopList() {
//   const [shopList, setShopList] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalShops, setTotalShops] = useState(0);
//   const [lastPage, setLastPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false); // For loading state
//   const observerRef = useRef(null);

//   const [resultList, setResultList] = useState<string[]>([]);
//   const [searchValue, setSearchValue] = useState(""); // To store the input value

//   // Function to fetch search suggestions based on query
//   const fetchSearchResults = async (query: string) => {
//     try {
//       const response = await axios.get(
//         `${ApiBaseUrl.baseUrl}search/suggestion/${query}`
//       );
//       const results = response.data || [];

//       // Assuming the API returns an array of suggestions
//       setResultList(results.map((item: any) => item.keyword)); // Extract `keyword` from the results
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       setResultList([]); // Clear results in case of an error
//     }
//   };

//   // Debounced search handler
//   const search = debounce((e) => {
//     const value = e.target?.value;
//     setSearchValue(value); // Store the input value

//     if (!value) {
//       setResultList([]); // Clear result if input is empty
//     } else {
//       fetchSearchResults(value); // Fetch results when there's a valid input
//     }
//   }, 300);

//   const handleSearch = useCallback((event: any) => {
//     event.persist();
//     search(event); // Call the debounced search function
//   }, []);

//   // Handle search button click (if you want a manual search button as well)
//   const handleSearchButtonClick = () => {
//     if (searchValue) {
//       fetchSearchResults(searchValue); // Fetch results when clicking the button
//     }
//   };

//   const handleResultClick = (item: string) => {
//     setSearchValue(item); // Set the clicked item as the input value
//     setResultList([]); // Optionally clear the result list after selecting
//   };

//   // Hide the result list when clicking outside the search box
//   const handleDocumentClick = () => setResultList([]);

//   useEffect(() => {
//     window.addEventListener("click", handleDocumentClick);
//     return () => window.removeEventListener("click", handleDocumentClick);
//   }, []);

//   // Fetch the shops data
//   const fetchShops = async (page) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `${ApiBaseUrl.baseUrl}all/seller/profile?page=${page}`
//       );
//       const data = await response.json();

//       setShopList((prevShops) => [...prevShops, ...data.data]); // Append new shops to the list
//       setTotalShops(data.total);
//       setLastPage(data.last_page);
//     } catch (error) {
//       console.error("Error fetching shop list", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Fetch the initial shops when component loads
//     fetchShops(currentPage);
//   }, []);

//   useEffect(() => {
//     if (isLoading || currentPage >= lastPage) return;

//     const handleScroll = (entries) => {
//       const target = entries[0];
//       if (target.isIntersecting) {
//         setCurrentPage((prevPage) => prevPage + 1);
//       }
//     };

//     const observer = new IntersectionObserver(handleScroll, {
//       root: null, // relative to the viewport
//       rootMargin: "100px", // Start loading before reaching the bottom
//       threshold: 0,
//     });

//     if (observerRef.current) observer.observe(observerRef.current);

//     return () => {
//       if (observerRef.current) observer.unobserve(observerRef.current);
//     };
//   }, [isLoading, currentPage, lastPage]);

//   useEffect(() => {
//     if (currentPage > 1) {
//       fetchShops(currentPage); // Load more shops when currentPage changes
//     }
//   }, [currentPage]);

//   return (
//     <Fragment>
//       <div
//         style={{
//           display: "flex",
//           gap: "10px",
//           alignContent: "center",
//           alignItems: "center",
//           justifyContent: "center",
//           marginBottom: "20px",
//         }}
//       >
//         <H2 mb="10px">All Shops</H2>
//         <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
//           <SearchBoxStyle>
//             <Icon className="search-icon" size="18px">
//               search
//             </Icon>
//             <TextField
//               fullwidth
//               value={searchValue} // Controlled input
//               onChange={handleSearch}
//               className="search-field"
//               placeholder="Search and hit enter..."
//             />
//             {/* <Menu direction="right" className="category-dropdown" handler={
//           <FlexBox className="dropdown-handler" alignItems="center">
//             <span>{category}</span>
//             <Icon variant="small">chevron-down</Icon>
//           </FlexBox>
//         }>
//           {categories.map((item) => (
//             <MenuItem key={item.id} onClick={handleCategoryChange(item.title)}>
//               {item.title}
//             </MenuItem>
//           ))}
//         </Menu> */}
//           </SearchBoxStyle>
//           {!!resultList.length && (
//             <Card
//               position="absolute"
//               top="100%"
//               py="0.5rem"
//               width="100%"
//               boxShadow="large"
//               zIndex={99}
//             >
//               {resultList.map((item, index) => (
//                 <MenuItem key={index} onClick={() => handleResultClick(item)}>
//                   <Span fontSize="14px">{item}</Span>
//                 </MenuItem>
//               ))}
//             </Card>
//           )}
//         </Box>
//       </div>

//       <Grid container spacing={6}>
//         {shopList.map((item) => (
//           <Grid item lg={4} sm={6} xs={12} key={item.id}>
//             <ShopCard1
//               name={item.name}
//               phone={item.phone}
//               address={item.address || "Address not found"}
//               rating={item.rating || 5}
//               imgUrl={item.profilePicture}
//               coverImgUrl={item.coverPicture}
//               shopUrl={`/shops/${item.slug}`}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Loading Indicator */}
//       {isLoading && (
//         <LoaderWrapper>
//           <Vortex />
//         </LoaderWrapper>
//         // <FlexBox justifyContent="center" mt="24px">
//         //   {/* <SemiSpan>Loading more shops...</SemiSpan> */}
//         //   <LoaderWrapper>
//         //     <Vortex />
//         //   </LoaderWrapper>
//         //   ;
//         // </FlexBox>
//       )}

//       {/* Empty div used as a scroll observer target */}
//       <div ref={observerRef} style={{ height: "1px", width: "100%" }}></div>
//     </Fragment>
//   );
// }

"use client";
import { Fragment, useEffect, useState, useRef, useCallback } from "react";
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
import { Button } from "@component/buttons";
import { debounce } from "lodash";
import Card from "@component/Card";
import MenuItem from "@component/MenuItem";

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
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);

  const [resultList, setResultList] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState("");

  // Function to fetch search suggestions based on query
  const fetchSearchResults = async (query: string) => {
    try {
      const response = await axios.get(
        `${ApiBaseUrl.baseUrl}search/suggestion/${query}`
      );
      const results = response.data || [];
      setResultList(results.map((item: any) => item.keyword));
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResultList([]);
    }
  };

  // Debounced search handler
  const search = debounce((value: string) => {
    if (!value) {
      setResultList([]);
    } else {
      fetchSearchResults(value);
    }
  }, 300);

  // Handle search input change
  const handleSearch = (e: any) => {
    const value = e.target?.value;
    setSearchValue(value);
    search(value); // Call debounced function
  };

  // Handle search result click
  const handleResultClick = (item: string) => {
    setSearchValue(item);
    setResultList([]); // Clear the result list after selecting an item
  };

  // Hide result list when clicking outside of the search box
  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  // Fetch shop data
  const fetchShops = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${ApiBaseUrl.baseUrl}all/seller/profile?page=${page}`
      );
      const data = await response.json();

      setShopList((prevShops) => [...prevShops, ...data.data]);
      setTotalShops(data.total);
      setLastPage(data.last_page);
    } catch (error) {
      console.error("Error fetching shop list", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchShops(currentPage); // Initial fetch when component loads
  }, []);

  useEffect(() => {
    if (isLoading || currentPage >= lastPage) return;

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
  }, [isLoading, currentPage, lastPage]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchShops(currentPage); // Load more shops when currentPage changes
    }
  }, [currentPage]);

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
              placeholder="Search and hit enter..."
            />
          </SearchBoxStyle>
          {/* {!!resultList.length && (
            <Card
              position="absolute"
              top="100%"
              py="0.5rem"
              width="100%"
              boxShadow="large"
              zIndex={99}
            >
              {resultList.map((item, index) => (
                <MenuItem key={index} onClick={() => handleResultClick(item)}>
                  <Span fontSize="14px">{item}</Span>
                </MenuItem>
              ))}
            </Card>
          )} */}
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

      {isLoading && (
        <LoaderWrapper>
          <Vortex />
        </LoaderWrapper>
      )}

      <div ref={observerRef} style={{ height: "1px", width: "100%" }}></div>
    </Fragment>
  );
}

