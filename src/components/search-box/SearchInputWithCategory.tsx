// import { useEffect, useState } from "react";
// import { debounce } from "lodash";
// import axios from "axios";
// import Box from "@component/Box";
// import Card from "@component/Card";
// import Icon from "@component/icon/Icon";
// import MenuItem from "@component/MenuItem";
// import { Span } from "@component/Typography";
// import TextField from "@component/text-field";
// import StyledSearchBox from "./styled";
// import { useRouter } from "next/navigation";
// import { usePathname } from "next/navigation";
// import ApiBaseUrl from "api/ApiBaseUrl";

// export default function SearchInputWithCategory() {
//   const [resultList, setResultList] = useState<any[]>([]);
//   const [searchValue, setSearchValue] = useState("");
//   const router = useRouter();
//   const pathname = usePathname();

//   // ✅ Extract search term from URL and set as searchValue
//   useEffect(() => {
//     const pathParts = pathname.split("/");

//     // ✅ Ensure the pathname starts with "/product/search/" before extracting
//     if (pathname.startsWith("/product/search/")) {
//       const lastPart = decodeURIComponent(pathParts[pathParts.length - 1]);

//       if (lastPart && lastPart !== "search") {
//         setSearchValue(lastPart); // ✅ Set input field value from URL
//       }
//     } else {
//       setSearchValue(""); // ✅ Reset input if not in /product/search/
//     }

//     setResultList([]); // ✅ Hide suggestions on navigation
//   }, [pathname]);

//   const fetchSearchResults = async (query: string) => {
//     try {
//       const response = await axios.get(`${ApiBaseUrl.baseUrl}search/suggestion/${query}`);
//       const results = response.data || [];
//       const uniqueResults = Array.from(new Set(results.map((item) => item.keyword))).map(
//         (keyword) => results.find((item) => item.keyword === keyword)
//       );

//       setResultList(uniqueResults);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       setResultList([]);
//     }
//   };

//   const search = debounce((value: string) => {
//     if (!value.trim()) {
//       setResultList([]);
//     } else {
//       fetchSearchResults(value);
//     }
//   }, 300);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setSearchValue(value);
//     search(value);
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter" && searchValue.trim() !== "") {
//       const encodedSearchValue = encodeURIComponent(searchValue.trim());
//       setResultList([]); // ✅ Hide suggestions
//       router.push(`/product/search/${encodedSearchValue}`);
//     }
//   };

//   const handleSearchAction = () => {
//     if (searchValue.trim() !== "") {
//       const encodedSearchValue = encodeURIComponent(searchValue.trim());
//       setResultList([]); // ✅ Hide suggestions
//       router.push(`/product/search/${encodedSearchValue}`);
//     }
//   };

//   const handleSuggestionClick = (item: any) => {
//     const selectedValue = item.keyword || `Product ${item.product_id}`;
//     setSearchValue(selectedValue); // ✅ Keep selected item in input field
//     setResultList([]); // ✅ Hide suggestions
//     router.push(`/product/search/${encodeURIComponent(selectedValue)}`);
//   };

//   return (
//     <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
//       <StyledSearchBox>
//         <TextField
//           fullwidth
//           value={searchValue} // ✅ Keeps selected item visible in input
//           onChange={handleSearchChange}
//           onKeyDown={handleKeyDown}
//           className="search-field"
//           placeholder="Search by Name and Hit Enter"
//         />
//         <Icon onClick={handleSearchAction} className="search-icon" size="18px">
//           search
//         </Icon>
//       </StyledSearchBox>

//       {!!resultList.length && (
//         <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
//           {resultList.map((item: any, index: number) => (
//             <MenuItem key={index} onClick={() => handleSuggestionClick(item)}>
//               <Span fontSize="14px">{item.keyword || `Product ${item.product_id}`}</Span>
//             </MenuItem>
//           ))}
//         </Card>
//       )}
//     </Box>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import Box from "@component/Box";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import MenuItem from "@component/MenuItem";
import { Span } from "@component/Typography";
import TextField from "@component/text-field";
import StyledSearchBox from "./styled";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ApiBaseUrl from "api/ApiBaseUrl";

