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

interface Props {
  slug: string;
}

export default function ShopIntroCard({ slug }: Props) {
  const [shop, setShop] = useState<any>(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchSingleShop = async () => {
      try {
        const response = await fetch(
          `${ApiBaseUrl.baseUrl}seller/profile/${slug}`
        );
        //console.log(response);

        const data = await response.json();
        //console.log(data.sellerDetails);

        setShop(data);
      } catch (err) {
        setError("Failed to load shop data");
        console.error(err);
      }
    };

    fetchSingleShop();
  }, [slug]);

  if (!shop) {
    return (
      <LoaderWrapper>
        <Vortex />
      </LoaderWrapper>
    );
  }
  return (
    <ShopIntroWrapper mb="32px" pb="20px" overflow="hidden">
      <Box
        className="cover-image"
        height="202px"
        style={{
          backgroundImage: `url(${shop.sellerDetails.seller_banner ? `${ApiBaseUrl.ImgUrl}${shop.sellerDetails.seller_banner}` : "https://static.vecteezy.com/system/resources/previews/011/059/783/non_2x/best-seller-text-button-speech-bubble-best-seller-colorful-web-banner-template-illustration-vector.jpg"})`,
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
          src={shop.sellerDetails.seller_logo ? `${ApiBaseUrl.ImgUrl}${shop.sellerDetails.seller_logo}` : "https://t4.ftcdn.net/jpg/04/15/60/27/360_F_415602715_uy5b6P84JetkpRCLxNmYgrx8pWIATsAD.jpg"}

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

              <FlexBox color="text.muted" mb="8px" maxWidth="270px">
                <Icon defaultcolor="currentColor" size="15px" mt="5px">
                  map-pin-2
                </Icon>

                <SemiSpan color="text.muted" ml="12px">
                  {shop.sellerDetails.seller_address ||
                    "Seller address not found"}
                </SemiSpan>
              </FlexBox>

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
  );
}

const socialLinks = [
  { name: "facebook", url: "https://facebook.com" },
  { name: "twitter", url: "https://twitter.com" },
  { name: "youtube", url: "https://youtube.com" },
  { name: "instagram", url: "https://instagram.com" },
];
