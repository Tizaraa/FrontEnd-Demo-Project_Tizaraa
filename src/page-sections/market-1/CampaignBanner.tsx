"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Container from "@component/Container";
import NextImage from "@component/NextImage";
import ApiBaseUrl from "api/ApiBaseUrl";

interface Campaign {
 banner_image: string;
 slug: string;
}

export default function CampaignBanner() {
 const [banner, setBanner] = useState<string | null>(null);
 const [slug, setSlug] = useState<string>("");

 useEffect(() => {
  async function fetchCampaign() {
   try {
    const { default: axiosClient } = await import("@lib/axiosClient");
    const res = await axiosClient.get(`campaigns/active`);
    const data = res.data;

    if (data?.campaign) {
     const img = data.campaign.banner_image;
     setBanner(img?.startsWith('http') ? img : `${ApiBaseUrl.ImgUrl}${img}`);
     setSlug(data.campaign.slug);
    } else {
     console.warn("No active campaign found");
    }
   } catch (error) {
    console.error("Error fetching campaign:", error);
   }
  }
  fetchCampaign();
 }, []);

 if (!banner) return null;

 return (
  <Container mb="50px">
   <Link href={`/campaign/campaign?type=${slug}`} target="_blank">
    <NextImage
     alt="Campaign Banner"
     src={banner}
     width={1200}
     height={400}
     priority
     style={{ width: "100%", height: "auto" }}
    />
   </Link>
  </Container>
 );
}
