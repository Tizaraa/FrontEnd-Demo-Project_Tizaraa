import { Fragment } from "react";
// API FUNCTIONS
import api from "@utils/__api__/market-2";
// GLOBAL CUSTOM COMPONENTS
import Box from "@component/Box";
import Navbar from "@component/navbar/Navbar";
// PAGE SECTION COMPONENTS
import Section1 from "@sections/market-2/section-1";
import Section9 from "@sections/market-2/section-9";
import Section10 from "@sections/market-1/Section10";
import Section2 from "@sections/market-1/Section2";
import Section3 from "@sections/market-1/Section3";
import Section4 from "@sections/market-1/Section4";
import Section5 from "@sections/market-1/Section5";
import Section6 from "@sections/market-1/Section6";
import Section7 from "@sections/market-1/Section7";
import Section8 from "@sections/market-1/Section8";
import Section11 from "@sections/market-1/Section11";
import Section12 from "@sections/market-1/Section12";
import Section13 from "@sections/market-1/Section13";
import JustForYouProducts from "@sections/market-1/JustForYouPeoducts/JustForYouProducts";
import NewArrivalsProduct from "@sections/market-1/NewArrivalsProducts/NewArrivalsProduct";
import JustForYouProduct from "@sections/market-1/Section11";
import FlashSaleProducts from "@sections/market-1/FlashSaleProducts";
import CampaignProducts from "@sections/market-1/CampaingProducts";
import FlashSaleBanner from "@sections/market-1/FlashSaleBanner";
import { Footer1, Footer2 } from "@component/footer";
import StationeryProducts from "@sections/market-1/StationeryProducts";
import GroceryProducts from "@sections/market-1/GroceryProducts";
import OTCProducts from "@sections/market-1/OTCProducts";
import tizaraa_watermark from "../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import Image from "next/image";
import NextImage from "@component/NextImage";
import CampaignBanner from "@sections/market-1/CampaignBanner";

export default async function Market3() {
 const brands = await api.getBrands();
 const products = await api.getProducts();
 const serviceList = await api.getServices();
 const categories = await api.getCategories();
 const mainCarouselData = await api.getMainCarouselData();
 const menFashionProducts = await api.getMenFashionProducts();
 const electronicsProducts = await api.getElectronicsProducts();
 const womenFashionProducts = await api.getWomenFashionProducts();

 return (
  <Fragment>
   {/* NAVBAR AREA */}
   <Navbar />

   <Box bg="#F6F6F6">
    {/* HERO CAROUSEL AREA */}
    <Section1 carouselData={mainCarouselData} />

    {/* ======================================= */}
    {/* Category Section */}
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
   </Box>
  </Fragment>
 );
}
