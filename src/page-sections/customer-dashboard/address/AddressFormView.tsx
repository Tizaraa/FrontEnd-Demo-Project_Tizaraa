"use client";

import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Select from "@component/Select";

// Shared look for the three address forms (add, add-from-checkout, edit).
// Each form keeps its own Formik setup, API call and redirect; this only draws
// the fields. Field names: name, contact, address, postal_code, province,
// city, area, is_default.

type Opt = { id: number | string; [k: string]: any };

export interface AddressFormViewProps {
 values: any;
 errors: any;
 touched: any;
 submitCount: number;
 handleChange: (e: React.ChangeEvent<any>) => void;
 handleBlur: (e: React.FocusEvent<any>) => void;
 setFieldValue: (field: string, value: any) => void;
 province: Opt[];
 city: Opt[];
 area: Opt[];
 onProvince: (id: number) => void;
 onCity: (id: number) => void;
 landmark: number | null;
 onLandmark: (value: 1 | 2) => void;
 landmarkError?: string | null;
 loading?: boolean;
 submitLabel: string;
 onCancel: () => void;
}

const rise = keyframes`
 from { opacity: 0; transform: translateY(10px); }
 to { opacity: 1; transform: none; }
`;
const pop = keyframes`
 0% { transform: scale(0.5); opacity: 0; }
 70% { transform: scale(1.12); opacity: 1; }
 100% { transform: none; }
`;
const spin = keyframes`
 to { transform: rotate(360deg); }
`;

