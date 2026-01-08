"use client";

import { Store, Shield, Globe, Mail, Phone, Users } from "lucide-react";

export default function TizaraaCares() {
 return (
  <div
   style={{
    fontFamily: "system-ui, -apple-system, sans-serif",
    lineHeight: "1.6",
    color: "#333",
   }}
  >
   {/* How We Care Section */}
   <section style={{}}>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
     <div style={{ textAlign: "center", marginBottom: "60px" }}>
      <h2
       style={{
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: "bold",
        color: "rgb(233, 69, 96)",
        marginBottom: "20px",
       }}
      >
       Tizaraa Cares
      </h2>
      <p
       style={{
        fontSize: "1.2rem",
        color: "#666",
        maxWidth: "700px",
        margin: "0 auto",
       }}
      >
       At Tizaraa, caring means creating a marketplace where vendors thrive,
       customers trust, and communities prosper
      </p>
     </div>

     <div
      style={{
       display: "grid",
       gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
       gap: "40px",
       marginTop: "60px",
      }}
     >
      {[
       {
        icon: <Store size={40} />,
        title: "Vendor Success",
        description:
         "Supporting our sellers with tools, training, and resources to grow their businesses successfully",
        features: [
         "Business mentorship",
         "Marketing workshops",
         "Analytics tools",
         "Payment protection",
        ],
       },
       {
        icon: <Shield size={40} />,
        title: "Customer Protection",
        description:
         "Ensuring safe transactions, quality products, and exceptional customer service experiences",
        features: [
         "Money-back guarantee",
         "Secure payments",
         "Quality assurance",
         "24/7 support",
        ],
       },
       {
        icon: <Globe size={40} />,
        title: "Global Community",
        description:
         "Connecting buyers and sellers worldwide while supporting local economies and entrepreneurs",
        features: [
         "Worldwide shipping",
         "Local business support",
         "Cultural exchange",
         "Fair trade practices",
        ],
       },
      ].map((item, index) => (
       <div
        key={index}
        style={{
         background: "white",
         padding: "40px 30px",
         borderRadius: "15px",
         textAlign: "center",
         boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
         transition: "all 0.3s ease",
         cursor: "pointer",
        }}
        onMouseOver={(e) => {
         e.currentTarget.style.transform = "translateY(-5px)";
         e.currentTarget.style.boxShadow = "0 10px 30px rgba(233, 69, 96, 0.2)";
        }}
        onMouseOut={(e) => {
         e.currentTarget.style.transform = "translateY(0)";
         e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
        }}
       >
        <div
         style={{
          color: "rgb(233, 69, 96)",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
         }}
        >
         {item.icon}
        </div>
        <h3
         style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "15px",
          color: "#333",
         }}
        >
         {item.title}
        </h3>
        <p
         style={{
          color: "#666",
          fontSize: "1rem",
          marginBottom: "20px",
         }}
        >
         {item.description}
        </p>
        <ul
         style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          textAlign: "left",
         }}
        >
         {item.features.map((feature, featureIndex) => (
          <li
           key={featureIndex}
           style={{
            color: "#666",
            marginBottom: "8px",
            paddingLeft: "20px",
            position: "relative",
            fontSize: "0.9rem",
           }}
          >
           <span
            style={{
             position: "absolute",
             left: 0,
             color: "rgb(233, 69, 96)",
             fontWeight: "bold",
            }}
           >
            ✓
           </span>
           {feature}
          </li>
         ))}
        </ul>
       </div>
      ))}
     </div>
    </div>
   </section>

   {/* Need Support Section */}
   <section>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
     <div style={{ textAlign: "center", marginBottom: "60px" }}>
      <h2
       style={{
        fontSize: "clamp(2rem, 4vw, 3rem)",
        fontWeight: "bold",
        color: "rgb(233, 69, 96)",
        marginBottom: "20px",
       }}
      >
       Need Support?
      </h2>
      <p
       style={{
        fontSize: "1.2rem",
        color: "#666",
        maxWidth: "600px",
        margin: "0 auto",
       }}
      >
       Our dedicated care team is here to help you succeed. Get in touch with us
       through any of these channels.
      </p>
     </div>

     <div
      style={{
       display: "grid",
       gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
       gap: "40px",
       marginBottom: "50px",
      }}
     >
      {[
       {
        icon: <Mail size={30} />,
        title: "Email Support",
        info: "info@tizaraa.com",
        description: "Get detailed help via email within 24 hours",
        availability: "Response within 24 hours",
       },
       {
        icon: <Phone size={30} />,
        title: "Phone Support",
        info: "+8801792223444",
        description: "Speak directly with our support specialists",
        availability: "24/7 Available",
       },
       {
        icon: <Users size={30} />,
        title: "Live Chat",
        info: "Available on website",
        description: "Get instant help through our live chat system",
        availability: "24/7 Available",
       },
      ].map((contact, index) => (
       <div
        key={index}
        style={{
         background: "#f8f9fa",
         padding: "40px 30px",
         borderRadius: "15px",
         boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
         transition: "all 0.3s ease",
         textAlign: "center",
        }}
        onMouseOver={(e) => {
         e.currentTarget.style.transform = "translateY(-5px)";
         e.currentTarget.style.boxShadow = "0 10px 30px rgba(233, 69, 96, 0.2)";
         e.currentTarget.style.background = "white";
        }}
        onMouseOut={(e) => {
         e.currentTarget.style.transform = "translateY(0)";
         e.currentTarget.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
         e.currentTarget.style.background = "#f8f9fa";
        }}
       >
        <div
         style={{
          color: "rgb(233, 69, 96)",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
         }}
        >
         {contact.icon}
        </div>
        <h3
         style={{
          fontSize: "1.4rem",
          fontWeight: "bold",
          marginBottom: "10px",
          color: "#333",
         }}
        >
         {contact.title}
        </h3>
        <p
         style={{
          color: "rgb(233, 69, 96)",
          fontWeight: "600",
          marginBottom: "15px",
          fontSize: "1.1rem",
         }}
        >
         {contact.info}
        </p>
        <p
         style={{
          color: "#666",
          fontSize: "0.95rem",
          marginBottom: "15px",
         }}
        >
         {contact.description}
        </p>
        <div
         style={{
          background: "rgb(233, 69, 96)",
          color: "white",
          padding: "8px 16px",
          borderRadius: "20px",
          fontSize: "0.85rem",
          fontWeight: "500",
          display: "inline-block",
         }}
        >
         {contact.availability}
        </div>
       </div>
      ))}
     </div>

     {/* FAQ Quick Links */}
     <div
      style={{
       background:
        "linear-gradient(135deg, rgb(233, 69, 96) 0%, rgb(200, 50, 80) 100%)",
       color: "white",
       padding: "40px",
       borderRadius: "15px",
       textAlign: "center",
      }}
     >
      <h3
       style={{
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "20px",
       }}
      >
       Quick Help Topics
      </h3>
      <p style={{ marginBottom: "30px", opacity: 0.9 }}>
       Find answers to common questions or browse our help resources
      </p>
      <div
       style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        justifyContent: "center",
       }}
      >
       {[
        { label: "Order Tracking", link: "/orderTracking" },
        {
         label: "Returns & Refunds",
         link: "/return-and-refund-policy",
        },
        { label: "Replacement", link: "/replacement" },
        { label: "Contact Us", link: "/contact" },
        { label: "How To Buy", link: "/howToBuy" },
        { label: "Shipping Info", link: "/shipiingAndDelivery" },
       ].map((topic, index) => (
        <a
         key={index}
         href={topic.link}
         style={{
          textDecoration: "none",
         }}
        >
         <button
          style={{
           background: "white",
           color: "rgb(233, 69, 96)",
           padding: "10px 20px",
           border: "none",
           borderRadius: "25px",
           fontSize: "0.9rem",
           fontWeight: "600",
           cursor: "pointer",
           transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => {
           e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
           e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
           e.currentTarget.style.background = "white";
           e.currentTarget.style.transform = "translateY(0)";
          }}
         >
          {topic.label}
         </button>
        </a>
       ))}
      </div>
     </div>
    </div>
   </section>
  </div>
 );
}
