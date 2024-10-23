import React, { useEffect, useState } from 'react';
import Card from "@component/Card";
import { H6, Paragraph } from "@component/Typography";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://tizaraa.com/api';

type Category = {
  Id: string; // Adjusted to match the API response
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

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
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
          {categoryList.length > 0 ? (
            categoryList.slice(0, visibleCategories).map((item) => (
              <Paragraph
                py="6px"
                fontSize="14px"
                key={item.Id}
                color="text.muted"
                className="cursor-pointer hover:text-primary transition-colors"
                onClick={() => handleCategoryClick(item.Id)}
              >
                {item.Name} 
              </Paragraph>
            ))
          ) : (
            <Paragraph color="text.muted">No categories available</Paragraph>
          )}
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
