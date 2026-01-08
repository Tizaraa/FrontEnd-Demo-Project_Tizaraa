import React from "react";
import "../shipiingAndDelivery/ShippingPage.css";

export default function ShippingAndDeliveryPage() {
 return (
  <div className="container">
   <div className="content-wrapper">
    {/* Header with accent background */}
    <div className="header">
     <h1 className="header-title">
      <span className="header-icon">📦</span> Shipping & Delivery – Tizaraa
     </h1>
     <p className="header-subtitle">
      Fast, reliable delivery across Bangladesh
     </p>
    </div>

    <div className="section">
     <p className="intro-text">
      At Tizaraa, we strive to deliver your products quickly, safely, and
      efficiently. Whether you're in Dhaka or anywhere else in Bangladesh, we've
      partnered with trusted courier services to bring your favorite items to
      your doorstep.
     </p>

     {/* Delivery Partners Section */}
     <div className="section-block">
      <h2 className="section-title">Delivery Partners</h2>
      <div className="section-content">
       <p className="section-content-text">
        We use reliable and professional courier services to ensure fast and
        secure delivery:
       </p>
       <div className="partners-list">
        <div className="partner-item">RedX</div>
        {/* <div className="partner-item">Pathao</div>
                <div className="partner-item">Uber Delivery</div> */}
       </div>
       <p className="section-content-note">
        Each partner is chosen for their proven track record of on-time delivery
        and excellent customer service.
       </p>
      </div>
     </div>

     {/* Delivery Charges Section */}
     <div className="section-block">
      <h2 className="section-title">Delivery Charges</h2>
      <div className="section-content">
       <p className="section-content-text">
        We aim to keep our shipping charges transparent and affordable:
       </p>
       <div className="charges-grid">
        <div className="charge-card">
         <h3 className="charge-title">Inside Dhaka</h3>
         <ul className="charge-list">
          <li>Standard delivery charge: BDT 60</li>
          <li>
           For products over 1kg, add BDT 25 for each additional kilogram
          </li>
         </ul>
        </div>
        <div className="charge-card">
         <h3 className="charge-title">Outside Dhaka</h3>
         <ul className="charge-list">
          <li>Standard delivery charge: BDT 120</li>
          <li>For products over 1kg, add BDT 25 per additional kilogram</li>
         </ul>
        </div>
       </div>
       <div className="charge-example">
        <p className="charge-example-text">
         <span className="example-icon">📦</span> <strong>Example</strong>: If
         your order weighs 3kg and is being shipped outside Dhaka, the delivery
         charge would be: 120 + (2kg × 25) = BDT 170
        </p>
       </div>
      </div>
     </div>

     {/* Estimated Delivery Time */}
     <div className="section-block">
      <h2 className="section-title">Estimated Delivery Time</h2>
      <div className="section-content">
       <p className="section-content-text">
        Delivery times may vary depending on your location:
       </p>
       <div className="delivery-grid">
        <div className="delivery-card">
         <h3 className="delivery-title">
          <span className="delivery-icon">🏙️</span> Inside Dhaka
         </h3>
         <p>
          Estimated delivery time:{" "}
          <span className="delivery-time">2 to 3 working days</span>
         </p>
        </div>
        <div className="delivery-card">
         <h3 className="delivery-title">
          <span className="delivery-icon">🚚</span> Outside Dhaka
         </h3>
         <p>
          Estimated delivery time:{" "}
          <span className="delivery-time">3 to 5 working days</span>
         </p>
        </div>
       </div>
       <p className="section-content-note">
        Remote areas may take a little longer
       </p>
       <p className="dispatch-note">
        We process and dispatch orders from Saturday to Thursday. Orders
        confirmed before 5 PM are usually processed and handed over to courier
        partners on the same day.
       </p>
      </div>
     </div>

     {/* Order Processing Section */}
     <div className="section-block">
      <h2 className="section-title">Order Processing & Dispatch</h2>
      <div className="section-content">
       <ul className="processing-list">
        <li className="processing-item">
         <span className="check-icon">✓</span> Orders placed and confirmed
         before 6:00 PM are typically dispatched the same day
        </li>
        <li className="processing-item">
         <span className="check-icon">✓</span> Orders after 6:00 PM will be
         processed on the next business day
        </li>
        <li className="processing-item">
         <span className="check-icon">✓</span> All orders are packed carefully
         to avoid any damage during transit
        </li>
       </ul>
      </div>
     </div>

     {/* Order Confirmation & Tracking */}
     <div className="section-block">
      <h2 className="section-title">Order Confirmation & Tracking</h2>
      <div className="section-content">
       <div className="tracking-list-wrapper">
        <div className="tracking-card">
         <p className="tracking-title">You'll Receive</p>
         <ul className="tracking-list">
          <li className="tracking-item">
           <span className="tracking-icon">✉️</span> A confirmation SMS/email
           with order details
          </li>
          <li className="tracking-item">
           <span className="tracking-icon">🔍</span> A tracking number to follow
           the delivery progress online
          </li>
          <li className="tracking-item">
           <span className="tracking-icon">📱</span> Direct contact from our
           courier partner when your item is out for delivery
          </li>
         </ul>
        </div>
       </div>
       <p className="tracking-note">
        You can also log in to your Tizaraa account to track your order status
        at any time.
       </p>
      </div>
     </div>

     {/* Office Pickup Policy */}
     <div className="section-block">
      <h2 className="section-title">Office Pickup Policy</h2>
      <div className="section-content">
       <p className="section-content-note">
        Currently, we do not offer an office pickup option. All deliveries are
        managed via our courier partners to ensure convenience and safety for
        our customers.
       </p>
      </div>
     </div>

     {/* Changing Delivery Details */}
     <div className="section-block">
      <h2 className="section-title">Changing Delivery Details</h2>
      <div className="section-content">
       <p className="section-content-text">
        Need to update your delivery address or contact number?
       </p>
       <div className="contact-callout">
        <p className="contact-callout-text">
         <span className="contact-icon">📞</span> Call our customer service at{" "}
         <span className="contact-number">01792223444</span>&nbsp; AS SOON AS
         POSSIBLE
        </p>
       </div>
       <ul className="delivery-change-list">
        <li className="delivery-change-item">
         <span className="dot-icon">•</span> If your order has not been
         dispatched, we will do our best to accommodate changes
        </li>
        <li className="delivery-change-item">
         <span className="dot-icon">•</span> Once your order is with the
         courier, unfortunately, no changes can be made
        </li>
       </ul>
      </div>
     </div>

     {/* Important Notes */}
     <div className="section-block">
      <h2 className="section-title">Important Notes</h2>
      <div className="section-content">
       <div className="notes-callout">
        <p className="notes-callout-text">Please keep the following in mind:</p>
       </div>
       <ul className="notes-list">
        <li className="notes-item">
         <span className="warning-icon">⚠️</span> Public holidays, strikes, or
         natural events may affect delivery timelines — we'll notify you if any
         delays occur
        </li>
        <li className="notes-item">
         <span className="warning-icon">⚠️</span> For bulk orders or custom
         shipments, please contact our support team in advance to arrange
         delivery
        </li>
        <li className="notes-item">
         <span className="warning-icon">⚠️</span> If a product is out of stock,
         we will contact you for the next steps: refund, exchange, or waiting
         for restock
        </li>
        <li className="notes-item">
         <span className="warning-icon">⚠️</span> Tizaraa is not responsible for
         delays caused by the courier service after dispatch
        </li>
       </ul>
      </div>
     </div>

     {/* Contact Us */}
     <div className="section-block">
      <h2 className="section-title">Need Help? Contact Us</h2>
      <div className="contact-content">
       <div className="contact-grid">
        <div className="contact-card">
         <p className="contact-icon-large">📞</p>
         <p className="contact-label">Hotline</p>
         <p className="contact-value">01792223444</p>
        </div>
        <div className="contact-card">
         <p className="contact-icon-large">🌐</p>
         <p className="contact-label">Website</p>
         <a href="https://www.tizaraa.com" className="contact-link">
          www.tizaraa.com
         </a>
        </div>
        <div className="contact-card">
         <p className="contact-icon-large">🕘</p>
         <p className="contact-label">Support Hours</p>
         <p>
          Saturday to Thursday
          <br />9 AM – 6 PM
         </p>
        </div>
       </div>
      </div>
     </div>
    </div>

    {/* Bengali Section */}
    <div className="section">
     <h2 className="bengali-title">শিপিং ও ডেলিভারি নীতি</h2>
     <p className="bengali-intro">
      তিজারা সবসময় চেষ্টা করে আপনার পছন্দের পণ্যগুলো দ্রুত, নিরাপদ ও
      কার্যকরভাবে আপনার দোরগোড়ায় পৌঁছে দিতে। আপনি ঢাকা শহরের মধ্যে অবস্থান
      করুন অথবা দেশের যেকোনো প্রান্তে, আমরা আপনার অর্ডার নির্ভরযোগ্য কুরিয়ার
      পার্টনারদের মাধ্যমে পৌঁছে দেওয়ার নিশ্চয়তা দিই।
     </p>

     <div className="bengali-grid">
      <div>
       <h3 className="bengali-subtitle">ডেলিভারি পার্টনার</h3>
       <div className="bengali-content">
        <p className="bengali-content-text">
         আমরা নিম্নলিখিত বিশ্বস্ত কুরিয়ার সার্ভিসের মাধ্যমে পণ্য সরবরাহের
         পাশাপাশি আমরা সর্বোচ্চ ডেলিভারি মান বজায় রাখার চেষ্টা করি।
        </p>
        <ul className="bengali-list">
         <li>RedX</li>
         {/* <li>Pathao</li>
                  <li>Uber Delivery</li> */}
        </ul>
       </div>

       <h3 className="bengali-subtitle">ডেলিভারি চার্জ</h3>
       <div className="bengali-content">
        <p className="bengali-content-text">
         আমরা ডেলিভারি চার্জকে স্বচ্ছ ও সহজভাবে উপস্থাপন করি, যাতে আপনি আগেই
         ব্যয় সম্পর্কে অবগত থাকতে পারেন।
        </p>
        <ul className="bengali-list">
         <li>
          ঢাকার মধ্যে:
          <ul className="bengali-sublist">
           <li>প্রাথমিক চার্জ: ৬০ টাকা</li>
           <li>১ কেজি'র বেশি হলে: অতিরিক্ত প্রতি কেজির জন্য ২৫ টাকা</li>
          </ul>
         </li>
         <li>
          ঢাকার বাইরে:
          <ul className="bengali-sublist">
           <li>প্রাথমিক চার্জ: ১২০ টাকা</li>
           <li>১ কেজি'র বেশি হলে: অতিরিক্ত প্রতি কেজির জন্য ২৫ টাকা</li>
          </ul>
         </li>
        </ul>
        <p className="bengali-example">
         উদাহরণস্বরূপ: একটি ৩ কেজি ওজনের পণ্যের জন্য ঢাকার বাইরে ডেলিভারি চার্জ
         হবে ১২০ + (২ × ২৫) = ১৭০ টাকা।
        </p>
       </div>

       <h3 className="bengali-subtitle">ডেলিভারি সময়সীমা</h3>
       <div className="bengali-content">
        <p className="bengali-content-text">
         অবস্থানভেদে ডেলিভারি সময় ভিন্ন হতে পারে:
        </p>
        <ul className="bengali-list">
         <li>ঢাকার মধ্যে: আনুমানিক সময়: ২ – ৩ কর্মদিবস</li>
         <li>ঢাকার বাইরে: আনুমানিক সময়: ৩ – ৫ কর্মদিবস</li>
        </ul>
        <p className="bengali-content-note">
         দূরবর্তী এলাকায় ডেলিভারিতে অতিরিক্ত সময় লাগতে পারে
        </p>
        <p className="bengali-dispatch">
         আমরা শনিবার থেকে বৃহস্পতিবার পর্যন্ত অর্ডার প্রসেস ও ডেলিভারি পরিচালনা
         করি।
        </p>
       </div>
      </div>

      <div>
       <h3 className="bengali-subtitle">অর্ডার প্রসেস ও ডিসপ্যাচ</h3>
       <div className="bengali-content">
        <p className="bengali-content-text">
         আমরা প্রতিটি অর্ডার সতর্কতার সঙ্গে প্যাক করি যেন ডেলিভারির সময় কোনো
         ক্ষতি না হয়
        </p>
       </div>

       <h3 className="bengali-subtitle">অর্ডার কনফার্মেশন ও ট্র্যাকিং</h3>
       <div className="bengali-content">
        <ul className="bengali-list">
         <li>আপনার অর্ডার কনফার্ম ও ডিসপ্যাচ হওয়ার পর আপনি পাবেন:</li>
         <li>অর্ডার বিবরণসহ একটি SMS বা ইমেইল</li>
         <li>
          একটি ট্র্যাকিং নাম্বার যার মাধ্যমে আপনি ডেলিভারি প্রক্রিয়া অনলাইনে
          দেখতে পারবেন
         </li>
         <li>পণ্য ডেলিভারির সময় কুরিয়ার সার্ভিসের পক্ষ থেকে কল বা মেসেজ</li>
        </ul>
        <p className="bengali-content-text">
         আপনি চাইলে তিজারা অ্যাকাউন্টে লগইন করে অর্ডার স্ট্যাটাস দেখতে পারেন।
        </p>
       </div>

       <h3 className="bengali-subtitle">অফিস থেকে পণ্য সংগ্রহ</h3>
       <div className="bengali-content">
        <p className="bengali-content-text">
         বর্তমানে আমাদের নিজস্ব অফিস থেকে পণ্য সংগ্রহের সুযোগ নেই। সকল অর্ডার
         নির্ধারিত কুরিয়ার সার্ভিসের মাধ্যমে প্রেরণ করা হয়।
        </p>
       </div>

       <h3 className="bengali-subtitle">ডেলিভারি ঠিকানা পরিবর্তন</h3>
       <div className="bengali-content">
        <p className="bengali-content-text">
         ঠিকানা বা ফোন নম্বর পরিবর্তনের জন্য:
        </p>
        <ul className="bengali-list">
         <li>📞 হেল্পলাইন: 01792223444</li>
         <li>জানান, কেন ডেলিভারি ঠিকানা বা ফোন নম্বর পরিবর্তন করতে চান?</li>
         <li>
          অর্ডার ডিসপ্যাচ না হয়ে থাকলে, আমরা ঠিকানা আপডেট করার চেষ্টা করবো
         </li>
         <li>একবার অর্ডার কুরিয়ারে পাঠানো হলে, ঠিকানা পরিবর্তন সম্ভব নয়</li>
        </ul>
       </div>
      </div>
     </div>

     <h3 className="bengali-subtitle">⚠️ গুরুত্বপূর্ণ তথ্য</h3>
     <div className="bengali-content">
      <ul className="bengali-list">
       <li>
        সরকারি ছুটি, প্রাকৃতিক দুর্যোগ বা ধর্মঘট জনিত কারণে ডেলিভারিতে বিলম্ব
        হতে পারে। এমন ক্ষেত্রে আমরা আপনাকে অবহিত করব।
       </li>
       <li>
        বাল্ক অর্ডার বা কাস্টম পণ্যের ক্ষেত্রে, অনুগ্রহ করে অর্ডারের আগে আমাদের
        সঙ্গে যোগাযোগ করুন।
       </li>
       <li>
        কোনো পণ্য স্টকে না থাকলে, আমরা আপনার সঙ্গে যোগাযোগ করে বিকল্প সমাধান
        (বিকল্প পণ্য, ফেরত বা অপেক্ষা) প্রদান করব।
       </li>
       <li>
        পণ্য ডিসপ্যাচ হওয়ার পর কুরিয়ার সংক্রান্ত দেরিতে তিজারা দায়ী নয়।
       </li>
      </ul>
     </div>

     <h3 className="bengali-subtitle">সাহায্যের প্রয়োজন? যোগাযোগ করুন</h3>
     <div className="bengali-contact">
      <div className="bengali-contact-list">
       <div className="bengali-contact-item">
        <span className="bengali-contact-icon">📞</span> হেল্পলাইন:{" "}
        <span className="bengali-contact-value">01792223444</span>
       </div>
       <div className="bengali-contact-item">
        <span className="bengali-contact-icon">🌐</span> ওয়েবসাইট:{" "}
        <a href="https://www.tizaraa.com" className="bengali-contact-link">
         www.tizaraa.com
        </a>
       </div>
       <div className="bengali-contact-item">
        <span className="bengali-contact-icon">🕘</span> সাপোর্ট সময়: শনিবার
        থেকে বৃহস্পতিবার, সকাল ৯টা – সন্ধ্যা ৬টা
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
