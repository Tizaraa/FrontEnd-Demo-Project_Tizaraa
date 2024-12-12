import React from "react";

const Tizaraa = () => {
  const styles: { [key: string]: React.CSSProperties } = {
    commonBanner: {
      backgroundImage: "url(/assets/images/footer_image/Customer-Service.jpg)",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      height: "400px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      textAlign: "center",
    },
    customerService: {
      padding: "40px 20px", // Add padding for small screens
      backgroundColor: "#f9f9f9",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    supportCardWrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    supportCard: {
      border: "1px solid #ddd",
      borderRadius: "5px",
      overflow: "hidden",
      textAlign: "center",
      backgroundColor: "#fff",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    imagePart: {
      marginBottom: "10px",
    },
    contactingWrapper: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    contacting: {
      padding: "10px",
      background: "#ededed",
      borderRadius: "5px",
      border: "1px solid #ddd",
      textAlign: "center",
    },
    btSection: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
      marginTop: "20px",
    },
    footer: {
      backgroundColor: "#343a40",
      color: "#fff",
      padding: "20px 0",
      textAlign: "center",
    },
    copyRight: {
      marginTop: "10px",
    },
  };

  const supportItems = [
    {
      img: "/assets/images/footer_image/Support-Ticket.jpg",
      title: "Support Ticket",
      description:
        "Visit our Support Center to submit a support ticket. Our team will respond to your inquiry as soon as possible.",
    },
    {
      img: "/assets/images/footer_image/Live-Chat.jpg",
      title: "Live Chat",
      description:
        "Click on the live chat icon located in the bottom right corner of your screen during business hours for real-time assistance.",
    },
    {
      img: "/assets/images/footer_image/Phone-Support.jpg",
      title: "Phone Support",
      description:
        "Call our customer support hotline at [Your Phone Number] during business hours for immediate assistance.",
    },
  ];

  return (
    <>
      {/* Common Banner */}
      <div style={styles.commonBanner}>
        <h2>Tizaraa Help Center</h2>
      </div>

      {/* Customer Service Section */}
      <div style={styles.customerService}>
        <div style={styles.container}>
          <div style={styles.supportCardWrapper}>
            {supportItems.map((item, index) => (
              <div style={styles.supportCard} key={index}>
                <div style={styles.imagePart}>
                  <img
                    src={item.img}
                    alt={item.title}
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <h5>{item.title}</h5>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.contactingWrapper}>
            <div style={styles.contacting}>
              <h4>Business Hours</h4>
              <p>
                Our customer service team is available to assist you during the
                following hours:
              </p>
              <p>
                <strong>Saturday - Thursday:</strong> 9:00 AM - 6:00 PM (Your
                Time Zone)
                <br />
                <strong>Friday:</strong> Closed
              </p>
            </div>
            <div style={styles.contacting}>
              <h4>Frequently Asked Questions (FAQs)</h4>
              <p>
                Explore our Customer Service FAQs for quick answers to common
                inquiries about our support process.
              </p>
            </div>
          </div>

          <div style={styles.btSection}>
            <div style={styles.contacting}>
              <img
                src="/assets/images/footer_image/Community-Forum.jpg"
                alt="Community Forum"
                style={{ width: "100%" }}
              />
              <h4>Tizaraa Community Forum</h4>
              <p>
                Join the Tizaraa Community Forum to connect with other users,
                share experiences, and get advice. Our moderators and community
                members are active, and you might find answers to your questions
                there.
              </p>
            </div>
            <div style={styles.contacting}>
              <img
                src="/assets/images/footer_image/Feedback-and-Suggestions.jpg"
                alt="Feedback and Suggestions"
                style={{ width: "100%" }}
              />
              <h4>Feedback and Suggestions</h4>
              <p>
                We value your feedback! If you have suggestions for improving
                our services or encounter any issues, please let us know through
                our Feedback Form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tizaraa;
