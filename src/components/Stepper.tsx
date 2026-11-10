import { Fragment, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

type Step = { title: string; disabled: boolean };

type StepperProps = {
 stepperList: Step[];
 selectedStep?: number;
 onChange?: (Step: Step, index: number) => void;
};

// Checkout progress: icon dots joined by rails that fill as you move on.
// Done = ember with a check, current = ember ring that breathes, todo = grey.

const fill = keyframes`
 from { transform: scaleX(0); }
 to { transform: scaleX(1); }
`;
const pop = keyframes`
 0% { transform: scale(0.6); }
 70% { transform: scale(1.12); }
 100% { transform: scale(1); }
`;
const ring = keyframes`
 0% { opacity: 0.5; transform: scale(1); }
 80%, 100% { opacity: 0; transform: scale(1.6); }
`;
const rise = keyframes`
 from { opacity: 0; transform: translateY(6px); }
 to { opacity: 1; transform: none; }
`;

const Track = styled.ol`
 display: flex;
 align-items: center;
 margin: 0;
 padding: 16px 22px;
 list-style: none;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: 18px;
 animation: ${rise} 360ms cubic-bezier(0.22, 1, 0.36, 1) both;

 li {
  display: flex;
  align-items: center;
  min-width: 0;
 }

 /* rail between steps: grey track + ember fill */
 .step-rule {
  position: relative;
  flex: 1 1 auto;
  min-width: 24px;
  height: 4px;
  margin: 0 14px;
  overflow: hidden;
  border-radius: 4px;
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .step-rule::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
  transform: scaleX(0);
  transform-origin: left center;
 }
 .step-rule[data-done="true"]::after {
  animation: ${fill} 520ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
 }

 .step {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 4px 6px 4px 4px;
  border: 0;
  border-radius: 14px;
  background: none;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 160ms ease;
 }
 .step:hover:enabled {
  background: ${({ theme }) => theme.tz.color.mist};
 }
 .step:disabled {
  cursor: not-allowed;
 }
 .step:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }

 .step-dot {
  position: relative;
  isolation: isolate;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  color: ${({ theme }) => theme.tz.color.slate};
  background: ${({ theme }) => theme.tz.color.lineSoft};
 }
 .step-dot svg {
  width: 18px;
  height: 18px;
 }
 .step-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.25;
 }
 .step-text small {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.tz.color.slate};
 }
 .step-text strong {
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.tz.color.slate};
  white-space: nowrap;
 }
 .step-text span {
  font-size: 12px;
  color: ${({ theme }) => theme.tz.color.slate};
  white-space: nowrap;
 }

 .step[data-state="done"] {
  .step-dot {
   color: #fff;
   background: linear-gradient(135deg, ${({ theme }) => theme.tz.color.ember}, ${({ theme }) => theme.tz.color.emberDeep});
   animation: ${pop} 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .step-text strong {
   color: ${({ theme }) => theme.tz.color.ink};
  }
  .step-text small {
   color: ${({ theme }) => theme.tz.tone.success.fg};
  }
 }
 .step[data-state="current"] {
  .step-dot {
   color: #fff;
   background: ${({ theme }) => theme.tz.color.emberDeep};
   box-shadow: 0 6px 16px rgba(194, 64, 15, 0.3);
   animation: ${pop} 360ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .step-dot::after {
   content: "";
   position: absolute;
   inset: 0;
   z-index: -1;
   border-radius: 50%;
   background: ${({ theme }) => theme.tz.color.ember};
   animation: ${ring} 2.2s ease-out infinite;
  }
  .step-text strong {
   color: ${({ theme }) => theme.tz.color.ink};
  }
  .step-text small {
   color: ${({ theme }) => theme.tz.color.emberDeep};
  }
 }

 @media (max-width: 860px) {
  padding: 12px 14px;
  .step-text span {
   display: none;
  }
  .step-rule {
   margin: 0 8px;
  }
 }
 @media (max-width: 560px) {
  .step {
   flex-direction: column;
   gap: 6px;
   padding: 2px;
   text-align: center;
  }
  .step-dot {
   width: 34px;
   height: 34px;
  }
  .step-text small {
   display: none;
  }
  .step-text strong {
   font-size: 12.5px;
  }
  .step-rule {
   align-self: flex-start;
   margin: 15px 4px 0;
  }
 }

 @media (prefers-reduced-motion: reduce) {
  &,
  .step-dot,
  .step-dot::after,
  .step-rule[data-done="true"]::after {
   animation: none !important;
  }
  .step-rule[data-done="true"]::after {
   transform: none;
  }
 }
`;

// icon + one-line hint per known step title
const META: Record<string, { icon: string; hint: string }> = {
 Details: { icon: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", hint: "Address & items" },
 Payment: { icon: "M2 5h20v14H2zM2 10h20", hint: "Choose how to pay" },
 Submit: { icon: "M22 2 11 13M22 2l-7 20-4-9-9-4z", hint: "Place your order" },
};
const CHECK = "M20 6 9 17l-5-5";

export default function Stepper({ selectedStep = 0, stepperList, onChange }: StepperProps) {
 const [selected, setSelected] = useState<number>(selectedStep);

 const handleStepClick = (step: Step, ind: number) => () => {
  if (!step.disabled) {
   setSelected(ind);
   if (onChange) onChange(step, ind);
  }
 };

 useEffect(() => setSelected(selectedStep), [selectedStep]);

 return (
  <Track aria-label="Checkout progress">
   {stepperList.map((step, ind) => {
    const state = ind < selected ? "done" : ind === selected ? "current" : "todo";
    const meta = META[step.title] ?? { icon: CHECK, hint: "" };
    return (
     <Fragment key={step.title}>
      <li>
       <button
        type="button"
        className="step"
        data-state={state}
        aria-current={state === "current" ? "step" : undefined}
        disabled={step.disabled}
        onClick={handleStepClick(step, ind)}
       >
        <span className="step-dot" key={state}>
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={state === "done" ? 3 : 2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d={state === "done" ? CHECK : meta.icon} />
         </svg>
        </span>
        <span className="step-text">
         <small>{state === "done" ? "Done" : `Step ${ind + 1}`}</small>
         <strong>{step.title}</strong>
         {meta.hint && <span>{meta.hint}</span>}
        </span>
       </button>
      </li>
      {ind < stepperList.length - 1 && (
       <li className="step-rule" aria-hidden="true" data-done={ind < selected} />
      )}
     </Fragment>
    );
   })}
  </Track>
 );
}
