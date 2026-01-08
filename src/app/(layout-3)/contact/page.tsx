// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
// import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

// const ContactUsPage = () => {
//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f8fa" }}>
//       <h2 style={{ color: "#2c3e50", marginBottom: "0" }}>WE'D LOVE TO HEAR FROM YOU</h2>
//       <p style={{ color: "#7f8c8d", marginBottom: "0" }}>
//         Send us a message and we’ll respond as soon as possible
//       </p>

//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           marginTop: "20px",
//           flexWrap: "wrap",
//         }}
//       >
//         {/* Contact Form */}
//         <form
//           style={{
//             flex: 1,
//             marginRight: "20px",
//             backgroundColor: "#ecf0f1",
//             padding: "20px",
//             borderRadius: "8px",
//             minWidth: "300px",
//           }}
//         >
//           <div style={{ marginBottom: "10px" }}>
//             <label>Name *</label>
//             <input
//               type="text"
//               placeholder="Your Name"
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 border: "1px solid #bdc3c7",
//                 borderRadius: "5px",
//                 marginTop: "5px",
//               }}
//             />
//           </div>
//           <div style={{ marginBottom: "10px" }}>
//             <label>Phone Number *</label>
//             <input
//               type="tel"
//               placeholder="Your Phone Number"
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 border: "1px solid #bdc3c7",
//                 borderRadius: "5px",
//                 marginTop: "5px",
//               }}
//             />
//           </div>
//           <div style={{ marginBottom: "10px" }}>
//             <label>Email Address *</label>
//             <input
//               type="email"
//               placeholder="Your Email Address"
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 border: "1px solid #bdc3c7",
//                 borderRadius: "5px",
//                 marginTop: "5px",
//               }}
//             />
//           </div>
//           <div style={{ marginBottom: "10px" }}>
//             <label>Your Message *</label>
//             <textarea
//               placeholder="Your Message"
//               style={{
//                 width: "100%",
//                 padding: "10px",
//                 border: "1px solid #bdc3c7",
//                 borderRadius: "5px",
//                 marginTop: "5px",
//               }}
//             ></textarea>
//           </div>
//           <button
//             type="submit"
//             style={{
//               width: "100%",
//               padding: "10px",
//               backgroundColor: "#e94560",
//               color: "white",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Send Message
//           </button>
//         </form>

//         {/* Contact Details */}
//         <div
//           style={{
//             flex: 1,
//             marginLeft: "20px",
//             minWidth: "300px",
//             marginTop: "20px",
//           }}
//         >
//           <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
//           <div
//               style={{

//                 padding: "10px",
//                 borderRadius: "5px",
//                 marginRight: "10px",
//               }}
//             >
//               <FontAwesomeIcon icon={faEnvelope} style={{ color: "#e94560", width: "30px" }} />
//             </div>
//             <div>
//             <a href="mailto:info@tizaraa.com"
//                 style={{ textDecoration: "none", color: "inherit" }}
//             >
//                       info@tizaraa.com
//             </a>
//             </div>
//           </div>
//           <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
//             <div
//               style={{
//                 padding: "10px",
//                 borderRadius: "5px",
//                 marginRight: "10px",
//               }}
//             >
//                <FontAwesomeIcon icon={faLocationDot} style={{ color: "#e94560", width: "25px" }} />
//             </div>
//             <div>
//               <p>Ga. 131/1, Middle Badda, Dhaka - 1212, Bangladesh</p>

//             </div>
//           </div>
//           <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
//             <div
//               style={{
//                 padding: "10px",
//                 borderRadius: "5px",
//                 marginRight: "10px",
//               }}
//             >
//               <FontAwesomeIcon icon={faPhone} style={{ color: "#e94560", width: "30px" }} />
//             </div>
//             <div>
//             <a href="tel:+8801792223444"
//                 style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                     +8801792223444
//                   </a>
//             </div>
//           </div>
//           <div>
//             <h4>Find Us Here:</h4>
//             <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
//               <a href="https://www.facebook.com/TizaraaGroup" style={{ textDecoration: "none", color: "#3b5998" }}>
//               <FontAwesomeIcon icon={faFacebook} style={{width: "30px"}} />
//               </a>
//               <a href="https://www.instagram.com/tizaraagroup/?igsh=MXB1b2l1NXN6N2U5dQ%3D%3D#" style={{ textDecoration: "none", color: "#E1306C" }}>
//               <FontAwesomeIcon icon={faInstagram} style={{width: "30px"}} />
//               </a>
//               <a href="https://www.youtube.com/@Tizaraa24" style={{ textDecoration: "none", color: "#FF0000" }}>
//               <FontAwesomeIcon icon={faYoutube} style={{width: "30px", marginTop: "3px"}} />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUsPage;

