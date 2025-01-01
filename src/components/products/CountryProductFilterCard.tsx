"use client";

import React, { useEffect, useState } from 'react';
import Card from "@component/Card";
import Divider from "@component/Divider";
import CheckBox from "@component/CheckBox";
import { Accordion, AccordionHeader } from "@component/accordion";
import { H6, Paragraph, SemiSpan } from "@component/Typography";
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
  // child?: Category[]; // Ensure child is of type Category[]
  // categorie_name_slug: string;
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


type CountryProductFilterCardProps = {
  onBrandChange: (brands: number[]) => void;
  onCategoryChange: (categories: number[]) => void; // Ensure this is a string
  onCountryChange: (countryIds: number[]) => void;
  onProvinceChange: (provinces: number[]) => void;
  slug: string;
  pageType?: string;
};

const CountryProductFilterCard: React.FC<CountryProductFilterCardProps> = ({
  onBrandChange,
  onCategoryChange,
  onCountryChange,
  onProvinceChange,
  slug,
  pageType = 'country'
}) =>  {
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [provinceList, setProvinceList] = useState<Province[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number[]>([]);
  const [selectedProvinces, setSelectedProvinces] = useState<number[]>([]);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [showAllProvinces, setShowAllProvinces] = useState(false);


  useEffect(() => {
    const fetchFilters = async () => {
      try {
        let response;
        if (pageType === 'default') {
          response = await axios.get(`${ApiBaseUrl.baseUrl}category-filter/${slug}`);
          // console.log(response.data)
        } else if (pageType === 'search') {
          response = await axios.get(`${ApiBaseUrl.baseUrl}search-filter/${slug}`);
        } else if (pageType === 'shop') {
          response = await axios.get(`${ApiBaseUrl.baseUrl}shop-filter/${slug}`);
        } else if (pageType === 'country') {
          response = await axios.get(`${ApiBaseUrl.baseUrl}country/product-filter/${slug}`)
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

  const handleProvinceChange = (provinceId: number) => {
    const updatedSelectedProvinces = selectedProvinces.includes(provinceId)
      ? selectedProvinces.filter((id) => id !== provinceId)
      : [...selectedProvinces, provinceId];
  
    setSelectedProvinces(updatedSelectedProvinces);
    onProvinceChange(updatedSelectedProvinces); // Pass updated provinces to parent
  };
  
  // Render provinces
  const visibleProvinces = showAllProvinces ? provinceList : provinceList.slice(0, 5);
  const toggleShowProvinces = () => setShowAllProvinces(!showAllProvinces);

  // const handleCategoryClick = (categorySlug: string) => {
  //   onCategoryChange(categorySlug); // Pass the slug for filtering
  // };
 

  const handleBrandChange = (brandId: number) => {
    const updatedSelectedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];

    setSelectedBrands(updatedSelectedBrands);
    onBrandChange(updatedSelectedBrands);
  };

  const handleCategoryChange = (categoryId: number) => {
    const updatedSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];
  
    setSelectedCategories(updatedSelectedCategories);
    onCategoryChange(updatedSelectedCategories);
  };

  const handleCountryChange = (countryId: number) => {
    const updatedSelectedCountry = selectedCountry.includes(countryId)
      ? selectedCountry.filter((id) => id !== countryId)
      : [...selectedCountry, countryId];

    setSelectedCountry(updatedSelectedCountry);
    onCountryChange(updatedSelectedCountry);
  };

  // const renderCategories = (items: Category[]) => 
  //   items.map((item) => (
  //     <div key={item.id}>
  //       <Paragraph
  //         py="6px"
  //         pl="22px"
  //         fontSize="14px"
  //         color="text.muted"
  //         className="cursor-pointer"
  //         onClick={() => handleCategoryClick(item.categorie_name)} // Ensure you're passing the slug
  //       >
  //         {item.categorie_name}
  //       </Paragraph>
  //       {item.child && item.child.length > 0 && (
  //         <Accordion key={item.id} expanded>
  //           <AccordionHeader px="0px" py="6px" color="text.muted">
  //             <SemiSpan className="cursor-pointer" mr="9px">
  //               {item.categorie_name}
  //             </SemiSpan>
  //           </AccordionHeader>
  //           {renderCategories(item.child)} {/* Render child categories */}
  //         </Accordion>
  //       )}
  //     </div>
  //   ));

  const visibleBrands = showAllBrands ? brandList : brandList.slice(0, 5);
  const visibleCategories = showAllCategories ? categoryList : categoryList.slice(0, 5);
  const visibleCountries = showAllCountries ? countryList : countryList.slice(0, 5);

  const toggleShowBrands = () => setShowAllBrands(!showAllBrands);
  const toggleShowCategories = () => setShowAllCategories(!showAllCategories);
  const toggleShowCountries = () => setShowAllCountries(!showAllCountries);

  return (
    <Card p="18px 27px" elevation={5} borderRadius={8}>
      <H6 mb="16px">Brands</H6>
      {visibleBrands.map((item) => (
        <CheckBox
          my="10px"
          key={item.id}
          name={item.brand_name}
          value={item.id}
          color="secondary"
          label={<SemiSpan color="inherit">{item.brand_name}</SemiSpan>}
          onChange={() => handleBrandChange(item.id)}
          checked={selectedBrands.includes(item.id)}
        />
      ))}

      {brandList.length > 5 && (
        <Paragraph
          py="6px"
          fontSize="14px"
          className="cursor-pointer"
          color="primary.main"
          onClick={toggleShowBrands}
        >
          {showAllBrands ? "Show Less" : "Show More"}
        </Paragraph>
      )}
 <Divider my="24px" />
      <H6 mb="10px">Categories</H6>
       {visibleCategories.map((item) => (
        <CheckBox
          my="10px"
          key={item.id}
          name={item.categorie_name}
          value={item.id}
          color="secondary"
          label={<SemiSpan color="inherit">{item.categorie_name}</SemiSpan>}
          onChange={() => handleCategoryChange(item.id)}
          checked={selectedCategories.includes(item.id)}
        />
      ))}
      {categoryList.length > 5 && (
        <Paragraph
          py="6px"
          fontSize="14px"
          className="cursor-pointer"
          color="primary.main"
          onClick={toggleShowCategories}
        >
          {showAllCategories ? "Show Less" : "Show More"}
        </Paragraph>
      )}


      <Divider mt="18px" mb="24px" />
      <H6 mb="10px">Country of Origin</H6>
      {visibleCountries.map((country) => (
        <CheckBox
          my="10px"
          key={country.id}
          name={country.location}
          value={country.id}
          color="secondary"
          label={<SemiSpan color="inherit">{country.location}</SemiSpan>}
          onChange={() => handleCountryChange(country.id)}
          checked={selectedCountry.includes(country.id)}
        />
      ))}
      
      {countryList.length > 5 && (
        <Paragraph
          py="6px"
          fontSize="14px"
          className="cursor-pointer"
          color="primary.main"
          onClick={toggleShowCountries}
        >
          {showAllCountries ? "Show Less" : "Show More"}
        </Paragraph>
      )}

      <Divider mt="18px" mb="24px" />
      <H6 mb="10px">Warranty</H6>
      {/* Add warranty options here */}
      <Divider mt="18px" mb="24px" />

      <H6 mb="10px">Shipped From</H6>
      {visibleProvinces.map((province) => (
        <CheckBox
          my="10px"
          key={province.id}
          name={province.province}
          value={province.id}
          color="secondary"
          label={
            <SemiSpan color="inherit">
              {province.province} 
            </SemiSpan>
          }
          onChange={() => handleProvinceChange(province.id)}
          checked={selectedProvinces.includes(province.id)}
        />
      ))}
      {provinceList.length > 5 && (
        <Paragraph
          py="6px"
          fontSize="14px"
          className="cursor-pointer"
          color="primary.main"
          onClick={toggleShowProvinces}
        >
          {showAllProvinces ? "Show Less" : "Show More"}
        </Paragraph>
      )}
    </Card>
  );
};

export default CountryProductFilterCard;
