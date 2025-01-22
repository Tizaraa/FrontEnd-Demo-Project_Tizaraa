import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

const ContactUsPage = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f6f8fa" }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "0" }}>WE'D LOVE TO HEAR FROM YOU</h2>
      <p style={{ color: "#7f8c8d", marginBottom: "0" }}>
        Send us a message and we’ll respond as soon as possible
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        {/* Contact Form */}
        <form
          style={{
            flex: 1,
            marginRight: "20px",
            backgroundColor: "#ecf0f1",
            padding: "20px",
            borderRadius: "8px",
            minWidth: "300px",
          }}
        >
          <div style={{ marginBottom: "10px" }}>
            <label>Name *</label>
            <input
              type="text"
              placeholder="Your Name"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #bdc3c7",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Phone Number *</label>
            <input
              type="tel"
              placeholder="Your Phone Number"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #bdc3c7",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Email Address *</label>
            <input
              type="email"
              placeholder="Your Email Address"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #bdc3c7",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>Your Message *</label>
            <textarea
              placeholder="Your Message"
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #bdc3c7",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            ></textarea>
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#e94560",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div
          style={{
            flex: 1,
            marginLeft: "20px",
            minWidth: "300px",
            marginTop: "20px",
          }}
        >
          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <div
              style={{
               
                padding: "10px",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              <FontAwesomeIcon icon={faEnvelope} style={{ color: "#e94560", width: "30px" }} />
            </div>
            <div>
            <a href="mailto:tizaraabd2023@gmail.com"
                style={{ textDecoration: "none", color: "inherit" }}
            >
                      tizaraabd2023@gmail.com
            </a>
            </div>
          </div>
          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
            <div
              style={{
                padding: "10px",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
               <FontAwesomeIcon icon={faLocationDot} style={{ color: "#e94560", width: "25px" }} />
            </div>
            <div>
              <p>House No: 15A, Road No: 35, 15A Rd 35, Dhaka 1212</p>
              
            </div>
          </div>
          <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
            <div
              style={{
                padding: "10px",
                borderRadius: "5px",
                marginRight: "10px",
              }}
            >
              <FontAwesomeIcon icon={faPhone} style={{ color: "#e94560", width: "30px" }} />
            </div>
            <div>
            <a href="tel:+8801792223444"
                style={{ textDecoration: "none", color: "inherit" }}
                >
                    +8801792223444
                  </a>
            </div>
          </div>
          <div>
            <h4>Find Us Here:</h4>
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
              <a href="https://www.facebook.com/TizaraaGroup" style={{ textDecoration: "none", color: "#3b5998" }}>
              <FontAwesomeIcon icon={faFacebook} style={{width: "30px"}} />
              </a>
              <a href="https://www.instagram.com/tizaraagroup/?igsh=MXB1b2l1NXN6N2U5dQ%3D%3D#" style={{ textDecoration: "none", color: "#E1306C" }}>
              <FontAwesomeIcon icon={faInstagram} style={{width: "30px"}} />
              </a>
              <a href="https://www.youtube.com/@Tizaraa24" style={{ textDecoration: "none", color: "#FF0000" }}>
              <FontAwesomeIcon icon={faYoutube} style={{width: "30px", marginTop: "3px"}} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
