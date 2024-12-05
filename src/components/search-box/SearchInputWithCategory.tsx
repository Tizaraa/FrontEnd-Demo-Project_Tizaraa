// import { useCallback, useEffect, useState } from "react";
// import Link from "next/link";
// import { debounce } from "lodash";

// import Box from "@component/Box";
// import Menu from "@component/Menu";
// import Card from "@component/Card";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import MenuItem from "@component/MenuItem";
// import { Span } from "@component/Typography";
// import TextField from "@component/text-field";
// import StyledSearchBox from "./styled";

// export default function SearchInputWithCategory() {
//   const [resultList, setResultList] = useState<string[]>([]);
//   const [category, setCategory] = useState("All Categories");

//   const handleCategoryChange = (cat: string) => () => setCategory(cat);

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
//       <StyledSearchBox>
//         <Icon className="search-icon" size="18px">
//           search
//         </Icon>

//         <TextField
//           fullwidth
//           onChange={hanldeSearch}
//           className="search-field"
//           placeholder=" enter..."
//         />

//         <Menu
//           direction="right"
//           className="category-dropdown"
//           handler={
//             <FlexBox className="dropdown-handler" alignItems="center">
//               <span>{category}</span>
//               <Icon variant="small">chevron-down</Icon>
//             </FlexBox>
//           }>
//           {categories.map((item) => (
//             <MenuItem key={item} onClick={handleCategoryChange(item)}>
//               {item}
//             </MenuItem>
//           ))}
//         </Menu>
//       </StyledSearchBox>

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

// const categories = [
//   "All Categories",
//   "Car",
//   "Clothes",
//   "Electronics",
//   "Laptop",
//   "Desktop",
//   "Camera",
//   "Toys"
// ];

// const dummySearchResult = ["Macbook Air 13", "Ksus K555LA", "Acer Aspire X453", "iPad Mini 3"];


// import { useCallback, useEffect, useState } from "react";
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

// export default function SearchInputWithCategory() {
//   const [resultList, setResultList] = useState<string[]>([]);
//   const [category, setCategory] = useState("All Categories");
//   const [categories, setCategories] = useState<string[]>([]); // State for fetched categories

//   const handleCategoryChange = (cat: string) => () => setCategory(cat);

//   // API
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("https://frontend.tizaraa.com/api/frontend/home/categorie/all");
//         setCategories(response.data); 
//       } catch (error) {
//         console.error("Failed to fetch categories", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const search = debounce((e) => {
//     const value = e.target?.value;

//     if (!value) {
//       setResultList([]);
//     } else if (category === "All Categories") {
//       setResultList(categories.map((cat: any) => cat.categorie_name)); 
//     } else {
     
//       setResultList([]); 
//     }
//   }, 200);

//   const hanldeSearch = useCallback((event: any) => {
//     event.persist();
//     search(event);
//   }, [category, categories]);

//   const handleDocumentClick = () => setResultList([]);

//   useEffect(() => {
//     window.addEventListener("click", handleDocumentClick);
//     return () => window.removeEventListener("click", handleDocumentClick);
//   }, []);

//   return (
//     <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
//       <StyledSearchBox>
//         <Icon className="search-icon" size="18px">
//           search
//         </Icon>

//         <TextField
//           fullwidth
//           onChange={hanldeSearch}
//           className="search-field"
//           placeholder="Search and hit enter..."
//         />

//         <Menu
//           direction="right"
//           className="category-dropdown"
//           handler={
//             <FlexBox className="dropdown-handler" alignItems="center">
//               <span>{category}</span>
//               <Icon variant="small">chevron-down</Icon>
//             </FlexBox>
//           }>
//           {categories.map((item: any) => (
//             <MenuItem key={item.categorie_name} onClick={handleCategoryChange(item.categorie_name)}>
//               {item.categorie_name}
//             </MenuItem>
//           ))}
//         </Menu>
//       </StyledSearchBox>

//       {!!resultList.length && (
//         <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>

//           {/* for search box  */}

//           {/* {resultList.map((item) => (
//             // {`/product/search/${item}`} 
//             <Link href="#" key={item}>
//               <MenuItem key={item}>
//                 <Span fontSize="14px">{item}</Span>
//               </MenuItem>
//             </Link>
//           ))} */}
          
//         </Card>
//       )}
//     </Box>
//   );
// }




// import { useCallback, useEffect, useState } from "react";
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

// export default function SearchInputWithCategory() {
//   const [resultList, setResultList] = useState<any[]>([]);
//   const [category, setCategory] = useState("All Categories");
//   const [categories, setCategories] = useState<any[]>([]);

