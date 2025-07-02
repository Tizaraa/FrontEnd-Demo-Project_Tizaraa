
// "use client";

// import React, { useEffect, useState } from 'react';
// import Card from "@component/Card";
// import { H6 } from "@component/Typography";
// import { FiChevronDown, FiChevronUp } from "react-icons/fi";
// import axios from 'axios';
// import ApiBaseUrl from 'api/ApiBaseUrl';
// import Link from 'next/link';

// type Brand = {
//   id: number;
//   brand_name: string;
// };

// type Category = {
//   id: number;
//   categorie_name: string;
//   child?: Category[];
//   categorie_name_slug: string;
//   parent_id: number | null;
// };

// type Country = {
//   id: number;
//   location: string;
// };

// type Province = {
//   id: number;
//   province: string;
//   price: string;
//   status: number;
// };

// type ProductFilterCardProps = {
//   onBrandChange: (brands: number[]) => void;
//   onCategoryChange: (categorySlug: string) => void;
//   onCountryChange: (countryIds: number[]) => void;
//   onProvinceChange: (provinces: number[]) => void;
//   slug: string;
//   pageType?: string;
// };

// const ProductFilterCard: React.FC<ProductFilterCardProps> = ({
//   onBrandChange,
//   onCategoryChange,
//   onCountryChange,
//   onProvinceChange,
//   slug,
//   pageType = 'default'
// }) => {
//   const [brandList, setBrandList] = useState<Brand[]>([]);
//   const [categoryList, setCategoryList] = useState<Category[]>([]);
//   const [countryList, setCountryList] = useState<Country[]>([]);
//   const [provinceList, setProvinceList] = useState<Province[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
//   const [selectedCountry, setSelectedCountry] = useState<number[]>([]);
//   const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
//   const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(slug); // Track selected category
//   const [showCategories, setShowCategories] = useState(true);
//   const [showBrands, setShowBrands] = useState(true);
//   const [showCountries, setShowCountries] = useState(true);
//   const [showProvinces, setShowProvinces] = useState(true);
//   const [showAllBrands, setShowAllBrands] = useState(false);
//   const [showAllCategories, setShowAllCategories] = useState(false);
//   const [showAllCountries, setShowAllCountries] = useState(false);
//   const [showAllProvinces, setShowAllProvinces] = useState(false);

//   // Styles from V1
//   const cardStyle: React.CSSProperties = {
//     padding: "16px",
//     borderRadius: "12px",
//     boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
//     border: "1px solid #f0f0f0",
//     backgroundColor: "#ffffff"
//   };

//   const filterSectionStyle: React.CSSProperties = {
//     marginBottom: "18px"
//   };

//   const filterHeaderStyle: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     cursor: "pointer",
//     padding: "8px 0",
//     userSelect: "none"
//   };

//   const filterTitleStyle: React.CSSProperties = {
//     margin: 0,
//     fontSize: "14px",
//     fontWeight: 600,
//     color: "#333"
//   };

//   const filterContentStyle: React.CSSProperties = {
//     marginTop: "8px"
//   };

//   const filterButtonsStyle: React.CSSProperties = {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "8px",
//     maxHeight: "200px",
//     overflowY: "auto",
//     paddingRight: "8px"
//   };

//   const baseFilterButtonStyle: React.CSSProperties = {
//     padding: "6px 12px",
//     borderRadius: "16px",
//     border: "1px solid #e0e0e0",
//     backgroundColor: "#ffffff",
//     color: "#555",
//     cursor: "pointer",
//     fontSize: "13px",
//     transition: "all 0.2s ease",
//     outline: "none"
//   };

//   const activeFilterButtonStyle: React.CSSProperties = {
//     ...baseFilterButtonStyle,
//     borderColor: "#3BB77E",
//     backgroundColor: "#F2FCF7",
//     color: "#3BB77E",
//     fontWeight: 500
//   };

//   const showMoreButtonStyle: React.CSSProperties = {
//     marginTop: "8px",
//     padding: "4px 8px",
//     backgroundColor: "transparent",
//     border: "none",
//     color: "#3BB77E",
//     cursor: "pointer",
//     fontSize: "12px",
//     display: "flex",
//     alignItems: "center",
//     gap: "4px",
//     transition: "all 0.2s ease"
//   };

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         let response;
//         if (pageType === 'default') {
//           response = await axios.get(`${ApiBaseUrl.baseUrl}category-filter/${slug}`);
//         } else if (pageType === 'search') {
//           response = await axios.get(`${ApiBaseUrl.baseUrl}search-filter/${slug}`);
//         } else if (pageType === 'shop') {
//           response = await axios.get(`${ApiBaseUrl.baseUrl}shop-filter/${slug}`);
//         }

