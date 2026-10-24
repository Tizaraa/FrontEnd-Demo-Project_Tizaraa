"use client";

import { ReactNode } from "react";
import styled from "styled-components";
import { DashPanel, ToneChip, UserAvatar } from "../ui";

// Top card of the profile page: photo or initials, name, contact line and account type.

const Row = styled.div`
 display: flex;
 align-items: center;
 gap: 20px;

 .pi-text {
  min-width: 0;
 }

 .pi-name {
  margin: 0 0 4px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 24px;
  font-weight: 600;
  line-height: 1.25;
  color: ${({ theme }) => theme.tz.color.ink};
  overflow-wrap: anywhere;
 }

 .pi-contact {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  margin: 0 0 12px;
  font-size: 14px;
  color: ${({ theme }) => theme.tz.color.slate};
  overflow-wrap: anywhere;
 }

 @media (max-width: 650px) {
  align-items: flex-start;
  gap: 16px;

  .pi-name {
   font-size: 20px;
  }
 }
`;

export default function ProfileIdentity({
 name,
 email,
 phone,
 image,
 typeLabel,
 children,
}: {
 name?: string;
 email?: string;
 phone?: string;
 image?: string | null;
 typeLabel?: string;
 children?: ReactNode;
}) {
 return (
  <DashPanel>
   <Row>
    <UserAvatar name={name || email} image={image} size={72} />
    <div className="pi-text">
     <h2 className="pi-name">{name || "No Name"}</h2>
     {(email || phone) && (
      <p className="pi-contact">
       {email && <span>{email}</span>}
       {phone && <span>{phone}</span>}
      </p>
     )}
     {typeLabel && <ToneChip $tone="info">{typeLabel}</ToneChip>}
    </div>
   </Row>
   {children}
  </DashPanel>
 );
}
