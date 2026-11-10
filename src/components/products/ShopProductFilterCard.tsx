"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import axios from "@lib/axiosClient";
import ApiBaseUrl from "api/ApiBaseUrl";

type Brand = {
 id: number;
 brand_name: string;
};

type Category = {
 id: number;
 categorie_name: string;
};

type Country = {
 id: number;
 location: string;
};

type Province = {
 id: number;
 province: string;
 price: string;
 status: number;
};

type ShopProductFilterCardProps = {
 onBrandChange: (brands: number[]) => void;
 onCategoryChange: (categories: number[]) => void;
 onCountryChange: (countryIds: number[]) => void;
 onProvinceChange: (provinces: number[]) => void;
 slug: string;
 pageType?: string;
};

// ==============================================================
// Styles
// ==============================================================

const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;

const shimmer = keyframes`
 from { background-position: -300px 0; }
 to { background-position: 300px 0; }
`;

const EmptyNote = styled.p`
 display: flex;
 align-items: center;
 gap: 8px;
 margin: 0;
 padding: 12px 14px;
 border: 1px dashed ${({ theme }) => theme.tz.color.line};
 border-radius: 14px;
 font-size: 13px;
 color: ${({ theme }) => theme.tz.color.slate};
 animation: ${rise} 420ms cubic-bezier(0.22, 1, 0.36, 1) backwards;

 @media (prefers-reduced-motion: reduce) {
  animation: none;
 }
`;

const Panel = styled.aside`
 padding: 6px 18px;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 18px;
 background: ${({ theme }) => theme.tz.color.paper};
 animation: ${rise} 420ms cubic-bezier(0.22, 1, 0.36, 1) 80ms backwards;

 .fc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 14px 0 10px;
 }
 .fc-head-title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .fc-head-title svg {
  color: ${({ theme }) => theme.tz.color.ember};
 }
 .fc-clear {
  padding: 4px 10px;
  border: 0;
  border-radius: 999px;
  background: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  animation: ${rise} 260ms cubic-bezier(0.22, 1, 0.36, 1) backwards;
  transition: background-color ${({ theme }) => theme.tz.motion.fast}, color ${({ theme }) => theme.tz.motion.fast};
 }
 .fc-clear:hover {
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDark};
 }
 .fc-clear:focus-visible {
  outline: none;
  border-radius: 999px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .fc-skel {
  height: 14px;
  margin: 0 0 14px;
  border-radius: 999px;
  background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.mist} 0%, ${({ theme }) => theme.tz.color.lineSoft} 50%, ${({ theme }) => theme.tz.color.mist} 100%);
  background-size: 600px 100%;
  animation: ${shimmer} 1.3s linear infinite;
 }

 .fc-section + .fc-section {
  border-top: 1px solid ${({ theme }) => theme.tz.color.lineSoft};
 }

 .fc-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  padding: 14px 0;
  border: 0;
  background: none;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  color: ${({ theme }) => theme.tz.color.ink};
  cursor: pointer;
  transition: color ${({ theme }) => theme.tz.motion.fast};
 }
 .fc-toggle:hover {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .fc-toggle:focus-visible {
  outline: none;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .fc-toggle-label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
 }
 .fc-badge {
  min-width: 20px;
  padding: 1px 7px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-size: 11.5px;
  font-weight: 700;
  text-align: center;
 }
 .fc-chevron {
  flex-shrink: 0;
  color: ${({ theme }) => theme.tz.color.slate};
  transition: transform ${({ theme }) => theme.tz.motion.base}, color ${({ theme }) => theme.tz.motion.fast};
 }
 .fc-toggle:hover .fc-chevron {
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .fc-section.is-open .fc-chevron {
  transform: rotate(180deg);
 }

 /* smooth open/close without measuring heights */
 .fc-collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows ${({ theme }) => theme.tz.motion.base};
 }
 .fc-section.is-open .fc-collapse {
  grid-template-rows: 1fr;
 }
 .fc-collapse-inner {
  min-height: 0;
  overflow: hidden;
 }
 .fc-section:not(.is-open) .fc-collapse-inner {
  visibility: hidden;
  transition: visibility 0s linear 220ms;
 }

 .fc-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 240px;
  margin: 0;
  padding: 0 4px 6px 0;
  overflow-y: auto;
  list-style: none;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.tz.color.line} transparent;
 }

 .fc-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 36px;
  padding: 6px 8px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  font-family: inherit;
  font-size: 13.5px;
  text-align: left;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.tz.motion.fast}, color ${({ theme }) => theme.tz.motion.fast};
 }
 .fc-item:hover {
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .fc-item:focus-visible {
  outline: none;
  border-radius: 10px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .fc-item[aria-checked="true"] {
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  font-weight: 600;
 }

 .fc-box {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 5px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: #fff;
  transition: background-color ${({ theme }) => theme.tz.motion.fast}, border-color ${({ theme }) => theme.tz.motion.fast};
 }
 .fc-box svg {
  opacity: 0;
  transform: scale(0.6);
  transition: opacity ${({ theme }) => theme.tz.motion.fast}, transform ${({ theme }) => theme.tz.motion.fast};
 }
 .fc-item:hover .fc-box {
  border-color: ${({ theme }) => theme.tz.color.slate};
 }
 .fc-item[aria-checked="true"] .fc-box {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.ember};
 }
 .fc-item[aria-checked="true"] .fc-box svg {
  opacity: 1;
  transform: none;
 }

 .fc-name {
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
 }
 .fc-count {
  flex-shrink: 0;
  padding: 1px 8px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.slate};
  font-size: 11.5px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
 }

 .fc-more {
  margin: 2px 0 12px;
  padding: 4px 8px;
  border: 0;
  border-radius: 999px;
  background: none;
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.emberDeep};
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.tz.motion.fast}, color ${({ theme }) => theme.tz.motion.fast};
 }
 .fc-more:hover {
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDark};
 }
 .fc-more:focus-visible {
  outline: none;
  border-radius: 999px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (prefers-reduced-motion: reduce) {
  animation: none;
  .fc-collapse,
  .fc-chevron,
  .fc-item,
  .fc-box,
  .fc-box svg,
  .fc-toggle,
  .fc-more {
   transition: none;
  }
  .fc-section:not(.is-open) .fc-collapse-inner {
   transition: none;
  }
  .fc-clear,
  .fc-skel {
   animation: none;
  }
 }
`;

