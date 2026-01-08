import Card from "@component/Card";
import Avatar from "@component/avatar";
import FlexBox from "@component/FlexBox";
import { H5 } from "@component/Typography";

import ApiBaseUrl from "api/ApiBaseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faMars,
 faGenderless,
 faVenus,
 faUser,
 faCalendar,
 faFemale,
} from "@fortawesome/free-solid-svg-icons";

const CorporateCard = ({ profile }) => {
 return (
  <Card
   p="2rem"
   borderRadius="16px"
   style={{
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
    height: "100%",
    background: "linear-gradient(145deg, #ffffff, #f5f7fa)",
    border: "1px solid rgba(230, 230, 230, 0.5)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
   }}
  >
   <FlexBox
    alignItems="flex-start" // Changed to flex-start so long content doesn't stretch vertically
    mb="1.5rem"
    style={{
     gap: "1.5rem",
     width: "100%",
    }}
   >
    {/* Avatar / Placeholder */}
    {profile?.image ? (
     <Avatar
      size={100}
      src={`${ApiBaseUrl.ImgUrl}${profile.image}`}
      style={{
       border: "3px solid #E94560",
       boxShadow: "0 4px 15px rgba(233, 69, 96, 0.2)",
       flexShrink: 0, // Prevents avatar from shrinking
      }}
     />
    ) : (
     <div
      style={{
       width: "100px",
       height: "100px",
       borderRadius: "50%",
       background: "linear-gradient(135deg, #f5f7fa, #e4e8f0)",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       boxShadow: "0 4px 15px rgba(107, 114, 128, 0.2)",
       border: "3px solid #6b7280",
       flexShrink: 0,
      }}
     >
      {profile?.gender === "male" ? (
       <FontAwesomeIcon icon={faUser} size="3x" color="#1e3a8a" />
      ) : profile?.gender === "female" ? (
       <FontAwesomeIcon icon={faFemale} size="3x" color="#E94560" />
      ) : (
       <FontAwesomeIcon icon={faUser} size="3x" color="#6b7280" />
      )}
     </div>
    )}

    {/* Right side - Info */}
    <div
     style={{
      flex: 1,
      minWidth: 0, // ← Critical: prevents overflow
      overflow: "hidden",
     }}
    >
     {/* Name - truncated with ellipsis if too long */}
     <H5
      style={{
       fontSize: "24px",
       background: "linear-gradient(90deg, #1e3a8a, #E94560)",
       WebkitBackgroundClip: "text",
       WebkitTextFillColor: "transparent",
       fontWeight: "700",
       whiteSpace: "nowrap",
       overflow: "hidden",
       textOverflow: "ellipsis",
       lineHeight: "1.3",
      }}
      title={profile?.name ? `${profile.name}` : ""} // tooltip shows full name on hover
     >
      {profile?.name || "No Name"}{" "}
     </H5>
     <H5
      style={{
       fontSize: "0.8rem",
       margin: "0 0 0.6rem 0",
       background: "linear-gradient(90deg, #1e3a8a, #E94560)",
       WebkitBackgroundClip: "text",
       WebkitTextFillColor: "transparent",
       fontWeight: "700",
       whiteSpace: "nowrap",
       overflow: "hidden",
       textOverflow: "ellipsis",
       lineHeight: "1.3",
      }}
      title={` (${profile?.type || ""})`}
     >
      {profile?.type ? `(${profile.type})` : ""}
     </H5>

     {/* Info rows */}
     <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {/* Birth Date */}
      <p style={infoStyle}>
       <FontAwesomeIcon icon={faCalendar} size="sm" color="#6b7280" />
       <strong>Birthday:</strong>{" "}
       {profile?.birth_date
        ? new Date(profile.birth_date)
           .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
           })
           .replace(/(\d{2} \w{3}) (\d{4})/, "$1, $2")
        : "N/A"}
      </p>

      {/* Gender */}
      <p style={infoStyle}>
       {profile?.gender === "male" ? (
        <FontAwesomeIcon icon={faMars} size="sm" color="#1e3a8a" />
       ) : profile?.gender === "female" ? (
        <FontAwesomeIcon icon={faVenus} size="sm" color="#E94560" />
       ) : (
        <FontAwesomeIcon icon={faGenderless} size="sm" color="#6b7280" />
       )}
       <strong>Gender:</strong>{" "}
       {profile?.gender === "male"
        ? "Male"
        : profile?.gender === "female"
          ? "Female"
          : "N/A"}
      </p>

      {/* Company */}
      <p style={infoStyle}>
       <strong>Company:</strong> {profile?.company_name || "N/A"}
      </p>

      {/* Employee ID */}
      <p style={infoStyle}>
       <strong>Employee ID:</strong> {profile?.employee_id || "N/A"}
      </p>

      {/* Designation */}
      <p style={infoStyle}>
       <strong>Designation:</strong>{" "}
       <span style={{ wordBreak: "break-word" }}>
        {profile?.designation || "N/A"}
       </span>
      </p>

      {/* Credit Balance */}
      <p style={infoStyle}>
       <strong>Credit Balance:</strong> {profile?.credit_balance ?? 0}
      </p>
     </div>
    </div>
   </FlexBox>
  </Card>
 );
};

// Reusable style for info rows
const infoStyle = {
 margin: 0,
 color: "#6b7280",
 display: "flex",
 alignItems: "center",
 gap: "0.6rem",
 fontSize: "0.95rem",
 lineHeight: "1.4",
};

export default CorporateCard;
