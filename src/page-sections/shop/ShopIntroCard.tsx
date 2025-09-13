// "use client";

// import Box from "@component/Box";
// import Rating from "@component/rating";
// import Avatar from "@component/avatar";
// import Icon from "@component/icon/Icon";
// import FlexBox from "@component/FlexBox";
// import { Button } from "@component/buttons";
// import { H3, SemiSpan, Small } from "@component/Typography";
// import { ShopIntroWrapper } from "./styles";
// import { useState, useEffect } from "react";
// import { Vortex } from "react-loader-spinner";
// import styled from "@emotion/styled";
// import ApiBaseUrl from "api/ApiBaseUrl";

// const LoaderWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// interface Props {
//   slug: string;
// }

// export default function ShopIntroCard({ slug }: Props) {
//   const [shop, setShop] = useState<any>(null);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     const fetchSingleShop = async () => {
//       try {
//         const response = await fetch(
//           `${ApiBaseUrl.baseUrl}seller/profile/${slug}`
//         );
//         //console.log(response);

//         const data = await response.json();
//         //console.log(data.sellerDetails);

//         setShop(data);
//       } catch (err) {
//         setError("Failed to load shop data");
//         console.error(err);
//       }
//     };

//     fetchSingleShop();
//   }, [slug]);

//   if (!shop) {
//     return (
//       <LoaderWrapper>
//         <Vortex />
//       </LoaderWrapper>
//     );
//   }
//   return (
//     <ShopIntroWrapper mb="32px" pb="20px" overflow="hidden">
//       <Box
//         className="cover-image"
//         height="202px"
//         style={{
//           backgroundImage: `url(${shop.sellerDetails.seller_banner ? `${ApiBaseUrl.ImgUrl}${shop.sellerDetails.seller_banner}` : "https://static.vecteezy.com/system/resources/previews/011/059/783/non_2x/best-seller-text-button-speech-bubble-best-seller-colorful-web-banner-template-illustration-vector.jpg"})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       />

//       <FlexBox mt="-64px" px="30px" flexWrap="wrap">
//         <Avatar
//           size={120}
//           mr="37px"
//           border="4px solid"
//           borderColor="gray.100"
//           src={shop.sellerDetails.seller_logo ? `${ApiBaseUrl.ImgUrl}${shop.sellerDetails.seller_logo}` : "https://t4.ftcdn.net/jpg/04/15/60/27/360_F_415602715_uy5b6P84JetkpRCLxNmYgrx8pWIATsAD.jpg"}

//         />

//         <div className="description-holder">
//           <FlexBox
//             mt="3px"
//             mb="22px"
//             flexWrap="wrap"
//             alignItems="center"
//             justifyContent="space-between"
//           >
//             <Box
//               my="8px"
//               p="4px 16px"
//               borderRadius="4px"
//               bg="secondary.main"
//               display="inline-block"
//             >
//               <H3 fontWeight="600" color="gray.100">
//                 {shop.sellerDetails.shop_name || "Seller name not found"}
//               </H3>
//             </Box>

//             <FlexBox my="8px">
//               {socialLinks.map((item, ind) => (
//                 <a
//                   key={ind}
//                   href={item.url}
//                   target="_blank"
//                   rel="noreferrer noopener"
//                 >
//                   <Icon
//                     size="30px"
//                     defaultcolor="auto"
//                     mr={ind < socialLinks.length - 1 ? "10px" : ""}
//                   >{`${item.name}_filled`}</Icon>
//                 </a>
//               ))}
//             </FlexBox>
//           </FlexBox>

//           <FlexBox
//             flexWrap="wrap"
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <div>
//               <FlexBox alignItems="center" mb="14px">
//                 <Rating color="warn" value={5} outof={5} readOnly />

//                 <Small color="text.muted" pl="0.75rem" display="block">
//                   {shop.averageRating || "0"}
//                 </Small>
//               </FlexBox>

//               <FlexBox color="text.muted" mb="8px" maxWidth="270px">
//                 <Icon defaultcolor="currentColor" size="15px" mt="5px">
//                   map-pin-2
//                 </Icon>

//                 <SemiSpan color="text.muted" ml="12px">
//                   {shop.sellerDetails.seller_address ||
//                     "Seller address not found"}
//                 </SemiSpan>
//               </FlexBox>

