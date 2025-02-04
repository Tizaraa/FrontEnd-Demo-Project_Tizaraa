"use client";
import { Fragment, useEffect, useState, useRef } from "react";
import Grid from "@component/grid/Grid";
import axios from "axios";
import FlexBox from "@component/FlexBox";
import ShopCard1 from "@sections/shop/ShopCard1";
import { H2 } from "@component/Typography";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import Box from "@component/Box";
import ApiBaseUrl from "api/ApiBaseUrl";

// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import tizaraa_watermark from "../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import Image from "next/image";
import NextImage from "@component/NextImage";


const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoShopMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 1.5rem;
  color: gray;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
`;

const SelectField = styled.select`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default function ShopList() {
  const [shopList, setShopList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noShopsFound, setNoShopsFound] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const observerRef = useRef(null);

  useEffect(() => {
    fetchProvinces();
    fetchAllShops();
  }, []);

  useEffect(() => {
    if (isLoading || currentPage >= lastPage) return;

    const handleScroll = (entries: any) => {
      const target = entries[0];
      if (target.isIntersecting) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [isLoading, currentPage, lastPage]);

  useEffect(() => {
    if (currentPage > 1) {
      loadMoreShops(); // Load more shops when currentPage changes, only if not searching
    }
  }, [currentPage]);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get("https://frontend.tizaraa.com/api/all/address");
      setProvinces(response.data);
    } catch (error) {
      console.error("Error fetching provinces", error);
    }
  };

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setSelectedProvince(provinceId);
    setCities([]); // Clear cities on province change
    setAreas([]); // Clear areas on province change
    setSelectedCity(""); // Reset selected city
    setSelectedArea(""); // Reset selected area
    setCurrentPage(1);
    setLastPage(1);

    if (provinceId) {
      const province = provinces.find((p) => p.id === parseInt(provinceId));
      if (province && province.city) {
        setCities(province.city);
      }
      await fetchShopsByProvince(provinceId);
    } else {
      fetchAllShops();
    }
  };

  const handleCityChange = async (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setAreas([]); // Clear areas on city change
    setSelectedArea(""); // Reset selected area
    setCurrentPage(1);
    setLastPage(1);

    if (cityId) {
      const city = cities.find((c) => c.id === parseInt(cityId));
      if (city && city.areas) {
        setAreas(city.areas);
      }
      await fetchShopsByCity(cityId);
    } else {
      fetchAllShops();
    }
  };

  const handleAreaChange = async (e) => {
    const areaId = e.target.value;
    setSelectedArea(areaId);
    setCurrentPage(1);
    setLastPage(1);

    if (areaId) {
      await fetchShopsByArea(areaId);
    } else {
      fetchAllShops();
    }
  };

  const fetchAllShops = async () => {
    setIsLoading(true);
    setIsSearching(false);
    try {
      const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
        page: currentPage,
      });
      setShopList((prevShopList) => [
        ...prevShopList,
        ...response.data.data,
      ]);
      setNoShopsFound(response.data.data.length === 0);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching shops", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchShopsByProvince = async (provinceId) => {
    setIsLoading(true);
    setIsSearching(true);
    try {
      const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
        province_id: provinceId,
        page: currentPage,
      });
      setShopList(response.data.data);
      setNoShopsFound(response.data.data.length === 0);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching shops by province", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchShopsByCity = async (cityId) => {
    setIsLoading(true);
    setIsSearching(true);
    try {
      const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
        city_id: cityId,
        page: currentPage,
      });
      setShopList(response.data.data);
      setNoShopsFound(response.data.data.length === 0);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching shops by city", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchShopsByArea = async (areaId) => {
    setIsLoading(true);
    setIsSearching(true);
    try {
      const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
        area_id: areaId,
        page: currentPage,
      });
      setShopList(response.data.data);
      setNoShopsFound(response.data.data.length === 0);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching shops by area", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreShops = async () => {
    if (isLoading || currentPage >= lastPage) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${ApiBaseUrl.baseUrl}all/seller/profile?page=${currentPage}`, {
        page: currentPage,
      });
      setShopList((prevShopList) => [
        ...prevShopList,
        ...response.data.data,
      ]);
      setNoShopsFound(response.data.data.length === 0);
      setLastPage(response.data.last_page);
    } catch (error) {
      console.error("Error fetching more shops", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    <NextImage
  alt="newArrivalBanner"
  src={tizaraa_watermark}
  priority
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -20%)",
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

    <Fragment>
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <H2 mb="20px">All Shops</H2>
        <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto">
           <SelectWrapper>
             <SelectField onChange={handleProvinceChange}>
               <option value="">Select Province</option>
               {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.province}
                </option>
              ))}
            </SelectField>
            <SelectField onChange={handleCityChange}>
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.city}
                </option>
              ))}
            </SelectField>
            <SelectField onChange={handleAreaChange}>
              <option value="">Select Area</option>
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.area}
                </option>
              ))}
            </SelectField>
          </SelectWrapper>
        </Box>
      </div>

      {shopList.length > 0 ? (
        <Grid container spacing={3}>
          {shopList.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <ShopCard1
                name={item.name}
                phone={item.phone}
                address={item.address || "Address not found"}
                rating={item.rating || 5}
                // imgUrl={item.profilePicture}
                // imgUrl={`${ApiBaseUrl.ImgUrl}${item.profilePicture}`}
                imgUrl={item.profilePicture ? `${ApiBaseUrl.ImgUrl}${item.profilePicture}` : 'https://t4.ftcdn.net/jpg/04/15/60/27/360_F_415602715_uy5b6P84JetkpRCLxNmYgrx8pWIATsAD.jpg'}
                // coverImgUrl={item.coverPicture}
                coverImgUrl={item.coverPicture ? `${ApiBaseUrl.ImgUrl}${item.coverPicture}` : 'https://static.vecteezy.com/system/resources/previews/011/059/783/non_2x/best-seller-text-button-speech-bubble-best-seller-colorful-web-banner-template-illustration-vector.jpg'}
                shopUrl={`/shops/${item.slug}`}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        !isLoading && <NoShopMessage>No shop found</NoShopMessage>
      )}

      {isLoading && (
        <LoaderWrapper>
          <Vortex />
        </LoaderWrapper>
      )}

      <div ref={observerRef}></div>
    </Fragment>
  </main>
    
    </>
  );
}