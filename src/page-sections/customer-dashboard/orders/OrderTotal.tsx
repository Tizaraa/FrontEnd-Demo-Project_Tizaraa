"use client";

import Typography from "@component/Typography";
import { currency } from "@utils/utils";
import { rowDisplayTotal } from "./orderRowStatus";

// =================================================
type OrderTotalProps = { order: any };
// =================================================

/**
 * The Total column of an order list row.
 *
 * One figure, never struck through: an order that lost all of its value — cancelled
 * outright or handed back — shows what it was worth, since the status on the row
 * already says nothing is standing. Everything else shows its live value.
 */
export default function OrderTotal({ order }: OrderTotalProps) {
 return (
  <Typography
   m="6px"
   textAlign="left"
   fontWeight="600"
   color="rgb(51, 51, 51)"
   flex="1 1 0"
  >
   {currency(rowDisplayTotal(order))}
  </Typography>
 );
}
