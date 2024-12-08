"use client";

import Image, { ImageProps } from "next/image";
import styled from "styled-components";
import { space, SpaceProps, compose, borderRadius, BorderRadiusProps, height } from "styled-system";

// ==============================================================
type PaymentImageProps = ImageProps & SpaceProps & BorderRadiusProps;
// ==============================================================

const PaymentImage = styled(Image)<PaymentImageProps>(
  { width: "100%", height: "100%"},
  compose(space, borderRadius)
);

export default PaymentImage;

