// 'use client'
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { debounce } from "lodash";
// import axios from "axios";
// import Box from "@component/Box";
// import Menu from "@component/Menu";
// import Card from "@component/Card";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import MenuItem from "@component/MenuItem";
// import { Span } from "@component/Typography";
// import TextField from "@component/text-field";
// import StyledSearchBox from "./styled";
// import { useRouter } from 'next/navigation';
// import { usePathname, useSearchParams } from "next/navigation";
// import ApiBaseUrl from "api/ApiBaseUrl";
// import ResponsiveCategory from "app/(layout-3)/product/[slug]/ResponsiveCategory";
// // import { useRouter } from 'next/router';

// export default function SearchInputWithCategory() {
//   const [resultList, setResultList] = useState<any[]>([]);
//   const [category, setCategory] = useState("All Categories");
//   const [categories, setCategories] = useState<any[]>([]);
//   const [searchValue, setSearchValue] = useState("");
//   const router = useRouter();
//   const pathname = usePathname(); // Get the current pathname

//   useEffect(() => {
//     // Check if the current pathname is for search
//     if (pathname.startsWith("/product/search")) {
//       const searchTerm = pathname.split("/").pop(); // Get the last segment of the path
//       setSearchValue(decodeURIComponent(searchTerm)); // Set the search value
//       console.log("Search term from URL:", searchTerm);
//     }
//   }, [pathname]);


//   const handleCategoryChange = (cat: string) => () => setCategory(cat);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get(`${ApiBaseUrl.baseUrl}categories`);
//       setCategories(response.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchSearchResults = async (query: string) => {
//     try {
//       const response = await axios.get(`${ApiBaseUrl.baseUrl}search/suggestion/${query}`);
//       const results = response.data || [];
//       const uniqueResults = Array.from(new Set(results.map(item => item.keyword)))
//         .map(keyword => results.find(item => item.keyword === keyword));

//       setResultList(uniqueResults);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       setResultList([]);
//     }
//   };

//   const search = debounce((value: string) => {
//     if (!value) {
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
//     if (event.key === "Enter") {
//       router.push(`/product/search/${searchValue.trim()}`);
//       setResultList([]);
//     }
//   };

//   const handleSearchAction = () => {
//     if (searchValue.trim() !== "") {
//       router.push(`/product/search/${searchValue.trim()}`);
//     }
//   };

//   const handleDocumentClick = () => setResultList([]);



//   useEffect(() => {
//     fetchCategories();



//     window.addEventListener("click", handleDocumentClick);
//     return () => window.removeEventListener("click", handleDocumentClick);
//   }, [router]);

//   useEffect(() => {
//     // Fetch search results whenever searchValue changes
//     if (searchValue) {
//       fetchSearchResults(searchValue);
//     } else {
//       setResultList([]);
//     }
//   }, []);


//   return (
//     <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
//       <StyledSearchBox>
     
//         <TextField
//           fullwidth
//           value={searchValue} 
//           onChange={handleSearchChange}
//           onKeyDown={handleKeyDown}
//           className="search-field"
//           placeholder="Search by Name and Hit Enter"
//         />
          
//           <Icon onClick={handleSearchAction} className="search-icon" size="18px">search</Icon>
//       </StyledSearchBox>

//       {!!resultList.length && (
//         <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
//           {resultList.map((item: any, index: number) => (
//             <Link href={`/product/search/${item.keyword || item.product_id}`} key={index}>
//               <MenuItem onClick={() => {
//                 setSearchValue(item.keyword || `Product ${item.product_id}`);
//                 setResultList([]);
//               }}>
//                 <Span fontSize="14px">{item.keyword || `Product ${item.product_id}`}</Span>
//               </MenuItem>
//             </Link>
//           ))}
//         </Card>
//       )}
//     </Box>

//   );
// }


import { useEffect, useState } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import axios from "axios";
import Box from "@component/Box";
import Menu from "@component/Menu";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import MenuItem from "@component/MenuItem";
import { Span } from "@component/Typography";
import TextField from "@component/text-field";
import StyledSearchBox from "./styled";
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from "next/navigation";
import ApiBaseUrl from "api/ApiBaseUrl";
import ResponsiveCategory from "app/(layout-3)/product/[slug]/ResponsiveCategory";

export default function SearchInputWithCategory() {
  const [resultList, setResultList] = useState<any[]>([]);
  const [category, setCategory] = useState("All Categories");
  const [categories, setCategories] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    // Check if the current pathname is for search
    if (pathname.startsWith("/product/search")) {
      const searchTerm = pathname.split("/").pop(); // Get the last segment of the path
      setSearchValue(decodeURIComponent(searchTerm || "")); // Decode the search term
      console.log("Search term from URL:", searchTerm);
    }
  }, [pathname]);

  const handleCategoryChange = (cat: string) => () => setCategory(cat);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${ApiBaseUrl.baseUrl}categories`);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSearchResults = async (query: string) => {
    try {
      const response = await axios.get(`${ApiBaseUrl.baseUrl}search/suggestion/${query}`);
      const results = response.data || [];
      const uniqueResults = Array.from(new Set(results.map(item => item.keyword)))
        .map(keyword => results.find(item => item.keyword === keyword));

      setResultList(uniqueResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResultList([]);
    }
  };

  const search = debounce((value: string) => {
    if (!value) {
      setResultList([]);
    } else {
      fetchSearchResults(value);
    }
  }, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    search(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const encodedSearchValue = encodeURIComponent(searchValue.trim()); // Encode the search term
      router.push(`/product/search/${encodedSearchValue}`);
      setResultList([]);
    }
  };

  const handleSearchAction = () => {
    if (searchValue.trim() !== "") {
      const encodedSearchValue = encodeURIComponent(searchValue.trim()); // Encode the search term
      router.push(`/product/search/${encodedSearchValue}`);
    }
  };

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    fetchCategories();
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, [router]);

  useEffect(() => {
    // Fetch search results whenever searchValue changes
    if (searchValue) {
      fetchSearchResults(searchValue);
    } else {
      setResultList([]);
    }
  }, [searchValue]);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <TextField
          fullwidth
          value={searchValue}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="search-field"
          placeholder="Search by Name and Hit Enter"
        />
        <Icon onClick={handleSearchAction} className="search-icon" size="18px">search</Icon>
      </StyledSearchBox>

      {!!resultList.length && (
        <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
          {resultList.map((item: any, index: number) => (
            <Link href={`/product/search/${encodeURIComponent(item.keyword || item.product_id)}`} key={index}>
              <MenuItem onClick={() => {
                setSearchValue(item.keyword || `Product ${item.product_id}`);
                setResultList([]);
              }}>
                <Span fontSize="14px">{item.keyword || `Product ${item.product_id}`}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
}
