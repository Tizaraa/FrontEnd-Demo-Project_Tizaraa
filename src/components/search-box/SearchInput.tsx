// import { useCallback, useEffect, useState } from "react";
// import Link from "next/link";
// import { debounce } from "lodash";

// import Box from "@component/Box";
// import Card from "@component/Card";
// import Icon from "@component/icon/Icon";
// import MenuItem from "@component/MenuItem";
// import { Button } from "@component/buttons";
// import { Span } from "@component/Typography";
// import TextField from "@component/text-field";
// import SearchBoxStyle from "./styled";

// export default function SearchInput() {
//   const [resultList, setResultList] = useState<string[]>([]);

//   const search = debounce((e) => {
//     const value = e.target?.value;

//     if (!value) setResultList([]);
//     else setResultList(dummySearchResult);
//   }, 200);

//   const hanldeSearch = useCallback((event: any) => {
//     event.persist();
//     search(event);
//   }, []);

//   const handleDocumentClick = () => setResultList([]);

//   useEffect(() => {
//     window.addEventListener("click", handleDocumentClick);
//     return () => window.removeEventListener("click", handleDocumentClick);
//   }, []);

//   return (
//     <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
//       <SearchBoxStyle>
//         <Icon className="search-icon" size="18px">
//           search
//         </Icon>

//         <TextField
//           fullwidth
//           onChange={hanldeSearch}
//           className="search-field"
//           placeholder="Search and hit enter..."
//         />

//         <Button className="search-button" variant="contained" color="primary">
//           Search
//         </Button>

//         <Box className="menu-button" ml="14px" cursor="pointer">
//           <Icon color="primary">menu</Icon>
//         </Box>
//       </SearchBoxStyle>

//       {!!resultList.length && (
//         <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
//           {resultList.map((item) => (
//             <Link href={`/product/search/${item}`} key={item}>
//               <MenuItem key={item}>
//                 <Span fontSize="14px">{item}</Span>
//               </MenuItem>
//             </Link>
//           ))}
//         </Card>
//       )}
//     </Box>
//   );
// }

// const dummySearchResult = ["Macbook Air 13", "Ksus K555LA", "Acer Aspire X453", "iPad Mini 3"];




import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import axios from "axios"; // For API calls

import Box from "@component/Box";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import MenuItem from "@component/MenuItem";
import { Button } from "@component/buttons";
import { Span } from "@component/Typography";
import TextField from "@component/text-field";
import SearchBoxStyle from "./styled";
import ApiBaseUrl from "api/ApiBaseUrl";

export default function SearchInput() {
  const [resultList, setResultList] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState(""); // To store the input value

  // Function to fetch search suggestions based on query
  const fetchSearchResults = async (query: string) => {
    try {
      const response = await axios.get(`${ApiBaseUrl.baseUrl}search/suggestion/${query}`);
      const results = response.data || [];

      // Assuming the API returns an array of suggestions
      setResultList(results.map((item: any) => item.keyword)); // Extract `keyword` from the results
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResultList([]); // Clear results in case of an error
    }
  };

  // Debounced search handler
  const search = debounce((e) => {
    const value = e.target?.value;
    setSearchValue(value); // Store the input value

    if (!value) {
      setResultList([]); // Clear result if input is empty
    } else {
      fetchSearchResults(value); // Fetch results when there's a valid input
    }
  }, 300);

  // Event handler for input change
  const handleSearch = useCallback((event: any) => {
    event.persist();
    search(event); // Call the debounced search function
  }, []);

  // Handle search button click (if you want a manual search button as well)
  const handleSearchButtonClick = () => {
    if (searchValue) {
      fetchSearchResults(searchValue); // Fetch results when clicking the button
    }
  };

  // Handle search result click to update the input value and keep it
  const handleResultClick = (item: string) => {
    setSearchValue(item); // Set the clicked item as the input value
    setResultList([]); // Optionally clear the result list after selecting
  };

  // Hide the result list when clicking outside the search box
  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <SearchBoxStyle>
        <Icon className="search-icon" size="18px">
          search
        </Icon>

        <TextField
          fullwidth
          value={searchValue} // Controlled input
          onChange={handleSearch}
          className="search-field"
          placeholder="Search By Name and Hit Enter"
        />

        {/* Optional Search Button */}
        <Button className="search-button" variant="contained" color="primary" onClick={handleSearchButtonClick}>
          Search
        </Button>

        <Box className="menu-button" ml="14px" cursor="pointer">
          <Icon color="primary">menu</Icon>
        </Box>
      </SearchBoxStyle>

      {/* Show search results */}
      {!!resultList.length && (
        <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
          {resultList.map((item, index) => (
            <MenuItem key={index} onClick={() => handleResultClick(item)}>
              <Span fontSize="14px">{item}</Span>
            </MenuItem>
          ))}
        </Card>
      )}
    </Box>
  );
}