//               <FlexBox color="text.muted" mb="8px">
//                 <Icon defaultcolor="currentColor" size="15px" mt="4px">
//                   phone_filled
//                 </Icon>

//                 <SemiSpan color="text.muted" ml="12px">
//                   {shop.sellerDetails.phone || "Seller number not found"}
//                 </SemiSpan>
//               </FlexBox>
//             </div>

//             <a href="mailto:scarletbeauty@xmail.com">
//               <Button variant="outlined" color="primary" my="12px">
//                 Contact Vendor
//               </Button>
//             </a>
//           </FlexBox>
//         </div>
//       </FlexBox>
//     </ShopIntroWrapper>
//   );
// }

// const socialLinks = [
//   { name: "facebook", url: "https://facebook.com" },
//   { name: "twitter", url: "https://twitter.com" },
//   { name: "youtube", url: "https://youtube.com" },
//   { name: "instagram", url: "https://instagram.com" },
// ];

"use client";

import Box from "@component/Box";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { Button } from "@component/buttons";
import { H3, SemiSpan, Small } from "@component/Typography";
import { ShopIntroWrapper } from "./styles";
import { useState, useEffect } from "react";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  width: 90%;
  max-width: 900px;
  max-height: 90%;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 10px;
  border-radius: 50%;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: white;
    color: #333;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 0;
  overflow: hidden;
`;

const AddressClickable = styled(FlexBox)`
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

const HeaderSection = styled.div`
  background: #e94560;
  color: white;
  padding: 8px;
  text-align: center;
  position: relative;
`;

const ShopTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const AddressText = styled.div`
  font-size: 14px;
  opacity: 0.95;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
`;

const ButtonSection = styled.div`
  padding: 20px 24px;
  background: #f8f9fa;
  display: flex;
  justify-content: center;
  gap: 16px;
`;

interface Props {
  slug: string;
}