//   const handleCategoryChange = (cat: string) => () => setCategory(cat);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("https://frontend.tizaraa.com/api/categories");
//       setCategories(response.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchSearchResults = async (query: string) => {
//     try {
//       const response = await axios.get(`https://frontend.tizaraa.com/api/search/suggestion/${query}`);
//       const results = response.data || [];
      
//       // Use a Set to filter duplicates by keyword
//       const uniqueResults = Array.from(new Set(results.map(item => item.keyword)))
//         .map(keyword => results.find(item => item.keyword === keyword));
      
//       setResultList(uniqueResults);
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       setResultList([]);
//     }
//   };

//   const search = debounce((e: any) => {
//     const value = e.target?.value;
//     if (!value) {
//       setResultList([]);
//     } else {
//       fetchSearchResults(value);
//     }
//   }, 300);
  

//   const handleSearch = useCallback((event: any) => {
//     event.persist();
//     search(event);
//   }, []);

//   const handleDocumentClick = () => setResultList([]);

//   useEffect(() => {
//     fetchCategories();
//     window.addEventListener("click", handleDocumentClick);
//     return () => window.removeEventListener("click", handleDocumentClick);
//   }, []);

//   return (
//     <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
//       <StyledSearchBox>
//         <Icon className="search-icon" size="18px">
//           search
//         </Icon>

//         <TextField
//           fullwidth
//           onChange={handleSearch}
//           className="search-field"
//           placeholder="Search and hit enter..."
       
//         />

//         <Menu
//           direction="right"
//           className="category-dropdown"
//           handler={
//             <FlexBox className="dropdown-handler" alignItems="center">
//               <span>{category}</span>
//               <Icon variant="small">chevron-down</Icon>
//             </FlexBox>
//           }
//         >
//           {categories.map((item) => (
//             <MenuItem key={item.id} onClick={handleCategoryChange(item.title)}>
//               {item.title}
//             </MenuItem>
//           ))}
//         </Menu>
//       </StyledSearchBox>

//       {!!resultList.length && (
//         <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
//           {resultList.map((item: any, index: number) => (
//             <Link 
//               href={`/product/search/${item.keyword || item.product_id}`} 
//               key={index}
//             >
//               <MenuItem key={item.id}>
//                 <Span fontSize="14px">{item.keyword || `Product ${item.product_id}`}</Span>
//               </MenuItem>
//             </Link>
//           ))}
//         </Card>
//       )}
//     </Box>
//   );
// }




// import { useCallback, useEffect, useState } from "react";
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

// export default function SearchInputWithCategory() {
//   const [resultList, setResultList] = useState<any[]>([]);
//   const [category, setCategory] = useState("All Categories");
//   const [categories, setCategories] = useState<any[]>([]);
//   const [searchValue, setSearchValue] = useState(() => {
//     // Get the search value from local storage when the component is loaded
//     return localStorage.getItem("searchValue") || "";
//   });

//   const handleCategoryChange = (cat: string) => () => setCategory(cat);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("https://frontend.tizaraa.com/api/categories");
//       setCategories(response.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchSearchResults = async (query: string) => {
//     try {
//       const response = await axios.get(`https://frontend.tizaraa.com/api/search/suggestion/${query}`);
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
//       fetchSearchResults(searchValue);
//       setResultList([]);
//     }
//   };

//   const handleSuggestionClick = (keyword: string) => {
//     setSearchValue(keyword);
//     localStorage.setItem("searchValue", keyword); 
//     setResultList([]);
//   };

//   const handleDocumentClick = () => setResultList([]);

//   useEffect(() => {
//     fetchCategories();
//     window.addEventListener("click", handleDocumentClick);
//     return () => window.removeEventListener("click", handleDocumentClick);
//   }, []);

//   return (
//     <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
//       <StyledSearchBox>
//         <Icon className="search-icon" size="18px">
//           search
//         </Icon>

//         <TextField
//           fullwidth
//           value={searchValue} 
//           onChange={handleSearchChange}
//           onKeyDown={handleKeyDown}
//           className="search-field"
//           placeholder="Search and hit enter"
//         />

//         <Menu
//           direction="right"
//           className="category-dropdown"
//           handler={
//             <FlexBox className="dropdown-handler" alignItems="center">
//               <span>{category}</span>
//               <Icon variant="small">chevron-down</Icon>
//             </FlexBox>
//           }
//         >
//           {categories.map((item) => (
//             <MenuItem key={item.id} onClick={handleCategoryChange(item.title)}>
//               {item.title}
//             </MenuItem>
//           ))}
//         </Menu>
//       </StyledSearchBox>