const Wrap = styled.div`
 display: grid;
 grid-template-columns: minmax(0, 1fr) 300px;
 gap: 20px;
 align-items: start;

 .af-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
 }
 .af-card {
  padding: 20px 22px;
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 18px;
  background: ${({ theme }) => theme.tz.color.paper};
  animation: ${rise} 440ms cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: calc(var(--d, 0) * 80ms);
 }
 .af-step {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 16px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .af-step b {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  font-size: 13px;
 }
 .af-step small {
  margin-left: auto;
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .af-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 16px;
 }
 .af-full {
  grid-column: 1 / -1;
 }
 /* Division / City / Area side by side, same width, labels on one line */
 .af-row3 {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px 16px;
  align-items: start;
 }
 .af-row3 .af-label {
  white-space: nowrap;
 }

 .af-field label,
 .af-field .af-label {
  display: block;
  margin-bottom: 6px;
  font-size: 13.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .af-field label em,
 .af-field .af-label em {
  font-style: normal;
  color: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .af-field label span,
 .af-field .af-label span {
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .af-input {
  display: flex;
  align-items: center;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.paper};
  transition: border-color 160ms ease, box-shadow 160ms ease;
 }
 .af-input:hover {
  border-color: #cfd4dd;
 }
 .af-input:focus-within {
  border-color: ${({ theme }) => theme.tz.color.ember};
  box-shadow: 0 0 0 4px rgba(240, 80, 35, 0.12);
 }
 .af-input.is-bad {
  border-color: ${({ theme }) => theme.tz.tone.danger.fill};
  background: #fffafa;
 }
 .af-input input,
 .af-input textarea {
  flex: 1;
  min-width: 0;
  padding: 12px 14px;
  border: 0 !important;
  outline: none !important;
  box-shadow: none !important;
  background: transparent;
  font-family: inherit;
  font-size: 14.5px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .af-input textarea {
  min-height: 84px;
  resize: vertical;
  line-height: 1.5;
 }
 .af-prefix {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0 10px 0 12px;
  border-right: 1px solid ${({ theme }) => theme.tz.color.line};
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  white-space: nowrap;
 }
 .af-hint {
  margin: 6px 0 0;
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .af-err {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 6px 0 0;
  font-size: 12.5px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.tone.danger.fg};
  animation: ${rise} 220ms ease both;
 }

 .af-country {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 14px;
  border: 1.5px dashed ${({ theme }) => theme.tz.color.line};
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.mist};
  font-size: 14.5px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .af-country small {
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .af-select.is-locked {
  opacity: 0.55;
 }
 .af-select:not(.is-locked) {
  animation: ${rise} 260ms ease both;
 }

 /* address type cards */
 .af-types {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
 }
 .af-type {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease, transform 200ms ease;
 }
 .af-type:hover {
  border-color: #f6b9a3;
  transform: translateY(-1px);
 }
 .af-type[aria-checked="true"] {
  border-color: ${({ theme }) => theme.tz.color.ember};
  background: ${({ theme }) => theme.tz.color.emberTint};
 }
 .af-type-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${({ theme }) => theme.tz.color.mist};
  color: ${({ theme }) => theme.tz.color.inkSoft};
 }
 .af-type[aria-checked="true"] .af-type-icon {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }
 .af-type strong {
  display: block;
  font-size: 14.5px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .af-type small {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .af-tick {
  position: absolute;
  top: 8px;
  right: 8px;
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
  animation: ${pop} 300ms cubic-bezier(0.22, 1, 0.36, 1) both;
 }
 .af-types.is-bad .af-type {
  border-color: ${({ theme }) => theme.tz.tone.danger.bg};
 }

 /* default switch */
 .af-default {
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.mist};
  cursor: pointer;
 }
 .af-default input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
 }
 .af-switch {
  position: relative;
  flex-shrink: 0;
  width: 42px;
  height: 24px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.line};
  transition: background-color 180ms ease;
 }
 .af-switch::after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgba(20, 21, 32, 0.25);
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
 }
 .af-default input:checked + .af-switch {
  background: ${({ theme }) => theme.tz.color.emberDeep};
 }
 .af-default input:checked + .af-switch::after {
  transform: translateX(18px);
 }
 .af-default input:focus-visible + .af-switch {
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
 .af-default strong {
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .af-default small {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 /* preview */
 .af-side {
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${rise} 440ms cubic-bezier(0.22, 1, 0.36, 1) 200ms both;
 }
 .af-preview {
  padding: 16px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.ember};
  border-radius: 16px;
  background: #fff8f4;
 }
 .af-preview > small {
  display: block;
  margin-bottom: 10px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .af-pv-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
 }
 .af-pv-top strong {
  font-size: 15px;
  color: ${({ theme }) => theme.tz.color.ink};
 }
 .af-pv-tag {
  padding: 2px 9px;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.navyTint};
  color: ${({ theme }) => theme.tz.color.navy};
  font-size: 11.5px;
  font-weight: 700;
 }
 .af-pv-tag--def {
  background: ${({ theme }) => theme.tz.color.emberDeep};
  color: #fff;
 }
 .af-pv-line {
  display: flex;
  gap: 8px;
  margin: 4px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: ${({ theme }) => theme.tz.color.inkSoft};
  overflow-wrap: anywhere;
 }
 .af-pv-line svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .af-pv-empty {
  color: ${({ theme }) => theme.tz.color.slate};
  font-style: italic;
 }
 .af-progress {
  padding: 12px 14px;
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  border: 1px solid ${({ theme }) => theme.tz.color.line};
  font-size: 12.5px;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .af-progress div {
  height: 6px;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .af-progress i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.tone.success.fill});
  transition: width 300ms ease;
 }

 /* actions */
 .af-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
 }
 .af-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 22px;
  border: 1.5px solid ${({ theme }) => theme.tz.color.line};
  border-radius: 14px;
  background: ${({ theme }) => theme.tz.color.paper};
  color: ${({ theme }) => theme.tz.color.ink};
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
 }
 .af-btn:hover:enabled {
  border-color: ${({ theme }) => theme.tz.color.slate};
 }
 .af-btn--solid {
  min-width: 170px;
  border-color: transparent;
  background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  color: #fff;
  box-shadow: 0 10px 22px rgba(194, 64, 15, 0.28);
 }
 .af-btn--solid:hover:enabled {
  border-color: transparent;
  transform: translateY(-1px);
 }
 .af-btn:disabled {
  opacity: 0.6;
  cursor: progress;
 }
 .af-spin {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;
  animation: ${spin} 700ms linear infinite;
 }
 .af-btn:focus-visible,
 .af-type:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 @media (max-width: 980px) {
  grid-template-columns: minmax(0, 1fr);
  .af-side {
   position: static;
   order: -1;
  }
 }
 @media (max-width: 760px) {
  .af-row3 {
   grid-template-columns: minmax(0, 1fr);
  }
 }
 @media (max-width: 600px) {
  .af-card {
   padding: 16px;
  }
  .af-grid,
  .af-types {
   grid-template-columns: minmax(0, 1fr);
  }
  .af-actions {
   flex-direction: column-reverse;
  }
 }
 @media (prefers-reduced-motion: reduce) {
  .af-card,
  .af-side,
  .af-err,
  .af-tick,
  .af-select:not(.is-locked) {
   animation: none;
  }
  .af-type,
  .af-switch::after,
  .af-progress i,
  .af-btn {
   transition: none;
  }
 }
`;

