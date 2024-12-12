import React from "react";

const AboutUs = () => {
    // Inline styles
    const styles: { [key: string]: React.CSSProperties }  = {
        menuBar: {
            background: "#f8f9fa",
            padding: "10px 0",
            borderBottom: "1px solid #ddd",
        },
        container: {
            width: "90%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        logo: {
            display: "flex",
            alignItems: "center",
        },
        logoImg: {
            height: "50px",
        },
        menu: {
            display: "flex",
            listStyle: "none",
            margin: 0,
            padding: 0,
        },
        menuItem: {
            margin: "0 15px",
        },
        menuLink: {
            textDecoration: "none",
            color: "#333",
            fontSize: "16px",
        },
        banner: {
            backgroundImage: "url(assets/img/banner/About-Tizaraa-Top-Banner_2_12.jpg)",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            height: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            textAlign: "center",
        },
        aboutMain: {
            padding: "50px 0",
            backgroundColor: "#f5f5f5",
        },
        aboutContent: {
            width: "80%",
            margin: "0 auto",
            textAlign: "left",
        },
        sectionTitle: {
            fontSize: "28px",
            marginBottom: "20px",
            color: "#333",
        },
        sectionContent: {
            fontSize: "16px",
            color: "#555",
            lineHeight: "1.6",
        },
        imgPart: {
            width: "100%",
            borderRadius: "8px",
        },
        footer: {
            background: "#222",
            color: "#fff",
            padding: "20px 0",
            textAlign: "center",
        },
        footerLink: {
            color: "#fff",
            textDecoration: "none",
        },
    };

    return (
        <div>
            {/* Menu Bar */}
            <div style={styles.menuBar}>
                <div style={styles.container}>
                    <div style={styles.logo}>
                        <a href="index.html">
                            <img
                                src="assets/img/logo/Logo_14.11.2023.png"
                                alt="Tizaraa Full Logo"
                                style={styles.logoImg}
                            />
                        </a>
                    </div>
                    <ul style={styles.menu}>
                        <li style={styles.menuItem}>
                            <a href="login.html" style={styles.menuLink}>Login</a>
                        </li>
                        <li style={styles.menuItem}>
                            <a href="sign-up.html" style={styles.menuLink}>Sign up</a>
                        </li>
                        <li style={styles.menuItem}>
                            <a href="#" style={styles.menuLink}>
                                <i className="fas fa-shopping-cart"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Banner */}
            <div style={styles.banner}>
                <h2>About Us Tizaraa</h2>
            </div>

            {/* About Content */}
            <div style={styles.aboutMain}>
                <div style={styles.aboutContent}>
                    <div>
                        <h2 style={styles.sectionTitle}>Our Story</h2>
                        <p style={styles.sectionContent}>
                            Welcome to Tizaraa, your go-to destination for a seamless and diverse online shopping experience.
                            Founded in [Year], Tizaraa was born out of a passion for connecting buyers with quality
                            products from trusted sellers across the globe.
                        </p>
                        <img
                            src="assets/img/banner/pexels-pixabay-461049.jpg"
                            alt="Our Story"
                            style={styles.imgPart}
                        />
                    </div>

                    <div>
                        <h2 style={styles.sectionTitle}>Our Commitment</h2>
                        <p style={styles.sectionContent}>
                            Tizaraa is committed to ensuring the quality of products on our platform. We work closely
                            with sellers to maintain high standards and deliver exceptional goods to our customers.
                        </p>
                        <img
                            src="assets/img/banner/quality.jpg"
                            alt="Quality Assurance"
                            style={styles.imgPart}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer style={styles.footer}>
                <p>
                    &copy; Tizaraa 2023 | <a href="#" style={styles.footerLink}>Privacy Policy</a>
                </p>
            </footer>
        </div>
    );
};

export default AboutUs;
