"use client";

import Head from "next/head";
import Link from "next/link";
import "../privacy-policy/privacy.css";
import { useState } from "react";

export default function PrivacyPolicyPage() {
 const [language, setLanguage] = useState("english");

 return (
  <div className="terms-container">
   <Head>
    <title>Privacy Policy | Tizaraa</title>
    <meta name="description" content="Tizaraa Terms and Conditions" />
   </Head>

   <div className="terms-content">
    {/* Header */}
    <div className="terms-header">
     <h1 className="terms-title">Privacy Policy</h1>
    </div>

    <div className="btn-header">
     <button
      className={`tab-button ${language === "english" ? "active" : ""}`}
      onClick={() => setLanguage("english")}
     >
      English
     </button>
     <button
      className={`tab-button ${language === "bangla" ? "active" : ""}`}
      onClick={() => setLanguage("bangla")}
     >
      বাংলা
     </button>
    </div>

    {/* Content English */}
    {language === "english" && (
     <div className="terms-body">
      <section className="section">
       <div className="section-content">
        <p>
         Thank you for being part of our community at www.tizaraa.com
         ("Tizaraa", "we", "us", "our"). We are committed to protecting your
         personal information and your privacy rights. If you have any questions
         or concerns about this Privacy Policy, or our practices regarding your
         personal information, please contact us at info@tizaraa.com.
        </p>
        <p>
         When you and, more generally, any of our services ("Services",
         including the services/products we provide), use our services, we
         appreciate that you trust us with your personal information. We take
         your privacy very seriously. In this Privacy Policy, we want to explain
         to you as clearly as possible what information we collect, how we use
         it, and what rights you have in relation to it. We hope you will take
         some time to read it carefully, as it is important. If there are any
         terms in this Privacy Policy with which you do not agree, please stop
         using our Services immediately.
        </p>
        <p>
         This Privacy Policy applies to all information collected through our
         Services (which, as described above, includes our Platform), as well as
         any related services, sales, marketing or events.
        </p>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <p>
         Please read this Privacy Policy carefully as it will help you
         understand what we do with the information we collect.
        </p>

        <h3 className="section-title">Table of Contents</h3>
        <ol>
         <li>
          <a href="#info-collect">What information do we collect?</a>
         </li>
         <li>
          <a href="#info-share">Will your information be shared with anyone?</a>
         </li>
         <li>
          <a href="#cookies-tracking">
           Do we use cookies and other tracking technologies?
          </a>
         </li>
         <li>
          <a href="#social-logins">How do we manage your social logins?</a>
         </li>
         <li>
          <a href="#international-transfer">
           Is your information transferred internationally?
          </a>
         </li>
         <li>
          <a href="#data-retention">How long will we store your information?</a>
         </li>
         <li>
          <a href="#minors-info">Do we collect information from minors?</a>
         </li>
         <li>
          <a href="#privacy-rights">What are your privacy rights?</a>
         </li>
         <li>
          <a href="#do-not-track">Controls for Do Not Track features</a>
         </li>
         <li>
          <a href="#policy-updates">Do we update this policy?</a>
         </li>
         <li>
          <a href="#contact-policy">
           How can you contact us about this policy?
          </a>
         </li>
         <li>
          <a href="#data-management">
           How can you review, update or delete the information we collect from
           you?
          </a>
         </li>
        </ol>
       </div>
      </section>

      <section id="info-collect" className="section">
       <div className="section-content">
        <h3 className="section-title">1. What information do we collect?</h3>

        <h4>Personal information you disclose to us</h4>
        <p>
         <strong>In short:</strong> We collect the personal information you
         provide.
        </p>
        <p>
         We collect personal information that you voluntarily provide to us when
         you are interested in receiving information about us or our products
         and services, when you participate in our contests, competitions or
         giveaways (such as by posting messages in our online forums or by
         entering contests, competitions or giveaways) or in any other activity.
        </p>
        <p>
         The personal information we collect depends on the context of your
         interactions with us, your preferences, and the products and features
         you use. The personal information we collect may include the following:
        </p>
        <p>
         Social media login data. We may provide you with the option to register
         with us using your existing social media account details, such as your
         Facebook, Twitter or other social media account. If you choose to
         register in this way, we will collect the information described in the
         "How we manage your social login" section below.
        </p>
        <p>
         All personal information provided to us by you must be true, complete
         and accurate and you must notify us of any changes to such personal
         information.
        </p>

        <h4>Information automatically collected</h4>
        <p>
         <strong>In short:</strong> Some information - such as your Internet
         Protocol (IP) address and/or browser and device characteristics - is
         collected automatically when you visit our platform.
        </p>
        <p>
         We automatically collect certain information when you visit, use, or
         navigate through our Site. This information does not reveal your
         specific identity (such as your name or contact information) but may
         include device and usage information, such as your IP address, browser
         and device characteristics, operating system, language preference,
         referring URL, device name, country, location, information about how
         and when you use our Site, and other technical information. This
         information is primarily needed to maintain the security and operation
         of our Platform and for our internal analytics and reporting purposes.
        </p>
        <p>
         Like many businesses, we collect information through cookies and
         similar technologies.
        </p>
       </div>
      </section>

      <section id="info-share" className="section">
       <div className="section-content">
        <h3 className="section-title">
         2. Will your information be shared with anyone?
        </h3>
        <p>
         <strong>In short:</strong> We only share information with your consent,
         to comply with the law, to provide you with services, to protect your
         rights, or to fulfill business obligations.
        </p>
        <p>
         We may process or share the information we hold about you based on the
         following legal bases:
        </p>
        <p>
         <strong>Business Transfer.</strong> We may share or transfer your
         information to another company in connection with or during
         negotiations for a merger, sale of company assets, financing, or
         acquisition of all or a portion of our business.
        </p>
        <p>
         <strong>Affiliates.</strong> We may share your information with our
         affiliates, in which case we will require those affiliates to comply
         with this Privacy Policy. Affiliates include our parent company and any
         subsidiaries, joint venture partners or other companies that we control
         or are under common control with us.
        </p>
        <p>
         <strong>Business partners.</strong> We may share your information with
         our business partners to provide you with certain products, services or
         promotions.
        </p>
        <p>
         <strong>Other users.</strong> When you share personal information or
         otherwise interact with the Platform in public spaces, such personal
         information can be viewed by all users and may be made publicly
         available in perpetuity. If you interact with our other users and
         register for us through a social network (e.g. Facebook, Instagram),
         your contacts on the social network will be able to see your name,
         profile photo and details of your activity. Similarly, other users will
         be able to see details of your activity, communicate with you within
         our Platform and view your profile.
        </p>
       </div>
      </section>

      <section id="cookies-tracking" className="section">
       <div className="section-content">
        <h3 className="section-title">
         3. Do we use cookies and other tracking technologies?
        </h3>
        <p>
         <strong>In short:</strong> We may use cookies and other tracking
         technologies to collect and store your information.
        </p>
        <p>
         We may use cookies and similar tracking technologies (such as web
         beacons and pixels) to access or store information. Specific
         information about how we use such technologies and how you can refuse
         certain cookies is set out in our Cookie Policy.
        </p>

        <h3 id="social-logins" className="section-title">
         4. How do we manage your social logins?
        </h3>
        <p>
         <strong>In short:</strong> If you choose to register or log in to our
         services using a social media account, we may have access to certain
         information about you.
        </p>
        <p>
         We provide you with the ability to register and log in using your
         third-party social media account details (such as your Facebook or
         Google login). Where you choose to do this, we will receive certain
         profile information about you from your social media provider. The
         profile information we receive may vary depending on the relevant
         social media provider, but will often include your name, email address,
         friends list, profile picture, as well as other information that you
         choose to make public on such social media platform.
        </p>
        <p>
         We will only use the information we receive for the purposes described
         in this Privacy Policy or as expressly disclosed to you on the relevant
         platform. Please note that we do not control and are not responsible
         for other uses of your personal information by your third-party social
         media provider. We recommend that you review their privacy policies to
         understand how they collect, use, and share your personal information
         and how you can set your privacy preferences on their sites and apps.
        </p>

        <h3 id="international-transfer" className="section-title">
         5. Is your information transferred internationally?
        </h3>
        <p>
         <strong>In short:</strong> We may transfer, store, and process your
         information in countries other than your own.
        </p>
        <p>
         Our servers are located in different regions, and our third-party
         service providers and partners may be located in and have operations in
         various countries. This means that when we collect your information, it
         may be processed in countries other than the one in which you reside.
        </p>
        <p>
         If you are a resident of the European Economic Area (EEA), these
         countries may not necessarily have data protection laws or other
         similar laws as comprehensive as those in your country. However, we
         will take all necessary measures to protect your personal information
         in accordance with this Privacy Policy and applicable law.
        </p>
       </div>
      </section>

      <section id="data-retention" className="section">
       <div className="section-content">
        <h3 className="section-title">
         6. How long will we store your information?
        </h3>
        <p>
         <strong>In short:</strong> Unless otherwise required by law, we retain
         your information for as long as necessary to fulfill the purposes
         described in this Privacy Policy.
        </p>
        <p>
         We will retain your personal information for as long as necessary for
         the purposes set out in this Privacy Policy, unless a longer retention
         period is required or permitted by law (such as tax, accounting or
         other legal requirements). Nothing in this Policy will oblige us to
         retain your personal information for longer than necessary.
        </p>
        <p>
         When we no longer have a legitimate business need to process your
         personal information, we will either delete or anonymize that
         information, or, if this is not possible (for example, because your
         personal information is stored in a backup archive), we will securely
         store your personal information and separate it from any further
         processing until deletion is possible.
        </p>
       </div>
      </section>

      <section id="minors-info" className="section">
       <div className="section-content">
        <h3 className="section-title">
         7. Do we collect information from minors?
        </h3>
        <p>
         <strong>In short:</strong> We do not knowingly collect information from
         or market to children under 18.
        </p>
        <p>
         We do not knowingly collect or market information from children under
         the age of 18. By using the Platform, you represent that you are at
         least 18 years of age or that you are the parent or guardian of such
         minor and consent to the use of such minor’s information. If we become
         aware that personal information has been collected from users under the
         age of 18, we will deactivate the account and take reasonable steps to
         promptly delete such information from our records. If you are aware of
         any information we have collected from children under the age of 18,
         please contact us at tizaraa.com.
        </p>
       </div>
      </section>

      <section id="privacy-rights" className="section">
       <div className="section-content">
        <h3 className="section-title">8. What are your privacy rights?</h3>
        <p>
         <strong>In short:</strong> You can review, change, or close your
         account at any time.
        </p>
        <p>
         <strong>Account information</strong>
         <br />
         If you would like to review or change your account information or close
         your account at any time, you may:
        </p>
        <p>
         Upon your request to close your account, we will deactivate or delete
         information from your account and our active databases. However, we may
         retain some information in our files to prevent fraud, resolve issues,
         assist in any investigations, enforce our Terms of Use, and/or comply
         with applicable legal requirements.
        </p>
        <p>
         <strong>Opting out of email marketing:</strong> You may unsubscribe
         from our marketing email list at any time by clicking the unsubscribe
         link in the emails we send you or by contacting us using the details
         provided below. You will then be removed from the marketing email list
         - however, we may still contact you, for example, to send you
         service-related emails necessary to manage and use your account,
         respond to service requests, or for other non-marketing purposes.
        </p>
       </div>
      </section>

      <section id="do-not-track" className="section">
       <div className="section-content">
        <h3 className="section-title">9. Controls for Do Not Track features</h3>
        <p>
         Most web browsers and some mobile operating systems and mobile
         applications have a do-not-track ("DNT") feature or setting that you
         can enable to signal your privacy preference not to have data about
         your online browsing activity monitored and collected. No uniform
         technical standard for detecting and implementing DNT signals has been
         finalized at this stage. Therefore, we do not currently respond to DNT
         browser signals or any other mechanism that automatically communicates
         your preference not to be tracked online. If a standard for online
         tracking is adopted that we are required to follow in the future, we
         will notify you of that practice in a revised version of this Privacy
         Policy.
        </p>
       </div>
      </section>

      <section id="policy-updates" className="section">
       <div className="section-content">
        <h3 className="section-title">10. Do we update this policy?</h3>
        <p>
         <strong>In short:</strong> Yes, we will update this policy as needed to
         comply with relevant laws.
        </p>
        <p>
         We may update this Privacy Policy from time to time. The updated
         version will include an updated “Revised” date and will be effective as
         soon as the updated version becomes accessible. If we make material
         changes to this Privacy Policy, we may notify you of these changes by
         prominently posting a notice on the policy or by sending you a direct
         notification. We encourage you to review this Privacy Policy frequently
         to be informed of how we are protecting your information.
        </p>
       </div>
      </section>

      <section id="contact-policy" className="section">
       <div className="section-content">
        <h3 className="section-title">
         11. How can you contact us about this Privacy Policy?
        </h3>
        <p>
         If you have any questions or comments about this policy, you can email
         us at <a href="mailto:info@tizaraa.com">info@tizaraa.com</a>.
        </p>
       </div>
      </section>
     </div>
    )}

    {/* Content Bangla */}
    {language === "bangla" && (
     <div className="terms-body-bangla">
      <section className="section">
       <div className="section-content">
        <p>
         তিজারা পরিবারে আপনাকে ধন্যবাদ ("Tizaraa", "আমরা", "আমাদের")। আমরা আপনার
         ব্যক্তিগত তথ্য এবং আপনার প্রাইভেসি রক্ষা করতে প্রতিশ্রুতিবদ্ধ। এই
         প্রাইভেসি পলিসি সম্পর্কে আপনার কোনো প্রশ্ন বা উদ্বেগ থাকলে, অথবা আপনার
         ব্যক্তিগত তথ্য সম্পর্কে আমাদের অনুশীলন সম্পর্কে জানতে চাইলে, আমাদের
         সাথে যোগাযোগ করুন info@tizaraa.com এ।
        </p>
        <p>
         আপনি যখন এবং সাধারণভাবে, আমাদের কোনো পরিষেবা ("পরিষেবা", আমাদের সরবরাহ
         করা পরিষেবা/পণ্য সহ) ব্যবহার করেন, তখন আমরা উপলব্ধি করি যে আপনি আপনার
         ব্যক্তিগত তথ্যের জন্য আমাদের বিশ্বাস করেন। আমরা আপনার গোপনীয়তাকে খুব
         গুরুত্ব সহকারে নিই। এই গোপনীয়তা নীতিতে, আমরা আপনাকে যতটা সম্ভব
         স্পষ্টভাবে ব্যাখ্যা করতে চাই যে আমরা কী তথ্য সংগ্রহ করি, কীভাবে এটি
         ব্যবহার করি এবং এর সাথে সম্পর্কিত আপনার কী অধিকার রয়েছে। আমরা আশা করি
         আপনি এটি মনোযোগ সহকারে পড়ার জন্য কিছু সময় দেবেন, কারণ এটি
         গুরুত্বপূর্ণ। যদি এই গোপনীয়তা নীতির কোনো শর্তের সাথে আপনি একমত না হন,
         তাহলে অনুগ্রহ করে অবিলম্বে আমাদের পরিষেবা ব্যবহার করা বন্ধ করুন।
        </p>
        <p>
         এই গোপনীয়তা নীতি আমাদের পরিষেবার মাধ্যমে সংগৃহীত সমস্ত তথ্যের জন্য
         প্রযোজ্য (যা, উপরে বর্ণিত হিসাবে, আমাদের প্ল্যাটফর্ম অন্তর্ভুক্ত),
         সেইসাথে কোনো সম্পর্কিত পরিষেবা, বিক্রয়, বিপণন বা ইভেন্টের জন্য
         প্রযোজ্য।
        </p>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <h3 className="section-title">সূচিপত্র</h3>
        <ul>
         <li>আমরা কি তথ্য সংগ্রহ করি?</li>
         <li>আপনার তথ্য কি কারো সাথে শেয়ার করা হবে?</li>
         <li>আমরা কি কুকিজ এবং অন্যান্য ট্র্যাকিং প্রযুক্তি ব্যবহার করি?</li>
         <li>আমরা কীভাবে আপনার সামাজিক লগইন পরিচালনা করি?</li>
         <li>আপনার তথ্য কি আন্তর্জাতিকভাবে স্থানান্তর করা হয়?</li>
         <li>আমরা কতক্ষণ আপনার তথ্য সংরক্ষণ করব?</li>
         <li>আমরা কি অপ্রাপ্তবয়স্কদের থেকে তথ্য সংগ্রহ করি?</li>
         <li>আপনার গোপনীয়তার অধিকার কি?</li>
         <li>ডু নট ট্র্যাক বৈশিষ্ট্যগুলির জন্য নিয়ন্ত্রণ</li>
         <li>আমরা কি এই নীতি আপডেট করি?</li>
         <li>আপনি কীভাবে এই নীতি সম্পর্কে আমাদের সাথে যোগাযোগ করতে পারেন?</li>
         <li>
          কীভাবে আপনি আপনার থেকে সংগ্রহ করা তথ্য পর্যালোচনা, আপডেট বা মুছে ফেলতে
          পারেন?
         </li>
        </ul>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <h3 className="section-title">১. আমরা কী তথ্য সংগ্রহ করি?</h3>

        <h4>আপনি আমাদের কাছে যে ব্যক্তিগত তথ্য প্রকাশ করেন</h4>
        <p>
         সংক্ষেপে: আপনি আমাদের যে ব্যক্তিগত তথ্য সরবরাহ করেন তা আমরা সংগ্রহ করি।
        </p>

        <p>
         আপনি যখন আমাদের সম্পর্কে বা আমাদের পণ্য এবং পরিষেবাগুলি সম্পর্কে তথ্য
         পেতে আগ্রহী হন, যখন আপনি আমাদের প্রতিযোগিতা বা উপহারে অংশ নেন (যেমন
         আমাদের অনলাইন ফোরামে বার্তা পোস্ট করে বা প্রতিযোগিতা বা উপহারে প্রবেশ
         করে) বা অন্য কোনো কার্যক্রমে অংশ নেন, তখন আপনি স্বেচ্ছায় আমাদের যে
         ব্যক্তিগত তথ্য সরবরাহ করেন তা আমরা সংগ্রহ করি।
        </p>

        <p>
         আমরা যে ব্যক্তিগত তথ্য সংগ্রহ করি তা আপনার সাথে আমাদের যোগাযোগের
         প্রেক্ষাপট, আপনার পছন্দ এবং আপনি যে পণ্য এবং বৈশিষ্ট্যগুলি ব্যবহার করেন
         তার উপর নির্ভর করে। আমরা যে ব্যক্তিগত তথ্য সংগ্রহ করতে পারি তার মধ্যে
         নিম্নলিখিতগুলি অন্তর্ভুক্ত থাকতে পারে:
        </p>

        <p>
         <strong>সোশ্যাল মিডিয়া লগইন ডেটা।</strong> আমরা আপনাকে আপনার বিদ্যমান
         সোশ্যাল মিডিয়া অ্যাকাউন্টের বিবরণ, যেমন আপনার ফেসবুক, টুইটার বা
         অন্যান্য সোশ্যাল মিডিয়া অ্যাকাউন্ট ব্যবহার করে আমাদের সাথে নিবন্ধন
         করার বিকল্প দিতে পারি। আপনি যদি এইভাবে নিবন্ধন করতে চান তবে আমরা নীচে
         "আমরা কীভাবে আপনার সামাজিক লগইন পরিচালনা করি" বিভাগে বর্ণিত তথ্য সংগ্রহ
         করব।
        </p>

        <p>
         আপনাকে দেওয়া সমস্ত ব্যক্তিগত তথ্য সত্য, সম্পূর্ণ এবং নির্ভুল হতে হবে
         এবং এই ধরনের ব্যক্তিগত তথ্যের কোনো পরিবর্তন হলে আপনাকে অবশ্যই আমাদের
         জানাতে হবে।
        </p>

        <h4>আমরা স্বয়ংক্রিয়ভাবে যে তথ্য সংগ্রহ করি</h4>
        <p>
         সংক্ষেপে: কিছু তথ্য - যেমন আপনার ইন্টারনেট প্রোটোকল (আইপি) ঠিকানা
         এবং/অথবা ব্রাউজার এবং ডিভাইসের বৈশিষ্ট্য - আপনি যখন আমাদের প্ল্যাটফর্ম
         পরিদর্শন করেন তখন স্বয়ংক্রিয়ভাবে সংগ্রহ করা হয়।
        </p>

        <p>
         আপনি যখন আমাদের সাইট পরিদর্শন করেন, ব্যবহার করেন বা নেভিগেট করেন তখন
         আমরা স্বয়ংক্রিয়ভাবে কিছু তথ্য সংগ্রহ করি। এই তথ্য আপনার নির্দিষ্ট
         পরিচয় প্রকাশ করে না (যেমন আপনার নাম বা যোগাযোগের তথ্য) তবে এতে আপনার
         আইপি ঠিকানা, ব্রাউজার এবং ডিভাইসের বৈশিষ্ট্য, অপারেটিং সিস্টেম, ভাষার
         পছন্দ, রেফার করা URL, ডিভাইসের নাম, দেশ, অবস্থান, আপনি কীভাবে এবং কখন
         আমাদের সাইট ব্যবহার করেন এবং অন্যান্য প্রযুক্তিগত তথ্য সহ ডিভাইস এবং
         ব্যবহারের তথ্য অন্তর্ভুক্ত থাকতে পারে। এই তথ্য প্রাথমিকভাবে আমাদের
         প্ল্যাটফর্মের নিরাপত্তা এবং পরিচালনা বজায় রাখার জন্য এবং আমাদের
         অভ্যন্তরীণ বিশ্লেষণ এবং রিপোর্টিংয়ের উদ্দেশ্যে প্রয়োজনীয়।
        </p>

        <p>
         অনেক ব্যবসার মতো, আমরা কুকিজ এবং অনুরূপ প্রযুক্তির মাধ্যমে তথ্য সংগ্রহ
         করি।
        </p>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <h3 className="section-title">
         ২. আপনার তথ্য কি কারো সাথে শেয়ার করা হবে?
        </h3>

        <p>
         সংক্ষেপে: আমরা শুধুমাত্র আপনার সম্মতিতে, আইন মেনে চলার জন্য, আপনাকে
         পরিষেবা প্রদানের জন্য, আপনার অধিকার রক্ষা করার জন্য বা ব্যবসায়িক
         বাধ্যবাধকতা পূরণের জন্য তথ্য শেয়ার করি।
        </p>

        <p>
         আমরা নিম্নলিখিত আইনি ভিত্তির উপর ভিত্তি করে আপনার সম্পর্কে আমাদের কাছে
         থাকা তথ্য প্রক্রিয়া বা শেয়ার করতে পারি:
        </p>

        <p>
         আরও স্পষ্টভাবে, নিম্নলিখিত পরিস্থিতিতে আমাদের আপনার ডেটা প্রক্রিয়া
         করতে বা আপনার ব্যক্তিগত তথ্য শেয়ার করতে হতে পারে:
        </p>

        <h4>ব্যবসা স্থানান্তর</h4>
        <p>
         আমরা কোনো সংযুক্তিকরণ, কোম্পানির সম্পদ বিক্রি, অর্থায়ন, বা আমাদের
         ব্যবসার সম্পূর্ণ বা অংশের অধিগ্রহণ সম্পর্কিত বা আলোচনার সময় অন্য
         কোম্পানির সাথে আপনার তথ্য শেয়ার বা স্থানান্তর করতে পারি।
        </p>

        <h4>সদস্য</h4>
        <p>
         আমরা আপনার তথ্য আমাদের সহযোগীদের সাথে শেয়ার করতে পারি, সেক্ষেত্রে আমরা
         সেই সহযোগীদের এই গোপনীয়তা নীতি মেনে চলতে বাধ্য করব। সহযোগীদের মধ্যে
         আমাদের মূল কোম্পানি এবং কোনো সহায়ক সংস্থা, যৌথ উদ্যোগের অংশীদার বা
         অন্যান্য কোম্পানি অন্তর্ভুক্ত যা আমরা নিয়ন্ত্রণ করি বা আমাদের সাথে
         সাধারণ নিয়ন্ত্রণে থাকে।
        </p>

        <h4>ব্যবসায়িক অংশীদার</h4>
        <p>
         আমরা আপনাকে নির্দিষ্ট পণ্য, পরিষেবা বা প্রচার সরবরাহ করার জন্য আমাদের
         ব্যবসায়িক অংশীদারদের সাথে আপনার তথ্য শেয়ার করতে পারি।
        </p>

        <h4>অন্যান্য ব্যবহারকারী</h4>
        <p>
         আপনি যখন ব্যক্তিগত তথ্য শেয়ার করেন বা অন্যথায় সর্বজনীন স্থানে
         প্ল্যাটফর্মের সাথে যোগাযোগ করেন, তখন এই ব্যক্তিগত তথ্য সমস্ত
         ব্যবহারকারীর দ্বারা দেখা যেতে পারে এবং স্থায়ীভাবে সর্বজনীনভাবে উপলব্ধ
         করা যেতে পারে। আপনি যদি আমাদের অন্যান্য ব্যবহারকারীদের সাথে যোগাযোগ
         করেন এবং একটি সামাজিক নেটওয়ার্কের মাধ্যমে আমাদের জন্য নিবন্ধন করেন
         (যেমন Facebook, Instagram), তাহলে সামাজিক নেটওয়ার্কের আপনার পরিচিতিরা
         আপনার নাম, প্রোফাইল ফটো এবং আপনার কার্যকলাপের বিবরণ দেখতে সক্ষম হবেন।
         একইভাবে, অন্যান্য ব্যবহারকারীরা আপনার কার্যকলাপের বিবরণ দেখতে, আমাদের
         প্ল্যাটফর্মের মধ্যে আপনার সাথে যোগাযোগ করতে এবং আপনার প্রোফাইল দেখতে
         সক্ষম হবেন।
        </p>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <h3 className="section-title">
         ৩. আমরা কি কুকিজ এবং অন্যান্য ট্র্যাকিং প্রযুক্তি ব্যবহার করি?
        </h3>
        <p>
         সংক্ষেপে: আমরা আপনার তথ্য সংগ্রহ ও সংরক্ষণ করতে কুকিজ এবং অন্যান্য
         ট্র্যাকিং প্রযুক্তি ব্যবহার করতে পারি।
        </p>
        <p>
         আমরা তথ্য অ্যাক্সেস বা সংরক্ষণ করতে কুকিজ এবং অনুরূপ ট্র্যাকিং
         প্রযুক্তি (যেমন ওয়েব বীকন এবং পিক্সেল) ব্যবহার করতে পারি। আমরা কীভাবে
         এই ধরনের প্রযুক্তি ব্যবহার করি এবং আপনি কীভাবে নির্দিষ্ট কুকিজ
         প্রত্যাখ্যান করতে পারেন সে সম্পর্কে নির্দিষ্ট তথ্য আমাদের কুকি নীতিতে
         দেওয়া আছে।
        </p>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <h3 className="section-title">
         ৪. আমরা কীভাবে আপনার সামাজিক লগইন পরিচালনা করি?
        </h3>
        <p>
         সংক্ষেপে: আপনি যদি একটি সামাজিক মিডিয়া অ্যাকাউন্ট ব্যবহার করে আমাদের
         পরিষেবাগুলিতে নিবন্ধন বা লগইন করতে চান, তাহলে আমরা আপনার সম্পর্কে
         নির্দিষ্ট তথ্য অ্যাক্সেস করতে পারি।
        </p>
        <p>
         আমরা আপনাকে আপনার তৃতীয় পক্ষের সামাজিক মিডিয়া অ্যাকাউন্টের বিবরণ
         (যেমন আপনার ফেসবুক বা গুগল লগইন) ব্যবহার করে নিবন্ধন এবং লগইন করার
         ক্ষমতা প্রদান করি। যেখানে আপনি এটি করতে চান, আমরা আপনার সামাজিক মিডিয়া
         সরবরাহকারীর কাছ থেকে আপনার সম্পর্কে নির্দিষ্ট প্রোফাইল তথ্য পাব। আমরা
         যে প্রোফাইল তথ্য পাই তা প্রাসঙ্গিক সামাজিক মিডিয়া সরবরাহকারীর উপর
         নির্ভর করে পরিবর্তিত হতে পারে, তবে প্রায়শই আপনার নাম, ইমেল ঠিকানা,
         বন্ধুদের তালিকা, প্রোফাইল ছবি, সেইসাথে অন্যান্য তথ্য যা আপনি এই ধরনের
         সামাজিক মিডিয়া প্ল্যাটফর্মে সর্বজনীন করতে চান তা অন্তর্ভুক্ত করবে।
        </p>
        <p>
         আমরা কেবলমাত্র এই গোপনীয়তা নীতিতে বর্ণিত উদ্দেশ্যে বা প্রাসঙ্গিক
         প্ল্যাটফর্মে আপনার কাছে স্পষ্টভাবে প্রকাশ করা তথ্যের জন্য আমরা যে তথ্য
         পাই তা ব্যবহার করব। দয়া করে মনে রাখবেন যে আমরা আপনার তৃতীয় পক্ষের
         সামাজিক মিডিয়া সরবরাহকারীর দ্বারা আপনার ব্যক্তিগত তথ্যের অন্যান্য
         ব্যবহারের নিয়ন্ত্রণ করি না এবং তার জন্য দায়ী নই। আমরা সুপারিশ করি যে
         তারা কীভাবে আপনার ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার এবং শেয়ার করে এবং
         কীভাবে আপনি তাদের সাইট এবং অ্যাপে আপনার গোপনীয়তা পছন্দগুলি সেট করতে
         পারেন তা বোঝার জন্য আপনি তাদের গোপনীয়তা নীতিগুলি পর্যালোচনা করুন।
        </p>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <h3 className="section-title">
         ৫. আপনার তথ্য কি আন্তর্জাতিকভাবে স্থানান্তর করা হয়?
        </h3>
        <p>
         সংক্ষেপে: আমরা আপনার নিজের দেশ থেকে অন্য দেশে আপনার তথ্য স্থানান্তর,
         সংরক্ষণ এবং প্রক্রিয়া করতে পারি।
        </p>
        <p>
         আমাদের সার্ভারগুলি [দেশের নাম] অবস্থিত। আপনি যদি এর বাইরে থেকে আমাদের
         অ্যাক্সেস করেন, তাহলে দয়া করে সচেতন থাকুন যে আপনার তথ্য আমাদের
         সুবিধাগুলিতে এবং তৃতীয় পক্ষের দ্বারা স্থানান্তর, সংরক্ষণ এবং
         প্রক্রিয়া করা হতে পারে যাদের সাথে আমরা আপনার ব্যক্তিগত তথ্য শেয়ার
         করতে পারি (উপরে "আপনার তথ্য কি কারো সাথে শেয়ার করা হবে?" দেখুন), এবং
         অন্যান্য দেশে।
        </p>
        <p>
         আপনি যদি ইউরোপীয় অর্থনৈতিক অঞ্চলের বাসিন্দা হন, তাহলে এই দেশগুলিতে
         আপনার দেশের মতো একই ডেটা সুরক্ষা আইন বা অন্যান্য অনুরূপ আইন নাও থাকতে
         পারে। যাইহোক, আমরা এই গোপনীয়তা নীতি এবং প্রযোজ্য আইন অনুসারে আপনার
         ব্যক্তিগত তথ্য রক্ষা করার জন্য সমস্ত যুক্তিসঙ্গত পদক্ষেপ নেব।
        </p>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <h3 className="section-title">
         ৬. আমরা কতক্ষণ আপনার তথ্য সংরক্ষণ করব?
        </h3>

        <p>
         সংক্ষেপে: আইন দ্বারা অন্যথায় প্রয়োজন না হলে, এই গোপনীয়তা নীতিতে
         বর্ণিত উদ্দেশ্যগুলি পূরণ করার জন্য প্রয়োজনীয় সময়ের জন্য আমরা আপনার
         তথ্য রাখি।
        </p>

        <p>
         আমরা এই গোপনীয়তা নীতিতে উল্লিখিত উদ্দেশ্যগুলির জন্য প্রয়োজনীয় সময়ের
         জন্য আপনার ব্যক্তিগত তথ্য ধরে রাখব, যদি না আইনের দ্বারা দীর্ঘ সময়ের
         জন্য ধরে রাখা প্রয়োজন বা অনুমতি দেওয়া হয় (যেমন ট্যাক্স, অ্যাকাউন্টিং
         বা অন্যান্য আইনি প্রয়োজনীয়তা)। এই নীতির কিছুই আমাদেরকে প্রয়োজনের
         চেয়ে বেশি সময়ের জন্য আপনার ব্যক্তিগত তথ্য ধরে রাখতে বাধ্য করবে না।
        </p>

        <p>
         যখন আমাদের আপনার ব্যক্তিগত তথ্য প্রক্রিয়াকরণের জন্য আর কোনো বৈধ
         ব্যবসায়িক প্রয়োজন থাকে না, তখন আমরা সেই তথ্য মুছে ফেলব বা বেনামী করব,
         অথবা, যদি এটি সম্ভব না হয় (উদাহরণস্বরূপ, কারণ আপনার ব্যক্তিগত তথ্য
         একটি ব্যাকআপ আর্কাইভে সংরক্ষণ করা হয়েছে), তাহলে আমরা আপনার ব্যক্তিগত
         তথ্য সুরক্ষিতভাবে সংরক্ষণ করব এবং মুছে ফেলা সম্ভব না হওয়া পর্যন্ত কোনো
         আরও প্রক্রিয়াকরণ থেকে আলাদা করব।
        </p>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <h3 className="section-title">
         ৭. আমরা কি অপ্রাপ্তবয়স্কদের থেকে তথ্য সংগ্রহ করি?
        </h3>

        <p>
         সংক্ষেপে: আমরা জেনেশুনে ১৮ বছরের কম বয়সী শিশুদের থেকে তথ্য সংগ্রহ বা
         বিপণন করি না।
        </p>

        <p>
         আমরা জেনেশুনে ১৮ বছরের কম বয়সী শিশুদের থেকে তথ্য সংগ্রহ বা বিপণন করি
         না। প্ল্যাটফর্মটি ব্যবহার করে, আপনি প্রতিনিধিত্ব করেন যে আপনার বয়স
         কমপক্ষে ১৮ বছর বা আপনি এই ধরনের অপ্রাপ্তবয়স্কদের পিতামাতা বা অভিভাবক
         এবং এই ধরনের অপ্রাপ্তবয়স্কদের তথ্যের ব্যবহারে সম্মতি দেন।
        </p>

        <p>
         যদি আমরা জানতে পারি যে ১৮ বছরের কম বয়সী ব্যবহারকারীদের থেকে ব্যক্তিগত
         তথ্য সংগ্রহ করা হয়েছে, তাহলে আমরা অ্যাকাউন্টটি নিষ্ক্রিয় করব এবং
         আমাদের রেকর্ড থেকে এই ধরনের তথ্য অবিলম্বে মুছে ফেলার জন্য যুক্তিসঙ্গত
         পদক্ষেপ নেব। আপনি যদি এমন কোনো তথ্যের বিষয়ে সচেতন হন যা আমরা ১৮ বছরের
         কম বয়সী শিশুদের থেকে সংগ্রহ করেছি, তাহলে দয়া করে{" "}
         <a href="mailto:tizaraa.com">tizaraa.com</a>-এ আমাদের সাথে যোগাযোগ
         করুন।
        </p>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <h3 className="section-title">৮. আপনার গোপনীয়তার অধিকার কি?</h3>

        <p>
         সংক্ষেপে: আপনি যেকোনো সময় আপনার অ্যাকাউন্ট পর্যালোচনা, পরিবর্তন বা
         বন্ধ করতে পারেন।
        </p>

        <h4>অ্যাকাউন্টের তথ্য</h4>
        <p>
         আপনি যদি আপনার অ্যাকাউন্টের তথ্য পর্যালোচনা বা পরিবর্তন করতে চান বা
         যেকোনো সময় আপনার অ্যাকাউন্ট বন্ধ করতে চান, তাহলে আপনি যা করতে পারেন:
        </p>

        <p>
         আপনার অ্যাকাউন্ট বন্ধ করার অনুরোধের পরে, আমরা আপনার অ্যাকাউন্ট এবং
         আমাদের সক্রিয় ডেটাবেস থেকে তথ্য নিষ্ক্রিয় বা মুছে ফেলব। তবে, আমরা
         জালিয়াতি প্রতিরোধ, সমস্যা সমাধান, কোনো তদন্তে সহায়তা, আমাদের
         ব্যবহারের শর্তাবলী প্রয়োগ এবং/অথবা প্রযোজ্য আইনি প্রয়োজনীয়তা মেনে
         চলার জন্য আমাদের ফাইলে কিছু তথ্য রাখতে পারি।
        </p>

        <h4>ইমেল বিপণন থেকে অপ্ট আউট করা</h4>
        <p>
         আপনি আমাদের পাঠানো ইমেলগুলিতে আনসাবস্ক্রাইব লিঙ্কে ক্লিক করে বা নীচে
         দেওয়া বিবরণ ব্যবহার করে আমাদের সাথে যোগাযোগ করে যেকোনো সময় আমাদের
         বিপণন ইমেল তালিকা থেকে সদস্যতা ত্যাগ করতে পারেন।
        </p>

        <p>
         তারপরে আপনাকে বিপণন ইমেল তালিকা থেকে সরানো হবে - তবে, আমরা এখনও আপনার
         সাথে যোগাযোগ করতে পারি, উদাহরণস্বরূপ, আপনার অ্যাকাউন্ট পরিচালনা এবং
         ব্যবহার করার জন্য প্রয়োজনীয় পরিষেবা সম্পর্কিত ইমেল পাঠাতে, পরিষেবা
         অনুরোধের প্রতিক্রিয়া জানাতে বা অন্যান্য অ-বিপণন উদ্দেশ্যে।
        </p>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <h3 className="section-title">
         ৯. ডু নট ট্র্যাক বৈশিষ্ট্যগুলির জন্য নিয়ন্ত্রণ
        </h3>

        <p>
         বেশিরভাগ ওয়েব ব্রাউজার এবং কিছু মোবাইল অপারেটিং সিস্টেম এবং মোবাইল
         অ্যাপ্লিকেশনগুলিতে একটি ডু-নট-ট্র্যাক ("DNT") বৈশিষ্ট্য বা সেটিংস
         রয়েছে যা আপনি আপনার অনলাইন ব্রাউজিং কার্যকলাপ নিরীক্ষণ এবং সংগ্রহ না
         করার জন্য আপনার গোপনীয়তা পছন্দকে সংকেত দেওয়ার জন্য সক্ষম করতে পারেন।
        </p>

        <p>
         DNT সংকেত সনাক্ত এবং বাস্তবায়নের জন্য কোনো অভিন্ন প্রযুক্তিগত মান এই
         পর্যায়ে চূড়ান্ত করা হয়নি। অতএব, আমরা বর্তমানে DNT ব্রাউজার সংকেত বা
         অন্য কোনো প্রক্রিয়া যা স্বয়ংক্রিয়ভাবে অনলাইনে ট্র্যাক না হওয়ার
         আপনার পছন্দকে যোগাযোগ করে তার প্রতিক্রিয়া জানাই না।
        </p>

        <p>
         যদি অনলাইন ট্র্যাকিংয়ের জন্য এমন একটি মান গ্রহণ করা হয় যা ভবিষ্যতে
         আমাদের অনুসরণ করতে হবে, তাহলে আমরা এই গোপনীয়তা নীতির একটি সংশোধিত
         সংস্করণে আপনাকে সেই অনুশীলন সম্পর্কে অবহিত করব।
        </p>
       </div>
      </section>

      <section className="section">
       <div className="section-content">
        <h3 className="section-title">১০. আমরা কি এই নীতি আপডেট করি?</h3>

        <p>
         সংক্ষেপে: হ্যাঁ, আমরা প্রাসঙ্গিক আইন মেনে চলার জন্য প্রয়োজন অনুযায়ী
         এই নীতি আপডেট করব।
        </p>

        <p>
         আমরা সময়ে সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারি। আপডেট করা সংস্করণে
         একটি আপডেট করা "সংশোধিত" তারিখ অন্তর্ভুক্ত থাকবে এবং আপডেট করা
         সংস্করণটি অ্যাক্সেসযোগ্য হওয়ার সাথে সাথেই কার্যকর হবে। যদি আমরা এই
         গোপনীয়তা নীতিতে গুরুত্বপূর্ণ পরিবর্তন করি, তাহলে আমরা আপনাকে নীতির উপর
         একটি বিজ্ঞপ্তি স্পষ্টভাবে পোস্ট করে বা আপনাকে সরাসরি একটি বিজ্ঞপ্তি
         পাঠিয়ে এই পরিবর্তনগুলি সম্পর্কে অবহিত করতে পারি।
        </p>

        <p>
         আমরা আপনাকে আপনার তথ্য কীভাবে সুরক্ষিত করছি সে সম্পর্কে অবগত থাকার জন্য
         প্রায়শই এই গোপনীয়তা নীতি পর্যালোচনা করতে উৎসাহিত করি।
        </p>

        <h3 className="section-title">
         ১১. আপনি কীভাবে এই গোপনীয়তা নীতি সম্পর্কে আমাদের সাথে যোগাযোগ করতে
         পারেন?
        </h3>

        <p>
         যদি আপনার এই নীতি সম্পর্কে কোনো প্রশ্ন বা মন্তব্য থাকে, তাহলে আপনি{" "}
         <a href="mailto:info@tizaraa.com" className="text-blue-600 underline">
          info@tizaraa.com
         </a>{" "}
         এ আমাদের ইমেল করতে পারেন।
        </p>
       </div>
      </section>
     </div>
    )}
   </div>
  </div>
 );
}
