import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H5, H4, SemiSpan } from "@component/Typography";
import Link from "next/link";
import useWindowSize from "@hook/useWindowSize";
import ApiBaseUrl from "api/ApiBaseUrl"; 
import styles from "../../../../page-sections/market-1/JustForYouPeoducts/JustForYouParoducts.module.css"; 
import { Carousel } from "@component/carousel";
import { currency } from "@utils/utils";
const OTCcategoryProductView = ({ slug }: { slug: string }) => {
    const [products, setProducts] = useState<any[]>([]);
    const [otid, setOtid] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const width = useWindowSize();
    const [visibleSlides, setVisibleSlides] = useState(5);

    useEffect(() => {
        if (width < 370) setVisibleSlides(1);
        else if (width < 650) setVisibleSlides(2);
        else if (width < 950) setVisibleSlides(3);
        else setVisibleSlides(5);
    }, [width]);

    // fetch the category data 
    const fetchCategoryData = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`${ApiBaseUrl.baseUrl}category/${slug}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    page: currentPage,
                }),
            });

            if (!response.ok) throw new Error("Error fetching category data");

            const data = await response.json();
            setOtid(data.otid); 
        } catch (error) {
            console.error("Error fetching category data:", error);
        } finally {
            setLoading(false);
        }
    }, [slug]);

    // fetch category name 
    const fetchCategoryName = useCallback(async () => {
        if (!otid) return;
    
        try {
            const response = await fetch(`${ApiBaseUrl.baseUrl}otpi/get-category`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            // console.log("Category data:", data);
            const category = data.CategoryInfoList.Content.find((item: any) => item.Id === otid);
            setName(category ? category.Name : "Unknown Category");
    
        } catch (error) {
            console.error("Error fetching category name:", error);
        }
    }, [otid]);
    
    

    // fetch otc products 
    const fetchProducts = useCallback(async () => {
        if (!otid) return;

        setLoading(true);
        try {
            const response = await fetch(`${ApiBaseUrl.baseUrl}otpi/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    xmlParameters: `<SearchItemsParameters><CategoryId>${otid}</CategoryId></SearchItemsParameters>`,
                    framePosition: currentPage * 10, 
                    frameSize: 10,
                }),
            });

            if (!response.ok) throw new Error("Error fetching products");

            const data = await response.json();
            const newProducts = data.Result.Items.Content || [];

            // Filter out duplicates based on product.Id
            const uniqueProducts = newProducts.filter(
                (newProduct) => !products.some((existingProduct) => existingProduct.Id === newProduct.Id)
            );

            if (uniqueProducts.length > 0) {
                setProducts((prev) => [...prev, ...uniqueProducts]);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }, [otid, currentPage, products]);

    // category data 
    useEffect(() => {
        fetchCategoryData();
    }, [slug, fetchCategoryData]);

    // fetch products data 
    useEffect(() => {
        if (otid) fetchProducts();
    }, [otid, currentPage, fetchProducts]);

    // category name 
    useEffect(() => {
        fetchCategoryName();
    }, [fetchCategoryName]);

    const handleLoadMore = () => setCurrentPage((prev) => prev + 1);

    return (
        <Box>
            {/* Display OTID wise name  */}
      <FlexBox 
       p="1.25rem"  
       flexDirection="row" 
       alignItems="flex-start" 
       justifyContent="space-between">
      <H5>{name}</H5>
      <Link href={`/OtCategory/${otid}`}>
      <span style={{fontSize: '14px', color: 'rgb(125, 135, 156)'}}>View All </span>
      </Link>
     </FlexBox>
            {loading && <div>Loading...</div>}
            {products.length > 0 ? (
                <Box my="-0.25rem" mb="5rem">
                    <Carousel totalSlides={products.length} visibleSlides={visibleSlides}>
                        {products.map((product) => (
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
        className={styles.imgPart}
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
                        ))}
                    </Carousel>
                </Box>
            ) : (
                !loading && <div></div>
            )}
           
        </Box>
    );
};

export default OTCcategoryProductView;


