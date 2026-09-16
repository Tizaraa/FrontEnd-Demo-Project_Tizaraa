"use client";

import Typography from "@component/Typography";
import { currency } from "@utils/utils";
import { hasReducedTotal, rowOriginalTotal, rowTotal } from "./orderRowStatus";

// =================================================
type OrderTotalProps = { order: any };
// =================================================

/**
 * The Total column of an order list row.
 *
 * An order that lost value — cancelled outright, an item pulled before it shipped,
 * or a return refunded — shows what was charged struck through above what is still
 * standing, so a row reading 0.00 still says what the order was worth. Everything
 * else shows the single figure.
 */
export default function OrderTotal({ order }: OrderTotalProps) {
 const total = rowTotal(order);

 if (!hasReducedTotal(order)) {
  return (
   <Typography
    m="6px"
    textAlign="left"
    fontWeight="600"
    color="rgb(51, 51, 51)"
    flex="1 1 0"
   >
    {currency(total)}
   </Typography>
  );
 }

 return (
  <Typography m="6px" textAlign="left" flex="1 1 0">
   <span
    style={{
     fontSize: "13px",
     color: "#7A8A99",
     textDecoration: "line-through",
     textDecorationColor: "#e53935",
    }}
   >
    {currency(rowOriginalTotal(order))}
   </span>
   <br />
   <span style={{ fontWeight: 600, color: "rgb(51, 51, 51)" }}>
    {currency(total)}
   </span>
  </Typography>
 );
}