export default function ShopIntroCard({ slug }: Props) {
  const [shop, setShop] = useState<any>(null);
  const [error, setError] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapKey, setMapKey] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchSingleShop = async () => {
      try {
        const response = await fetch(
          `${ApiBaseUrl.baseUrl}seller/profile/${slug}`
        );

        const data = await response.json();
        console.log("data.sellerDetails");
        console.log(data.sellerDetails.latlon);

        setShop(data);
      } catch (err) {
        setError("Failed to load shop data");
        console.error(err);
      }
    };

    fetchSingleShop();
  }, [slug]);

  // Detect when user returns to tab and refresh map
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && showMapModal) {
        // User returned to tab and modal is open, refresh map
        setIsVisible(false);
        setTimeout(() => {
          setIsVisible(true);
          setMapKey((prev) => prev + 1);
        }, 100);
      }
    };

    const handleFocus = () => {
      if (showMapModal) {
        // Tab got focus, refresh map
        setMapKey((prev) => prev + 1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [showMapModal]);

  // Force map refresh every time modal opens
  useEffect(() => {
    if (showMapModal) {
      setIsVisible(true);
      setMapKey((prev) => prev + 1);
    }
  }, [showMapModal]);

  const handleAddressClick = () => {
    if (shop?.sellerDetails?.latlon) {
      setShowMapModal(true);
    }
  };

  const closeModal = () => {
    setShowMapModal(false);
  };

  const getMapUrl = () => {
    if (!shop?.sellerDetails?.latlon) return "";

    const [lat, lon] = shop.sellerDetails.latlon.split(",");
    // Add timestamp to prevent caching and force fresh load
    return `https://www.openstreetmap.org/export/embed.html?bbox=${
      parseFloat(lon) - 0.002
    },${parseFloat(lat) - 0.002},${parseFloat(lon) + 0.002},${
      parseFloat(lat) + 0.002
    }&layer=mapnik&marker=${lat},${lon}&t=${Date.now()}`;
  };

  if (!shop) {
    return (
      <LoaderWrapper>
        <Vortex />
      </LoaderWrapper>
    );
  }

  return (
    <>
      <ShopIntroWrapper mb="32px" pb="20px" overflow="hidden" zIndex={999}>
        <Box
          className="cover-image"
          height="202px"
          style={{
            backgroundImage: `url(${
              shop.sellerDetails.seller_banner
                ? `${ApiBaseUrl.ImgUrl}${shop.sellerDetails.seller_banner}`
                : "https://static.vecteezy.com/system/resources/previews/011/059/783/non_2x/best-seller-text-button-speech-bubble-best-seller-colorful-web-banner-template-illustration-vector.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <FlexBox mt="-64px" px="30px" flexWrap="wrap">
          <Avatar
            size={120}
            mr="37px"
            border="4px solid"
            borderColor="gray.100"
            src={
              shop.sellerDetails.seller_logo
                ? `${ApiBaseUrl.ImgUrl}${shop.sellerDetails.seller_logo}`
                : "https://t4.ftcdn.net/jpg/04/15/60/27/360_F_415602715_uy5b6P84JetkpRCLxNmYgrx8pWIATsAD.jpg"
            }
          />

          <div className="description-holder">
            <FlexBox
              mt="3px"
              mb="22px"
              flexWrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box
                my="8px"
                p="4px 16px"
                borderRadius="4px"
                bg="secondary.main"
                display="inline-block"
              >
                <H3 fontWeight="600" color="gray.100">
                  {shop.sellerDetails.shop_name || "Seller name not found"}
                </H3>
              </Box>

              <FlexBox my="8px">
                {socialLinks.map((item, ind) => (
                  <a
                    key={ind}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <Icon
                      size="30px"
                      defaultcolor="auto"
                      mr={ind < socialLinks.length - 1 ? "10px" : ""}
                    >{`${item.name}_filled`}</Icon>
                  </a>
                ))}
              </FlexBox>
            </FlexBox>

            <FlexBox
              flexWrap="wrap"
              justifyContent="space-between"
              alignItems="center"
            >
              <div>
                <FlexBox alignItems="center" mb="14px">
                  <Rating color="warn" value={5} outof={5} readOnly />

                  <Small color="text.muted" pl="0.75rem" display="block">
                    {shop.averageRating || "0"}
                  </Small>
                </FlexBox>

                <AddressClickable
                  color="text.muted"
                  mb="8px"
                  maxWidth="270px"
                  onClick={handleAddressClick}
                  title="Click to view location on map"
                >
                  <Icon defaultcolor="currentColor" size="15px" mt="5px">
                    map-pin-2
                  </Icon>

                  <SemiSpan color="text.muted" ml="12px">
                    {shop.sellerDetails.seller_address ||
                      "Seller address not found"}
                  </SemiSpan>
                </AddressClickable>

                <FlexBox color="text.muted" mb="8px">
                  <Icon defaultcolor="currentColor" size="15px" mt="4px">
                    phone_filled
                  </Icon>

                  <SemiSpan color="text.muted" ml="12px">
                    {shop.sellerDetails.phone || "Seller number not found"}
                  </SemiSpan>
                </FlexBox>
              </div>

              <a href="mailto:scarletbeauty@xmail.com">
                <Button variant="outlined" color="primary" my="12px">
                  Contact Vendor
                </Button>
              </a>
            </FlexBox>
          </div>
        </FlexBox>
      </ShopIntroWrapper>

      {/* Map Modal */}
      {showMapModal && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <HeaderSection>
              <ShopTitle>
                {shop.sellerDetails.shop_name || "Shop Location"}
              </ShopTitle>

              <AddressText>
                <Icon defaultcolor="currentColor" size="20px">
                  map-pin-2
                </Icon>
                <span>
                  {shop.sellerDetails.seller_address || "Address not available"}
                </span>
              </AddressText>
            </HeaderSection>

            <MapContainer>
              {isVisible ? (
                <iframe
                  key={`map-${mapKey}-${Date.now()}`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={getMapUrl()}
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="eager"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    background: "#f0f0f0",
                    color: "#666",
                  }}
                >
                  Loading map...
                </div>
              )}
            </MapContainer>

            <ButtonSection>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  const [lat, lon] = shop.sellerDetails.latlon.split(",");
                  window.open(
                    `https://www.google.com/maps?q=${lat},${lon}`,
                    "_blank"
                  );
                }}
                mr="12px"
              >
                Open in Google Maps
              </Button>

              <Button variant="outlined" color="primary" onClick={closeModal}>
                Close
              </Button>
            </ButtonSection>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

const socialLinks = [
  { name: "facebook", url: "https://facebook.com" },
  { name: "twitter", url: "https://twitter.com" },
  { name: "youtube", url: "https://youtube.com" },
  { name: "instagram", url: "https://instagram.com" },
];
