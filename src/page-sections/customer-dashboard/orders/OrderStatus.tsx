"use client";

import styled, { keyframes } from "styled-components";
import { format } from "date-fns";

// Order / return progress tracker shared by every order detail page.
// The step logic (which step is reached, which timeline event belongs to it,
// corporate / cancelled / return / rejected flows) is unchanged; only the view
// is new: a horizontal stepper plus a collapsible full history.

export interface TimelineEvent {
 id?: number;
 from_status?: string | null;
 to_status?: string | null;
 status?: string | null;
 notes?: string | null;
 changed_by_name?: string | null;
 changed_by_role?: string | null;
 created_at?: string | null;
 at?: string | null;
}

export interface ReturnRecord {
 id?: number;
 return_status?: string | null;
 return_type?: string | null;
 return_reason?: string | null;
 refund_amount?: number | null;
 admin_notes?: string | null;
 reviewed_at?: string | null;
 returned_at?: string | null;
 refunded_at?: string | null;
 created_at?: string | null;
}

interface OrderStatusProps {
 orderStatus: string | null;
 deliveredAt?: string | null;
 returnStatus?: string | null;
 isCorporate?: boolean;
 hideReturnFlow?: boolean;
 timeline?: TimelineEvent[];
 returnRecord?: ReturnRecord | null;
}

const formatTimelineDate = (dateStr?: string | null): string => {
 if (!dateStr) return "";
 try {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return String(dateStr);
  return format(d, "MMM d, yyyy, h:mm a");
 } catch {
  return String(dateStr);
 }
};

const normalize = (s?: string | null): string => (s ?? "").trim().toLowerCase();

