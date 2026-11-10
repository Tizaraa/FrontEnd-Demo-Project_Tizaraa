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

// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
// `;

// const ModalContent = styled.div`
//   background: white;
//   border-radius: 12px;
//   padding: 0;
//   width: 90%;
//   max-width: 900px;
//   max-height: 90%;
//   position: relative;
//   overflow: hidden;
//   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
// `;

// const CloseButton = styled.button`
//   position: absolute;
//   top: 16px;
//   right: 16px;
//   background: rgba(255, 255, 255, 0.95);
//   border: none;
//   font-size: 24px;
//   cursor: pointer;
//   color: #666;
//   padding: 10px;
//   border-radius: 50%;
//   z-index: 10;
//   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

//   &:hover {
//     background-color: white;
//     color: #333;
//   }
// `;

// const MapContainer = styled.div`
//   width: 100%;
//   height: 450px;
//   border-radius: 0;
//   overflow: hidden;
// `;

// const AddressClickable = styled(FlexBox)`
//   cursor: pointer;
//   transition: opacity 0.2s ease;

//   &:hover {
//     opacity: 0.7;
//   }
// `;

// const HeaderSection = styled.div`
//   background: #e94560;
//   color: white;
//   padding: 8px;
//   text-align: center;
//   position: relative;
// `;

// const ShopTitle = styled.h2`
//   font-size: 18px;
//   font-weight: 700;
//   margin: 0 0 8px 0;
//   text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
// `;

// const AddressText = styled.div`
//   font-size: 14px;
//   opacity: 0.95;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 8px;
//   margin-top: 8px;
// `;

// const ButtonSection = styled.div`
//   padding: 20px 24px;
//   background: #f8f9fa;
//   display: flex;
//   justify-content: center;
//   gap: 16px;
// `;

// interface Props {
//   slug: string;
// }

// export default function ShopIntroCard({ slug }: Props) {
//   const [shop, setShop] = useState<any>(null);
//   const [error, setError] = useState(null);
//   const [showMapModal, setShowMapModal] = useState(false);
//   const [mapKey, setMapKey] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);

//   useEffect(() => {
//     const fetchSingleShop = async () => {
//       try {
//         const response = await fetch(
//           `${ApiBaseUrl.baseUrl}seller/profile/${slug}`
//         );

//         const data = await response.json();
//         console.log("data.sellerDetails");
//         console.log(data.sellerDetails.latlon);

//         setShop(data);
//       } catch (err) {
//         setError("Failed to load shop data");
//         console.error(err);
//       }
//     };

//     fetchSingleShop();
//   }, [slug]);

