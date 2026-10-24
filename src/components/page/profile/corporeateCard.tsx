"use client";

import Link from "next/link";
import styled from "styled-components";

import ProfileIdentity from "@sections/customer-dashboard/profile/ProfileIdentity";
import { DetailList, DetailItem } from "@sections/customer-dashboard/ui";

// Profile card for corporate employees: identity, company credit and work details.

const CreditRow = styled.div`
 display: grid;
 grid-template-columns: repeat(3, minmax(0, 1fr));
 gap: 12px;
 margin: 24px 0 8px;

 @media (max-width: 650px) {
  grid-template-columns: minmax(0, 1fr);
 }

 > div {
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.tz.radius.sm}px;
  background: ${({ theme }) => theme.tz.color.mist};
 }

 .cr-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.tz.color.slate};
 }

 .cr-value {
  display: block;
  margin-top: 2px;
  font-family: ${({ theme }) => theme.tz.font.display};
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.tz.color.ink};
  font-variant-numeric: tabular-nums;
 }

 .cr-success {
  background: ${({ theme }) => theme.tz.tone.success.bg};

  .cr-value {
   color: ${({ theme }) => theme.tz.tone.success.fg};
  }
 }

 .cr-danger .cr-value {
  color: ${({ theme }) => theme.tz.tone.danger.fg};
 }
`;

const ShopLink = styled(Link)`
 display: flex;
 align-items: center;
 justify-content: space-between;
 gap: 12px;
 margin-top: 20px;
 padding: 14px 16px;
 border-radius: ${({ theme }) => theme.tz.radius.sm}px;
 background: ${({ theme }) => theme.tz.color.navy};
 color: ${({ theme }) => theme.tz.color.paper};
 text-decoration: none;
 transition: background-color ${({ theme }) => theme.tz.motion.fast};

 .sl-title {
  display: block;
  font-weight: 600;
 }

 .sl-sub {
  display: block;
  font-size: 13px;
  opacity: 0.8;
 }

 &:hover {
  background: ${({ theme }) => theme.tz.color.ink};
 }

 &:focus-visible {
  outline: none;
  box-shadow: ${({ theme }) => theme.tz.focusRing};
 }
`;

const typeLabelOf = (type?: string) =>
 type === "employee"
  ? "Corporate employee"
  : type === "buyer"
    ? "Customer"
    : type === "seller"
      ? "Seller"
      : type;

const CorporateCard = ({ profile }) => {
 const genderLabel =
  profile?.gender === "male"
   ? "Male"
   : profile?.gender === "female"
     ? "Female"
     : "N/A";

 const formattedBirthDate = profile?.birth_date
  ? new Date(profile.birth_date)
     .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
     })
     .replace(/(\d{2} \w{3}) (\d{4})/, "$1, $2")
  : "N/A";

 return (
  <ProfileIdentity
   name={profile?.name}
   email={profile?.email}
   phone={profile?.phone}
   image={profile?.image}
   typeLabel={typeLabelOf(profile?.type)}
  >
   <CreditRow>
    <div className="cr-success">
     <span className="cr-label">Credit balance</span>
     <span className="cr-value">{profile?.credit_balance ?? "0"}</span>
    </div>
    <div>
     <span className="cr-label">Credit pending</span>
     <span className="cr-value">{profile?.credit_pending ?? "0"}</span>
    </div>
    <div className="cr-danger">
     <span className="cr-label">Due amount</span>
     <span className="cr-value">{profile?.due_amount ?? "0"}</span>
    </div>
   </CreditRow>

   <DetailList>
    <DetailItem label="Company">{profile?.company_name || "N/A"}</DetailItem>
    <DetailItem label="Employee ID">{profile?.employee_code || "N/A"}</DetailItem>
    <DetailItem label="Designation">{profile?.designation || "N/A"}</DetailItem>
    <DetailItem label="Email">
     {profile?.email ? <a href={`mailto:${profile.email}`}>{profile.email}</a> : "N/A"}
    </DetailItem>
    <DetailItem label="Phone">
     {profile?.phone ? <a href={`tel:${profile.phone}`}>{profile.phone}</a> : "N/A"}
    </DetailItem>
    <DetailItem label="Birthday">{formattedBirthDate}</DetailItem>
    <DetailItem label="Gender">{genderLabel}</DetailItem>
   </DetailList>

   {/* Corporate Shop Link */}
   {profile?.shop_slug && (
    <ShopLink href={`/shops/${profile.shop_slug}`}>
     <span>
      <span className="sl-title">Visit corporate shop</span>
      <span className="sl-sub">{profile?.company_name || "Browse products"}</span>
     </span>
     <span aria-hidden="true">&#8594;</span>
    </ShopLink>
   )}
  </ProfileIdentity>
 );
};

export default CorporateCard;
