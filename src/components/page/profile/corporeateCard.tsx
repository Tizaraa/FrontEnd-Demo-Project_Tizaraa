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
      <FlexBox alignItems="center" mb="1.5rem" style={{ gap: "1.5rem" }}>
        {/* Conditional rendering for Avatar or FontAwesome icon */}
        {profile?.image ? (
          <Avatar
            size={100}
            src={`${ApiBaseUrl.ImgUrl}${profile.image}`}
            style={{
              border: "3px solid #E94560",
              boxShadow: "0 4px 15px rgba(233, 69, 96, 0.2)",
            }}
          />
        ) : (
          <div
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f5f7fa, #e4e8f0)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(107, 114, 128, 0.2)",
              border: "3px solid #6b7280",
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
        <div>
          <H5
            style={{
              fontSize: "1.5rem",
              margin: 0,
              background: "linear-gradient(90deg, #1e3a8a, #E94560)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "700",
            }}
          >
            {profile?.name || "No Name"} ({profile?.type})
          </H5>

          {/* Birth Date */}
          <p
            style={{
              margin: "0.5rem 0",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FontAwesomeIcon icon={faCalendar} size="sm" color="#6b7280" />
            <strong>Birthday:</strong>
            {profile?.birth_date
              ? new Date(profile.birth_date)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/(\d{2} \w{3}) (\d{4})/, "$1, $2") // Add comma after month
              : "N/A"}
          </p>

          {/* Gender */}
          <p
            style={{
              margin: "0.5rem 0",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
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

          {/* Company name */}
          <p
            style={{
              margin: "0.5rem 0",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <strong>Company name:</strong> {profile?.company_name}
          </p>

          {/* Company ID */}
          <p
            style={{
              margin: "0.5rem 0",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <strong>Employee ID:</strong> {profile?.employee_id}
          </p>

          {/* designation */}
          <p
            style={{
              margin: "0.5rem 0",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <strong>Designation:</strong> {profile?.designation}
          </p>
          <p
            style={{
              margin: "0.5rem 0",
              color: "#6b7280",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <strong>Credit Balance:</strong> {profile?.credit_balance}
          </p>
        </div>
      </FlexBox>
    </Card>
  );
};

export default CorporateCard;
