import Card from "@component/Card";
import Avatar from "@component/avatar";
import { H5 } from "@component/Typography";
import Link from "next/link";

import ApiBaseUrl from "api/ApiBaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faMars,
 faGenderless,
 faVenus,
 faUser,
 faCalendar,
 faFemale,
 faBriefcase,
 faIdBadge,
 faBuilding,
 faWallet,
 faStore,
 faEnvelope,
 faPhone,
} from "@fortawesome/free-solid-svg-icons";

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
  <Card
   p="0"
   borderRadius="8px"
   style={{
    boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
    height: "100%",
    background: "#ffffff",
    border: "1px solid #DAE1E7",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
   }}
  >
   {/* Header */}
   <div
    style={{
     background: "linear-gradient(135deg, #0F3460, #E94560)",
     padding: "1rem 1.25rem",
     display: "flex",
     alignItems: "center",
     gap: "1rem",
    }}
   >
    {profile?.image ? (
     <Avatar
      size={56}
      src={`${ApiBaseUrl.ImgUrl}${profile.image}`}
      style={{
       border: "2px solid rgba(255,255,255,0.8)",
       flexShrink: 0,
      }}
     />
    ) : (
     <div
      style={{
       width: "56px",
       height: "56px",
       borderRadius: "50%",
       background: "rgba(255,255,255,0.15)",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       border: "2px solid rgba(255,255,255,0.8)",
       flexShrink: 0,
      }}
     >
      <FontAwesomeIcon
       icon={profile?.gender === "female" ? faFemale : faUser}
       size="lg"
       color="#fff"
      />
     </div>
    )}
    <div style={{ minWidth: 0, flex: 1 }}>
     <H5
      style={{
       fontSize: "1.1rem",
       color: "#fff",
       fontWeight: "700",
       margin: 0,
       whiteSpace: "nowrap",
       overflow: "hidden",
       textOverflow: "ellipsis",
       lineHeight: "1.3",
      }}
      title={profile?.name || ""}
     >
      {profile?.name || "No Name"}
     </H5>
     {profile?.type && (
      <span
       style={{
        display: "inline-block",
        marginTop: "0.2rem",
        padding: "2px 10px",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.2)",
        color: "#fff",
        fontSize: "0.7rem",
        fontWeight: "600",
       }}
      >
       {profile.type}
      </span>
     )}
    </div>
   </div>

   {/* Info Grid - Two Columns */}
   <div
    style={{
     padding: "0.75rem 1rem",
     display: "grid",
     gridTemplateColumns: "1fr 1fr",
     gap: "0.35rem",
     flex: 1,
    }}
   >
    <InfoRow
     icon={faBuilding}
     iconBg="#FCE9EC"
     iconColor="#D23F57"
     label="Company"
     value={profile?.company_name || "N/A"}
    />
    <InfoRow
     icon={faIdBadge}
     iconBg="rgba(15, 52, 96, 0.1)"
     iconColor="#0F3460"
     label="Employee ID"
     value={profile?.employee_id || "N/A"}
    />
    <InfoRow
     icon={faBriefcase}
     iconBg="#FCE9EC"
     iconColor="#D23F57"
     label="Designation"
     value={profile?.designation || "N/A"}
    />
    <InfoRow
     icon={faCalendar}
     iconBg="rgba(15, 52, 96, 0.1)"
     iconColor="#0F3460"
     label="Birthday"
     value={formattedBirthDate}
    />
    <InfoRow
     icon={
      profile?.gender === "male"
       ? faMars
       : profile?.gender === "female"
         ? faVenus
         : faGenderless
     }
     iconBg="#FCE9EC"
     iconColor={
      profile?.gender === "male"
       ? "#0F3460"
       : profile?.gender === "female"
         ? "#E94560"
         : "#7D879C"
     }
     label="Gender"
     value={genderLabel}
    />
    <InfoRow
     icon={faWallet}
     iconBg="rgba(51, 208, 103, 0.15)"
     iconColor="#15803d"
     label="Credit Balance"
     value={profile?.credit_balance ?? "0"}
     highlight
    />
    <a href={`mailto:${profile?.email}`} style={{ textDecoration: "none" }}>
     <InfoRow
      icon={faEnvelope}
      iconBg="rgba(15, 52, 96, 0.1)"
      iconColor="#0F3460"
      label="Email"
      value={profile?.email || "N/A"}
     />
    </a>
    <a href={`tel:${profile?.phone}`} style={{ textDecoration: "none" }}>
     <InfoRow
      icon={faPhone}
      iconBg="#FCE9EC"
      iconColor="#D23F57"
      label="Phone"
      value={profile?.phone || "N/A"}
     />
    </a>
   </div>

   {/* Corporate Shop Link */}
   {(
    <Link href={`/shops/${profile?.shop_slug || "corporate-shop"}`}>
     <div
      style={{
       margin: "0 1rem 0.75rem",
       padding: "0.5rem 0.75rem",
       borderRadius: "6px",
       background: "linear-gradient(135deg, #0F3460, #E94560)",
       display: "flex",
       alignItems: "center",
       gap: "0.6rem",
       cursor: "pointer",
       transition: "opacity 0.2s ease",
      }}
     >
      <div
       style={{
        width: "28px",
        height: "28px",
        borderRadius: "6px",
        background: "rgba(255,255,255,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
       }}
      >
       <FontAwesomeIcon icon={faStore} size="xs" color="#fff" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
       <span
        style={{
         fontSize: "0.85rem",
         color: "#fff",
         fontWeight: "600",
         display: "block",
         lineHeight: "1.3",
        }}
       >
        Visit Corporate Shop
       </span>
       <span
        style={{
         fontSize: "0.65rem",
         color: "rgba(255,255,255,0.7)",
        }}
       >
        {profile?.company_name || "Browse products"}
       </span>
      </div>
      <span style={{ color: "#fff", fontSize: "1rem" }}>&#8594;</span>
     </div>
    </Link>
   )}
  </Card>
 );
};

const InfoRow = ({
 icon,
 iconBg,
 iconColor,
 label,
 value,
 highlight = false,
}: {
 icon: any;
 iconBg: string;
 iconColor: string;
 label: string;
 value: string;
 highlight?: boolean;
}) => (
 <div
  style={{
   display: "flex",
   alignItems: "center",
   gap: "0.6rem",
   padding: "0.4rem 0.6rem",
   borderRadius: "6px",
   background: highlight ? "rgba(51, 208, 103, 0.08)" : "#F6F9FC",
  }}
 >
  <div
   style={{
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    background: iconBg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
   }}
  >
   <FontAwesomeIcon icon={icon} size="xs" color={iconColor} />
  </div>
  <span style={{ fontSize: "0.8rem", color: "#7D879C", flexShrink: 0 }}>
   {label}
  </span>
  <span
   style={{
    fontSize: "0.85rem",
    color: highlight ? "#15803d" : "#2B3445",
    fontWeight: highlight ? "700" : "500",
    marginLeft: "auto",
    textAlign: "right",
    wordBreak: "break-word",
   }}
  >
   {value}
  </span>
 </div>
);

export default CorporateCard;