export default function SearchInputWithCategory() {
 const [resultList, setResultList] = useState<any[]>([]);
 const [searchValue, setSearchValue] = useState("");
 const router = useRouter();
 const pathname = usePathname();
 const wrapperRef = useRef<HTMLDivElement>(null); // 🔄 Ref for outside click detection

 //  Extract search term from URL and set as searchValue
 useEffect(() => {
  const pathParts = pathname.split("/");

  if (pathname.startsWith("/product/search/")) {
   const lastPart = decodeURIComponent(pathParts[pathParts.length - 1]);

   if (lastPart && lastPart !== "search") {
    setSearchValue(lastPart);
   }
  } else {
   setSearchValue("");
  }

  setResultList([]);
 }, [pathname]);

 //  Hide dropdown when clicking outside
 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
   if (
    wrapperRef.current &&
    !wrapperRef.current.contains(event.target as Node)
   ) {
    setResultList([]); // Hide suggestions
   }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
   debouncedFetch.cancel();
  };
 }, []);

 //  Fetch search suggestions from Typesense via local API
 const fetchSearchResults = async (query: string) => {
  if (!query) return;
  try {
   const response = await axios.get(
    `${ApiBaseUrl.localApiUrl}search/suggestions`,
    { params: { q: query } }
   );
   const results: any[] = Array.isArray(response.data) ? response.data : [];
   setResultList(results);
  } catch (error) {
   console.error("Error fetching search results:", error);
   setResultList([]);
  }
 };

 // Memoize debounced function in a ref so it is created once per mount,
 // not recreated on every render (which would reset the timer each keystroke).
 const debouncedFetch = useRef(
  debounce((value: string) => {
   fetchSearchResults(value);
  }, 400)
 ).current;

 const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const value = event.target.value;
  setSearchValue(value);

  if (!value.trim()) {
   setResultList([]);
   debouncedFetch.cancel();
  } else {
   debouncedFetch(value);
  }
 };

 const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter" && searchValue.trim() !== "") {
   const encodedSearchValue = encodeURIComponent(searchValue.trim());
   setResultList([]); // Hide suggestions
   router.push(`/product/search/${encodedSearchValue}`);
  }
 };

 const handleSearchAction = () => {
  if (searchValue.trim() !== "") {
   const encodedSearchValue = encodeURIComponent(searchValue.trim());

   setResultList([]); // Hide suggestions
   router.push(`/product/search/${encodedSearchValue}`);
  }
 };

 const handleSuggestionClick = (item: any) => {
  const selectedValue = item.name || `Product ${item.name}`;
  setSearchValue(selectedValue);
  setResultList([]); // Hide suggestions
  router.push(`/product/search/${encodeURIComponent(selectedValue)}`);
 };

 return (
  <Box
   ref={wrapperRef}
   position="relative"
   flex="1 1 0"
   maxWidth="670px"
   mx="auto"
  >
   <StyledSearchBox>
    <TextField
     fullwidth
     value={searchValue}
     onChange={handleSearchChange}
     onKeyDown={handleKeyDown}
     className="search-field"
     placeholder="Search by product Name"
    />
    <Icon onClick={handleSearchAction} className="search-icon" size="18px">
     search
    </Icon>
   </StyledSearchBox>

   {!!resultList.length && (
    <Card
     position="absolute"
     top="100%"
     py="0.5rem"
     width="100%"
     boxShadow="large"
     zIndex={99}
    >
     {resultList.map((item: any, index: number) => (
      <MenuItem key={index} onClick={() => handleSuggestionClick(item)}>
       <Span fontSize="14px">{`${item.name} `}</Span>
      </MenuItem>
     ))}
    </Card>
   )}
  </Box>
 );
}
