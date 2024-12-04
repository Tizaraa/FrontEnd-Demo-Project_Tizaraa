import React, { useEffect, useState } from 'react';
import Card from "@component/Card";
import { H6, Paragraph } from "@component/Typography";
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://frontend.tizaraa.com/api';

type Category = {
  Id: string;
  Name: string;
};

type ProductFilterCardProps = {
  onBrandChange: (brands: number[]) => void;
  onCategoryChange: (category: string) => void;
  onCountryChange: (countryIds: number[]) => void; 
  slug: string;
  pageType: string;
};

const OTProductsFilterCard: React.FC<ProductFilterCardProps> = ({ onBrandChange, onCategoryChange, onCountryChange, slug, pageType = 'default' }) => {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [visibleCategories, setVisibleCategories] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [productsAvailability, setProductsAvailability] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/otpi/get-category`);
        
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const categories = data.CategoryInfoList?.Content || [];

        if (Array.isArray(categories)) {
          setCategoryList(categories);
        } else {
          setError("Unexpected response format.");
          setCategoryList([]);
        }
      } catch (error) {
        setError("Error fetching categories.");
        setCategoryList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, [slug]);

  // Check if products exist for the selected category when selectedCategoryId is set
  useEffect(() => {
    const checkProductsForCategory = async (categoryId: string) => {
      if (categoryId) {
        try {
          // Fetch products for the selected category
          const response = await fetch(`${API_BASE_URL}/otpi/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              xmlParameters: `<SearchItemsParameters><CategoryId>${categoryId}</CategoryId></SearchItemsParameters>`,
              framePosition: 1,
              frameSize: 1, // Limit to one product to check if any products exist
            }),
          });

          const data = await response.json();
          const products = data.Result?.Items?.Content || [];

          // Update products availability for this category
          setProductsAvailability(prev => new Map(prev.set(categoryId, products.length > 0)));
        } catch (error) {
          // alert("An error occurred while checking the category.");
        }
      }
    };

    // Check products for each category when data is fetched
    categoryList.forEach(category => {
      checkProductsForCategory(category.Id);
    });
  }, [categoryList]);

  const handleCategoryClick = (categoryId: string, e: React.MouseEvent) => {
    const hasProducts = productsAvailability.get(categoryId);
  
    if (!hasProducts) {
      e.preventDefault(); // Prevent navigation
      alert(`No products found in category with ID ${categoryId}.`); // Show alert
    } else {
      // Proceed with the category change if products are available
      onCategoryChange(categoryId);
    }
  };

  const handleShowMore = () => {
    setVisibleCategories(prev => prev + 10);
  };

  return (
    <Card p="18px 27px" elevation={5} borderRadius={8}>
      <H6 mb="10px">Categories</H6>
      {loading && <Paragraph color="text.muted">Loading categories...</Paragraph>}
      {error && <Paragraph color="text.danger">{error}</Paragraph>}
      {!loading && !error && (
        <>
         {categoryList.slice(0, visibleCategories).map((item) => {
  const isLinkDisabled = productsAvailability.get(item.Id) === false;

  return (
    <div key={item.Id}>
      <Link href={isLinkDisabled ? '#' : `/OtCategory/${item.Id}`} passHref>
        <Paragraph
          py="6px"
          fontSize="14px"
          color="text.muted"
          className="cursor-pointer hover:text-primary transition-colors"
          onClick={(e) => handleCategoryClick(item.Id, e)} // Attach onClick
          style={{ pointerEvents: isLinkDisabled ? 'none' : 'auto' }} // Disable click if no products
        >
          {item.Name}
        </Paragraph>
      </Link>
    </div>
  );
})}
          {visibleCategories < categoryList.length && (
            <Paragraph 
              py="6px"
              fontSize="14px"
              color="text.primary" 
              className="cursor-pointer" 
              onClick={handleShowMore}
            >
              Show More
            </Paragraph>
          )}
        </>
      )}
    </Card>
  );
};

export default OTProductsFilterCard;
