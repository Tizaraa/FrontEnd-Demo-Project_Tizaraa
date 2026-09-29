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
 * What one order's own status should be called on a row.
 *
 * A corporate order is collected at the shop counter, so the seller marking it
 * "processing" means it is packed and waiting there — the tracker and the detail
 * page both say "Packed", and the list has to match.
 */
export function statusLabel(order: any): string {
 const key = normalizeStatus(order.status);
 const label = STATUS_LABELS[key] ?? "Processing";

 if (order.payment_method === "corporate_credit" && key === "processing") {
  return "Packed";
 }

 return label;
}

/**
 * What the Total column should say for one row.
 *
 * order.amount is the order's live value: items cancelled one at a time and items
 * handed back are taken off it. A cancelled order has nothing live left, so it reads
 * 0.00 — order.amount itself can't be trusted there, since a whole-order cancel
 * leaves it at the full charge on purpose (the corporate credit refund reads it).
 */
export function rowTotal(order: any): number {
 if (normalizeStatus(order.status) === "cancelled") {
  return 0;
 }

 return order.amount;
}

/**
 * What the order was worth before anything came off it.
 *
 * The API sends original_total with the cancelled items and refunded returns added
 * back; an older payload without it has nothing taken off yet, so amount is already
 * the original.
 */
export function rowOriginalTotal(order: any): number {
 return typeof order.original_total === "number"
  ? order.original_total
  : order.amount ?? 0;
}

/**
 * The single figure the Total column shows.
 *
 * A cancelled or returned order has nothing live left, so its live value says 0.00 —
 * useless on a row. Those show what the order was worth instead; the status beside it
 * already says it is off. Every other order shows its live value, which already has
 * any individually cancelled or refunded item taken off.
 */
export function rowDisplayTotal(order: any): number {
 const key = normalizeStatus(order.status);

 if (key === "cancelled" || key === "returned" || key === "refunded") {
  return rowOriginalTotal(order);
 }

 return rowTotal(order);
}

/**
 * How an order's items currently split, as pills for the card's footer line.
 *
 * An item is in exactly one bucket: still with the buyer, cancelled off the order
 * before it shipped, or handed back. The "still with the buyer" bucket is labelled
 * with the order's own status, so a delivered order reads "2 Delivered" while a
 * pending one reads "2 Pending" rather than claiming a delivery that never happened.
 *
 * Every order gets the footer, including one where nothing has been cancelled or
 * handed back — that row still reads "1 Pending" rather than saying nothing about
 * where the order stands. Returns nothing only when the API sent no counts at all.
 */
export function buildStatusBuckets(order: any): StatusBucket[] {
 const label = statusLabel(order);

 const active = order.active_item_count;
 const cancelled = order.cancelled_item_count;
 const returned = order.returned_item_count;

 const hasBreakdown = [active, cancelled, returned].some(
  (count) => typeof count === "number"
 );

 if (!hasBreakdown) return [];

 return [
  { label: "Cancel", count: cancelled ?? 0 },
  { label: "Returned", count: returned ?? 0 },
  { label, count: active ?? 0 },
 ].filter((bucket) => bucket.count > 0);
}
