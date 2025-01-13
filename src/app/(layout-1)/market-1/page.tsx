// API FUNCTIONS
import api from "@utils/__api__/market-1";
// PAGE SECTION COMPONENTS
import Section1 from "@sections/market-1/Section1";
import Section2 from "@sections/market-1/Section2";
import Section3 from "@sections/market-1/Section3";
import Section4 from "@sections/market-1/Section4";
import Section5 from "@sections/market-1/Section5";
import Section6 from "@sections/market-1/Section6";
import Section7 from "@sections/market-1/Section7";
import Section8 from "@sections/market-1/Section8";
import Section10 from "@sections/market-1/Section10";
import Section11 from "@sections/market-1/Section11";
import Section12 from "@sections/market-1/Section12";
import Section13 from "@sections/market-1/Section13";
import JustForYouProducts from "@sections/market-1/JustForYouPeoducts/JustForYouProducts";
import NewArrivalsProduct from "@sections/market-1/NewArrivalsProducts/NewArrivalsProduct";
import JustForYouProduct from "@sections/market-1/Section11";
import FlashSaleProducts from "@sections/market-1/FlashSaleProducts";
import FlashSaleBanner from "@sections/market-1/FlashSaleBanner";
import { Footer1, Footer2 } from "@component/footer";
import StationeryProducts from "@sections/market-1/StationeryProducts";
import GroceryProducts from "@sections/market-1/GroceryProducts";
import OTCProducts from "@sections/market-1/OTCProducts";
import tizaraa_watermark from "../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import Image from "next/image";
import NextImage from "@component/NextImage";

export default async function Market1() {
  const carList = await api.getCarList();
  const carBrands = await api.getCarBrands();
  const moreItems = await api.getMoreItems();
  const mobileList = await api.getMobileList();
  const opticsList = await api.getOpticsList();
  const mobileShops = await api.getMobileShops();
  const opticsShops = await api.getOpticsShops();
  const serviceList = await api.getServiceList();
  const mobileBrands = await api.getMobileBrands();
  const flashDealsData = await api.getFlashDeals();
  const opticsBrands = await api.getOpticsBrands();
  const bottomCategories = await api.getCategories();
  const topCategories = await api.getTopCategories();
  const topRatedBrands = await api.getTopRatedBrand();
  const mainCarouselData = await api.getMainCarousel();
  const newArrivalsList = await api.getNewArrivalList();
  const bigDiscountList = await api.getBigDiscountList();
  const topRatedProducts = await api.getTopRatedProduct();

  return (
    <main
    style={{
      position: "relative",
      background: "none",
    }}
  >
    <Section1 />
    <Section10 />
        {/* Background image in the middle */}
 {/* <NextImage
             alt="newArrivalBanner" 
             src={tizaraa_watermark}
             priority
             style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100vh", 
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.5, 
              zIndex: 0,
            }}
             /> */}

    <Section8 />
    <NewArrivalsProduct />
    <FlashSaleBanner />
    <FlashSaleProducts />
    <OTCProducts />
    <StationeryProducts />
    <GroceryProducts />
    <JustForYouProducts />
    <Section12 />
  </main>
  );
}