// ==============================================================
// Pieces (kept outside the main component so open/close can animate)
// ==============================================================

type FilterItem = { id: number; [key: string]: any };

const itemLabel = (item: FilterItem) =>
 item.brand_name || item.categorie_name || item.location || item.province;

// Item counts are shown only when the API sends one
const itemCount = (item: FilterItem): number | null => {
 const raw = item.product_count ?? item.products_count ?? item.count ?? item.total;
 const n = Number(raw);
 return raw !== undefined && raw !== null && raw !== "" && Number.isFinite(n) ? n : null;
};

const FilterOption = ({
 item,
 active,
 onClick,
}: {
 item: FilterItem;
 active: boolean;
 onClick: () => void;
}) => {
 const count = itemCount(item);
 return (
  <li>
   <button type="button" role="checkbox" aria-checked={active} className="fc-item" onClick={onClick}>
    <span className="fc-box" aria-hidden="true">
     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 5 5 9-10" />
     </svg>
    </span>
    <span className="fc-name">{itemLabel(item)}</span>
    {count !== null && <span className="fc-count">{count.toLocaleString("en-US")}</span>}
   </button>
  </li>
 );
};

const FilterSection = ({
 id,
 title,
 items,
 selectedItems,
 showSection,
 setShowSection,
 onClickHandler,
 showAll,
 setShowAll,
}: {
 id: string;
 title: string;
 items: FilterItem[];
 selectedItems: number[];
 showSection: boolean;
 setShowSection: React.Dispatch<React.SetStateAction<boolean>>;
 onClickHandler: (id: number) => void;
 showAll?: boolean;
 setShowAll?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
 if (!items.length) return null;

 const itemsToShow = showAll ? items : items.slice(0, 5);
 const remainingCount = items.length - 5;
 const activeCount = items.filter((i) => selectedItems.includes(i.id)).length;
 const panelId = `shop-filter-${id}`;

 return (
  <div className={`fc-section${showSection ? " is-open" : ""}`}>
   <button
    type="button"
    className="fc-toggle"
    aria-expanded={showSection}
    aria-controls={panelId}
    onClick={() => setShowSection(!showSection)}
   >
    <span className="fc-toggle-label">
     {title}
     {activeCount > 0 && <span className="fc-badge">{activeCount}</span>}
    </span>
    <FiChevronDown className="fc-chevron" size={18} aria-hidden="true" />
   </button>

   <div className="fc-collapse" id={panelId}>
    <div className="fc-collapse-inner">
     <ul className="fc-list" aria-label={title}>
      {itemsToShow.map((item) => (
       <FilterOption
        key={item.id}
        item={item}
        active={selectedItems.includes(item.id)}
        onClick={() => onClickHandler(item.id)}
       />
      ))}
     </ul>

     {items.length > 5 && (
      <button
       type="button"
       className="fc-more"
       onClick={() => setShowAll && setShowAll(!showAll)}
      >
       {showAll ? "Show less" : `+${remainingCount} more`}
      </button>
     )}
    </div>
   </div>
  </div>
 );
};

// ==============================================================
// Card
// ==============================================================

const ShopProductFilterCard: React.FC<ShopProductFilterCardProps> = ({
 onBrandChange,
 onCategoryChange,
 onCountryChange,
 onProvinceChange,
 slug,
 pageType = "shop",
}) => {
 const [brandList, setBrandList] = useState<Brand[]>([]);
 const [categoryList, setCategoryList] = useState<Category[]>([]);
 const [countryList, setCountryList] = useState<Country[]>([]);
 const [provinceList, setProvinceList] = useState<Province[]>([]);
 const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
 const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
 const [selectedCountry, setSelectedCountry] = useState<number[]>([]);
 const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
 const [showAllCategories, setShowAllCategories] = useState(false);
 const [showAllBrands, setShowAllBrands] = useState(false);
 const [showAllCountries, setShowAllCountries] = useState(false);
 const [showAllProvinces, setShowAllProvinces] = useState(false);
 const [loaded, setLoaded] = useState(false);

 // Collapse states
 const [showCategories, setShowCategories] = useState(true);
 const [showBrands, setShowBrands] = useState(true);
 const [showCountries, setShowCountries] = useState(true);
 const [showProvinces, setShowProvinces] = useState(true);

 useEffect(() => {
  const fetchFilters = async () => {
   try {
    let response;
    if (pageType === "default") {
     response = await axios.get(`${ApiBaseUrl.baseUrl}category-filter/${slug}`);
    } else if (pageType === "search") {
     response = await axios.get(`${ApiBaseUrl.baseUrl}search-filter/${slug}`);
    } else if (pageType === "shop") {
     response = await axios.get(`${ApiBaseUrl.baseUrl}shop-filter/${slug}`);
    }

    setBrandList(response.data.brand_filter || []);
    setCategoryList(response.data.category_filter || []);
    setCountryList(response.data.location_filter || []);
    setProvinceList(response.data.province_filter || []);
   } catch (error) {
    console.error("Error fetching filters:", error);
   } finally {
    setLoaded(true);
   }
  };

  fetchFilters();
 }, [slug, pageType]);

 const handleBrandChange = (brandId: number) => {
  const updatedSelectedBrands = selectedBrands.includes(brandId)
   ? selectedBrands.filter((id) => id !== brandId)
   : [brandId];
  setSelectedBrands(updatedSelectedBrands);
  onBrandChange(updatedSelectedBrands);
 };

 const handleCountryChange = (countryId: number) => {
  const updatedCountries = selectedCountry.includes(countryId)
   ? selectedCountry.filter((id) => id !== countryId)
   : [...selectedCountry, countryId];
  setSelectedCountry(updatedCountries);
  onCountryChange(updatedCountries);
 };

 const handleCategoryChange = (categoryId: number) => {
  const updatedSelectedCategories = selectedCategories.includes(categoryId)
   ? selectedCategories.filter((id) => id !== categoryId)
   : [categoryId];
  setSelectedCategories(updatedSelectedCategories);
  onCategoryChange(updatedSelectedCategories);
 };

 const handleProvinceChange = (provinceId: number) => {
  const updatedProvinces = selectedProvinces.includes(provinceId)
   ? selectedProvinces.filter((id) => id !== provinceId)
   : [...selectedProvinces, provinceId];
  setSelectedProvinces(updatedProvinces);
  onProvinceChange(updatedProvinces);
 };

 const provinces = provinceList.filter((p) => p.province && p.province.trim() !== "");
 const hasAny =
  categoryList.length + brandList.length + countryList.length + provinces.length > 0;
 const selectedCount =
  selectedCategories.length + selectedBrands.length + selectedCountry.length + selectedProvinces.length;

 const clearAll = () => {
  setSelectedCategories([]);
  setSelectedBrands([]);
  setSelectedCountry([]);
  setSelectedProvinces([]);
  onCategoryChange([]);
  onBrandChange([]);
  onCountryChange([]);
  onProvinceChange([]);
 };

 // While the filter list loads, show placeholder rows
 if (!loaded) {
  return (
   <Panel aria-busy="true" aria-label="Loading filters">
    <div className="fc-head">
     <span className="fc-head-title">Filters</span>
    </div>
    {[70, 55, 80, 60, 45].map((w, i) => (
     <div key={i} className="fc-skel" style={{ width: `${w}%` }} />
    ))}
   </Panel>
  );
 }

 // Nothing to filter by: a quiet note instead of an empty card
 if (!hasAny) {
  return (
   <EmptyNote role="note">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
     <path d="M3 5h18M6 12h12M10 19h4" />
    </svg>
    No filters for this shop
   </EmptyNote>
  );
 }

 return (
  <Panel aria-label="Product filters">
   <div className="fc-head">
    <span className="fc-head-title">
     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 5h18M6 12h12M10 19h4" />
     </svg>
     Filters
    </span>
    {selectedCount > 0 && (
     <button type="button" className="fc-clear" onClick={clearAll}>
      Clear ({selectedCount})
     </button>
    )}
   </div>

   <FilterSection
    id="categories"
    title="Categories"
    items={categoryList}
    selectedItems={selectedCategories}
    showSection={showCategories}
    setShowSection={setShowCategories}
    onClickHandler={handleCategoryChange}
    showAll={showAllCategories}
    setShowAll={setShowAllCategories}
   />

   <FilterSection
    id="brands"
    title="Brands"
    items={brandList}
    selectedItems={selectedBrands}
    showSection={showBrands}
    setShowSection={setShowBrands}
    onClickHandler={handleBrandChange}
    showAll={showAllBrands}
    setShowAll={setShowAllBrands}
   />

   <FilterSection
    id="country"
    title="Country of Origin"
    items={countryList}
    selectedItems={selectedCountry}
    showSection={showCountries}
    setShowSection={setShowCountries}
    onClickHandler={handleCountryChange}
    showAll={showAllCountries}
    setShowAll={setShowAllCountries}
   />

   <FilterSection
    id="shipped-from"
    title="Shipped From"
    items={provinces}
    selectedItems={selectedProvinces}
    showSection={showProvinces}
    setShowSection={setShowProvinces}
    onClickHandler={handleProvinceChange}
    showAll={showAllProvinces}
    setShowAll={setShowAllProvinces}
   />
  </Panel>
 );
};

export default ShopProductFilterCard;
