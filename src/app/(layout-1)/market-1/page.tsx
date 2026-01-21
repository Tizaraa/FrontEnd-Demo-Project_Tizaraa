// PAGE SECTION COMPONENTS
import Section1 from "@sections/market-1/Section1";
import Section8 from "@sections/market-1/Section8";
import Section10 from "@sections/market-1/Section10";
import Section12 from "@sections/market-1/Section12";
import JustForYouProducts from "@sections/market-1/JustForYouPeoducts/JustForYouProducts";
import NewArrivalsProduct from "@sections/market-1/NewArrivalsProducts/NewArrivalsProduct";
import FlashSaleProducts from "@sections/market-1/FlashSaleProducts";
import CampaignProducts from "@sections/market-1/CampaingProducts";
import FlashSaleBanner from "@sections/market-1/FlashSaleBanner";
import StationeryProducts from "@sections/market-1/StationeryProducts";
import GroceryProducts from "@sections/market-1/GroceryProducts";
import OTCProducts from "@sections/market-1/OTCProducts";
import tizaraa_watermark from "../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import NextImage from "@component/NextImage";
import CampaignBanner from "@sections/market-1/CampaignBanner";

export default async function Market1() {
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
    <NewArrivalsProduct />

    {/* ======================================= */}
    {/* Flash Sale Banner */}
    {/* ======================================= */}
    <FlashSaleBanner />

    {/* ======================================= */}
    {/* Flash Sale Products */}
    {/* ======================================= */}
    <FlashSaleProducts />

    {/* ======================================= */}
    {/* OTC Products */}
    {/* ======================================= */}
    <OTCProducts />

    {/* ======================================= */}
    {/* Grocery Products */}
    {/* ======================================= */}
    <GroceryProducts />

    {/* ======================================= */}
    {/* Stationery Products */}
    {/* ======================================= */}
    <StationeryProducts />

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
}
