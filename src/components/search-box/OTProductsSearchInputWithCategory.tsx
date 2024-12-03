'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { debounce } from "lodash";
import axios from "axios";
import Box from "@component/Box";
import Menu from "@component/Menu";
import Card from "@component/Card";
import Icon from "@component/icon/Icon";
import MenuItem from "@component/MenuItem";
import { Span } from "@component/Typography";
import TextField from "@component/text-field";
import StyledSearchBox from "./styled";
import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import ApiBaseUrl from "api/ApiBaseUrl";

export default function OTProductsSearchInputWithCategory({ slug }) {
  const [resultList, setResultList] = useState<any[]>([]);
  const [category, setCategory] = useState("All Categories");
  const [categories, setCategories] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [framePosition, setFramePosition] = useState(0);

  const pageSize = 100;

  // useEffect(() => {
  //   if (pathname.startsWith("/product/search")) {
  //     const searchTerm = pathname.split("/").pop();
  //     setSearchValue(decodeURIComponent(searchTerm));
  //     console.log("Search term from URL:", searchTerm);
  //   }
  // }, [pathname]);

  const fetchSearchResults = async (query: string) => {
    setLoading(framePosition === 0);
    setLoadingMore(framePosition > 0);

    try {
      const response = await axios.post(
        `${ApiBaseUrl.baseUrl}otpi/items`,
        {
          xmlParameters: `<SearchItemsParameters><ItemTitle>${query}</ItemTitle></SearchItemsParameters>`,
          framePosition,
          frameSize: pageSize,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const results = response.data?.Result?.Items?.Content || [];
      console.log("Search Results:", results);
      setResultList(results);
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

OTProductsSearchInputWithCategory
const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "Enter") {
    router.push(`/OtProductSearch/search/${encodeURIComponent(searchValue.trim())}`);
    setResultList([]);
  }
};

  const handleDocumentClick = () => setResultList([]); 

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick); 
    return () => window.removeEventListener("click", handleDocumentClick); 
  }, []);

  useEffect(() => {
    if (searchValue) {
      fetchSearchResults(searchValue); 
    } else {
      setResultList([]); 
    }
  }, [searchValue]);

  return (
    <Box position="relative" flex="1 1 0" maxWidth="500px" mx="auto">
      <StyledSearchBox>
        <Icon className="search-icon" size="18px">search</Icon>
        <TextField
          fullwidth
          value={searchValue} 
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="search-field"
          placeholder="Search by name and hit enter..."
        />
      </StyledSearchBox>

      {!!resultList.length && (
        <Card position="absolute" top="100%" py="0.5rem" width="100%" boxShadow="large" zIndex={99} style={{maxHeight: '220px', overflowY: 'auto'}}>
          {resultList.map((item: any, index: number) => (
            <Link href={`/otproducts/${item.Id}`} key={index}>
              <MenuItem onClick={() => {
                setSearchValue(item.keyword || `Product ${item.Title}`);
                setResultList([]); 
              }}>
                <Span fontSize="14px">{item.keyword || `${item.Title}`}</Span>
              </MenuItem>
            </Link>
          ))}
        </Card>
      )}
    </Box>
  );
}