//         setBrandList(response.data.brand_filter || []);
//         setCategoryList(response.data.category_filter || []);
//         setCountryList(response.data.location_filter || []);
//         setProvinceList(response.data.province_filter || []);
//       } catch (error) {
//         console.error("Error fetching filters:", error);
//       }
//     };

//     fetchFilters();
//   }, [slug, pageType]);

//   const handleFilterClick = (
//     id: number,
//     selectedItems: number[],
//     setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>,
//     callback: (items: number[]) => void
//   ) => {
//     const updatedItems = selectedItems.includes(id)
//       ? selectedItems.filter(itemId => itemId !== id)
//       : [...selectedItems, id];
//     setSelectedItems(updatedItems);
//     callback(updatedItems);
//   };

//   const handleBrandChange = (brandId: number, event: React.MouseEvent) => {
//     event.stopPropagation();
//     handleFilterClick(brandId, selectedBrands, setSelectedBrands, onBrandChange);
//   };

//   const handleCountryChange = (countryId: number, event: React.MouseEvent) => {
//     event.stopPropagation();
//     handleFilterClick(countryId, selectedCountry, setSelectedCountry, onCountryChange);
//   };

//   const handleProvinceChange = (provinceId: number, event: React.MouseEvent) => {
//     event.stopPropagation();
//     handleFilterClick(provinceId, selectedProvinces, setSelectedProvinces, onProvinceChange);
//   };

//   const handleCategoryClick = (categorySlug: string, event: React.MouseEvent) => {
//     event.stopPropagation();
//     event.preventDefault(); // Prevent default link behavior
//     setSelectedCategorySlug(categorySlug); // Update local state
//     onCategoryChange(categorySlug); // Trigger product fetch
//   };

//   const FilterButton = ({
//     item,
//     selectedItems,
//     onClick,
//     labelKey,
//     isCategory = false
//   }: {
//     item: { id: number; [key: string]: any };
//     selectedItems?: number[];
//     onClick: (event: React.MouseEvent) => void;
//     labelKey: string;
//     isCategory?: boolean;
//   }) => {
//     const [hovered, setHovered] = useState(false);
//     const isActive = isCategory ? selectedCategorySlug === item.categorie_name_slug : selectedItems?.includes(item.id);

//     const buttonStyle: React.CSSProperties = {
//       ...(isActive ? activeFilterButtonStyle : baseFilterButtonStyle),
//       ...(hovered && !isActive ? { borderColor: "#ccc" } : {})
//     };

//     return (
//       <button
//         onClick={onClick}
//         style={buttonStyle}
//         onMouseEnter={() => setHovered(true)}
//         onMouseLeave={() => setHovered(false)}
//       >
//         {item[labelKey]}
//       </button>
//     );
//   };

//   const renderCategories = (items: Category[], level = 0) => (
//     <div style={{ marginLeft: level > 0 ? '16px' : '0', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
//       {items.map((item) => (
//         <React.Fragment key={item.id}>
//           <FilterButton
//             item={item}
//             selectedItems={[]}
//             onClick={(event) => handleCategoryClick(item.categorie_name_slug, event)}
//             labelKey="categorie_name"
//             isCategory={true}
//           />
//           {showAllCategories && item.child && item.child.length > 0 && renderCategories(item.child, level + 1)}
//         </React.Fragment>
//       ))}
//     </div>
//   );

//   const FilterSection = ({
//     title,
//     items,
//     selectedItems,
//     showAll,
//     setShowAll,
//     showSection,
//     setShowSection,
//     onClickHandler,
//     labelKey,
//     isCategory = false
//   }: {
//     title: string;
//     items: any[];
//     selectedItems?: number[];
//     showAll: boolean;
//     setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
//     showSection: boolean;
//     setShowSection: React.Dispatch<React.SetStateAction<boolean>>;
//     onClickHandler: (id: number | string, event: React.MouseEvent) => void;
//     labelKey: string;
//     isCategory?: boolean;
//   }) => {
//     const [hovered, setHovered] = useState(false);
//     const visibleItems = showAll ? items : items.slice(0, 5);

