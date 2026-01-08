import React from "react";

const Tizaraa: React.FC = () => {
 const styles: { [key: string]: React.CSSProperties } = {
  container: {
   maxWidth: "1200px",
   margin: "0 auto",
   padding: "0 15px",
  },
  menuBar: {
   display: "flex",
   justifyContent: "space-between",
   alignItems: "center",
   padding: "10px 0",
   borderBottom: "1px solid #ddd",
  },
  logo: {
   display: "flex",
   alignItems: "center",
  },
  logoImage: {
   height: "50px",
   marginRight: "10px",
  },
  searchForm: {
   display: "flex",
   alignItems: "center",
   gap: "10px",
  },
  searchInput: {
   padding: "8px",
   border: "1px solid #ddd",
   borderRadius: "4px",
  },
  menu: {
   listStyle: "none",
   display: "flex",
   gap: "15px",
   padding: 0,
   margin: 0,
  },
  menuItem: {
   textDecoration: "none",
   color: "#333",
   fontWeight: "bold",
  },
  banner: {
   backgroundImage:
    "url(/assets/images/footer_image/About-Tizaraa-Top-Banner_1.jpg)",
   backgroundPosition: "center center",
   backgroundSize: "cover",
   height: "400px",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
  },
  bannerText: {
   fontSize: "2rem",
   color: "#fff",
   backgroundColor: "rgba(0, 0, 0, 0.5)",
   padding: "10px 20px",
   borderRadius: "8px",
  },
  howToBuy: {
   padding: "30px 0",
  },
  sectionTitle: {
   fontSize: "1.5rem",
   fontWeight: "bold",
   marginBottom: "20px",
  },
  list: {
   listStyle: "none",
   padding: 0,
   margin: 0,
  },
  listItem0: {
   marginBottom: "20px",
   backgroundColor: "rgb(255, 227, 193)",
   padding: "5px 20px",
   borderRadius: "5px",
  },
  listItem1: {
   marginBottom: "20px",
   backgroundColor: "rgb(248, 208, 161)",
   padding: "5px 20px",
   borderRadius: "5px",
  },
  listItemTitle: {
   fontSize: "1.50rem",
   fontWeight: "bold",
   marginBottom: "0",
   marginTop: "5px",
  },

  listItemText: {
   fontSize: "1rem",
   color: "#555",
  },
  footer: {
   backgroundColor: "#333",
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
  <>
   {/* Banner */}
   <div style={styles.banner}>
    <div style={styles.bannerText}>How to Buy</div>
   </div>

   {/* How to Buy Section */}
   <div style={styles.howToBuy}>
    <div style={styles.container}>
     <h2 style={styles.sectionTitle}>Buying process</h2>
     <ul style={styles.list}>
      <li style={styles.listItem}>
       <iframe
        width="100%"
        height="300px"
        src="https://www.youtube.com/embed/BwK5RRfs-mg?si=6aOtgmJKc-tVETEK"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
       ></iframe>
      </li>
      <li style={styles.listItem0}>
       <h5 style={styles.listItemTitle}>Sign In or Create an Account</h5>
       <p style={styles.listItemText}>
        If you don't already have an account on Tizaraa, you'll need to sign up.
        If you're already a registered user, log in to your account.
       </p>
      </li>
      <li style={styles.listItem1}>
       <h5 style={styles.listItemTitle}>Browse Products</h5>
       <p style={styles.listItemText}>
        Use the search bar or navigate through categories to find the products
        you're interested in.
       </p>
      </li>
      <li style={styles.listItem0}>
       <h5 style={styles.listItemTitle}>Product Details:</h5>
       <p style={styles.listItemText}>
        Click on a product to view more details. Check the product description,
        specifications, and seller information.
       </p>
      </li>
      <li style={styles.listItem1}>
       <h5 style={styles.listItemTitle}>Add to Cart</h5>
       <p style={styles.listItemText}>
        Once you've decided on a product, click on the "Add to Cart" or "Buy
        Now" button.
       </p>
      </li>
      <li style={styles.listItem0}>
       <h5 style={styles.listItemTitle}>Shopping Cart</h5>
       <p style={styles.listItemText}>
        Review the items in your shopping cart. You can edit quantities or
        remove items if needed.
       </p>
      </li>
      <li style={styles.listItem1}>
       <h5 style={styles.listItemTitle}>Checkout</h5>
       <p style={styles.listItemText}>
        Click on the "Checkout" button. You may be asked to confirm your
        shipping address and select a payment method.
       </p>
      </li>
      <li style={styles.listItem0}>
       <h5 style={styles.listItemTitle}>Payment</h5>
       <p style={styles.listItemText}>
        Choose a payment method (credit/debit card, digital wallet, etc.) and
        enter the required information.
       </p>
      </li>
      <li style={styles.listItem1}>
       <h5 style={styles.listItemTitle}>Review Order</h5>
       <p style={styles.listItemText}>
        Double-check your order details, including the items, quantities, and
        total cost.
       </p>
      </li>
      <li style={styles.listItem0}>
       <h5 style={styles.listItemTitle}>Place Order:</h5>
       <p style={styles.listItemText}>
        Click on the "Place Order" or "Complete Purchase" button to finalize
        your transaction.
       </p>
      </li>
      <li style={styles.listItem1}>
       <h5 style={styles.listItemTitle}>Confirmation</h5>
       <p style={styles.listItemText}>
        Once your order is successfully placed, you should receive an order
        confirmation email. This email will include details about your purchase
        and estimated delivery times.
       </p>
      </li>
      <li style={styles.listItem0}>
       <h5 style={styles.listItemTitle}>Track Your Order</h5>
       <p style={styles.listItemText}>
        If applicable, use the provided tracking information to monitor the
        status and location of your shipment.
       </p>
      </li>
     </ul>
    </div>
   </div>
  </>
 );
};

export default Tizaraa;
