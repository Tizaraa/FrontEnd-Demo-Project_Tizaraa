"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import HoverBox from "@component/HoverBox";
import { H4 } from "@component/Typography";
import CategorySectionCreator from "@component/CategorySectionCreator";
import { currency } from "@utils/utils";
import useWindowSize from "@hook/useWindowSize";

import styles from './JustForYouParoducts.module.css';



const JustForYouProducts = () => {
  const [products, setProducts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false); 
  const [loadingMore, setLoadingMore] = useState(false); 

  const width = useWindowSize();

  const fetchProducts = async (page = 1) => {
    if (loadingMore || loading) return;

    setLoading(page === 1); 
    setLoadingMore(page > 1); 
    try {
      const response = await axios.get(`https://seller.tizaraa.com/api/frontend/latest/justoforyou/product/view/'+number?page`);
      const data = response.data;


      console.log("API Response:", data);

     
      if (page === 1) {
        setProducts(data.data); 
      } else {
        setProducts(prevProducts => [...prevProducts, ...data.data]);
      }

      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, []);


  const handleLoadMore = () => {
    fetchProducts(currentPage + 1); 
  };

  return (
    <CategorySectionCreator title="Just For You">
      <Box my="-0.25rem">
      <FlexBox flexWrap="wrap" justifyContent="space-between">
  {products.length > 0 ? (
    products.map((item) => (
      <Box
        py="0.25rem"
        key={item.product_slug}
        width="calc(20% - 16px)" // Each product takes up 20% of the row minus the margin
        minWidth="200px"
        maxWidth="250px"
        mb="16px" // Vertical spacing between rows
        style={{ marginRight: '16px' }} // Horizontal spacing between items
      >
        <Card p="1rem" borderRadius={8} style={{ height: '300px' }}>
          <Link href={`/product/${item.product_slug}`}>
            <HoverBox
              borderRadius={8}
              mb="0.5rem"
              display="flex"
              justifyContent="center"
              alignItems="center"
              style={{ height: '150px', overflow: 'hidden' }} 
            >
              <img 
                src={item.product_thumbnail} 
                alt={item.product_name} 
                style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
              />
            </HoverBox>

            <H4
              fontWeight="600"
              fontSize="18px"
              mb="0.25rem"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.product_name}
            </H4>

            <FlexBox>
              <H4 fontWeight="600" fontSize="14px" color="text.muted">
                BDT <del>{item.seeling_price}</del>
              </H4>
            </FlexBox>

            <H4 fontWeight="600" fontSize="14px" color="primary.main" mr="0.5rem">
              {currency(item.discount_price)}
            </H4>
          </Link>
        </Card>
      </Box>
    ))
  ) : (
    <p>No products available</p>
  )}
</FlexBox>


      </Box>

   
      {currentPage < lastPage && (
        <div className={styles.buttonStyle}>
          <button className={styles.loadMore} onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

     
      {loading && <p>Loading products...</p>}
    </CategorySectionCreator>
  );
};

export default JustForYouProducts;
