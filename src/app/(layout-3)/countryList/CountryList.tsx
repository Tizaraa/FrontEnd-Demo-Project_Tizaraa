"use client";

import { useEffect, useState } from "react";
import Grid from "@component/grid/Grid";
import { H4 } from "@component/Typography";
import Image from "@component/Image";
import CategorySectionCreator from "@component/CategorySectionCreator";
import Link from "next/link";
import { flex, marginBottom } from "styled-system";

type Product = {
  id: number;
  location: string;
  location_slug: string;
  image: string;
};

export default function CountryList() {
  const [serviceList, setServiceList] = useState<Product[]>([]);

  // Fetch data from the API
  useEffect(() => {
    fetch("https://frontend.tizaraa.com/api/product/all/country")
      .then((response) => response.json())
      .then((data) => {
        setServiceList(data.country); // Assuming the API response contains a 'country' array
        console.log(data.country);
      })
      .catch((error) => {
        console.error("Error fetching service list:", error);
      });
  }, []);

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {/* <video
        style={{ width: '100%', height: '50vh' }} 
        controls
        preload="none"
      >
        <source src="/path/to/video.mp4" type="video/mp4" />
        <track
          src="/path/to/captions.vtt"
          kind="subtitles"
          srcLang="en"
          label="English"
        />
        Your browser does not support the video tag.
      </video> */}

      <div style={{ marginTop: '70px' }}>
        <CategorySectionCreator title="Find products by country or region" seeMoreLink={`countryList/CountryList`}>
          <Grid container spacing={0}>
            {serviceList.length > 0 ? (
              serviceList.map((item) => (
                <Grid item lg={2} md={2} sm={4} xs={6} key={item.id} style={{ textAlign: 'center', marginBottom: '4rem' }}>
                  <Link href={`/country/${encodeURIComponent(item.location_slug)}`} 
                  style={{
                    width: '80%',
                    height: '150%',
                    borderRadius: '50%',
                    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    justifyContent: 'center',
                    display: 'grid',
                    alignItems: 'center',
                    overflow: 'hidden',
                    margin: '0 auto',
                    
                  }}>
                  <div style={{textAlign: 'center'}}>
                    <Image src={item.image} alt={item.location} width={70} height={50}  />
                    <H4 mt="10px" mb="5px" textAlign="center">
                      {item.location}
                    </H4>
                    </div>
                  </Link>
                </Grid>
              ))
            ) : (
              <div style={{ textAlign: 'center', width: '100%', padding: '20px' }}>
                <p>No services available.</p>
              </div>
            )}
          </Grid>
        </CategorySectionCreator>
      </div>
    </div>
  );
}
