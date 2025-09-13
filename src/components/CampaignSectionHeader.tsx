"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import Icon from "./icon/Icon";
import FlexBox from "./FlexBox";
import { H2, H3, H4, H5, SemiSpan } from "./Typography";
import Head from "next/head";
import { Yesteryear } from "next/font/google";
// ==============================================================
export interface CampaignSectionHeaderProps {
  title?: string;
  iconName?: string;
  seeMoreLink?: string;
  endTime?: string; // ISO string or date string
}
// ==============================================================
const lobster = Yesteryear({ weight: "400", subsets: ["latin"] });

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

  return (
    <FlexBox justifyContent="space-between" alignItems="center" mb="1.5rem">
      <FlexBox alignItems="center">
        {iconName && (
          <Icon mr="0.5rem" color="primary">
            {iconName}
          </Icon>
        )}
        <H3 fontWeight="bold" lineHeight="1">
          {title}
        </H3>
      </FlexBox>

      <FlexBox style={{ alignItems: "center", gap: "16px" }}>
        {endTime && timeLeft && (
          <FlexBox style={{ alignItems: "center", gap: "8px" }}>
            <SemiSpan
              className={lobster.className}
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#ff3c00",
                fontFamily: "'Lobster', cursive",
                letterSpacing: "0.05em", // Slight letter spacing for flair
                textTransform: "uppercase", // Uppercase for emphasis
              }}
            >
              ENDS IN:
            </SemiSpan>
            <SemiSpan
              style={{
                color: timeLeft.isExpired ? "#ef4444" : "#374151",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              {timeLeft.isExpired ? (
                "Expired"
              ) : (
                <span style={{ display: "flex", gap: "8px" }}>
                  {timeLeft.days > 0 && (
                    <span
                      style={{
                        backgroundColor: "#ff4d6d",
                        color: "#ffffff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {timeLeft.days}d
                    </span>
                  )}
                  {(timeLeft.hours > 0 || timeLeft.days > 0) && (
                    <span
                      style={{
                        backgroundColor: "#3b82f6",
                        color: "#ffffff",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      {timeLeft.hours.toString().padStart(2, "0")}h
                    </span>
                  )}
                  <span
                    style={{
                      backgroundColor: "#10b981",
                      color: "#ffffff",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {timeLeft.minutes.toString().padStart(2, "0")}m
                  </span>
                  <span
                    style={{
                      backgroundColor: "#8b5cf6",
                      color: "#ffffff",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    {timeLeft.seconds.toString().padStart(2, "0")}s
                  </span>
                </span>
              )}
            </SemiSpan>
          </FlexBox>
        )}
      </FlexBox>

      {seeMoreLink && (
        <Link href={seeMoreLink}>
          <FlexBox
            style={{
              alignItems: "center",
              marginLeft: "8px",
              color: "#6b7280",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#ff4d6d")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#6b7280")
            }
          >
            <SemiSpan
              style={{ marginRight: "8px", fontSize: "14px", fontWeight: 500 }}
            >
              View all
            </SemiSpan>
            <span
              style={{
                display: "inline-block", // needed for transform to work properly
                transform: "translateX(0)",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.transform =
                  "translateX(4px)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.transform =
                  "translateX(0)")
              }
            >
              <Icon size="12px" defaultcolor="currentColor">
                right-arrow
              </Icon>
            </span>
          </FlexBox>
        </Link>
      )}
    </FlexBox>
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
