"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styles from './JustForYouParoducts.module.css';

const JustForYouProducts = () => {
  const [products, setProducts] = useState([]); // Store all the products
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [lastPage, setLastPage] = useState(1); // Track the last page
  const [loading, setLoading] = useState(false); // Loading state for data fetching
  const [loadingMore, setLoadingMore] = useState(false); // Loading state for "Load More"

  // Function to fetch products based on page number
  const fetchProducts = async (page = 1) => {
    if (loadingMore || loading) return;

    setLoading(page === 1); // Show loading only for the first load
    setLoadingMore(page > 1); // Show loading for "Load More"
    try {
      const response = await axios.get(`https://seller.tizaraa.com/api/frontend/latest/justoforyou/product/view/'+number?page=${page}`);
      const data = response.data;

      console.log(data);

      // If page is 1, replace the products list. For other pages, append new products.
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

  // Fetch initial data when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to load more products when button is clicked
  const handleLoadMore = () => {
    fetchProducts(currentPage + 1); // Load the next page
  };

  return (
    <div>
      {/* Display the product list */}
      <div className={styles.productCard}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>Just for you</h1>
          </div>
          <div className={styles.gridContainer}>
            {products.map((product, index) => (
              <div className={styles.gridItem} key={`${product.product_slug}-${index}`}>
                <a href="#">
                  <div className={styles.product}>
                    <div className={styles.imgPart}>
                      <img src={product.product_thumbnail} alt={product.product_name} />
                    </div>
                    <div className={styles.contentPart}>
                      <p>{product.product_name}</p>
                      <div className={styles.discountPrice}>
                        <h5><del>৳ {product.seeling_price}</del></h5>
                        <span>{product.sellerPurprice}</span>
                      </div>
                      <div className={styles.price}>
                        <h3>৳ {product.profiteprice}</h3>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Show "Load More" button only if there are more pages */}
      {currentPage < lastPage && (
        <div className={styles.buttonStyle}>
          <button className={styles.loadMore} onClick={handleLoadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}

      {/* Loading message for first load */}
      {loading && <p>Loading products...</p>}
    </div>
  );
};

export default JustForYouProducts;
