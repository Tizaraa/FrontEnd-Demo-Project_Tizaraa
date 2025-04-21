"use client";
import { useState, useEffect } from "react";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { H4, H5, Paragraph } from "@component/Typography";
import ApiBaseUrl from "api/ApiBaseUrl";
import Card from "@component/Card";
import { ProductCard1 } from "@component/product-cards";
import { currency } from "@utils/utils";
import Link from "next/link";
import styled from "@emotion/styled";
import { Vortex } from "react-loader-spinner";

const productsPerPage = 10000;

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;


const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export default function SearchResult({ slug }: { slug: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async (query: string, page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${ApiBaseUrl.baseUrl}otpi/items`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            xmlParameters: `<SearchItemsParameters><ItemTitle>${query}</ItemTitle></SearchItemsParameters>`,
            framePosition: (page - 1) * productsPerPage,
            frameSize: productsPerPage,
          }),
        }
      );
      const data = await response.json();
      const results = data?.Result?.Items?.Content || [];
      setProducts((prev) => (page === 1 ? results : [...prev, ...results]));
  
      // Dynamically calculate the total products based on results
      const currentTotal = page === 1 ? results.length : products.length + results.length;
      setTotalProducts(currentTotal);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (slug) fetchProducts(decodeURIComponent(slug), currentPage);
  }, [slug, currentPage]);

  const handleLoadMore = () => setCurrentPage((prev) => prev + 1);

  return (
    <Box>
      <FlexBox justifyContent="space-between" alignItems="center" mb="20px">
        <div>
          <H5>Searching for {decodeURIComponent(slug)}</H5>
          <Paragraph>{totalProducts} results found</Paragraph>
        </div>
      </FlexBox>

      {/* <Grid container spacing={6}>
        {products.map((product: any, index: number) => (
          <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
            <Card>
              <h5>{product.Title || `Product ${index + 1}`}</h5>
            </Card>
              
          </Grid>
        ))}
      </Grid> */}
      <Grid container spacing={6}>
  {products.map((product: any, index: number) => (
    <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
      <Box py="0.25rem" key={product.Id}>
                                <Card p="1rem" borderRadius={8} style={{ height: "300px" }}>
                                    <Link href={`/otproducts/${product.Id}`}>
                                    <Box position="relative">
    <img
        src={product.MainPictureUrl}
        alt={product.Title}
        style={{
            width: "100%",
            height: "190px", 
            borderRadius: "8px",
            objectFit: "cover",
        }}
        // className={styles.imgPart}
    />
</Box>

                                        <H4
                                            fontWeight="600"
                                            fontSize="18px"
                                            mb="0.25rem"
                                            style={{
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {product.Title}
                                        </H4>

                                        <FlexBox flexDirection="column">
                        {product.Price.DiscountPrice > 0 ? (
                          <>
                            <H4
                              fontWeight="600"
                              fontSize="14px"
                              color="text.muted"
                            >
                              BDT <del>{product.Price.OriginalPrice}</del>
                            </H4>
                            <Box marginTop="4px">
                              <H4
                                fontWeight="600"
                                fontSize="14px"
                                color="primary.main"
                              >
                                {currency(product.Price.DiscountPrice)}
                              </H4>
                            </Box>
                          </>
                        ) : (
                          <H4
                            fontWeight="600"
                            fontSize="14px"
                            color="primary.main"
                          >
                            {currency(product.Price.ConvertedPriceWithoutSign)}
                          </H4>
                        )}
                      </FlexBox>
                                    </Link>
                                </Card>
                            </Box>
    </Grid>
  ))}
</Grid>


      {/* {loading && <Paragraph>Loading...</Paragraph>} */}
      
                    {loading && (
                      <LoaderWrapper>
                        <Vortex />
                      </LoaderWrapper>
                    )}

      {currentPage * productsPerPage < totalProducts && (
        <FlexBox justifyContent="center" mt="20px">
          <button onClick={handleLoadMore}>Load More</button>
        </FlexBox>
      )}
    </Box>
  );
}
