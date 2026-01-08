"use client";

import React, { useEffect, useState } from "react";
import Card from "@component/Card";
import { H6 } from "@component/Typography";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import axios from "axios";
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

 // Collapse states
 const [showCategories, setShowCategories] = useState(true);
 const [showBrands, setShowBrands] = useState(true);
 const [showCountries, setShowCountries] = useState(true);
 const [showProvinces, setShowProvinces] = useState(true);

 // Card container style
 const cardStyle: React.CSSProperties = {
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
  border: "1px solid #f0f0f0",
  backgroundColor: "#ffffff",
 };

 // Filter section style
 const filterSectionStyle: React.CSSProperties = {
  marginBottom: "18px",
 };

 // Filter header style
 const filterHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  padding: "8px 0",
  userSelect: "none",
 };

 // Filter title style
 const filterTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "14px",
  fontWeight: 600,
  color: "#333",
 };

 // Filter content style
 const filterContentStyle: React.CSSProperties = {
  marginTop: "8px",
 };

 // Filter buttons container style
 const filterButtonsStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
 };

 // Base filter button style
 const baseFilterButtonStyle: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: "16px",
  border: "1px solid #e0e0e0",
  backgroundColor: "#ffffff",
  color: "#555",
  cursor: "pointer",
  fontSize: "13px",
  transition: "all 0.2s ease",
  outline: "none",
 };

 // Active filter button style
 const activeFilterButtonStyle: React.CSSProperties = {
  ...baseFilterButtonStyle,
  borderColor: "#3BB77E",
  backgroundColor: "#F2FCF7",
  color: "#3BB77E",
  fontWeight: 500,
 };

 // Scroll container style
 const scrollContainerStyle: React.CSSProperties = {
  maxHeight: "200px",
  overflowY: "auto",
  paddingRight: "10px",
  scrollbarWidth: "thin",
  scrollbarColor: "#888 transparent",
 };

 // Show more button style
 const showMoreButtonStyle: React.CSSProperties = {
  marginTop: "8px",
  padding: "4px 8px",
  backgroundColor: "transparent",
  border: "none",
  color: "#3BB77E",
  cursor: "pointer",
  fontSize: "12px",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  transition: "all 0.2s ease",
 };

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

 const FilterButton = ({
  item,
  selectedItems,
  onClick,
 }: {
  item: { id: number; [key: string]: any };
  selectedItems: number[];
  onClick: () => void;
 }) => {
  const [hovered, setHovered] = useState(false);
  const isActive = selectedItems.includes(item.id);

  const buttonStyle: React.CSSProperties = {
   ...(isActive ? activeFilterButtonStyle : baseFilterButtonStyle),
   ...(hovered && !isActive ? { borderColor: "#ccc" } : {}),
  };

  return (
   <button
    onClick={onClick}
    style={buttonStyle}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
   >
    {item.brand_name || item.categorie_name || item.location || item.province}
   </button>
  );
 };

 const FilterSection = ({
  title,
  items,
  selectedItems,
  showSection,
  setShowSection,
  onClickHandler,
  callback,
  showAll,
  setShowAll,
 }: {
  title: string;
  items: any[];
  selectedItems: number[];
  showSection: boolean;
  setShowSection: React.Dispatch<React.SetStateAction<boolean>>;
  onClickHandler: (id: number) => void;
  callback: (items: number[]) => void;
  showAll?: boolean;
  setShowAll?: React.Dispatch<React.SetStateAction<boolean>>;
 }) => {
  const [hovered, setHovered] = useState(false);
  const itemsToShow = showAll ? items : items.slice(0, 5);
  const remainingCount = items.length - 5;

  return (
   <div style={filterSectionStyle}>
    <div
     style={{
      ...filterHeaderStyle,
      ...(hovered ? { color: "#3BB77E" } : {}),
     }}
     onClick={() => setShowSection(!showSection)}
     onMouseEnter={() => setHovered(true)}
     onMouseLeave={() => setHovered(false)}
    >
     <H6 style={filterTitleStyle}>{title}</H6>
     {showSection ? (
      <FiChevronUp size={16} color={hovered ? "#3BB77E" : "#333"} />
     ) : (
      <FiChevronDown size={16} color={hovered ? "#3BB77E" : "#333"} />
     )}
    </div>

    {showSection && (
     <div style={filterContentStyle}>
      <div style={scrollContainerStyle}>
       <div style={filterButtonsStyle}>
        {itemsToShow.map((item) => (
         <FilterButton
          key={item.id}
          item={item}
          selectedItems={selectedItems}
          onClick={() => onClickHandler(item.id)}
         />
        ))}
       </div>
      </div>

      {items.length > 5 && !showAll && (
       <button
        onClick={() => setShowAll && setShowAll(true)}
        style={{
         ...showMoreButtonStyle,
         ...(hovered ? { color: "#2a9d6e" } : {}),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
       >
        {`+${remainingCount} More`}
       </button>
      )}

      {showAll && items.length > 5 && (
       <button
        onClick={() => setShowAll && setShowAll(false)}
        style={{
         ...showMoreButtonStyle,
         ...(hovered ? { color: "#2a9d6e" } : {}),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
       >
        Show Less
       </button>
      )}
     </div>
    )}
   </div>
  );
 };

 return (
  <Card style={cardStyle}>
   <FilterSection
    title="Categories"
    items={categoryList}
    selectedItems={selectedCategories}
    showSection={showCategories}
    setShowSection={setShowCategories}
    onClickHandler={handleCategoryChange}
    callback={onCategoryChange}
    showAll={showAllCategories}
    setShowAll={setShowAllCategories}
   />

   <FilterSection
    title="Brands"
    items={brandList}
    selectedItems={selectedBrands}
    showSection={showBrands}
    setShowSection={setShowBrands}
    onClickHandler={handleBrandChange}
    callback={onBrandChange}
    showAll={showAllBrands}
    setShowAll={setShowAllBrands}
   />

   <FilterSection
    title="Country of Origin"
    items={countryList}
    selectedItems={selectedCountry}
    showSection={showCountries}
    setShowSection={setShowCountries}
    onClickHandler={handleCountryChange}
    callback={onCountryChange}
    showAll={showAllCountries}
    setShowAll={setShowAllCountries}
   />

   <FilterSection
    title="Shipped From"
    items={provinceList.filter((p) => p.province && p.province.trim() !== "")}
    selectedItems={selectedProvinces}
    showSection={showProvinces}
    setShowSection={setShowProvinces}
    onClickHandler={handleProvinceChange}
    callback={onProvinceChange}
    showAll={showAllProvinces}
    setShowAll={setShowAllProvinces}
   />
  </Card>
 );
};

export default ShopProductFilterCard;
