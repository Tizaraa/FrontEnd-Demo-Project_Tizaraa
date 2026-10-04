import { currency } from "@utils/utils";
import Box from "@component/Box";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Typography, { H6 } from "@component/Typography";

const GREEN = "#2e7d32";

const formatStatus = (s?: string | null): string =>
 s
  ? s
     .split("_")
     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
     .join(" ")
  : "";

// One line of the money breakdown. Deductions carry the colour so what came off
// the order is what the eye lands on: green for discounts, red for cancelled /
// returned items.
const SummaryLine = ({
 label,
 value,
 negative = false,
 tone = "red",
 badge,
}: {
 label: string;
 value: string;
 negative?: boolean;
 tone?: "red" | "green";
 badge?: string;
}) => {
 const accent = tone === "green" ? GREEN : "#E94560";
 return (
  <FlexBox justifyContent="space-between" alignItems="center" mb="0.4rem">
   <FlexBox alignItems="center" style={{ gap: "8px" }}>
    <Typography fontSize="14px" color={negative ? "#2C3A4A" : "text.hint"}>
     {label}
    </Typography>
    {badge && (
     <span
      style={{
       backgroundColor: "#e8f8f0",
       color: GREEN,
       borderRadius: "10px",
       padding: "2px 8px",
       fontSize: "11px",
       fontWeight: 700,
      }}
     >
      {badge}
     </span>
    )}
   </FlexBox>
   <Typography
    fontSize="14px"
    fontWeight={negative ? "600" : "400"}
    color={negative ? accent : "text.hint"}
   >
    {negative ? `−${value}` : value}
   </Typography>
  </FlexBox>
 );
};

interface Props {
 order: any;
 details: any;
 shopName: string;
}

// Subtotal at the original (pre-discount) price, then the discount — product
// discounts plus any promo — then what shipping added, then the total those lines
// add up to. The total itself is untouched: it is what was charged.
export default function OrderTotalSummary({ order, details, shopName }: Props) {
 const items: any[] = details?.order_items ?? [];

 const productDiscount = items.reduce((sum, item) => {
  const original = Number(item.original_price ?? item.price ?? 0);
  const paid = Number(item.price ?? 0);
  return sum + Math.max(original - paid, 0) * Number(item.quantity ?? 0);
 }, 0);

 const promoDiscount = Number(order?.Order?.discount_amount ?? 0);
 const totalDiscount = productDiscount + promoDiscount;

 const subtotal =
  Number(order?.Order?.original_subtotal ?? details?.sub_total ?? 0) +
  productDiscount;
 const discountPercent = subtotal > 0 ? (totalDiscount / subtotal) * 100 : 0;

 const cancelledCount = order?.Order?.cancelled_item_count ?? 0;
 const returnedCount = order?.Order?.returned_item_count ?? 0;

 return (
  <Box
   p="16px 20px"
   mt="0.75rem"
   borderRadius={8}
   bg="#FBFCFE"
   border="1px solid #EDF1F6"
  >
   <Typography fontWeight="600" fontSize="15px" mb="0.75rem">
    Total Summary
   </Typography>

   <SummaryLine label="Subtotal" value={currency(subtotal)} />

   {totalDiscount > 0 && (
    <SummaryLine
     negative
     tone="green"
     label={
      promoDiscount > 0 && order?.Order?.promo_code
       ? `Discount (${order.Order.promo_code})`
       : "Discount"
     }
     badge={`${Math.round(discountPercent)}% OFF`}
     value={currency(totalDiscount)}
    />
   )}

   {cancelledCount > 0 && (
    <SummaryLine
     negative
     label={`${cancelledCount} ${cancelledCount === 1 ? "item" : "items"} cancelled`}
     value={currency(order?.Order?.cancelled_total || 0)}
    />
   )}

   {returnedCount > 0 && (
    <SummaryLine
     negative
     label={`${returnedCount} ${returnedCount === 1 ? "item" : "items"} returned`}
     value={currency(order?.Order?.refunded_total || 0)}
    />
   )}

   <SummaryLine
    label={`Shipping fee (${shopName})`}
    value={currency(details?.delivery_charge || 0)}
   />

   <Divider mb="0.6rem" mt="0.4rem" />

   <FlexBox justifyContent="space-between" alignItems="center" mb="0.75rem">
    <Typography variant="h6" color="text.primary">
     Total
    </Typography>
    <Typography variant="h6">{currency(details?.total || 0)}</Typography>
   </FlexBox>

   {/* Payment sits under the money on one line, like a footnote. */}
   <FlexBox alignItems="center" flexWrap="wrap" style={{ gap: "6px 20px" }}>
    <FlexBox alignItems="center" style={{ gap: "8px" }}>
     <Typography fontSize="13px" color="text.hint">
      Payment Method
     </Typography>
     <H6
      my="0px"
      p="3px 10px"
      backgroundColor="rgba(255,225,230,1)"
      borderRadius="1rem"
      color="rgb(233, 69, 96)"
      fontSize="12px"
     >
      {formatStatus(order?.Order?.payment_method) || "N/A"}
     </H6>
    </FlexBox>
    <FlexBox alignItems="center" style={{ gap: "8px" }}>
     <Typography fontSize="13px" color="text.hint">
      Payment Status
     </Typography>
     <H6
      my="0px"
      p="3px 10px"
      backgroundColor="rgba(255,225,230,1)"
      borderRadius="1rem"
      color="rgb(233, 69, 96)"
      fontSize="12px"
     >
      {formatStatus(order?.Order?.payment_status) || "N/A"}
     </H6>
    </FlexBox>
   </FlexBox>
  </Box>
 );
}
