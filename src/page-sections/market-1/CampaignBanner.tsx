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
        const res = await fetch(`${ApiBaseUrl.baseUrl}campaigns/active`);
        const data = await res.json();

        if (data?.campaign) {
          setBanner(`${ApiBaseUrl.ImgUrl}${data.campaign.banner_image}`);
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
      <Link href={`/campaign/campaign?type=${slug}`}>
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