//       {!!resultList.length && (
//         <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
//           {resultList.map((item: any, index: number) => (
//             <Link 
//               href={`/product/search/${item.keyword || item.product_id}`} 
//               key={index}
//             >
//               <MenuItem
//                 onClick={() => handleSuggestionClick(item.keyword || `Product ${item.product_id}`)}
//               >
//                 <Span fontSize="14px">{item.keyword || `Product ${item.product_id}`}</Span>
//               </MenuItem>
//             </Link>
//           ))}
//         </Card>
//       )}
//     </Box>
//   );
// }

// =====================


// import { useCallback, useEffect, useState } from "react";
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
// import { useRouter } from 'next/navigation'


// export default function SearchInputWithCategory() {
//   const [resultList, setResultList] = useState<any[]>([]);
//   const [category, setCategory] = useState("All Categories");
//   const [categories, setCategories] = useState<any[]>([]);
//   const [searchValue, setSearchValue] = useState("");
//   const router = useRouter();  // Use Next.js router for navigation
//   const handleCategoryChange = (cat: string) => () => setCategory(cat);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("https://frontend.tizaraa.com/api/categories");
//       setCategories(response.data || []);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const fetchSearchResults = async (query: string) => {
//     try {
//       const response = await axios.get(`https://frontend.tizaraa.com/api/search/suggestion/${query}`);
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

//   // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//   //   if (event.key === "Enter") {
//   //     fetchSearchResults(searchValue);
//   //     setResultList([]);
//   //   }
//   // };
//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === "Enter") {
//       // Navigate to the search results page with the search value
//       router.push(`/product/search/${searchValue.trim()}`);
//       setResultList([]);
//     }
//   };

//   const handleDocumentClick = () => setResultList([]);

//   useEffect(() => {
//     fetchCategories();
//     const { query } = router;

//   // If the URL has a search query, set it as the search value
//   if (query && query.search) {
//     setSearchValue(query.search);
//   }


//     window.addEventListener("click", handleDocumentClick);
//     return () => window.removeEventListener("click", handleDocumentClick);
//   }, []);

//   return (
//     <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
//       <StyledSearchBox>
//         <Icon className="search-icon" size="18px">
//           search
//         </Icon>

//         <TextField
//           fullWidth
//           value={searchValue} 
//           onChange={handleSearchChange}
//           onKeyDown={handleKeyDown}
//           className="search-field"
//           placeholder="Search and hit enter..."
          
//         />

//         <Menu
//           direction="right"
//           className="category-dropdown"
//           handler={
//             <FlexBox className="dropdown-handler" alignItems="center">
//               <span>{category}</span>
//               <Icon variant="small">chevron-down</Icon>
//             </FlexBox>
//           }
//         >
//           {categories.map((item) => (
//             <MenuItem key={item.id} onClick={handleCategoryChange(item.title)}>
//               {item.title}
//             </MenuItem>
//           ))}
//         </Menu>
//       </StyledSearchBox>

//       {!!resultList.length && (
//         <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
//           {resultList.map((item: any, index: number) => (
//             <Link 
//               href={`/product/search/${item.keyword || item.product_id}`} 
//               key={index}
//             >
//               <MenuItem
//                 onClick={() => {
//                   setSearchValue(item.keyword || `Product ${item.product_id}`); // Set selected suggestion in input
//                   setResultList([]);  // Clear the result list after selection
//                 }}
//               >
//                 <Span fontSize="14px">{item.keyword || `Product ${item.product_id}`}</Span>
//               </MenuItem>
//             </Link>
//           ))}
//         </Card>
//       )}
//     </Box>
//   );
// }

'use client'
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
// import { useRouter } from 'next/router';

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
      setSearchValue(decodeURIComponent(searchTerm)); // Set the search value
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
      router.push(`/product/search/${searchValue.trim()}`);
      setResultList([]);
    }
  };

  const handleSearchAction = () => {
    if (searchValue.trim() !== "") {
      router.push(`/product/search/${searchValue.trim()}`);
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
  }, []);


  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
     
        <TextField
          fullwidth
          value={searchValue} 
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="search-field"
          placeholder="Search By Name and Hit Enter"
        />
          
          <Icon onClick={handleSearchAction} className="search-icon" size="18px">search</Icon>
      </StyledSearchBox>

      {!!resultList.length && (
        <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
          {resultList.map((item: any, index: number) => (
            <Link href={`/product/search/${item.keyword || item.product_id}`} key={index}>
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