const Ico = ({ d, size = 16 }: { d: string; size?: number }) => (
 <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  <path d={d} />
 </svg>
);
const I = {
 alert: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 8v4M12 16h.01",
 home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
 office: "M4 21V3h11v18M15 9h5v12M8 7h3M8 11h3M8 15h3",
 pin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
 phone:
  "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z",
 check: "M20 6 9 17l-5-5",
};

export default function AddressFormView(p: AddressFormViewProps) {
 const { values, errors, touched, submitCount, handleChange, handleBlur, setFieldValue } = p;
 const rootRef = useRef<HTMLDivElement>(null);

 // after a failed save, bring the first problem into view
 useEffect(() => {
  if (!submitCount) return;
  const bad = rootRef.current?.querySelector<HTMLElement>(".is-bad, .af-err");
  bad?.scrollIntoView({ behavior: "smooth", block: "center" });
 }, [submitCount]);

 const err = (k: string) => (touched[k] || submitCount > 0) && errors[k] ? String(errors[k]) : null;
 const Err = ({ k }: { k: string }) =>
  err(k) ? (
   <p className="af-err" role="alert">
    <Ico d={I.alert} size={14} />
    {err(k)}
   </p>
  ) : null;

 const provName = p.province.find((x) => x.id == values.province)?.province;
 const cityName = p.city.find((x) => x.id == values.city)?.city;
 const areaName = p.area.find((x) => x.id == values.area)?.area;
 const line = [values.address, areaName, cityName, provName, values.postal_code]
  .map((v) => String(v ?? "").trim())
  .filter(Boolean)
  .join(", ");
 const typeLabel = p.landmark === 1 ? "Home" : p.landmark === 2 ? "Office" : null;

 const required = [values.name, values.contact, values.address, values.province, values.city, values.area, p.landmark];
 const done = required.filter((v) => v !== null && v !== undefined && String(v).trim() !== "").length;
 const landmarkErr =
  p.landmarkError !== undefined ? p.landmarkError : submitCount > 0 && !p.landmark ? "Please choose Home or Office" : null;

 return (
  <Wrap ref={rootRef}>
   <div className="af-main">
    {/* 1. Contact */}
    <section className="af-card" style={{ ["--d" as any]: 0 }}>
     <h3 className="af-step">
      <b>1</b>Contact details
     </h3>
     <div className="af-grid">
      <div className="af-field">
       <label htmlFor="af-name">
        Full name <em>*</em>
       </label>
       <div className={`af-input${err("name") ? " is-bad" : ""}`}>
        <input id="af-name" name="name" type="text" autoComplete="name" placeholder="Who receives the order" value={values.name || ""} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!err("name")} />
       </div>
       <Err k="name" />
      </div>
      <div className="af-field">
       <label htmlFor="af-phone">
        Phone number <em>*</em>
       </label>
       <div className={`af-input${err("contact") ? " is-bad" : ""}`}>
        <span className="af-prefix" aria-hidden="true">
         🇧🇩 +88
        </span>
        <input id="af-phone" name="contact" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="01XXXXXXXXX" value={values.contact || ""} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!err("contact")} />
       </div>
       <Err k="contact" />
      </div>
     </div>
    </section>

    {/* 2. Location */}
    <section className="af-card" style={{ ["--d" as any]: 1 }}>
     <h3 className="af-step">
      <b>2</b>Location
     </h3>
     <div className="af-grid">
      <div className="af-field af-full">
       <span className="af-label">Country</span>
       <span className="af-country">
        🇧🇩 Bangladesh <small>· we deliver inside Bangladesh</small>
       </span>
      </div>

      <div className="af-row3 af-full">
      <div className="af-field af-select">
       <span className="af-label">
        Division <em>*</em>
       </span>
       <Select
        placeholder="Select division"
        options={p.province.map((x) => ({ value: x.id, label: x.province }))}
        value={values.province ? { value: values.province, label: provName } : null}
        onChange={(e: { value: number }) => p.onProvince(e.value)}
       />
       <Err k="province" />
      </div>

      <div className={`af-field af-select${values.province ? "" : " is-locked"}`} key={`city-${values.province ? "on" : "off"}`}>
       <span className="af-label">
        City <em>*</em>
       </span>
       <Select
        placeholder={values.province ? "Select city" : "Select a division first"}
        isDisabled={!values.province}
        options={p.city.map((x) => ({ value: x.id, label: x.city }))}
        value={values.city ? { value: values.city, label: cityName } : null}
        onChange={(e: { value: number }) => p.onCity(e.value)}
       />
       <Err k="city" />
      </div>

      <div className={`af-field af-select${values.city ? "" : " is-locked"}`} key={`area-${values.city ? "on" : "off"}`}>
       <span className="af-label">
        Area <em>*</em>
       </span>
       <Select
        placeholder={values.city ? "Select area" : "Select a city first"}
        isDisabled={!values.city}
        options={p.area.map((x) => ({ value: x.id, label: x.area }))}
        value={values.area ? { value: values.area, label: areaName } : null}
        onChange={(e: { value: number }) => setFieldValue("area", e.value)}
       />
       <Err k="area" />
      </div>
      </div>

      <div className="af-field">
       <label htmlFor="af-post">
        Postcode <span>(optional)</span>
       </label>
       <div className={`af-input${err("postal_code") ? " is-bad" : ""}`}>
        <input id="af-post" name="postal_code" type="text" inputMode="numeric" placeholder="e.g. 1207" value={values.postal_code || ""} onChange={handleChange} onBlur={handleBlur} />
       </div>
       <Err k="postal_code" />
      </div>

      <div className="af-field af-full">
       <label htmlFor="af-address">
        Street address <em>*</em>
       </label>
       <div className={`af-input${err("address") ? " is-bad" : ""}`}>
        <textarea id="af-address" name="address" placeholder="House no., road, block, nearby landmark" value={values.address || ""} onChange={handleChange} onBlur={handleBlur} aria-invalid={!!err("address")} />
       </div>
       <p className="af-hint">Add a landmark (e.g. “near City Bank”) so the rider finds you easily.</p>
       <Err k="address" />
      </div>
     </div>
    </section>

    {/* 3. Type */}
    <section className="af-card" style={{ ["--d" as any]: 2 }}>
     <h3 className="af-step">
      <b>3</b>Address type <small>Required</small>
     </h3>
     <div className={`af-types${landmarkErr ? " is-bad" : ""}`} role="radiogroup" aria-label="Address type">
      {[
       { v: 1 as const, label: "Home", sub: "Delivered any time of day", icon: I.home },
       { v: 2 as const, label: "Office", sub: "Delivered during work hours", icon: I.office },
      ].map((t) => (
       <button key={t.v} type="button" role="radio" aria-checked={p.landmark === t.v} className="af-type" onClick={() => p.onLandmark(t.v)}>
        <span className="af-type-icon">
         <Ico d={t.icon} size={20} />
        </span>
        <span>
         <strong>{t.label}</strong>
         <small>{t.sub}</small>
        </span>
        {p.landmark === t.v && (
         <span className="af-tick">
          <Ico d={I.check} size={12} />
         </span>
        )}
       </button>
      ))}
     </div>
     {landmarkErr && (
      <p className="af-err" role="alert">
       <Ico d={I.alert} size={14} />
       {landmarkErr}
      </p>
     )}

     <label className="af-default">
      <input type="checkbox" name="is_default" checked={!!values.is_default} onChange={handleChange} />
      <span className="af-switch" aria-hidden="true" />
      <span>
       <strong>Set as default address</strong>
       <small>Picked automatically at checkout.</small>
      </span>
     </label>
    </section>

    <div className="af-actions">
     <button type="button" className="af-btn" onClick={p.onCancel} disabled={p.loading}>
      Cancel
     </button>
     <button type="submit" className="af-btn af-btn--solid" disabled={p.loading}>
      {p.loading && <span className="af-spin" aria-hidden="true" />}
      {p.loading ? "Saving..." : p.submitLabel}
     </button>
    </div>
   </div>

   {/* live preview */}
   <aside className="af-side" aria-label="Preview">
    <div className="af-preview">
     <small>Preview</small>
     <div className="af-pv-top">
      <strong>{values.name?.trim() || <span className="af-pv-empty">Your name</span>}</strong>
      {typeLabel && <span className="af-pv-tag">{typeLabel}</span>}
      {values.is_default && <span className="af-pv-tag af-pv-tag--def">Default</span>}
     </div>
     <p className="af-pv-line">
      <Ico d={I.pin} size={14} />
      <span>{line || <span className="af-pv-empty">Address will appear here</span>}</span>
     </p>
     <p className="af-pv-line">
      <Ico d={I.phone} size={14} />
      <span>{values.contact?.trim() || <span className="af-pv-empty">Phone number</span>}</span>
     </p>
    </div>
    <div className="af-progress">
     {done} of {required.length} required fields filled
     <div>
      <i style={{ width: `${(done / required.length) * 100}%` }} />
     </div>
    </div>
   </aside>
  </Wrap>
 );
}
