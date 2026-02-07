"use client";
import Section1 from "@sections/market-1/Section1";
import Section8 from "@sections/market-1/Section8";
import Section10 from "@sections/market-1/Section10";
import Section12 from "@sections/market-1/Section12";
import JustForYouProducts from "@sections/market-1/JustForYouPeoducts/JustForYouProducts";
import ProductCarousel from "@sections/market-1/NewArrivalsProducts/ProductCarousel";
import CampaignProducts from "@sections/market-1/CampaingProducts";
import FlashSaleBanner from "@sections/market-1/FlashSaleBanner";
import OTCProducts from "@sections/market-1/OTCProducts";
import tizaraa_watermark from "../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import NextImage from "@component/NextImage";
import CampaignBanner from "@sections/market-1/CampaignBanner";
import useFetcher from "@hook/useFetcher";

const MarketOnePage = () => {
    const { data, isLoading } = useFetcher(`frontend/remark/product/items`);
    const { data: corporateProduct, isLoading: isLoadingCorporate } = useFetcher(
        `v1/home/corporate-product`
    );
    const { data: groceryProduct, isLoading: isLoadingGrocery } = useFetcher(
        `frontend/category/product/view`
    );
    return (
        <>
            {/* Background image */}
            <NextImage
                alt="newArrivalBanner"
                src={tizaraa_watermark}
                priority
                style={{
                    position: "fixed",
                    top: "70%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%", // Set to 100% to ensure full responsiveness
                    height: "auto", // Maintain aspect ratio
                    maxWidth: "1200px", // Optional: Limit the maximum width
                    backgroundSize: "contain", // Adjust the scaling behavior
                    backgroundPosition: "center",
                    opacity: 0.1,
                    zIndex: 0,
                }}
            />

            <main
                style={{
                    position: "relative",
                    background: "none",
                }}
            >
                {/* ======================================= */}
                {/* Hero / Top Banner Section */}
                {/* ======================================= */}
                <Section1 />

                {/* ======================================= */}
                {/* Featured / Promotional Section */}
                {/* ======================================= */}
                <Section10 />

                {corporateProduct?.data?.length > 0 && (
                    <ProductCarousel
                        title="Corporate Products"
                        data={corporateProduct?.data || []}
                        isLoading={isLoadingCorporate}
                        seeMoreLink="/shops/payoneer-garments"
                    />
                )}
                {/* ======================================= */}
                {/* Campaign Section Banner */}
                {/* ======================================= */}
                <CampaignBanner />

                {/* ======================================= */}
                {/* Campaign / Special Deals Section */}
                {/* ======================================= */}
                <CampaignProducts />

                {/* ======================================= */}
                {/* New Arrivals Section Banner */}
                {/* ======================================= */}
                <Section8 />

                {/* ======================================= */}
                {/* New Arrivals Section */}
                {/* ======================================= */}
                <ProductCarousel
                    title="New Arrivals"
                    data={data?.newarrival || []}
                    isLoading={isLoading}
                    seeMoreLink="/newarrivals/new_arrivals"
                />

                {/* ======================================= */}
                {/* Flash Sale Banner */}
                {/* ======================================= */}
                <FlashSaleBanner />

                {/* ======================================= */}
                {/* Flash Sale Products */}
                {/* ======================================= */}
                <ProductCarousel
                    data={data?.flashSale || []}
                    title="Flash Sale"
                    isLoading={isLoading}
                    seeMoreLink="/flashsale/flash_sale"
                />

                {/* ======================================= */}
                {/* OTC Products */}
                {/* ======================================= */}
                <OTCProducts />

                {/* ======================================= */}
                {/* Grocery Products */}
                {/* ======================================= */}
                <ProductCarousel
                    title="Grocery"
                    data={groceryProduct?.GroceryProduct || []}
                    isLoading={isLoadingGrocery}
                    seeMoreLink="/category/grocery"
                />

                {/* ======================================= */}
                {/* Stationery Products */}
                {/* ======================================= */}
                <ProductCarousel
                    title="Stationery & Craft"
                    data={groceryProduct?.stationeryproduct || []}
                    isLoading={isLoadingGrocery}
                    seeMoreLink="/category/stationery-&-craft"
                />

                {/* ======================================= */}
                {/* Just For You Products */}
                {/* ======================================= */}
                <JustForYouProducts />

                {/* ======================================= */}
                {/* Find products by country */}
                {/* ======================================= */}
                <Section12 />
            </main>
        </>
    );
};

export default MarketOnePage;
