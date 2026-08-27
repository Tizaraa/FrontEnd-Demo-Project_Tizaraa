// Shared status presentation for the customer-dashboard order list rows.
// All four rows (all / delivered / cancelled / return) render the same card, so the
// labels and the item breakdown live here rather than in each copy.

// Statuses reach the rows either raw from the API ("ready_for_pickup") or already
// labelled ("Order Delivered"), so both are folded down to one key before lookup.
export const normalizeStatus = (status: string) =>
 (status || "")
  .toLowerCase()
  .replace(/^order\s+/, "")
  .replace(/[\s-]+/g, "_");

export const STATUS_LABELS: Record<string, string> = {
 pending: "Pending",
 confirmed: "Confirmed",
 processing: "Processing",
 ready_for_pickup: "Ready to collect",
 shipped: "Shipped",
 delivered: "Delivered",
 cancelled: "Cancelled",
 return_requested: "Return requested",
 returned: "Returned",
 refunded: "Refunded",
};

export type StatusBucket = { label: string; count: number };

/**
 * What the Total column should say for one row.
 *
 * order.amount is the order's live value: items cancelled one at a time and items
 * handed back are taken off it. That reads correctly everywhere except a cancelled
 * order, where nothing is live and the number means two different things depending
 * on how the cancel happened — 0.00 when every item was cancelled individually, the
 * full charge when the order went in one go. Cancelled rows therefore show what the
 * buyer was originally charged instead.
 */
export function rowTotal(order: any): number {
 const isCancelled = normalizeStatus(order.status) === "cancelled";

 if (isCancelled && typeof order.original_total === "number") {
  return order.original_total;
 }

 return order.amount;
}

/**
 * How an order's items currently split, as pills for the card's footer line.
 *
 * An item is in exactly one bucket: still with the buyer, cancelled off the order
 * before it shipped, or handed back. The "still with the buyer" bucket is labelled
 * with the order's own status, so a delivered order reads "2 Delivered" while a
 * pending one reads "2 Pending" rather than claiming a delivery that never happened.
 *
 * Returns nothing for an order where every item is still with the buyer — the row
 * above already says as much. Once anything has been cancelled or handed back the
 * footer appears, even if that accounts for the whole order.
 */
export function buildStatusBuckets(order: any): StatusBucket[] {
 const label = STATUS_LABELS[normalizeStatus(order.status)] ?? "Processing";

 const active = order.active_item_count;
 const cancelled = order.cancelled_item_count;
 const returned = order.returned_item_count;

 const hasBreakdown = [active, cancelled, returned].some(
  (count) => typeof count === "number"
 );

 if (!hasBreakdown) return [];
 if (!(cancelled ?? 0) && !(returned ?? 0)) return [];

 return [
  { label: "Cancel", count: cancelled ?? 0 },
  { label: "Returned", count: returned ?? 0 },
  { label, count: active ?? 0 },
 ].filter((bucket) => bucket.count > 0);
}
