import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', padding: '20px' }}>
      {/* Header Section */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img src="/assets/images/footer_image/About-Tizaraa-Top-Banner_1.jpg" alt="About Us" style={{ maxWidth: '100%', height: 'auto',}} />
        <h1 style={{ fontSize: '2.5rem', marginTop: '20px' }}>About Us Tizaraa</h1>
      </header>

      {/* Story Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', color: '#ff6600' }}>Our Story</h2>
        <p>
        Welcome to Tizaraa, your go-to destination for a seamless and diverse online shopping experience. Founded in [Year], Tizaraa was born out of a passion for connecting buyers with quality products from trusted sellers across the globe.
        </p>
      </section>

      {/* Mission and Vision Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', color: '#ff6600' }}>Mission & Vision</h2>
        <p>
        At Tizaraa, our mission is to provide a reliable and user-friendly platform that empowers both buyers and sellers. We strive to create a vibrant online marketplace where everyone can discover unique products, build lasting connections, and experience the joy of hassle-free transactions.
        </p>
      </section>

      {/* What Sets Us Apart Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', color: '#ff6600' }}>What Sets Us Apart</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '20px' }}>Curated Selection</h3>
            <p>
            We take pride in curating a collection of products that align with our commitment to quality, innovation, and style. Every item in our inventory is handpicked to ensure it meets our high standards.
            </p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '20px' }}>Customer-Centric Approach</h3>
            <p>
            At Tizaraa, customers are at the heart of everything we do. Our dedicated customer support team is always ready to assist you, whether you have a question about a product, need help with an order, or simply want some shopping advice.
            </p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '20px' }}>Secure and Convenient Shopping</h3>
            <p>
            We understand the importance of a secure and convenient shopping experience. That's why we've invested in the latest technology to ensure your transactions are safe and your personal information is protected.
            </p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '20px' }}>Innovation and Technology</h3>
            <p>
            Tizaraa embraces the latest in e-commerce technology to provide a modern, efficient, and reliable platform. We are committed to staying ahead of the curve to enhance your shopping journey.
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '22px', color: '#ff6600' }}>Our Commitment</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '20px' }}>Quality Assurance</h3>
            <p>
              Tizaraa is committed to ensuring the quality of products on our platform. We work closely with sellers to maintain high standards and deliver exceptional goods to our customers.
            </p>
          </div>
          <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '20px' }}>Community Building</h3>
            <p>
              Beyond transactions, Tizaraa is a community. Join us in building connections, sharing experiences, and creating a vibrant space for buyers and sellers alike.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