// ---------------------------------------------------------------------------
// Icons (stroke = currentColor)
// ---------------------------------------------------------------------------
const ICON: Record<string, string> = {
 bag: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
 check: "M20 6 9 17l-5-5",
 box: "M21 8 12 3 3 8v8l9 5 9-5zM3 8l9 5 9-5M12 13v8",
 truck: "M1 3h15v13H1zM16 8h4l3 3v5h-7zM5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
 home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
 undo: "M9 14 4 9l5-5M4 9h11a5 5 0 0 1 0 10h-3",
 wallet: "M20 12V8H6a2 2 0 0 1 0-4h12v4M4 6v12a2 2 0 0 0 2 2h14v-4M18 12a2 2 0 0 0 0 4h4v-4z",
 x: "M18 6 6 18M6 6l12 12",
 chevron: "m6 9 6 6 6-6",
};
const Ico = ({ name, size = 18 }: { name: string; size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d={ICON[name]} />
 </svg>
);

// ---------------------------------------------------------------------------
// View model
// ---------------------------------------------------------------------------
type StepState = "done" | "current" | "todo" | "bad";
interface ViewStep {
 key: string;
 label: string;
 icon: string;
 state: StepState;
 date?: string;
 actor?: string;
 notes?: string | null;
 desc: string;
}

const actorOf = (e: any, fallbackRole: string) =>
 e?.changed_by_name ? `${e.changed_by_name} (${e.changed_by_role || fallbackRole})` : "";

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------
const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const slideIn = keyframes`
 from { opacity: 0; transform: translateX(-10px); }
 to { opacity: 1; transform: none; }
`;
const growY = keyframes`
 from { transform: scaleY(0); }
 to { transform: scaleY(1); }
`;
const growX = keyframes`
 from { transform: scaleX(0); }
 to { transform: scaleX(var(--p)); }
`;
const ping = keyframes`
 0% { opacity: 0.55; transform: scale(1); }
 80%, 100% { opacity: 0; transform: scale(1.8); }
`;
const pop = keyframes`
 0% { opacity: 0; transform: scale(0.5); }
 70% { opacity: 1; transform: scale(1.1); }
 100% { opacity: 1; transform: none; }
`;

// Vertical timeline: every step shows its date, who did it, what it means and
// any note, so the full flow reads top to bottom without a toggle.
const Wrap = styled.section<{ $tone: string }>`
 --tone: ${({ $tone }) => $tone};
 padding: 22px;
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 18px;
 background: ${({ theme }) => theme.tz.color.paper};
 animation: ${rise} 460ms cubic-bezier(0.22, 1, 0.36, 1) both;

 /* ---- head + progress ---- */
 .tr-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 12px;
 }
 .tr-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 17px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .tr-title-icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  color: var(--tone);
  background: color-mix(in srgb, var(--tone) 12%, white);
 }
 .tr-count {
  font-size: 12.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .tr-bar {
  position: relative;
  height: 6px;
  margin: 14px 0 6px;
  overflow: hidden;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .tr-bar > i {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--tone), color-mix(in srgb, var(--tone) 55%, white));
  transform: scaleX(var(--p));
  transform-origin: left center;
  animation: ${growX} 900ms cubic-bezier(0.22, 1, 0.36, 1) 150ms both;
 }
 .tr-now {
  margin: 0 0 18px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--tone);
 }

 /* ---- timeline ---- */
 .tr-list {
  margin: 0;
  padding: 0;
  list-style: none;
 }
 .tr-item {
  position: relative;
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 14px;
  padding-bottom: 14px;
  animation: ${slideIn} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i) * 110ms + 150ms);
 }
 .tr-item:last-child {
  padding-bottom: 0;
 }
 /* rail to the next step: grey track + coloured fill that grows down */
 .tr-item:not(:last-child)::before,
 .tr-item:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 44px;
  bottom: 2px;
  left: 18.5px;
  width: 3px;
  border-radius: 3px;
 }
 .tr-item:not(:last-child)::before {
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .tr-item.is-done:not(:last-child)::after {
  background: ${({ theme }) => theme.tz.color.ember};
  transform-origin: top center;
  animation: ${growY} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i) * 110ms + 350ms);
 }
 .tr-item.next-bad:not(:last-child)::after {
  background: ${({ theme }) => theme.tz.tone.danger.fill};
 }

 .tr-dot {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 2px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .is-done .tr-dot {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.ember};
  color: #fff;
  animation: ${pop} 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i) * 110ms + 200ms);
 }
 .is-current .tr-dot {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .is-current .tr-dot::after {
  content: "";
  position: absolute;
  inset: -2px;
  z-index: -1;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.ember};
  animation: ${ping} 2.2s ease-out infinite;
 }
 .is-bad .tr-dot {
  border-color: ${({ theme }) => theme.tz.tone.danger.fill};
  background: ${({ theme }) => theme.tz.tone.danger.fill};
  color: #fff;
  animation: ${pop} 380ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i) * 110ms + 200ms);
 }

 .tr-body {
  min-width: 0;
  padding: 10px 14px 12px;
  border: 1px solid transparent;
  border-radius: 14px;
  transition: background-color 180ms ease, border-color 180ms ease;
 }
 .tr-item:hover .tr-body {
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .is-current .tr-body,
 .is-current:hover .tr-body {
  border-color: #f9c4ae;
  background: ${({ theme }) => theme.tz.color.emberTint};
 }
 .is-bad .tr-body,
 .is-bad:hover .tr-body {
  border-color: ${({ theme }) => theme.tz.tone.danger.bg};
  background: color-mix(in srgb, ${({ theme }) => theme.tz.tone.danger.bg} 60%, white);
 }
 .is-todo .tr-body {
  padding-top: 9px;
  padding-bottom: 6px;
 }

 .tr-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 10px;
 }
 .tr-label {
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .is-todo .tr-label {
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .is-bad .tr-label {
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }
 .tr-tag {
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
 }
 .tr-tag--now {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }
 .tr-tag--done {
  background: ${({ theme }) => theme.tz.tone.success.bg};
  color: ${({ theme }) => theme.tz.tone.success.fg};
 }
 .tr-tag--todo {
  background: ${({ theme }) => theme.tz.color.lineSoft};
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .tr-tag--bad {
  background: ${({ theme }) => theme.tz.tone.danger.fill};
  color: #fff;
 }

 .tr-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 14px;
  margin-top: 5px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .tr-meta span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
 }
 .tr-meta svg {
  width: 13px;
  height: 13px;
 }
 .tr-desc {
  margin: 6px 0 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .is-todo .tr-desc {
  margin-top: 2px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .tr-note {
  display: flex;
  gap: 8px;
  margin: 8px 0 0;
  padding: 8px 10px;
  border-left: 3px solid ${({ theme }) => theme.tz.color.ember};
  border-radius: 0 10px 10px 0;
  background: ${({ theme }) => theme.tz.color.paper};
  font-size: 12.5px;
  font-style: italic;
  line-height: 1.5;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .is-bad .tr-note {
  border-left-color: ${({ theme }) => theme.tz.tone.danger.fill};
 }

 /* ---- horizontal stepper (corporate: few steps) ---- */
 .tr-h {
  display: grid;
  grid-auto-columns: minmax(0, 1fr);
  grid-auto-flow: column;
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
 }
 .tr-h-step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 0 8px;
  text-align: center;
  animation: ${rise} 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i) * 120ms + 150ms);
 }
 .tr-h-rail {
  position: absolute;
  top: 19px;
  right: calc(50% + 26px);
  left: calc(-50% + 26px);
  height: 4px;
  overflow: hidden;
  border-radius: 4px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .tr-h-rail::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: ${({ theme }) => theme.tz.color.ember};
  transform: scaleX(0);
  transform-origin: left center;
 }
 .tr-h-rail.is-filled::after {
  animation: ${growX} 480ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--i) * 120ms + 250ms);
  --p: 1;
 }
 .tr-h-rail.is-bad::after {
  background: ${({ theme }) => theme.tz.tone.danger.fill};
 }
 .tr-h-step .tr-dot {
  margin-bottom: 4px;
 }
 .tr-h-label {
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .tr-h-step.is-todo .tr-h-label {
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .tr-h-step.is-bad .tr-h-label {
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }
 .tr-h-date {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .tr-h-desc {
  max-width: 220px;
  font-size: 12.5px;
  line-height: 1.45;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .tr-h-actor {
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .tr-h-note {
  font-style: italic;
 }
 .tr-h-step.is-todo .tr-h-desc {
  color: ${({ theme }) => theme.tz.color.slate};
 }

 @media (max-width: 560px) {
  .tr-h-desc {
   display: none;
  }
  .tr-h-label {
   font-size: 13px;
  }
 }

 @media (max-width: 560px) {
  padding: 16px;
  .tr-item {
   grid-template-columns: 34px minmax(0, 1fr);
   gap: 10px;
  }
  .tr-dot {
   width: 34px;
   height: 34px;
  }
  .tr-item:not(:last-child)::before,
  .tr-item:not(:last-child)::after {
   top: 38px;
   left: 15.5px;
  }
  .tr-body {
   padding: 8px 10px 10px;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  &,
  .tr-item,
  .tr-bar > i,
  .is-done .tr-dot,
  .is-bad .tr-dot,
  .is-current .tr-dot::after,
  .tr-item.is-done:not(:last-child)::after,
  .tr-h-step,
  .tr-h-rail.is-filled::after {
   animation: none !important;
  }
  .tr-h-rail.is-filled::after {
   transform: none;
  }
  .tr-body {
   transition: none;
  }
 }
`;

const TAG: Record<StepState, [string, string]> = {
 done: ["tr-tag--done", "Done"],
 current: ["tr-tag--now", "In progress"],
 todo: ["tr-tag--todo", "Upcoming"],
 bad: ["tr-tag--bad", "Stopped"],
};

function Tracker({
 title,
 steps,
 tone,
 horizontal = false,
}: {
 title: string;
 steps: ViewStep[];
 tone: "brand" | "success" | "danger";
 horizontal?: boolean;
}) {
 const toneColor = tone === "success" ? "var(--tz-success)" : tone === "danger" ? "var(--tz-danger)" : "var(--tz-ember-deep)";

 // Headline = the latest reached step; progress = reached / total
 const reached = steps.filter((s) => s.state !== "todo");
 const now = reached[reached.length - 1] ?? steps[0];
 const doneCount = steps.filter((s) => s.state === "done" || s.state === "bad").length;
 const progress = steps.length ? Math.max(doneCount, reached.length) / steps.length : 0;

 return (
  <Wrap $tone={toneColor} aria-label={title}>
   <div className="tr-head">
    <h3 className="tr-title">
     <span className="tr-title-icon" aria-hidden="true">
      <Ico name={tone === "danger" ? "x" : tone === "success" ? "check" : "truck"} size={17} />
     </span>
     {title}
    </h3>
    <span className="tr-count">
     {reached.length} of {steps.length} steps
    </span>
   </div>
   <div className="tr-bar" aria-hidden="true">
    <i style={{ ["--p" as any]: progress }} />
   </div>
   {now && (
    <p className="tr-now" aria-live="polite">
     {now.desc}
    </p>
   )}

   {horizontal ? (
    <ol className="tr-h">
     {steps.map((s, i) => (
      <li
       key={s.key}
       className={`tr-h-step is-${s.state}`}
       style={{ ["--i" as any]: i }}
       aria-current={s.state === "current" ? "step" : undefined}
      >
       {i > 0 && <span className={`tr-h-rail${s.state !== "todo" ? " is-filled" : ""}${s.state === "bad" ? " is-bad" : ""}`} aria-hidden="true" />}
       <span className="tr-dot">
        <Ico name={s.state === "done" ? "check" : s.state === "bad" ? "x" : s.icon} size={s.state === "done" ? 18 : 17} />
       </span>
       <span className="tr-h-label">{s.label}</span>
       <span className={`tr-tag ${TAG[s.state][0]}`}>{TAG[s.state][1]}</span>
       {s.state !== "todo" && s.date && <span className="tr-h-date">{s.date}</span>}
       {s.state !== "todo" && s.actor && <span className="tr-h-date tr-h-actor">by {s.actor}</span>}
       <span className="tr-h-desc">{s.desc}</span>
       {s.state !== "todo" && s.notes && <span className="tr-h-desc tr-h-note">“{s.notes}”</span>}
      </li>
     ))}
    </ol>
   ) : (
      <ol className="tr-list">
       {steps.map((s, i) => {
        const nextBad = steps[i + 1]?.state === "bad";
        return (
         <li
          key={s.key}
          className={`tr-item is-${s.state}${nextBad ? " next-bad" : ""}`}
          style={{ ["--i" as any]: i }}
          aria-current={s.state === "current" ? "step" : undefined}
         >
          <span className="tr-dot">
           <Ico name={s.state === "done" ? "check" : s.state === "bad" ? "x" : s.icon} size={s.state === "done" ? 18 : 17} />
          </span>
          <div className="tr-body">
           <div className="tr-top">
            <span className="tr-label">{s.label}</span>
            <span className={`tr-tag ${TAG[s.state][0]}`}>{TAG[s.state][1]}</span>
           </div>
           {s.state !== "todo" && (s.date || s.actor) && (
            <div className="tr-meta">
             {s.date && (
              <span>
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
               </svg>
               {s.date}
              </span>
             )}
             {s.actor && (
              <span>
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21a8 8 0 0 1 16 0" />
               </svg>
               {s.actor}
              </span>
             )}
            </div>
           )}
           <p className="tr-desc">{s.desc}</p>
           {s.state !== "todo" && s.notes && <p className="tr-note">{s.notes}</p>}
          </div>
         </li>
        );
       })}
      </ol>
   )}
  </Wrap>
 );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function OrderStatus({
 orderStatus,
 deliveredAt,
 returnStatus,
 isCorporate = false,
 hideReturnFlow = false,
 timeline = [],
 returnRecord = null,
}: OrderStatusProps) {
 const normStatus = normalize(orderStatus);

 // ---------------- Corporate: Pending -> Packed -> Delivered ----------------
 // Each step carries the history event that reached it: when, who (seller /
 // customer / admin) and any note, so the buyer sees what the shop did and when.
 if (isCorporate) {
  // Returned corporate orders show no order flow (return tab)
  if (returnStatus || returnRecord || normStatus.includes("return") || normStatus.includes("refund")) return null;

  const PACKED = ["processing", "packed", "ready_for_pickup", "shipped"];
  const CANCELLED = ["cancelled", "canceled"];
  const evStatus = (t: TimelineEvent) => normalize(t.to_status || t.status);
  const events = timeline ?? [];
  const findFirst = (statuses: string[]) => events.find((t) => statuses.includes(evStatus(t))) ?? null;

  const isCancelled = CANCELLED.includes(normStatus);
  // 0 = pending (incl. confirmed), 1 = packed, 2 = delivered
  // Returned / refunded orders were collected first, so they sit at Delivered
  const afterDelivery = normStatus === "delivered" || normStatus.includes("return") || normStatus.includes("refund");
  const currentIdx = afterDelivery ? 2 : PACKED.includes(normStatus) ? 1 : 0;

  const confirmEvt = findFirst(["confirmed"]);
  const corporateSteps = [
   {
    key: "pending",
    icon: "bag",
    label: "Pending",
    activeDesc: confirmEvt ? "Order placed and confirmed by the shop" : "Order placed and waiting for the shop",
    todoDesc: "Order placed",
    evt: findFirst(["pending"]),
   },
   {
    key: "packed",
    icon: "box",
    label: "Packed",
    activeDesc: "Packed by the shop and ready to collect",
    todoDesc: "Waiting for the shop to pack your order",
    evt: findFirst(PACKED),
   },
   {
    key: "delivered",
    icon: "home",
    label: "Delivered",
    activeDesc: "Collected from the shop",
    todoDesc: "Waiting for you to collect it from the shop",
    evt:
     findFirst(["delivered"]) ??
     (deliveredAt ? { to_status: "delivered", created_at: deliveredAt, changed_by_role: "seller" } : null),
   },
  ];

  // Cancelled: keep only steps that really happened, then the red step
  const wasPacked = Boolean(corporateSteps[1].evt);
  const base = isCancelled
   ? corporateSteps.filter((st) => st.key === "pending" || (wasPacked && st.key === "packed"))
   : corporateSteps;
  const last = corporateSteps.length - 1;

  const steps: ViewStep[] = base.map((st, i) => {
   const reached = isCancelled || i <= currentIdx;
   const e: any = reached ? st.evt : null;
   return {
    key: st.key,
    label: st.label,
    icon: st.icon,
    state: !reached ? "todo" : isCancelled || i < currentIdx || i === last ? "done" : "current",
    date: e ? formatTimelineDate(e.created_at || e.at) : "",
    actor: actorOf(e, "seller"),
    notes: e?.notes ?? null,
    desc: reached ? st.activeDesc : st.todoDesc,
   };
  });

  if (isCancelled) {
   const cancelEvt: any = findFirst(CANCELLED);
   steps.push({
    key: "cancelled",
    label: "Cancelled",
    icon: "x",
    state: "bad",
    date: cancelEvt ? formatTimelineDate(cancelEvt.created_at || cancelEvt.at) : "",
    actor: actorOf(cancelEvt, "customer"),
    notes: cancelEvt?.notes ?? null,
    desc: "This order has been cancelled.",
   });
  }

  return (
   <Tracker
    title="Order status"
    steps={steps}
    horizontal
    tone={isCancelled ? "danger" : currentIdx === last ? "success" : "brand"}
   />
  );
 }

 // ---------------- Return flow ----------------
 const RETURN_FLOW_ORDER_STATUSES = [
  "return requested",
  "return_requested",
  "returned",
  "refunded",
  "return approved",
  "return_approved",
  "return received",
  "return_received",
  "return",
 ];
 const normReturnStatus = normalize(returnStatus);
 const isReturnFlow =
  !hideReturnFlow &&
  (RETURN_FLOW_ORDER_STATUSES.includes(normStatus) ||
   Boolean(returnStatus && normReturnStatus !== "none" && normReturnStatus !== "active") ||
   Boolean(returnRecord));

 if (isReturnFlow) {
  const RETURN_RECORD_STEPS: { [key: string]: number } = {
   pending: 0,
   return_requested: 0,
   "return requested": 0,
   approved: 1,
   return_approved: 1,
   "return approved": 1,
   received: 2,
   return_received: 2,
   "return received": 2,
   returned: 2,
   refunded: 3,
  };
  const isRejected = normReturnStatus === "rejected";
  const returnCurrentIndex =
   normStatus === "refunded" || normReturnStatus === "refunded"
    ? 3
    : isRejected
    ? 0
    : RETURN_RECORD_STEPS[normReturnStatus] ?? RETURN_RECORD_STEPS[normStatus] ?? 0;

  const returnSteps = [
   { key: "pending", label: "Return requested", icon: "undo", targetStatus: "pending", activeDesc: "Return request submitted by customer", pendingDesc: "Waiting for return request" },
   { key: "approved", label: "Return approved", icon: "check", targetStatus: "approved", activeDesc: "Return request approved by seller. Please send or return the item.", pendingDesc: "Waiting for seller approval" },
   { key: "received", label: "Item received", icon: "truck", targetStatus: "received", activeDesc: "Item received and verified at the seller shop / warehouse", pendingDesc: "Waiting for item receipt and inspection" },
   { key: "refunded", label: "Refunded", icon: "wallet", targetStatus: "refunded", activeDesc: "Refund processed successfully to your account", pendingDesc: "Waiting for refund disbursement" },
  ];

  const findReturnEvent = (targetStatus: string, ind: number): any => {
   if (returnRecord) {
    if (ind === 0 && returnRecord.created_at) {
     return { created_at: returnRecord.created_at, changed_by_name: null, changed_by_role: "customer", notes: returnRecord.return_reason ?? null };
    }
    if (ind === 1 && returnRecord.reviewed_at) {
     return { created_at: returnRecord.reviewed_at, changed_by_name: null, changed_by_role: "seller", notes: returnRecord.admin_notes ?? null };
    }
    if (ind === 2 && returnRecord.returned_at) {
     return { created_at: returnRecord.returned_at, changed_by_name: null, changed_by_role: "seller", notes: null };
    }
    if (ind === 3 && returnRecord.refunded_at) {
     return {
      created_at: returnRecord.refunded_at,
      changed_by_name: "Tizaraa Finance",
      changed_by_role: "system",
      notes: returnRecord.refund_amount ? `Refund amount: ৳ ${Number(returnRecord.refund_amount).toFixed(2)}` : null,
     };
    }
   }
   const match = (timeline ?? []).find(
    (t) =>
     normalize(t.to_status) === targetStatus ||
     normalize(t.status) === targetStatus ||
     (targetStatus === "pending" && (normalize(t.to_status) === "return_requested" || normalize(t.to_status) === "return")) ||
     (targetStatus === "approved" && normalize(t.to_status) === "return_approved") ||
     (targetStatus === "received" && (normalize(t.to_status) === "return_received" || normalize(t.to_status) === "returned"))
   );
   if (match) return match;
   if (ind <= returnCurrentIndex) {
    return { created_at: null, changed_by_name: null, changed_by_role: ind === 0 ? "customer" : "seller", notes: null };
   }
   return null;
  };

  const base = isRejected ? [returnSteps[0]] : returnSteps;
  const last = returnSteps.length - 1;
  const steps: ViewStep[] = base.map((s, ind) => {
   const reached = ind <= returnCurrentIndex;
   const e = reached ? findReturnEvent(s.targetStatus, ind) : null;
   return {
    key: s.key,
    label: s.label,
    icon: s.icon,
    state: !reached ? "todo" : ind < returnCurrentIndex || ind === last || isRejected ? "done" : "current",
    date: e ? formatTimelineDate(e.created_at || e.at) : "",
    actor: actorOf(e, ind === 0 ? "customer" : "seller"),
    notes: e?.notes ?? null,
    desc: reached ? s.activeDesc : s.pendingDesc,
   };
  });
  if (isRejected) {
   steps.push({
    key: "rejected",
    label: "Return rejected",
    icon: "x",
    state: "bad",
    date: returnRecord?.reviewed_at ? formatTimelineDate(returnRecord.reviewed_at) : "",
    actor: returnRecord?.reviewed_at ? "Seller" : "",
    notes: returnRecord?.admin_notes ?? null,
    desc: "Your return request was rejected by the seller.",
   });
  }
  return (
   <Tracker
    title="Return status"
    steps={steps}
    tone={isRejected ? "danger" : returnCurrentIndex === last ? "success" : "brand"}
   />
  );
 }

 // ---------------- Retail: Pending -> ... -> Delivered (or Cancelled) ----------------
 const STATUS_MAP: { [key: string]: number } = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
 };
 const currentStatusIndex =
  STATUS_MAP[normStatus] ??
  (normStatus.includes("deliver")
   ? 4
   : normStatus.includes("ship")
   ? 3
   : normStatus.includes("process")
   ? 2
   : normStatus.includes("confirm")
   ? 1
   : 0);
 const isCancelled = normStatus === "cancelled" || normStatus === "canceled";

 const retailSteps = [
  { key: "pending", label: "Pending", icon: "bag", targetStatus: "pending", activeDesc: "Order placed and received by seller", pendingDesc: "Order placed by customer" },
  { key: "confirmed", label: "Confirmed", icon: "check", targetStatus: "confirmed", activeDesc: "Your order has been confirmed by the seller", pendingDesc: "Waiting for seller confirmation" },
  { key: "processing", label: "Processing", icon: "box", targetStatus: "processing", activeDesc: "Your order is being processed and prepared for shipment", pendingDesc: "Waiting for seller to process order" },
  { key: "shipped", label: "Shipped", icon: "truck", targetStatus: "shipped", activeDesc: "Your order has been shipped and is on the way", pendingDesc: "Waiting for shipment dispatch" },
  { key: "delivered", label: "Delivered", icon: "home", targetStatus: "delivered", activeDesc: "Your order has been delivered successfully", pendingDesc: "Waiting for delivery handoff" },
 ];

 const findEvent = (targetStatus: string, ind: number): any => {
  const match = (timeline ?? []).find((t) => normalize(t.to_status) === targetStatus || normalize(t.status) === targetStatus);
  if (match) return match;
  if (ind <= currentStatusIndex) {
   if (targetStatus === "delivered" && deliveredAt) {
    return { to_status: "delivered", created_at: deliveredAt, changed_by_name: null, changed_by_role: "seller", notes: null };
   }
   return { to_status: targetStatus, created_at: null, changed_by_name: null, changed_by_role: "seller", notes: null };
  }
  return null;
 };

 const cancelEvent = isCancelled
  ? (timeline ?? []).find((t) => normalize(t.to_status) === "cancelled" || normalize(t.to_status) === "canceled") ?? null
  : null;

 // A cancelled order only shows the steps it actually reached
 let base = retailSteps;
 if (isCancelled) {
  let lastStepKey = "pending";
  if (cancelEvent?.from_status && STATUS_MAP[normalize(cancelEvent.from_status)] !== undefined) {
   lastStepKey = normalize(cancelEvent.from_status);
  } else {
   let maxIdx = 0;
   (timeline ?? []).forEach((t) => {
    const s = normalize(t.to_status || t.status);
    if (s !== "cancelled" && s !== "canceled" && STATUS_MAP[s] !== undefined) {
     if (STATUS_MAP[s] > maxIdx) {
      maxIdx = STATUS_MAP[s];
      lastStepKey = s;
     }
    }
   });
  }
  const lastIdx = STATUS_MAP[lastStepKey] ?? 0;
  base = retailSteps.filter((_, ind) => ind <= lastIdx);
 }

 const last = retailSteps.length - 1;
 const steps: ViewStep[] = base.map((s, ind) => {
  const reached = isCancelled || ind <= currentStatusIndex;
  const e = reached ? findEvent(s.targetStatus, ind) : null;
  return {
   key: s.key,
   label: s.label,
   icon: s.icon,
   state: !reached ? "todo" : isCancelled || ind < currentStatusIndex || ind === last ? "done" : "current",
   date: e ? formatTimelineDate(e.created_at || e.at) : "",
   actor: actorOf(e, "seller"),
   notes: e?.notes ?? null,
   desc: reached ? s.activeDesc : s.pendingDesc,
  };
 });
 if (isCancelled) {
  steps.push({
   key: "cancelled",
   label: "Cancelled",
   icon: "x",
   state: "bad",
   date: cancelEvent ? formatTimelineDate(cancelEvent.created_at || cancelEvent.at) : "",
   actor: actorOf(cancelEvent, "customer"),
   notes: cancelEvent?.notes ?? null,
   desc: "This order has been cancelled.",
  });
 }

 return (
  <Tracker
   title="Order status"
   steps={steps}
   tone={isCancelled ? "danger" : currentStatusIndex === last ? "success" : "brand"}
  />
 );
}
