"use client";

import React, { useEffect, useState } from 'react';
import Card from "@component/Card";
import Divider from "@component/Divider";
import CheckBox from "@component/CheckBox";
import { Accordion, AccordionHeader } from "@component/accordion";
import { H6, Paragraph, SemiSpan } from "@component/Typography";
import axios from 'axios';

// Define types for your data
type Brand = {
  id: number;
  brand_name: string;
};

type Category = {
  id: number;
  categorie_name: string;
  child?: string[];
  categorie_name_slug: string;
};

type ProductFilterCardProps = {
  onBrandChange: (brands: number[]) => void; // Array of selected brand IDs
  onCategoryChange: (category: string) => void;
  slug:string;
};

const ProductFilterCard: React.FC<ProductFilterCardProps> = ({ onBrandChange, onCategoryChange,slug }) => {
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

  useEffect(() => {

    const fetchFilters = async () => {
      try {
        const response = await axios.get(`https://tizaraa.com/api/category-filter/${slug}`);
       
        setBrandList(response.data.brand_filter);
        setCategoryList(response.data.category_filter);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, []);

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
  };

  const handleBrandChange = (brandId: number) => {
    const updatedSelectedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId) // Remove brand if already selected
      : [...selectedBrands, brandId]; // Add brand if not already selected

    setSelectedBrands(updatedSelectedBrands);
    onBrandChange(updatedSelectedBrands); // Pass updated brands to parent
  };

  const renderCategories = (items: string[]) =>
    items.map((name) => (
      <Paragraph
        py="6px"
        pl="22px"
        key={name}
        fontSize="14px"
        color="text.muted"
        className="cursor-pointer"
        onClick={() => handleCategoryClick(name)}
      >
        {name}
      </Paragraph>
    ));

  return (
    <Card p="18px 27px" elevation={5} borderRadius={8}>
      <H6 mb="16px">Brands</H6>
      {brandList.map((item) => (
        <CheckBox
          my="10px"
          key={item.id}
          name={item.brand_name}
          value={item.id}
          color="secondary"
          label={<SemiSpan color="inherit">{item.brand_name}</SemiSpan>}
          onChange={() => handleBrandChange(item.id)} // Handle checkbox change
          checked={selectedBrands.includes(item.id)} // Check if the brand is selected
        />

        

      ))}
      <Divider my="24px" />
      <H6 mb="10px">Categories</H6>
      {categoryList.map((item) =>
        item.child ? (
          <Accordion key={item.id} expanded>
            <AccordionHeader px="0px" py="6px" color="text.muted">
              <SemiSpan className="cursor-pointer" mr="9px">
                {item.categorie_name}
              </SemiSpan>
            </AccordionHeader>
            {renderCategories(item.child)}
          </Accordion>
        ) : (
          <Paragraph
            py="6px"
            fontSize="14px"
            key={item.id}
            color="text.muted"
            className="cursor-pointer"
            onClick={() => handleCategoryClick(item.categorie_name_slug)}
          >
            {item.categorie_name}
          </Paragraph>
        )
      )}
      <Divider mt="18px" mb="24px" />
    </Card>
  );
};

export default ProductFilterCard;


// "use client";

// import React, { useEffect, useState } from 'react';
// import Card from "@component/Card";
// import Divider from "@component/Divider";
// import CheckBox from "@component/CheckBox";
// import { Accordion, AccordionHeader } from "@component/accordion";
// import { H6, Paragraph, SemiSpan } from "@component/Typography";
// import axios from 'axios';

// // Define types for your data
// type Brand = {
//   id: number;
//   brand_name: string;
// };

// type Category = {
//   id: number;
//   categorie_name: string;
//   child?: string[];
//   categorie_name_slug: string;
// };

// type ProductFilterCardProps = {
//   onBrandChange: (brands: number[]) => void; // Array of selected brand IDs
//   onCategoryChange: (category: string) => void;
//   slug: string;
// };

// const ProductFilterCard: React.FC<ProductFilterCardProps> = ({ onBrandChange, onCategoryChange, slug }) => {
//   const [brandList, setBrandList] = useState<Brand[]>([]);
//   const [categoryList, setCategoryList] = useState<Category[]>([]);
//   const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
//   const [showAllBrands, setShowAllBrands] = useState(false); // State for showing all or some brands
//   const [showAllCategories, setShowAllCategories] = useState(false); // State for showing all or some categories

//   useEffect(() => {
//     const fetchFilters = async () => {
//       try {
//         const response = await axios.get(`https://tizaraa.com/api/category-filter/${slug}`);
//         console.log("Filter Api:", response.data); // Log the API response
        
//         setBrandList(response.data.brand_filter);
//         setCategoryList(response.data.category_filter);
        
//       } catch (error) {
//         console.error("Error fetching filters:", error);
//       }
//     };
  
//     fetchFilters();
//   }, [slug]); // Ensure to include slug in the dependency array
  


//   const handleCategoryClick = (category: string) => {
//     onCategoryChange(category);
//   };

//   const handleBrandChange = (brandId: number) => {
//     const updatedSelectedBrands = selectedBrands.includes(brandId)
//       ? selectedBrands.filter((id) => id !== brandId) // Remove brand if already selected
//       : [...selectedBrands, brandId]; // Add brand if not already selected

//     setSelectedBrands(updatedSelectedBrands);
//     onBrandChange(updatedSelectedBrands); // Pass updated brands to parent
//   };

//   const renderCategories = (items: string[]) =>
//     items.map((name) => (
//       <Paragraph
//         py="6px"
//         pl="22px"
//         key={name}
//         fontSize="14px"
//         color="text.muted"
//         className="cursor-pointer"
//         onClick={() => handleCategoryClick(name)}
//       >
//         {name}
//       </Paragraph>
//     ));

//   // Control the number of brands to show
//   const visibleBrands = showAllBrands ? brandList : brandList.slice(0, 5);

//   // Control the number of categories to show
//   const visibleCategories = showAllCategories ? categoryList : categoryList.slice(0, 5);

//   const toggleShowBrands = () => {
//     setShowAllBrands(!showAllBrands); // Toggle between showing all and showing fewer brands
//   };

//   const toggleShowCategories = () => {
//     setShowAllCategories(!showAllCategories); // Toggle between showing all and showing fewer categories
//   };

//   return (
//     <Card p="18px 27px" elevation={5} borderRadius={8}>
//       <H6 mb="16px">Brands</H6>
//       {visibleBrands.map((item) => (
//         <CheckBox
//           my="10px"
//           key={item.id}
//           name={item.brand_name}
//           value={item.id}
//           color="secondary"
//           label={<SemiSpan color="inherit">{item.brand_name}</SemiSpan>}
//           onChange={() => handleBrandChange(item.id)} // Handle checkbox change
//           checked={selectedBrands.includes(item.id)} // Check if the brand is selected
//         />
//       ))}

//       {/* Show more button for brands */}
//       {brandList.length > 5 && (
//         <Paragraph
//           py="6px"
//           fontSize="14px"
//           className="cursor-pointer"
//           color="primary.main"
//           onClick={toggleShowBrands}
//         >
//           {showAllBrands ? "Show Less" : "Show More"}
//         </Paragraph>
//       )}

//       <Divider my="24px" />
//       <H6 mb="10px">Categories</H6>
//       {visibleCategories.map((item) =>
//         item.child ? (
//           <Accordion key={item.id} expanded>
//             <AccordionHeader px="0px" py="6px" color="text.muted">
//               <SemiSpan className="cursor-pointer" mr="9px">
//                 {item.categorie_name}
//               </SemiSpan>
//             </AccordionHeader>
//             {renderCategories(item.child)}
//           </Accordion>
//         ) : (
//           <Paragraph
//             py="6px"
//             fontSize="14px"
//             key={item.id}
//             color="text.muted"
//             className="cursor-pointer"
//             onClick={() => handleCategoryClick(item.categorie_name_slug)}
//           >
//             {item.categorie_name}
//           </Paragraph>
//         )
//       )}

//       {/* Show more button for categories */}
//       {categoryList.length > 5 && (
//         <Paragraph
//           py="6px"
//           fontSize="14px"
//           className="cursor-pointer"
//           color="primary.main"
//           onClick={toggleShowCategories}
//         >
//           {showAllCategories ? "Show Less" : "Show More"}
//         </Paragraph>
//       )}

//       <Divider mt="18px" mb="24px" />


//       <Divider my="24px" />
//       <H6 mb="10px">Country of Origin</H6>
     

//       <Divider mt="18px" mb="24px" />

//       <Divider my="24px" />
//       <H6 mb="10px">Warranty</H6>
      
     

//       <Divider mt="18px" mb="24px" />




//     </Card>
//   );
// };

// export default ProductFilterCard;
