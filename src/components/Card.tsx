"use client";

import styled from "styled-components";
import {
 BorderProps,
 LayoutProps,
 ColorProps,
 SpaceProps,
 compose,
 border,
 color,
 space,
 layout,
} from "styled-system";

import Box from "./Box";
import { isValidProp } from "@utils/utils";
import { shadowOptions } from "interfaces";

// ==============================================================
export interface CardProps {
 elevation?: number;
 hoverEffect?: boolean;
 boxShadow?: shadowOptions;
}

type Props = ColorProps & SpaceProps & LayoutProps & BorderProps & CardProps;
// ==============================================================

const Card = styled(Box).withConfig({
 shouldForwardProp: (prop: string) => isValidProp(prop),
})<Props>(
 ({ theme, hoverEffect = false, boxShadow = "small" }) => ({
  boxShadow: theme.shadows[boxShadow],
  backgroundColor: theme.colors.body.paper,
  borderRadius: theme.tz.radius.md,
  ...(hoverEffect && {
   transition: `box-shadow ${theme.tz.motion.base}`,
   "&:hover": { boxShadow: theme.shadows.large },
  }),
 }),
 compose(border, color, space, layout)
);

export default Card;
