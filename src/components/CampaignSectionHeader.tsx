"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";

import Icon from "./icon/Icon";
import { SectionHeadRow, ViewAllLink } from "./SectionHead";

const Countdown = styled.div`
 display: flex;
 align-items: center;
 gap: 6px;
 font-variant-numeric: tabular-nums;

 .countdown-label {
  margin-right: 2px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .countdown-unit {
  min-width: 36px;
  padding: 4px 6px;
  border-radius: ${({ theme }) => theme.tz.radius.xs}px;
  background: ${({ theme }) => theme.tz.color.navy};
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
 }

 .countdown-expired {
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }
`;
// ==============================================================
export interface CampaignSectionHeaderProps {
 title?: string;
 iconName?: string;
 seeMoreLink?: string;
 endTime?: string; // ISO string or date string
}
// ==============================================================

export default function CampaignSectionHeader({
 title,
 iconName,
 seeMoreLink,
 endTime,
}: CampaignSectionHeaderProps) {
 const [timeLeft, setTimeLeft] = useState<{
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
 } | null>(null);

 // Calculate time remaining
 const calculateTimeLeft = (targetDate: string) => {
  const difference = new Date(targetDate).getTime() - new Date().getTime();

  if (difference > 0) {
   return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
   };
  }

  return {
   days: 0,
   hours: 0,
   minutes: 0,
   seconds: 0,
   isExpired: true,
  };
 };

 useEffect(() => {
  if (!endTime) return;

  // Update immediately
  setTimeLeft(calculateTimeLeft(endTime));

  // Set up interval to update every second
  const timer = setInterval(() => {
   setTimeLeft(calculateTimeLeft(endTime));
  }, 1000);

  return () => clearInterval(timer);
 }, [endTime]);

 const pad = (n: number) => n.toString().padStart(2, "0");

 return (
  <SectionHeadRow>
   <h2 className="section-title">
    {iconName && <Icon color="primary">{iconName}</Icon>}
    {title}
   </h2>

   <div className="section-extras">
    {endTime && timeLeft && (
     <Countdown aria-live="off">
      {timeLeft.isExpired ? (
       <span className="countdown-expired">Ended</span>
      ) : (
       <>
        <span className="countdown-label">Ends in</span>
        {timeLeft.days > 0 && <span className="countdown-unit">{timeLeft.days}d</span>}
        {(timeLeft.hours > 0 || timeLeft.days > 0) && (
         <span className="countdown-unit">{pad(timeLeft.hours)}h</span>
        )}
        <span className="countdown-unit">{pad(timeLeft.minutes)}m</span>
        <span className="countdown-unit">{pad(timeLeft.seconds)}s</span>
       </>
      )}
     </Countdown>
    )}

    {seeMoreLink && <ViewAllLink href={seeMoreLink} />}
   </div>
  </SectionHeadRow>
 );
}

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
`;
document.head.appendChild(styleSheet);