//   // Detect when user returns to tab and refresh map
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (!document.hidden && showMapModal) {
//         // User returned to tab and modal is open, refresh map
//         setIsVisible(false);
//         setTimeout(() => {
//           setIsVisible(true);
//           setMapKey((prev) => prev + 1);
//         }, 100);
//       }
//     };

//     const handleFocus = () => {
//       if (showMapModal) {
//         // Tab got focus, refresh map
//         setMapKey((prev) => prev + 1);
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     window.addEventListener("focus", handleFocus);

//     return () => {
//       document.removeEventListener("visibilitychange", handleVisibilityChange);
//       window.removeEventListener("focus", handleFocus);
//     };
//   }, [showMapModal]);

//   // Force map refresh every time modal opens
//   useEffect(() => {
//     if (showMapModal) {
//       setIsVisible(true);
//       setMapKey((prev) => prev + 1);
//     }
//   }, [showMapModal]);

//   const handleAddressClick = () => {
//     if (shop?.sellerDetails?.latlon) {
//       setShowMapModal(true);
//     }
//   };

//   const closeModal = () => {
//     setShowMapModal(false);
//   };

//   const getMapUrl = () => {
//     if (!shop?.sellerDetails?.latlon) return "";

//     const [rawLat, rawLon] = shop.sellerDetails.latlon.split(",").map((v) => v.trim());
//     const lat = parseFloat(rawLat);
//     const lon = parseFloat(rawLon);

//     if (isNaN(lat) || isNaN(lon)) return "";

//     // Create a small bounding box around the point
//     const delta = 0.002;
//     const minLon = lon - delta;
//     const minLat = lat - delta;
//     const maxLon = lon + delta;
//     const maxLat = lat + delta;

//     return `https://www.openstreetmap.org/export/embed.html?bbox=${minLon},${minLat},${maxLon},${maxLat}&layer=mapnik&marker=${lat},${lon}&zoom=15&t=${Date.now()}`;
//   };

//   if (!shop) {
//     return (
//       <LoaderWrapper>
//         <Vortex />
//       </LoaderWrapper>
//     );
//   }

//   return (
//     <>
//       <ShopIntroWrapper mb="32px" pb="20px" overflow="hidden" zIndex={999}>
//         <Box
//           className="cover-image"
//           height="202px"
//           style={{
//             backgroundImage: `url(${
//               shop.sellerDetails.seller_banner
//                 ? `${ApiBaseUrl.ImgUrl}${shop.sellerDetails.seller_banner}`
//                 : "https://static.vecteezy.com/system/resources/previews/011/059/783/non_2x/best-seller-text-button-speech-bubble-best-seller-colorful-web-banner-template-illustration-vector.jpg"
//             })`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />

//         <FlexBox mt="-64px" px="30px" flexWrap="wrap">
//           <Avatar
//             size={120}
//             mr="37px"
//             border="4px solid"
//             borderColor="gray.100"
//             src={
//               shop.sellerDetails.seller_logo
//                 ? `${ApiBaseUrl.ImgUrl}${shop.sellerDetails.seller_logo}`
//                 : "https://t4.ftcdn.net/jpg/04/15/60/27/360_F_415602715_uy5b6P84JetkpRCLxNmYgrx8pWIATsAD.jpg"
//             }
//           />

//           <div className="description-holder">
//             <FlexBox
//               mt="3px"
//               mb="22px"
//               flexWrap="wrap"
//               alignItems="center"
//               justifyContent="space-between"
//             >
//               <Box
//                 my="8px"
//                 p="4px 16px"
//                 borderRadius="4px"
//                 bg="secondary.main"
//                 display="inline-block"
//               >
//                 <H3 fontWeight="600" color="gray.100">
//                   {shop.sellerDetails.shop_name || "Seller name not found"}
//                 </H3>
//               </Box>

//               <FlexBox my="8px">
//                 {socialLinks.map((item, ind) => (
//                   <a
//                     key={ind}
//                     href={item.url}
//                     target="_blank"
//                     rel="noreferrer noopener"
//                   >
//                     <Icon
//                       size="30px"
//                       defaultcolor="auto"
//                       mr={ind < socialLinks.length - 1 ? "10px" : ""}
//                     >{`${item.name}_filled`}</Icon>
//                   </a>
//                 ))}
//               </FlexBox>
//             </FlexBox>

//             <FlexBox
//               flexWrap="wrap"
//               justifyContent="space-between"
//               alignItems="center"
//             >
//               <div>
//                 <FlexBox alignItems="center" mb="14px">
//                   <Rating color="warn" value={5} outof={5} readOnly />

//                   <Small color="text.muted" pl="0.75rem" display="block">
//                     {shop.averageRating || "0"}
//                   </Small>
//                 </FlexBox>

//                 <AddressClickable
//                   color="text.muted"
//                   mb="8px"
//                   maxWidth="270px"
//                   onClick={handleAddressClick}
//                   title="Click to view location on map"
//                 >
//                   <Icon defaultcolor="currentColor" size="15px" mt="5px">
//                     map-pin-2
//                   </Icon>

//                   <SemiSpan color="text.muted" ml="12px">
//                     {shop.sellerDetails.seller_address ||
//                       "Seller address not found"}
//                   </SemiSpan>
//                 </AddressClickable>

//                 <FlexBox color="text.muted" mb="8px">
//                   <Icon defaultcolor="currentColor" size="15px" mt="4px">
//                     phone_filled
//                   </Icon>

//                   <SemiSpan color="text.muted" ml="12px">
//                     {shop.sellerDetails.phone || "Seller number not found"}
//                   </SemiSpan>
//                 </FlexBox>
//               </div>

//               <a href="mailto:scarletbeauty@xmail.com">
//                 <Button variant="outlined" color="primary" my="12px">
//                   Contact Vendor
//                 </Button>
//               </a>
//             </FlexBox>
//           </div>
//         </FlexBox>
//       </ShopIntroWrapper>

//       {/* Map Modal */}
//       {showMapModal && (
//         <ModalOverlay onClick={closeModal}>
//           <ModalContent onClick={(e) => e.stopPropagation()}>
//             <HeaderSection>
//               <ShopTitle>
//                 {shop.sellerDetails.shop_name || "Shop Location"}
//               </ShopTitle>

//               <AddressText>
//                 <Icon defaultcolor="currentColor" size="20px">
//                   map-pin-2
//                 </Icon>
//                 <span>
//                   {shop.sellerDetails.seller_address || "Address not available"}
//                 </span>
//               </AddressText>
//             </HeaderSection>

//             <MapContainer>
//               {isVisible ? (
//                 <iframe
//                   key={`map-${mapKey}-${Date.now()}`}
//                   width="100%"
//                   height="100%"
//                   frameBorder="0"
//                   scrolling="no"
//                   marginHeight={0}
//                   marginWidth={0}
//                   src={getMapUrl()}
//                   style={{ border: 0 }}
//                   allowFullScreen
//                   loading="eager"
//                   referrerPolicy="no-referrer-when-downgrade"
//                 />
//               ) : (
//                 <div
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "100%",
//                     background: "#f0f0f0",
//                     color: "#666",
//                   }}
//                 >
//                   Loading map...
//                 </div>
//               )}
//             </MapContainer>

//             <ButtonSection>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                   const [lat, lon] = shop.sellerDetails.latlon.split(",");
//                   window.open(
//                     `https://www.google.com/maps?q=${lat},${lon}`,
//                     "_blank"
//                   );
//                 }}
//                 mr="12px"
//               >
//                 Open in Google Maps
//               </Button>

//               <Button variant="outlined" color="primary" onClick={closeModal}>
//                 Close
//               </Button>
//             </ButtonSection>
//           </ModalContent>
//         </ModalOverlay>
//       )}
//     </>
//   );
// }

// const socialLinks = [
//   { name: "facebook", url: "https://facebook.com" },
//   { name: "twitter", url: "https://twitter.com" },
//   { name: "youtube", url: "https://youtube.com" },
//   { name: "instagram", url: "https://instagram.com" },
// ];

"use client";

import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import styledSC, { keyframes } from "styled-components";
import toast from "react-hot-toast";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Icon from "@component/icon/Icon";
import { Button } from "@component/buttons";
import tz from "../../theme/tizaraa";
import ApiBaseUrl from "api/ApiBaseUrl";
import useFetcher from "@hook/useFetcher";

// ==============================================================
// Header card styles (styled-components, tz tokens)
// ==============================================================

const rise = keyframes`
 from { opacity: 0; transform: translateY(12px); }
 to { opacity: 1; transform: none; }
`;
const pop = keyframes`
 0% { opacity: 0; transform: scale(0.7); }
 60% { opacity: 1; transform: scale(1.05); }
 100% { opacity: 1; transform: none; }
`;
const settle = keyframes`
 from { opacity: 0; transform: scale(1.04); }
 to { opacity: 1; transform: none; }
`;
const shimmer = keyframes`
 from { background-position: -600px 0; }
 to { background-position: 600px 0; }
`;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const Card = styledSC.section`
 position: relative;
 margin-bottom: 24px;
 overflow: hidden;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 20px;
 background: ${({ theme }) => theme.tz.color.paper};
 box-shadow: ${({ theme }) => theme.tz.elevation.raised};

 /* ---------- banner ---------- */
 .si-banner {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: ${({ theme }) => theme.tz.color.navy};
 }
 .si-banner-art {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, ${({ theme }) => theme.tz.color.navy} 0%, #1d4f8a 55%, ${({ theme }) => theme.tz.color.ember} 140%);
  animation: ${settle} 900ms ${EASE} backwards;
 }
 .si-banner-art.is-plain::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
   radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.16) 0, transparent 36%),
   radial-gradient(circle at 10% 120%, rgba(240, 80, 35, 0.4) 0, transparent 45%),
   repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.035) 0 2px, transparent 2px 14px);
 }
 .si-banner-art img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
 }
 /* dark fade at the bottom so the banner blends into the card */
 .si-banner::after {
  content: "";
  position: absolute;
  inset: auto 0 0 0;
  height: 60%;
  background: linear-gradient(to bottom, rgba(14, 21, 32, 0) 0%, rgba(14, 21, 32, 0.45) 100%);
  pointer-events: none;
 }

 /* ---------- body ---------- */
 .si-body {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 16px 24px;
  padding: 0 28px 24px;
 }

 .si-logo {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  margin-top: -60px;
  overflow: hidden;
  border: 5px solid #fff;
  border-radius: 26px;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 48px;
  font-weight: 800;
  box-shadow: 0 0 0 1px rgba(14, 52, 96, 0.06), 0 14px 30px rgba(14, 52, 96, 0.22);
  animation: ${pop} 620ms ${EASE} 180ms backwards;
 }
 .si-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #fff;
 }

 .si-main {
  flex: 1 1 320px;
  min-width: 0;
  padding-top: 16px;
 }
 .si-name {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 28px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.tz.color.ink};
  overflow-wrap: anywhere;
  animation: ${rise} 480ms ${EASE} 260ms backwards;
 }
 .si-verified {
  display: inline-flex;
  flex-shrink: 0;
  color: ${({ theme }) => theme.tz.color.navy};
 }

 /* meta chips, staggered with --i */
 .si-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
 }
 .si-meta > li {
  display: flex;
  max-width: 100%;
  animation: ${rise} 420ms ${EASE} backwards;
  animation-delay: calc(340ms + var(--i, 0) * 70ms);
 }
 .si-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  min-height: 30px;
  padding: 4px 12px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.paper};
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  text-align: left;
  text-decoration: none;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  font-variant-numeric: tabular-nums;
  transition: color 150ms ease, border-color 150ms ease, background-color 150ms ease,
   transform 180ms ${EASE};
 }
 .si-chip svg {
  flex-shrink: 0;
  color: ${({ theme }) => theme.tz.color.slate};
  transition: color 150ms ease;
 }
 a.si-chip,
 button.si-chip {
  cursor: pointer;
 }
 a.si-chip:hover,
 button.si-chip:hover {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
  transform: translateY(-1px);
 }
 a.si-chip:hover svg,
 button.si-chip:hover svg {
  color: ${({ theme }) => theme.tz.color.ember};
 }
 .si-chip:focus-visible {
  outline: none;
  border-radius: 999px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .si-chip.is-rating {
  border-color: #f3dca0;
  background: ${({ theme }) => theme.tz.tone.warning.bg};
  color: ${({ theme }) => theme.tz.tone.warning.fg};
  font-weight: 700;
 }
 .si-chip.is-rating .si-star {
  color: ${({ theme }) => theme.tz.tone.warning.fill};
 }
 .si-chip.is-rating small {
  font-size: 12px;
  font-weight: 500;
 }
 .si-chip.is-new {
  border-color: transparent;
  background: ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .si-chip.is-stat {
  border-color: transparent;
  background: ${({ theme }) => theme.tz.color.navyTint};
  color: ${({ theme }) => theme.tz.color.navy};
 }
 .si-chip.is-stat svg {
  color: ${({ theme }) => theme.tz.color.navy};
 }

 /* ---------- actions ---------- */
 .si-side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  padding-top: 16px;
 }
 .si-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  animation: ${rise} 480ms ${EASE} 320ms backwards;
 }
 .si-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 20px;
  border: 1.5px solid transparent;
  border-radius: 999px;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: transform 180ms ${EASE}, box-shadow 180ms ease, background-color 150ms ease,
   color 150ms ease, border-color 150ms ease;
 }
 .si-btn:hover {
  transform: translateY(-2px);
 }
 .si-btn:active {
  transform: translateY(0) scale(0.97);
  box-shadow: none;
 }
 .si-btn:focus-visible {
  outline: none;
  border-radius: 999px;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .si-btn.is-primary {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  box-shadow: 0 6px 16px rgba(194, 64, 15, 0.22);
 }
 .si-btn.is-primary:hover {
  background: ${({ theme }) => theme.tz.color.emberDark};
  box-shadow: 0 10px 22px rgba(194, 64, 15, 0.3);
 }
 .si-btn.is-outline {
  border-color: ${({ theme }) => theme.tz.color.emberDeep};
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .si-btn.is-outline:hover {
  background: ${({ theme }) => theme.tz.color.emberTint};
  box-shadow: 0 8px 18px rgba(14, 52, 96, 0.1);
 }

 .si-social {
  display: flex;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
 }
 .si-social li {
  animation: ${pop} 460ms ${EASE} backwards;
  animation-delay: calc(460ms + var(--i, 0) * 70ms);
 }
 .si-social a {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.slate};
  transition: transform 200ms ${EASE}, color 150ms ease, border-color 150ms ease,
   background-color 150ms ease, box-shadow 200ms ease;
 }
 .si-social a:hover {
  transform: translateY(-3px);
  border-color: var(--brand);
  background: var(--brand);
  color: #fff;
  box-shadow: 0 8px 16px rgba(14, 52, 96, 0.18);
 }
 .si-social a:active {
  transform: scale(0.92);
 }
 .si-social a:focus-visible {
  outline: none;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (max-width: 760px) {
  .si-banner {
   height: 140px;
  }
  .si-body {
   padding: 0 16px 18px;
   gap: 12px;
  }
  .si-logo {
   width: 92px;
   height: 92px;
   margin-top: -46px;
   border-width: 4px;
   border-radius: 22px;
   font-size: 38px;
  }
  .si-main {
   flex-basis: 100%;
   padding-top: 0;
  }
  .si-name {
   font-size: 22px;
  }
  .si-side {
   width: 100%;
   align-items: stretch;
   padding-top: 0;
  }
  .si-actions .si-btn {
   flex: 1 1 0;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  .si-banner-art,
  .si-logo,
  .si-name,
  .si-meta > li,
  .si-actions,
  .si-social li {
   animation: none;
  }
  .si-btn,
  .si-chip,
  .si-social a {
   transition: none;
  }
  .si-btn:hover,
  .si-btn:active,
  .si-chip:hover,
  .si-social a:hover,
  .si-social a:active {
   transform: none;
  }
 }
`;

const Skeleton = styledSC.div`
 margin-bottom: 24px;
 overflow: hidden;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 20px;
 background: ${({ theme }) => theme.tz.color.paper};

 .sk {
  background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.mist} 0%, ${({ theme }) => theme.tz.color.lineSoft} 50%, ${({ theme }) => theme.tz.color.mist} 100%);
  background-size: 1200px 100%;
  animation: ${shimmer} 1.3s linear infinite;
 }
 .sk-banner {
  height: 180px;
 }
 .sk-body {
  display: flex;
  gap: 24px;
  padding: 0 28px 24px;
 }
 .sk-logo {
  width: 116px;
  height: 116px;
  margin-top: -58px;
  flex-shrink: 0;
  border: 4px solid #fff;
  border-radius: 24px;
 }
 .sk-lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 18px;
 }
 .sk-line {
  height: 14px;
  border-radius: 999px;
 }

 @media (max-width: 760px) {
  .sk-banner {
   height: 130px;
  }
  .sk-logo {
   width: 88px;
   height: 88px;
   margin-top: -44px;
  }
 }
 @media (prefers-reduced-motion: reduce) {
  .sk {
   animation: none;
  }
 }
`;

export function ShopIntroSkeleton() {
 return (
  <Skeleton aria-busy="true" aria-label="Loading shop">
   <div className="sk sk-banner" />
   <div className="sk-body">
    <div className="sk sk-logo" />
    <div className="sk-lines">
     <div className="sk sk-line" style={{ width: "40%", height: 22 }} />
     <div className="sk sk-line" style={{ width: "25%" }} />
     <div className="sk sk-line" style={{ width: "55%" }} />
    </div>
   </div>
  </Skeleton>
 );
}

// ==============================================================
// Map modal styles (unchanged behaviour)
// ==============================================================

const ModalOverlay = styled.div`
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background-color: rgba(14, 21, 32, 0.55);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 1000;
`;

const ModalContent = styled.div`
 background: white;
 border-radius: 18px;
 padding: 0;
 width: 90%;
 max-width: 900px;
 max-height: 90%;
 position: relative;
 overflow: hidden;
 box-shadow: ${tz.elevation.overlay};
`;

const MapContainer = styled.div`
 width: 100%;
 height: 450px;
 border-radius: 0;
 overflow: hidden;
`;

const HeaderSection = styled.div`
 background: ${tz.color.navy};
 color: white;
 padding: 14px 16px;
 text-align: center;
 position: relative;
`;

const ShopTitle = styled.h2`
 font-family: ${tz.font.display};
 font-size: 18px;
 font-weight: 700;
 margin: 0 0 4px 0;
`;

const AddressText = styled.div`
 font-size: 14px;
 opacity: 0.95;
 display: flex;
 align-items: center;
 justify-content: center;
 gap: 8px;
 margin-top: 4px;
`;

const ButtonSection = styled.div`
 padding: 16px 24px;
 background: ${tz.color.mist};
 display: flex;
 justify-content: center;
 gap: 16px;
`;

// ==============================================================
// Helpers
// ==============================================================

const Ico = ({ d, size = 16 }: { d: string; size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d={d} />
 </svg>
);
const I = {
 pin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
 phone:
  "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
 mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
 share: "M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13",
 box: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
 calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
};

const img = (p?: string | null) =>
 p ? (String(p).startsWith("http") ? p : `${ApiBaseUrl.ImgUrl}${p}`) : null;

const firstNumber = (...values: any[]) => {
 for (const v of values) {
  const n = Number(v);
  if (v !== null && v !== undefined && v !== "" && Number.isFinite(n)) return n;
 }
 return null;
};

const SOCIAL = [
 { name: "facebook", label: "Facebook", brand: "#1877F2", Glyph: FaFacebookF, keys: ["facebook", "facebook_link", "facebook_url"] },
 { name: "twitter", label: "Twitter", brand: "#1DA1F2", Glyph: FaTwitter, keys: ["twitter", "twitter_link", "twitter_url"] },
 { name: "youtube", label: "YouTube", brand: "#FF0000", Glyph: FaYoutube, keys: ["youtube", "youtube_link", "youtube_url"] },
 { name: "instagram", label: "Instagram", brand: "#E1306C", Glyph: FaInstagram, keys: ["instagram", "instagram_link", "instagram_url"] },
];

interface Props {
 slug: string;
}

export default function ShopIntroCard({ slug }: Props) {
 const { data: shop, isLoading, error } = useFetcher(`seller/profile/${slug}`);

 const [showMapModal, setShowMapModal] = useState(false);
 const [mapKey, setMapKey] = useState(0);
 const [isVisible, setIsVisible] = useState(true);
 const [logoFailed, setLogoFailed] = useState(false);
 const [bannerFailed, setBannerFailed] = useState(false);

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

 const parseCoordinates = (latlon) => {
  if (!latlon) return null;

  // Handle different possible formats
  let lat, lon;

  if (typeof latlon === "string") {
   // Try comma-separated format: "lat,lon"
   if (latlon.includes(",")) {
    const coords = latlon.split(",").map((coord) => parseFloat(coord.trim()));
    if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
     [lat, lon] = coords;
    }
   }
   // Try space-separated format: "lat lon"
   else if (latlon.includes(" ")) {
    const coords = latlon.split(" ").map((coord) => parseFloat(coord.trim()));
    if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
     [lat, lon] = coords;
    }
   }
   // Try direct parsing if it's a single number (unlikely but just in case)
   else {
    const parsed = parseFloat(latlon);
    if (!isNaN(parsed)) {
     // This case is unusual, you might need to handle this differently
     console.warn("Single coordinate value found, expected lat,lon pair");
     return null;
    }
   }
  } else if (Array.isArray(latlon) && latlon.length === 2) {
   // Handle array format: [lat, lon]
   lat = parseFloat(latlon[0]);
   lon = parseFloat(latlon[1]);
  } else if (typeof latlon === "object" && latlon.lat && latlon.lon) {
   // Handle object format: {lat: x, lon: y}
   lat = parseFloat(latlon.lat);
   lon = parseFloat(latlon.lon);
  } else if (
   typeof latlon === "object" &&
   latlon.latitude &&
   latlon.longitude
  ) {
   // Handle object format: {latitude: x, longitude: y}
   lat = parseFloat(latlon.latitude);
   lon = parseFloat(latlon.longitude);
  }

  // Validate coordinates
  if (isNaN(lat) || isNaN(lon)) {
   console.error("Invalid coordinates:", latlon);
   return null;
  }

  // Validate coordinate ranges
  if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
   console.error("Coordinates out of valid range:", { lat, lon });
   return null;
  }

  return { lat, lon };
 };

 const getMapUrl = () => {
  if (!shop?.sellerDetails?.latlon) return "";

  const coords = parseCoordinates(shop.sellerDetails.latlon);
  if (!coords) {
   console.error("Could not parse coordinates:", shop.sellerDetails.latlon);
   return "";
  }

  const { lat, lon } = coords;

  // Create a data URL with custom HTML map (most reliable)
  const customMapHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Shop Location</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
          body { margin: 0; padding: 0; }
          #map { height: 100vh; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          var map = L.map('map').setView([${lat}, ${lon}], 16);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          
          var marker = L.marker([${lat}, ${lon}]).addTo(map);
          marker.bindPopup('<b>${shop.sellerDetails.shop_name || "Shop Location"}</b><br>${shop.sellerDetails.seller_address || ""}').openPopup();
        </script>
      </body>
      </html>
    `;

  // Use the custom HTML map
  return `data:text/html;charset=utf-8,${encodeURIComponent(customMapHtml)}`;
 };

 const openInGoogleMaps = () => {
  const coords = parseCoordinates(shop.sellerDetails.latlon);
  if (coords) {
   const { lat, lon } = coords;
   window.open(`https://www.google.com/maps?q=${lat},${lon}`, "_blank");
  }
 };

 const handleShare = async () => {
  try {
   if (typeof navigator === "undefined" || !navigator.clipboard) throw new Error("no clipboard");
   await navigator.clipboard.writeText(window.location.href);
   toast.success("Shop link copied");
  } catch {
   toast.error("Couldn't copy the link");
  }
 };

 if (isLoading) {
  return <ShopIntroSkeleton />;
 }

 if (error || !shop?.sellerDetails) {
  return null;
 }

 const sd = shop.sellerDetails;
 const name = String(sd.shop_name || "").trim() || "Shop";
 const logo = logoFailed ? null : img(sd.seller_logo);
 const banner = bannerFailed ? null : img(sd.seller_banner);

 // Only show "verified" when the API actually says so
 const verified = [sd.is_verified, sd.verified, sd.isVerified, shop.is_verified].some(
  (v) => v === true || v === 1 || v === "1"
 );

 const rating = Number(shop.averageRating) || 0;
 const reviewCount = firstNumber(
  shop.totalReviews,
  shop.total_reviews,
  shop.reviewCount,
  shop.review_count,
  sd.total_reviews
 );

 // Location: address plus any area/city/province not already part of it
 const address = String(sd.seller_address ?? "").trim();
 const locationParts = [address];
 [sd.area_name, sd.city_name, sd.province_name].forEach((v) => {
  const part = String(v ?? "").trim();
  if (part && !locationParts.join(" ").toLowerCase().includes(part.toLowerCase())) {
   locationParts.push(part);
  }
 });
 const location = locationParts.filter(Boolean).join(", ");
 const phone = String(sd.phone ?? "").trim();
 const hasMap = Boolean(sd.latlon);

 // Stat chips: only from data the API returns
 const productCount = firstNumber(shop.total);
 const joinedRaw = sd.created_at || sd.joined_at || shop.created_at;
 const joinedDate = joinedRaw ? new Date(joinedRaw) : null;
 const joined =
  joinedDate && !isNaN(joinedDate.getTime())
   ? joinedDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
   : null;

 // Social links: only the shop's own links from the API, never placeholders
 const socialLinks = SOCIAL.map((s) => ({
  ...s,
  url: s.keys.map((k) => sd[k]).find((v) => typeof v === "string" && v.trim()),
 })).filter((s) => s.url);

 // Meta chips: only facts the API gives us
 const metaChips: React.ReactNode[] = [];
 metaChips.push(
  rating > 0 ? (
   <span className="si-chip is-rating">
    <span className="si-star" aria-hidden="true">★</span>
    {rating.toFixed(1)}
    {reviewCount !== null && (
     <small>
      ({reviewCount.toLocaleString("en-US")} {reviewCount === 1 ? "review" : "reviews"})
     </small>
    )}
   </span>
  ) : (
   <span className="si-chip is-new">New shop · no ratings yet</span>
  )
 );
 if (location) {
  metaChips.push(
   hasMap ? (
    <button type="button" className="si-chip" onClick={handleAddressClick} title="View location on map">
     <Ico d={I.pin} size={14} />
     <span>{location}</span>
    </button>
   ) : (
    <span className="si-chip">
     <Ico d={I.pin} size={14} />
     <span>{location}</span>
    </span>
   )
  );
 }
 if (phone) {
  metaChips.push(
   <a className="si-chip" href={`tel:${phone.replace(/[^\d+]/g, "")}`} title="Call this shop">
    <Ico d={I.phone} size={14} />
    <span>{phone}</span>
   </a>
  );
 }
 if (productCount !== null && productCount > 0) {
  metaChips.push(
   <span className="si-chip is-stat">
    <Ico d={I.box} size={14} />
    {productCount.toLocaleString("en-US")} {productCount === 1 ? "product" : "products"}
   </span>
  );
 }
 if (joined) {
  metaChips.push(
   <span className="si-chip is-stat">
    <Ico d={I.calendar} size={14} />
    Joined {joined}
   </span>
  );
 }

 return (
  <>
   <Card aria-label={`${name} shop`}>
    <div className="si-banner">
     <div className={`si-banner-art${banner ? "" : " is-plain"}`}>
      {banner && <img src={banner} alt="" onError={() => setBannerFailed(true)} />}
     </div>
    </div>

    <div className="si-body">
     <div className="si-logo">
      {logo ? (
       <img src={logo} alt={`${name} logo`} onError={() => setLogoFailed(true)} />
      ) : (
       <span aria-hidden="true">{name.charAt(0).toUpperCase()}</span>
      )}
     </div>

     <div className="si-main">
      <h1 className="si-name">
       {name}
       {verified && (
        <span className="si-verified" title="Verified seller" aria-label="Verified seller">
         <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="m12 1 2.6 2.1 3.3-.3.9 3.2 2.9 1.6-1.1 3.1 1.1 3.1-2.9 1.6-.9 3.2-3.3-.3L12 23l-2.6-2.1-3.3.3-.9-3.2-2.9-1.6L3.4 13 2.3 9.9l2.9-1.6.9-3.2 3.3.3z" />
          <path d="m8 12 3 3 5-6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
        </span>
       )}
      </h1>

      <ul className="si-meta" aria-label="Shop details">
       {metaChips.map((chip, i) => (
        <li key={i} style={{ ["--i" as any]: i }}>
         {chip}
        </li>
       ))}
      </ul>
     </div>

     <div className="si-side">
      <div className="si-actions">
       <a className="si-btn is-primary" href="mailto:scarletbeauty@xmail.com">
        <Ico d={I.mail} />
        Contact vendor
       </a>
       <button type="button" className="si-btn is-outline" onClick={handleShare}>
        <Ico d={I.share} />
        Share shop
       </button>
      </div>

      {socialLinks.length > 0 && (
       <ul className="si-social" aria-label="Social links">
        {socialLinks.map(({ name: key, label, Glyph, url, brand }, i) => (
         <li key={key} style={{ ["--i" as any]: i }}>
          <a
           href={url}
           target="_blank"
           rel="noreferrer noopener"
           aria-label={label}
           title={label}
           style={{ ["--brand" as any]: brand }}
          >
           <Glyph size={15} aria-hidden="true" />
          </a>
         </li>
        ))}
       </ul>
      )}
     </div>
    </div>
   </Card>

   {/* Map Modal */}
   {showMapModal && (
    <ModalOverlay onClick={closeModal}>
     <ModalContent onClick={(e) => e.stopPropagation()}>
      <HeaderSection>
       <ShopTitle>{sd.shop_name || "Shop Location"}</ShopTitle>

       <AddressText>
        <Icon defaultcolor="currentColor" size="20px">
         map-pin-2
        </Icon>
        <span>{sd.seller_address || "Address not available"}</span>
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
          background: tz.color.mist,
          color: tz.color.slate,
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
        onClick={openInGoogleMaps}
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