"use client";

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 faEnvelope,
 faLocationDot,
 faPhone,
 faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
 faFacebook,
 faInstagram,
 faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const ContactUsPage = () => {
 const [formState, setFormState] = useState({
  name: "",
  phone: "",
  email: "",
  message: "",
 });

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormState((prev) => ({ ...prev, [name]: value }));
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  // Add your form submission logic here
  console.log("Form submitted:", formState);
  alert("Thank you for your message! We'll get back to you soon.");
  setFormState({ name: "", phone: "", email: "", message: "" });
 };

 return (
  <div
   style={{
    fontFamily: "'Poppins', sans-serif",
    background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
    padding: "60px 20px",
    minHeight: "100vh",
   }}
  >
   {/* Decorative Elements */}
   <div
    style={{
     position: "absolute",
     top: "5%",
     left: "5%",
     width: "200px",
     height: "200px",
     borderRadius: "50%",
     background:
      "radial-gradient(circle, rgba(233,69,96,0.1) 0%, rgba(233,69,96,0) 70%)",
     zIndex: 0,
    }}
   ></div>

   <div
    style={{
     position: "absolute",
     bottom: "10%",
     right: "8%",
     width: "300px",
     height: "300px",
     borderRadius: "50%",
     background:
      "radial-gradient(circle, rgba(233,69,96,0.08) 0%, rgba(233,69,96,0) 70%)",
     zIndex: 0,
    }}
   ></div>

   <div
    style={{
     textAlign: "center",
     marginBottom: "40px",
     position: "relative",
     zIndex: 1,
    }}
   >
    <h2
     style={{
      color: "#2c3e50",
      marginBottom: "15px",
      fontSize: "36px",
      fontWeight: "700",
      letterSpacing: "1px",
     }}
    >
     WE'D LOVE TO HEAR FROM YOU
    </h2>
    <div
     style={{
      width: "70px",
      height: "4px",
      background: "#e94560",
      margin: "0 auto 20px",
      borderRadius: "2px",
     }}
    ></div>
    <p
     style={{
      color: "#6c757d",
      fontSize: "18px",
      maxWidth: "600px",
      margin: "0 auto",
     }}
    >
     Send us a message and we'll respond as soon as possible
    </p>
   </div>

   <div
    style={{
     display: "flex",
     flexDirection: "row",
     justifyContent: "space-between",
     flexWrap: "wrap",
     gap: "30px",
     maxWidth: "1200px",
     margin: "0 auto",
     position: "relative",
     zIndex: 1,
    }}
   >
    {/* Contact Form */}
    <form
     onSubmit={handleSubmit}
     style={{
      flex: "1 1 500px",
      backgroundColor: "#ffffff",
      padding: "35px",
      borderRadius: "16px",
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
     }}
    >
     {[
      {
       label: "Name",
       name: "name",
       type: "text",
       placeholder: "Your Name",
       value: formState.name,
      },
      {
       label: "Phone Number",
       name: "phone",
       type: "tel",
       placeholder: "Your Phone Number",
       value: formState.phone,
      },
      {
       label: "Email Address",
       name: "email",
       type: "email",
       placeholder: "Your Email Address",
       value: formState.email,
      },
     ].map((input, idx) => (
      <div key={idx} style={{ marginBottom: "22px" }}>
       <label
        style={{
         display: "block",
         marginBottom: "8px",
         fontWeight: "500",
         fontSize: "15px",
         color: "#495057",
        }}
       >
        {input.label} <span style={{ color: "#e94560" }}>*</span>
       </label>
       <input
        name={input.name}
        type={input.type}
        value={input.value}
        onChange={handleInputChange}
        placeholder={input.placeholder}
        required
        style={{
         width: "100%",
         padding: "14px",
         border: "1px solid #dee2e6",
         borderRadius: "10px",
         fontSize: "15px",
         transition: "all 0.3s ease",
         outline: "none",
        }}
        onFocus={(e) => {
         e.target.style.borderColor = "#e94560";
         e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.15)";
        }}
        onBlur={(e) => {
         e.target.style.borderColor = "#dee2e6";
         e.target.style.boxShadow = "none";
        }}
       />
      </div>
     ))}

     <div style={{ marginBottom: "25px" }}>
      <label
       style={{
        display: "block",
        marginBottom: "8px",
        fontWeight: "500",
        fontSize: "15px",
        color: "#495057",
       }}
      >
       Your Message <span style={{ color: "#e94560" }}>*</span>
      </label>
      <textarea
       name="message"
       value={formState.message}
       onChange={handleInputChange}
       placeholder="Your Message"
       required
       style={{
        width: "100%",
        padding: "14px",
        border: "1px solid #dee2e6",
        borderRadius: "10px",
        minHeight: "140px",
        fontSize: "15px",
        transition: "all 0.3s ease",
        outline: "none",
        resize: "vertical",
        fontFamily: "inherit",
       }}
       onFocus={(e) => {
        e.target.style.borderColor = "#e94560";
        e.target.style.boxShadow = "0 0 0 3px rgba(233, 69, 96, 0.15)";
       }}
       onBlur={(e) => {
        e.target.style.borderColor = "#dee2e6";
        e.target.style.boxShadow = "none";
       }}
      ></textarea>
     </div>
     <button
      type="submit"
      style={{
       width: "100%",
       padding: "16px",
       backgroundColor: "#e94560",
       color: "#fff",
       border: "none",
       borderRadius: "10px",
       cursor: "pointer",
       fontWeight: "600",
       fontSize: "16px",
       transition: "all 0.3s ease",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       gap: "10px",
       boxShadow: "0 5px 15px rgba(233, 69, 96, 0.3)",
      }}
      onMouseOver={(e) => {
       e.currentTarget.style.backgroundColor = "#d13654";
       e.currentTarget.style.transform = "translateY(-2px)";
       e.currentTarget.style.boxShadow = "0 8px 20px rgba(233, 69, 96, 0.4)";
      }}
      onMouseOut={(e) => {
       e.currentTarget.style.backgroundColor = "#e94560";
       e.currentTarget.style.transform = "translateY(0)";
       e.currentTarget.style.boxShadow = "0 5px 15px rgba(233, 69, 96, 0.3)";
      }}
     >
      <span>Send Message</span>
      <FontAwesomeIcon icon={faPaperPlane} />
     </button>
    </form>

    {/* Contact Details */}
    <div
     style={{
      flex: "1 1 400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
     }}
    >
     {/* Contact Info Card */}
     <div
      style={{
       backgroundColor: "#ffffff",
       padding: "35px",
       borderRadius: "16px",
       boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
       marginBottom: "30px",
      }}
     >
      <h3
       style={{
        color: "#2c3e50",
        marginBottom: "25px",
        fontSize: "22px",
        fontWeight: "600",
       }}
      >
       Contact Information
      </h3>

      {[
       {
        icon: faEnvelope,
        title: "Email Us",
        content: (
         <a
          href="mailto:info@tizaraa.com"
          style={{
           textDecoration: "none",
           color: "#495057",
           transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => {
           e.currentTarget.style.color = "#e94560";
          }}
          onMouseOut={(e) => {
           e.currentTarget.style.color = "#495057";
          }}
         >
          info@tizaraa.com
         </a>
        ),
       },
       {
        icon: faLocationDot,
        title: "Our Location",
        content: (
         <p style={{ margin: 0, color: "#495057" }}>
          Ga. 131/1, Middle Badda, Dhaka - 1212, Bangladesh
         </p>
        ),
       },
       {
        icon: faPhone,
        title: "Call Us",
        content: (
         <a
          href="tel:+8801792223444"
          style={{
           textDecoration: "none",
           color: "#495057",
           transition: "color 0.3s ease",
          }}
          onMouseOver={(e) => {
           e.currentTarget.style.color = "#e94560";
          }}
          onMouseOut={(e) => {
           e.currentTarget.style.color = "#495057";
          }}
         >
          +8801792223444
         </a>
        ),
       },
      ].map((item, idx) => (
       <div
        key={idx}
        style={{
         display: "flex",
         alignItems: "flex-start",
         marginBottom: "25px",
        }}
       >
        <div
         style={{
          backgroundColor: "rgba(233, 69, 96, 0.1)",
          color: "#e94560",
          padding: "12px",
          borderRadius: "12px",
          marginRight: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
         }}
        >
         <FontAwesomeIcon icon={item.icon} style={{ width: "20px" }} />
        </div>
        <div>
         <h4
          style={{ margin: "0 0 5px 0", fontSize: "16px", color: "#343a40" }}
         >
          {item.title}
         </h4>
         {item.content}
        </div>
       </div>
      ))}
     </div>

     {/* Social Media Card */}
     <div
      style={{
       backgroundColor: "#ffffff",
       padding: "35px",
       borderRadius: "16px",
       boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
      }}
     >
      <h3
       style={{
        color: "#2c3e50",
        marginBottom: "20px",
        fontSize: "22px",
        fontWeight: "600",
       }}
      >
       Connect With Us
      </h3>
      <div style={{ display: "flex", gap: "15px" }}>
       {[
        {
         icon: faFacebook,
         color: "#3b5998",
         url: "https://www.facebook.com/TizaraaGroup",
        },
        {
         icon: faInstagram,
         color: "#E1306C",
         url: "https://www.instagram.com/tizaraagroup/?igsh=MXB1b2l1NXN6N2U5dQ%3D%3D#",
        },
        {
         icon: faYoutube,
         color: "#FF0000",
         url: "https://www.youtube.com/@Tizaraa24",
        },
       ].map((social, idx) => (
        <a
         key={idx}
         href={social.url}
         target="_blank"
         rel="noopener noreferrer"
         style={{
          backgroundColor: "#f8f9fa",
          color: social.color,
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
         }}
         onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = social.color;
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow = `0 8px 20px ${social.color}33`;
         }}
         onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#f8f9fa";
          e.currentTarget.style.color = social.color;
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
         }}
        >
         <FontAwesomeIcon icon={social.icon} style={{ width: "20px" }} />
        </a>
       ))}
      </div>
     </div>

     {/* You could add a Google Map here as an additional section if desired */}
    </div>
   </div>
  </div>
 );
};

export default ContactUsPage;