//     return (
//       <div style={filterSectionStyle}>
//         <div
//           style={{
//             ...filterHeaderStyle,
//             ...(hovered ? { color: "#3BB77E" } : {})
//           }}
//           onClick={() => setShowSection(!showSection)}
//           onMouseEnter={() => setHovered(true)}
//           onMouseLeave={() => setHovered(false)}
//         >
//           <H6 style={filterTitleStyle}>{title}</H6>
//           {showSection ? 
//             <FiChevronUp size={16} color={hovered ? "#3BB77E" : "#333"} /> : 
//             <FiChevronDown size={16} color={hovered ? "#3BB77E" : "#333"} />
//           }
//         </div>

//         {showSection && (
//           <div style={filterContentStyle}>
//             {isCategory ? (
//               <div style={filterButtonsStyle}>
//                 {renderCategories(visibleItems)}
//               </div>
//             ) : (
//               <div style={filterButtonsStyle}>
//                 {visibleItems.map((item) => (
//                   <FilterButton
//                     key={item.id}
//                     item={item}
//                     selectedItems={selectedItems}
//                     onClick={(event) => onClickHandler(item.id, event)}
//                     labelKey={labelKey}
//                   />
//                 ))}
//               </div>
//             )}
//             {items.length > 5 && (
//               <button
//                 onClick={() => setShowAll(!showAll)}
//                 style={{
//                   ...showMoreButtonStyle,
//                   ...(hovered ? { color: "#2a9d6e" } : {})
//                 }}
//                 onMouseEnter={() => setHovered(true)}
//                 onMouseLeave={() => setHovered(false)}
//               >
//                 {showAll ? 'Show Less' : `+${items.length - 5} More`}
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <Card style={cardStyle}>
//       <FilterSection
//         title="Categories"
//         items={categoryList}
//         showAll={showAllCategories}
//         setShowAll={setShowAllCategories}
//         showSection={showCategories}
//         setShowSection={setShowCategories}
//         onClickHandler={handleCategoryClick}
//         labelKey="categorie_name"
//         isCategory={true}
//       />
//       <FilterSection
//         title="Brands"
//         items={brandList}
//         selectedItems={selectedBrands}
//         showAll={showAllBrands}
//         setShowAll={setShowAllBrands}
//         showSection={showBrands}
//         setShowSection={setShowBrands}
//         onClickHandler={handleBrandChange}
//         labelKey="brand_name"
//       />
//       <FilterSection
//         title="Country of Origin"
//         items={countryList}
//         selectedItems={selectedCountry}
//         showAll={showAllCountries}
//         setShowAll={setShowAllCountries}
//         showSection={showCountries}
//         setShowSection={setShowCountries}
//         onClickHandler={handleCountryChange}
//         labelKey="location"
//       />
//       <FilterSection
//         title="Shipped From"
//         items={provinceList.filter(p => p.province && p.province.trim() !== "")}
//         selectedItems={selectedProvinces}
//         showAll={showAllProvinces}
//         setShowAll={setShowAllProvinces}
//         showSection={showProvinces}
//         setShowSection={setShowProvinces}
//         onClickHandler={handleProvinceChange}
//         labelKey="province"
//       />
//     </Card>
//   );
// };

// export default ProductFilterCard;


"use client";

import React, { useEffect, useState, useRef } from 'react';
import Card from "@component/Card";
import { H6 } from "@component/Typography";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import axios from 'axios';
import ApiBaseUrl from 'api/ApiBaseUrl';
import Link from 'next/link';

type Brand = {
  id: number;
  brand_name: string;
};

