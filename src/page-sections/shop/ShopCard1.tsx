"use client";

import Link from "next/link";

import Box from "@component/Box";
import Avatar from "@component/avatar";
import Rating from "@component/rating";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import { IconButton } from "@component/buttons";
import { H3, SemiSpan } from "@component/Typography";
import { ShopCard1Wrapper } from "./styles";
import { height } from "styled-system";

// =====================================================
type ShopCard1Props = {
  // name: string;
  shop_name: string;
  phone: string;
  rating: number;
  imgUrl: string;
  seller_address: string;
  province_name: string;
  city_name: string;
  area_name: string;
  shop_name_slug: string;
  coverImgUrl: string;
};
// =====================================================

export default function ShopCard1({
  // name,
  shop_name,
  phone,
  rating,
  imgUrl,
  seller_address,
  province_name,
  city_name,
  area_name,
  shop_name_slug,
  coverImgUrl,
}: ShopCard1Props) {
  return (
    <ShopCard1Wrapper overflow="hidden" coverImgUrl={coverImgUrl}>
      <div className="black-box">
        <Link href={shop_name_slug} style={{ color: "white" }}>
          <H3 fontWeight="600" mb="8px">
            {shop_name}
          </H3>
        </Link>

        <Box mb="13px">
          <Rating size="small" value={rating || 0} outof={5} color="warn" />
        </Box>

        <FlexBox mb="8px">
          <Icon defaultcolor="currentColor" size="15px" mt="5px">
            map-pin-2
          </Icon>

          <SemiSpan color="white" ml="12px">
            {seller_address}
          </SemiSpan>
        </FlexBox>

        <FlexBox mb="8px">
          <Icon defaultcolor="currentColor" size="15px" mt="5px">
            map-pin-2
          </Icon>

          <SemiSpan color="white" ml="12px">
            Province: {province_name}, City: {city_name}, Area: {area_name}
          </SemiSpan>
        </FlexBox>

        <FlexBox>
          <Icon defaultcolor="currentColor" size="15px" mt="4px">
            phone_filled
          </Icon>

          <SemiSpan color="white" ml="12px">
            {phone}
          </SemiSpan>
        </FlexBox>
      </div>

      <FlexBox pl="30px" pr="18px" justifyContent="space-between">
        <Link href={shop_name_slug}>
          <Avatar
            src={imgUrl || 'https://t4.ftcdn.net/jpg/04/15/60/27/360_F_415602715_uy5b6P84JetkpRCLxNmYgrx8pWIATsAD.jpg'}
            size={64}
            mt="-32px"
            border="4px solid"
            borderColor="gray.100"
          />
        </Link>
        <Link href={shop_name_slug}>
          <IconButton my="0.25rem">
            <Icon defaultcolor="auto">arrow-long-right</Icon>
          </IconButton>
        </Link>
      </FlexBox>
    </ShopCard1Wrapper>
  );
}
