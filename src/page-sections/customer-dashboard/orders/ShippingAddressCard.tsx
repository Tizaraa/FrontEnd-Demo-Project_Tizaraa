"use client";

import Card from "@component/Card";
import { H5, Paragraph, Small } from "@component/Typography";

// =================================================
type ShippingAddressCardProps = {
 address?: string | null;
 area?: string | null;
 city?: string | null;
 province?: string | null;
 phone?: string | null;
};
// =================================================

/**
 * The shipping address block of an order detail page.
 *
 * Orders collected at a shop counter carry no delivery address, and any one of the
 * area / city / province / phone fields can be missing on its own, so each line is
 * dropped when empty and the card says so outright rather than showing a heading
 * over blank space.
 */
export default function ShippingAddressCard({
 address,
 area,
 city,
 province,
 phone,
}: ShippingAddressCardProps) {
 const details = [
  { label: "Area", value: area },
  { label: "City", value: city },
  { label: "Province", value: province },
  { label: "Phone", value: phone },
 ].filter((detail) => Boolean(detail.value));

 const isEmpty = !address && details.length === 0;

 return (
  <Card p="15px 20px" borderRadius={8}>
   <H5 mt="0px" mb="10px" fontSize="16px">
    Shipping Address
   </H5>

   {isEmpty ? (
    <Small color="text.muted">
     No delivery address — this order was collected at the shop.
    </Small>
   ) : (
    <>
     {address && (
      <Paragraph fontSize="14px" my="4px" color="black">
       {address}
      </Paragraph>
     )}

     {details.length > 0 && (
      <div
       style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "8px",
        fontSize: "14px",
       }}
      >
       {details.map((detail) => (
        <div key={detail.label} style={{ display: "flex", gap: "4px" }}>
         <span style={{ color: "#555", fontWeight: 500 }}>{detail.label}:</span>
         <span style={{ color: "#000" }}>{detail.value}</span>
        </div>
       ))}
      </div>
     )}
    </>
   )}
  </Card>
 );
}