type Category = {
  id: number;
  categorie_name: string;
  child?: Category[];
  categorie_name_slug: string;
  parent_id: number | null;
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

type ProductFilterCardProps = {
  onBrandChange: (brands: number[]) => void;
  onCategoryChange: (categorySlug: string) => void;
  onCountryChange: (countryIds: number[]) => void;
  onProvinceChange: (provinces: number[]) => void;
  slug: string;
  pageType?: string;
};

const ProductFilterCard: React.FC<ProductFilterCardProps> = ({
  onBrandChange,
  onCategoryChange,
  onCountryChange,
  onProvinceChange,
  slug,
  pageType = 'default'
}) => {
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [provinceList, setProvinceList] = useState<Province[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string | null>(slug);
  const [showCategories, setShowCategories] = useState(true);
  const [showBrands, setShowBrands] = useState(true);
  const [showCountries, setShowCountries] = useState(true);
  const [showProvinces, setShowProvinces] = useState(true);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [showAllProvinces, setShowAllProvinces] = useState(false);

  // Ref for categories container
  const categoriesContainerRef = useRef<HTMLDivElement>(null);
  const savedScrollPosition = useRef<number>(0);

  // Styles from V1
  const cardStyle: React.CSSProperties = {
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.05)",
    border: "1px solid #f0f0f0",
    backgroundColor: "#ffffff"
  };

  const filterSectionStyle: React.CSSProperties = {
    marginBottom: "18px"
  };

  const filterHeaderStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: "8px 0",
    userSelect: "none"
  };

  const filterTitleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: "14px",
    fontWeight: 600,
    color: "#333"
  };

  const filterContentStyle: React.CSSProperties = {
    marginTop: "8px"
  };

  const filterButtonsStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    maxHeight: "200px",
    overflowY: "auto",
    paddingRight: "8px"
  };

  const baseFilterButtonStyle: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: "16px",
    border: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
    color: "#555",
    cursor: "pointer",
    fontSize: "13px",
    transition: "all 0.2s ease",
    outline: "none"
  };

  const activeFilterButtonStyle: React.CSSProperties = {
    ...baseFilterButtonStyle,
    borderColor: "#3BB77E",
    backgroundColor: "#F2FCF7",
    color: "#3BB77E",
    fontWeight: 500
  };

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
    transition: "all 0.2s ease"
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        let response;
        if (pageType === 'default') {
          response = await axios.get(`${ApiBaseUrl.baseUrl}category-filter/${slug}`);
        } else if (pageType === 'search') {
          response = await axios.get(`${ApiBaseUrl.baseUrl}search-filter/${slug}`);
        } else if (pageType === 'shop') {
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

  // Restore scroll position after component updates
  useEffect(() => {
    if (categoriesContainerRef.current && savedScrollPosition.current > 0) {
      categoriesContainerRef.current.scrollTop = savedScrollPosition.current;
    }
  });

  const handleFilterClick = (
    id: number,
    selectedItems: number[],
    setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>,
    callback: (items: number[]) => void
  ) => {
    const updatedItems = selectedItems.includes(id)
      ? selectedItems.filter(itemId => itemId !== id)
      : [...selectedItems, id];
    setSelectedItems(updatedItems);
    callback(updatedItems);
  };

  const handleBrandChange = (brandId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleFilterClick(brandId, selectedBrands, setSelectedBrands, onBrandChange);
  };

  const handleCountryChange = (countryId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleFilterClick(countryId, selectedCountry, setSelectedCountry, onCountryChange);
  };

  const handleProvinceChange = (provinceId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleFilterClick(provinceId, selectedProvinces, setSelectedProvinces, onProvinceChange);
  };

  const handleCategoryClick = (categorySlug: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Save current scroll position
    if (categoriesContainerRef.current) {
      savedScrollPosition.current = categoriesContainerRef.current.scrollTop;
    }
    
    // Use requestAnimationFrame to ensure DOM updates are processed
    requestAnimationFrame(() => {
      setSelectedCategorySlug(categorySlug);
      onCategoryChange(categorySlug);
      
      // Restore scroll position in next frame
      requestAnimationFrame(() => {
        if (categoriesContainerRef.current) {
          categoriesContainerRef.current.scrollTop = savedScrollPosition.current;
        }
      });
    });
  };

  const FilterButton = React.memo(({
    item,
    selectedItems,
    onClick,
    labelKey,
    isCategory = false
  }: {
    item: { id: number; [key: string]: any };
    selectedItems?: number[];
    onClick: (event: React.MouseEvent) => void;
    labelKey: string;
    isCategory?: boolean;
  }) => {
    const [hovered, setHovered] = useState(false);
    const isActive = isCategory ? selectedCategorySlug === item.categorie_name_slug : selectedItems?.includes(item.id);

    const buttonStyle: React.CSSProperties = {
      ...(isActive ? activeFilterButtonStyle : baseFilterButtonStyle),
      ...(hovered && !isActive ? { borderColor: "#ccc" } : {})
    };

    return (
      <button
        type="button"
        onClick={onClick}
        style={buttonStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {item[labelKey]}
      </button>
    );
  });

  const renderCategories = (items: Category[], level = 0) => (
    <div style={{ marginLeft: level > 0 ? '16px' : '0', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          <FilterButton
            item={item}
            selectedItems={[]}
            onClick={(event) => handleCategoryClick(item.categorie_name_slug, event)}
            labelKey="categorie_name"
            isCategory={true}
          />
          {showAllCategories && item.child && item.child.length > 0 && renderCategories(item.child, level + 1)}
        </React.Fragment>
      ))}
    </div>
  );

  const FilterSection = ({
    title,
    items,
    selectedItems,
    showAll,
    setShowAll,
    showSection,
    setShowSection,
    onClickHandler,
    labelKey,
    isCategory = false
  }: {
    title: string;
    items: any[];
    selectedItems?: number[];
    showAll: boolean;
    setShowAll: React.Dispatch<React.SetStateAction<boolean>>;
    showSection: boolean;
    setShowSection: React.Dispatch<React.SetStateAction<boolean>>;
    onClickHandler: (id: number | string, event: React.MouseEvent) => void;
    labelKey: string;
    isCategory?: boolean;
  }) => {
    const [hovered, setHovered] = useState(false);
    const visibleItems = showAll ? items : items.slice(0, 5);

    const handleSectionToggle = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setShowSection(!showSection);
    };

    const handleShowMoreToggle = (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      
      // Save scroll position if this is categories section
      if (isCategory && categoriesContainerRef.current) {
        savedScrollPosition.current = categoriesContainerRef.current.scrollTop;
      }
      
      setShowAll(!showAll);
    };

    return (
      <div style={filterSectionStyle}>
        <div
          style={{
            ...filterHeaderStyle,
            ...(hovered ? { color: "#3BB77E" } : {})
          }}
          onClick={handleSectionToggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <H6 style={filterTitleStyle}>{title}</H6>
          {showSection ? 
            <FiChevronUp size={16} color={hovered ? "#3BB77E" : "#333"} /> : 
            <FiChevronDown size={16} color={hovered ? "#3BB77E" : "#333"} />
          }
        </div>

        {showSection && (
          <div style={filterContentStyle}>
            {isCategory ? (
              <div 
                style={filterButtonsStyle}
                ref={categoriesContainerRef}
                onScroll={() => {
                  if (categoriesContainerRef.current) {
                    savedScrollPosition.current = categoriesContainerRef.current.scrollTop;
                  }
                }}
              >
                {renderCategories(visibleItems)}
              </div>
            ) : (
              <div style={filterButtonsStyle}>
                {visibleItems.map((item) => (
                  <FilterButton
                    key={item.id}
                    item={item}
                    selectedItems={selectedItems}
                    onClick={(event) => onClickHandler(item.id, event)}
                    labelKey={labelKey}
                  />
                ))}
              </div>
            )}
            {items.length > 5 && (
              <button
                type="button"
                onClick={handleShowMoreToggle}
                style={{
                  ...showMoreButtonStyle,
                  ...(hovered ? { color: "#2a9d6e" } : {})
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                {showAll ? 'Show Less' : `+${items.length - 5} More`}
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
        showAll={showAllCategories}
        setShowAll={setShowAllCategories}
        showSection={showCategories}
        setShowSection={setShowCategories}
        onClickHandler={handleCategoryClick}
        labelKey="categorie_name"
        isCategory={true}
      />
      <FilterSection
        title="Brands"
        items={brandList}
        selectedItems={selectedBrands}
        showAll={showAllBrands}
        setShowAll={setShowAllBrands}
        showSection={showBrands}
        setShowSection={setShowBrands}
        onClickHandler={handleBrandChange}
        labelKey="brand_name"
      />
      <FilterSection
        title="Country of Origin"
        items={countryList}
        selectedItems={selectedCountry}
        showAll={showAllCountries}
        setShowAll={setShowAllCountries}
        showSection={showCountries}
        setShowSection={setShowCountries}
        onClickHandler={handleCountryChange}
        labelKey="location"
      />
      <FilterSection
        title="Shipped From"
        items={provinceList.filter(p => p.province && p.province.trim() !== "")}
        selectedItems={selectedProvinces}
        showAll={showAllProvinces}
        setShowAll={setShowAllProvinces}
        showSection={showProvinces}
        setShowSection={setShowProvinces}
        onClickHandler={handleProvinceChange}
        labelKey="province"
      />
    </Card>
  );
};

export default ProductFilterCard;