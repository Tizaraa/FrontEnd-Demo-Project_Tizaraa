import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";

type Step = { title: string; disabled: boolean };

type StepperProps = {
 stepperList: Step[];
 selectedStep?: number;
 onChange?: (Step: Step, index: number) => void;
};

// Checkout progress: numbered steps joined by a rule.
// Done steps are filled navy, the current step ember, upcoming steps quiet.

const Track = styled.ol`
 display: flex;
 align-items: center;
 margin: 0;
 padding: 16px 20px;
 list-style: none;
 background: ${({ theme }) => theme.tz.color.paper};
 border: 1px solid ${({ theme }) => theme.tz.color.line};
 border-radius: ${({ theme }) => theme.tz.radius.md}px;

 li {
  display: flex;
  align-items: center;
 }

 .step-rule {
  flex: 1 1 auto;
  min-width: 24px;
  height: 2px;
  margin: 0 12px;
  border-radius: 2px;
  background: ${({ theme }) => theme.tz.color.line};
  transition: background-color ${({ theme }) => theme.tz.motion.base};

  &[data-done="true"] {
   background: ${({ theme }) => theme.tz.color.navy};
  }
 }

 .step {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 4px;
  border: 0;
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
  background: none;
  font-family: inherit;
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
   cursor: not-allowed;
  }
 }

 .step-dot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.tz.color.slate};
  background: ${({ theme }) => theme.tz.color.lineSoft};
  transition: background-color ${({ theme }) => theme.tz.motion.base},
   color ${({ theme }) => theme.tz.motion.base};
 }

 .step[data-state="done"] {
  color: ${({ theme }) => theme.tz.color.ink};

  .step-dot {
   color: ${({ theme }) => theme.tz.color.paper};
   background: ${({ theme }) => theme.tz.color.navy};
  }
 }

 .step[data-state="current"] {
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.ink};

  .step-dot {
   color: ${({ theme }) => theme.tz.color.paper};
   background: ${({ theme }) => theme.tz.color.emberDeep};
   box-shadow: 0 0 0 4px ${({ theme }) => theme.tz.color.emberTint};
  }
 }
`;

export default function Stepper({
 selectedStep = 0,
 stepperList,
 onChange,
}: StepperProps) {
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
        <span className="step-dot">{ind + 1}</span>
        {step.title}
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
