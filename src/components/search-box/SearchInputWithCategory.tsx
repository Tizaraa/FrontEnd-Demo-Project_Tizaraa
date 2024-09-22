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
//         const response = await axios.get("https://tizaraa.com/api/frontend/home/categorie/all");
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




import { useCallback, useEffect, useState } from "react";
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

export default function SearchInputWithCategory() {
  const [resultList, setResultList] = useState<any[]>([]);
  const [category, setCategory] = useState("All Categories");
  const [categories, setCategories] = useState<any[]>([]);

  const handleCategoryChange = (cat: string) => () => setCategory(cat);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://tizaraa.com/api/categories");
      setCategories(response.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSearchResults = async (query: string) => {
    try {
      const response = await axios.get(`https://tizaraa.com/api/search/suggestion/${query}`);
      const results = response.data || [];
      
      // Use a Set to filter duplicates by keyword
      const uniqueResults = Array.from(new Set(results.map(item => item.keyword)))
        .map(keyword => results.find(item => item.keyword === keyword));
      
      setResultList(uniqueResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResultList([]);
    }
  };

  const search = debounce((e: any) => {
    const value = e.target?.value;
    if (!value) {
      setResultList([]);
    } else {
      fetchSearchResults(value);
    }
  }, 300);
  

  const handleSearch = useCallback((event: any) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    fetchCategories();
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px">
          search
        </Icon>

        <TextField
          fullwidth
          onChange={handleSearch}
          className="search-field"
          placeholder="Search and hit enter..."
       
        />

        <Menu
          direction="right"
          className="category-dropdown"
          handler={
            <FlexBox className="dropdown-handler" alignItems="center">
              <span>{category}</span>
              <Icon variant="small">chevron-down</Icon>
            </FlexBox>
          }
        >
          {categories.map((item) => (
            <MenuItem key={item.id} onClick={handleCategoryChange(item.title)}>
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </StyledSearchBox>

      {!!resultList.length && (
        <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99}>
          {resultList.map((item: any, index: number) => (
            <Link 
              href={`/product/search/${item.keyword || item.product_id}`} 
              key={index}
            >
              <MenuItem key={item.id}>
                <Span fontSize="14px">{item.keyword || `Product ${item.product_id}`}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
}
