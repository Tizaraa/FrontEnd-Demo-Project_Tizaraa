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

import { Fragment, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ApiBaseUrl from "api/ApiBaseUrl";

// Example searches shown in the placeholder while the box is empty
const HINTS = ["phones", "shoes", "watches", "bags", "headphones", "laptops"];

const hintIn = keyframes`
 from { opacity: 0; transform: translateY(8px); }
 to { opacity: 1; transform: none; }
`;
const dropIn = keyframes`
 from { opacity: 0; transform: translateY(-6px); }
 to { opacity: 1; transform: none; }
`;

const Wrap = styled.div`
 position: relative;
 flex: 1 1 0;
 width: 100%;
 max-width: 680px;
 margin: 0 auto;

 .sb-box {
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  padding: 4px 4px 4px 0;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.mist};
  transition: border-color 200ms ease, background-color 200ms ease, box-shadow 240ms ease;
 }
 .sb-box:hover {
  border-color: #cfd4dd;
 }
 .sb-box.is-focus {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.paper};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.12), 0 8px 24px rgba(14, 52, 96, 0.08);
 }

 .sb-lead {
  display: inline-flex;
  padding: 0 10px 0 18px;
  color: ${({ theme }) => theme.tz.color.slate};
  transition: color 200ms ease;
 }
 .sb-box.is-focus .sb-lead {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .sb-lead svg,
 .sb-go svg,
 .sb-row svg {
  width: 18px;
  height: 18px;
 }

 .sb-field {
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  height: 100%;
 }
 /* inner field is invisible: the pill (.sb-box) draws border + focus glow.
    !important beats the site-wide input / input:focus styles. */
 .sb-box .sb-input,
 .sb-box .sb-input:focus,
 .sb-box .sb-input:focus-visible,
 .sb-box .sb-input:hover {
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent !important;
  border-radius: 0 !important;
 }
 .sb-input::-webkit-search-decoration,
 .sb-input::-webkit-search-cancel-button,
 .sb-input::-webkit-search-results-button,
 .sb-input::-webkit-search-results-decoration {
  -webkit-appearance: none;
  appearance: none;
 }
 .sb-input {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.tz.color.ink};
  font-family: inherit;
  font-size: 15px;
 }
 .sb-hint {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  gap: 5px;
  overflow: hidden;
  color: ${({ theme }) => theme.tz.color.slate};
  font-size: 15px;
  white-space: nowrap;
  pointer-events: none;
 }
 .sb-box.is-focus .sb-hint {
  opacity: 0.55;
 }
 .sb-hint b {
  display: inline-block;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  animation: ${hintIn} 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }

 .sb-kbd {
  margin: 0 10px;
  padding: 2px 8px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-bottom-width: 2px;
  border-radius: 6px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.slate};
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  line-height: 1.4;
 }
 .sb-box.is-focus .sb-kbd {
  display: none;
 }

 .sb-go {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 100%;
  min-width: 56px;
  padding: 0 18px;
  border: 0;
  border-radius: 999px;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(194, 64, 15, 0.28);
  transition: transform 180ms ease, box-shadow 180ms ease, filter 180ms ease;
 }
 .sb-go:hover {
  transform: translateY(-1px);
  filter: brightness(1.05);
  box-shadow: 0 8px 18px rgba(194, 64, 15, 0.34);
 }
 .sb-go:active {
  transform: none;
 }
 .sb-go:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .sb-list {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 99;
  margin: 0;
  padding: 6px;
  list-style: none;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 16px;
  background: ${({ theme }) => theme.tz.color.paper};
  box-shadow: 0 18px 40px rgba(14, 52, 96, 0.14);
  animation: ${dropIn} 220ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .sb-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 10px;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font-size: 14px;
  cursor: pointer;
 }
 .sb-row svg {
  flex-shrink: 0;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .sb-row .sb-arrow {
  margin-left: auto;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 160ms ease, transform 160ms ease;
 }
 .sb-row.is-active {
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .sb-row.is-active svg {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .sb-row.is-active .sb-arrow {
  opacity: 1;
  transform: none;
 }
 .sb-row mark {
  background: none;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-weight: 700;
 }
 .sb-name {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
 }

 @media only screen and (max-width: 900px) {
  .sb-box {
   height: 42px;
  }
  .sb-kbd,
  .sb-go span {
   display: none;
  }
  .sb-go {
   padding: 0 14px;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .sb-hint b,
  .sb-list {
   animation: none;
  }
  .sb-box,
  .sb-go,
  .sb-row .sb-arrow {
   transition: none;
  }
 }
`;

const SearchSvg = () => (
 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <circle cx="11" cy="11" r="7" />
  <path d="m20 20-3.5-3.5" />
 </svg>
);
const ArrowSvg = () => (
 <svg className="sb-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d="M7 17 17 7M8 7h9v9" />
 </svg>
);

// Bold the part of a suggestion that matches what the user typed
function highlight(text: string, query: string) {
 const q = query.trim();
 if (!q) return text;
 const at = text.toLowerCase().indexOf(q.toLowerCase());
 if (at < 0) return text;
 return (
  <Fragment>
   {text.slice(0, at)}
   <mark>{text.slice(at, at + q.length)}</mark>
   {text.slice(at + q.length)}
  </Fragment>
 );
}

export default function SearchInputWithCategory() {
 const [resultList, setResultList] = useState<any[]>([]);
 const [searchValue, setSearchValue] = useState("");
 const [focused, setFocused] = useState(false);
 const [active, setActive] = useState(-1);
 const [hint, setHint] = useState(0);
 const router = useRouter();
 const pathname = usePathname();
 const wrapperRef = useRef<HTMLDivElement>(null); // 🔄 Ref for outside click detection
 const inputRef = useRef<HTMLInputElement>(null);

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

 // "/" anywhere on the page jumps to search (not while typing in another field)
 useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
   if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
   const t = e.target as HTMLElement;
   if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
   e.preventDefault();
   inputRef.current?.focus();
  };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
 }, []);

 // Rotate the example word while the box is empty; frozen for reduced motion
 useEffect(() => {
  if (searchValue || focused) return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const id = window.setInterval(() => {
   if (document.visibilityState === "visible") setHint((h) => (h + 1) % HINTS.length);
  }, 2400);
  return () => window.clearInterval(id);
 }, [searchValue, focused]);

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
   setActive(-1);
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

 const go = (term: string) => {
  const t = term.trim();
  if (!t) return;
  debouncedFetch.cancel();
  setResultList([]); // Hide suggestions
  setActive(-1);
  inputRef.current?.blur();
  router.push(`/product/search/${encodeURIComponent(t)}`);
 };

 const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "ArrowDown" && resultList.length) {
   event.preventDefault();
   setActive((i) => (i + 1) % resultList.length);
  } else if (event.key === "ArrowUp" && resultList.length) {
   event.preventDefault();
   setActive((i) => (i <= 0 ? resultList.length - 1 : i - 1));
  } else if (event.key === "Escape") {
   setResultList([]);
   setActive(-1);
  } else if (event.key === "Enter") {
   if (active >= 0 && resultList[active]) {
    handleSuggestionClick(resultList[active]);
   } else {
    go(searchValue);
   }
  }
 };

 const handleSuggestionClick = (item: any) => {
  const selectedValue = item.name || `Product ${item.name}`;
  setSearchValue(selectedValue);
  go(selectedValue);
 };

 const open = resultList.length > 0;

 return (
  <Wrap ref={wrapperRef}>
   <div className={`sb-box${focused ? " is-focus" : ""}`} role="search">
    <span className="sb-lead">
     <SearchSvg />
    </span>
    <div className="sb-field">
     <input
      ref={inputRef}
      className="sb-input"
      type="search"
      value={searchValue}
      onChange={handleSearchChange}
      onKeyDown={handleKeyDown}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label="Search products"
      role="combobox"
      aria-expanded={open}
      aria-controls="sb-suggestions"
      aria-autocomplete="list"
      aria-activedescendant={active >= 0 ? `sb-opt-${active}` : undefined}
      autoComplete="off"
     />
     {!searchValue && (
      <span className="sb-hint" aria-hidden="true">
       Search for <b key={hint}>{HINTS[hint]}</b>…
      </span>
     )}
    </div>
    <kbd className="sb-kbd" title="Press / to search">/</kbd>
    <button type="button" className="sb-go" onClick={() => go(searchValue)} aria-label="Search">
     <SearchSvg />
     <span>Search</span>
    </button>
   </div>

   {open && (
    <ul className="sb-list" id="sb-suggestions" role="listbox">
     {resultList.map((item: any, index: number) => (
      <li
       key={index}
       id={`sb-opt-${index}`}
       role="option"
       aria-selected={index === active}
       className={`sb-row${index === active ? " is-active" : ""}`}
       onMouseEnter={() => setActive(index)}
       onMouseDown={(e) => e.preventDefault()}
       onClick={() => handleSuggestionClick(item)}
      >
       <SearchSvg />
       <span className="sb-name">{highlight(String(item.name ?? ""), searchValue)}</span>
       <ArrowSvg />
      </li>
     ))}
    </ul>
   )}
  </Wrap>
 );
}
