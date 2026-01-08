"use client";

import { useEffect, useState } from "react";
import Grid from "@component/grid/Grid";
import { H4 } from "@component/Typography";
import Image from "@component/Image";
import CategorySectionCreator from "@component/CategorySectionCreator";
import Link from "next/link";
import ApiBaseUrl from "api/ApiBaseUrl";

// import tizaraa_watermark from "../../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png"
import tizaraa_watermark from "../../../../public/assets/images/tizaraa_watermark/TizaraaSeal.png.png";
import NextImage from "@component/NextImage";

type Product = {
 id: number;
 location: string;
 location_slug: string;
 image: string;
};

export default function CountryList() {
 const [serviceList, setServiceList] = useState<Product[]>([]);
 const [isMobile, setIsMobile] = useState<boolean>(false);

 // Fetch data from the API
 useEffect(() => {
  fetch(`${ApiBaseUrl.baseUrl}product/all/country`)
   .then((response) => response.json())
   .then((data) => {
    setServiceList(data.country); // Assuming the API response contains a 'country' array
    // console.log(data.country);
   })
   .catch((error) => {
    console.error("Error fetching service list:", error);
   });

  // Check if the screen is mobile
  const handleResize = () => {
   setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as necessary
  };

  window.addEventListener("resize", handleResize);
  handleResize(); // Initial check
  return () => window.removeEventListener("resize", handleResize);
 }, []);

 return (
  <>
   {/* Background image */}
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
    <div style={{ width: "100%", overflow: "hidden" }}>
     <div style={{ marginTop: "70px" }}>
      <CategorySectionCreator title="Find products by country or region">
       <Grid container spacing={0}>
        {serviceList.length > 0 ? (
         serviceList.map((item) => (
          <Grid
           item
           lg={2.4} // 5 items per row on large devices (12 / 5 = 2.4)
           md={3} // 4 items per row on medium devices
           sm={4} // 2 items per row on small devices
           xs={12} // 1 item per row on extra small devices
           key={item.id}
           style={{
            textAlign: "center",
            marginBottom: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center", // Center vertically
           }}
          >
           <Link
            href={`/country/${encodeURIComponent(item.location_slug)}`}
            style={{
             width: isMobile ? "70%" : "80%", // Adjust width based on mobile view
             height: isMobile ? "250px" : "200px", // Adjust height for mobile view
             borderRadius: "100%",
             border: "1px solid rgba(0, 0, 0, 0.2)",
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
             overflow: "hidden",
             margin: "0 auto",
             padding: "20px",
             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Optional shadow for better visuals
             transition: "box-shadow 0.2s", // Transition for hover effects
            }}
           >
            <div style={{ textAlign: "center" }}>
             <Image
              src={item.image}
              alt={item.location}
              width={isMobile ? 150 : 100} // Adjust width for mobile view
              height={isMobile ? 100 : 70} // Adjust height for mobile view
             />
             <H4 mt="10px" mb="5px" textAlign="center">
              {item.location}
             </H4>
            </div>
           </Link>
          </Grid>
         ))
        ) : (
         <div style={{ textAlign: "center", width: "100%", padding: "20px" }}>
          <p>No services available.</p>
         </div>
        )}
       </Grid>
      </CategorySectionCreator>
     </div>
    </div>
   </main>
  </>
 );
}
