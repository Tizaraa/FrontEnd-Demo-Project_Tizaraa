import React from "react";
import Head from "next/head";
import "../replacement/ReplacementPolicy.css";

const ReplacementPolicy = () => {
 return (
  <>
   <Head>
    <title>Tizaraa Replacement Policy</title>
    <meta
     name="description"
     content="Tizaraa Replacement Policy for genuine and quality-checked products"
    />
   </Head>
   <div className="replacement-container">
    {/* Header Section */}
    <header className="replacement-header">
     <div className="header-content">
      <h1>Tizaraa Replacement Policy</h1>
      <p>
       At Tizaraa, we’re committed to delivering 100% genuine and
       quality-checked products.
      </p>
     </div>
    </header>

    {/* Main Content */}
    <main className="replacement-main">
     {/* English Content */}
     <section className="content-section">
      <h2>Our Commitment</h2>
      <p>
       At Tizaraa, we’re committed to delivering 100% genuine and
       quality-checked products. We understand that sometimes things don’t go as
       expected — and we’re here to help!
      </p>
      <p>
       Some of our products come with a brand warranty, while others may not.
       Warranty details (if applicable) will be clearly mentioned on the product
       page, invoice, or provided through a separate warranty card.
      </p>
     </section>

     <section className="content-section">
      <h2>One-Time Replacement Guarantee</h2>
      <p>
       If a product comes with a Replacement Warranty, it means you're eligible
       for one-time product replacement in case of qualifying issues. Please
       note that:
      </p>
      <ul>
       <li>Replacement is valid only once per product.</li>
       <li>
        If the product shows issues again after the first replacement, it will
        be treated under the Service Warranty, not replaced again.
       </li>
      </ul>
     </section>

     <section className="content-section">
      <h2>When Can You Request a Replacement?</h2>
      <p>
       You may be eligible for a replacement if your product shows any of the
       following issues within the replacement warranty period:
      </p>
      <ul>
       <li>Manufacturing defect</li>
       <li>OS-level issues (excluding third-party apps)</li>
       <li>
        Device won’t power on (excluding accessories like remotes, batteries,
        keyboards, etc.)
       </li>
       <li>Frequent restarts or poor performance (below 60%)</li>
      </ul>
      <p>
       If approved after inspection, you’ll receive a new unit of the same
       model.
      </p>
     </section>

     <section className="content-section">
      <h2>When Replacement May Be Denied</h2>
      <p>
       Unfortunately, we cannot process replacements in the following
       situations:
      </p>
      <ul>
       <li>Physical or water damage</li>
       <li>Burnt components or internal short circuits</li>
       <li>
        Modified or rooted software, broken warranty seals, or tampered stickers
       </li>
       <li>
        Improper usage or exposure to unsuitable environments (e.g. moisture,
        heat, voltage fluctuation)
       </li>
      </ul>
     </section>

     <section className="content-section">
      <h2>Replacement Process & Timeline</h2>
      <ul>
       <li>
        Products returned for replacement will be inspected by our technical
        team.
       </li>
       <li>
        If we have the product in stock, the replacement will be processed
        quickly.
       </li>
       <li>In case of out-of-stock or discontinued items, we may:</li>
       <ul>
        <li>Offer a service warranty instead</li>
        <li>
         Provide a similar product (subject to availability and approval)
        </li>
       </ul>
      </ul>
     </section>

     <section className="content-section">
      <h2>Need More Help?</h2>
      <p>
       For other product concerns, returns, or refunds, please read our Return &
       Refund Policy for more information.
      </p>
     </section>

     {/* Bangla Content */}
     <section className="content-section">
      <h2>টিজারা রিপ্লেসমেন্ট নীতিমালা</h2>
      <p>
       Tizaraa সবসময় আপনাকে ১০০% আসল ও যাচাইকৃত পণ্য সরবরাহে প্রতিশ্রুতিবদ্ধ।
       তবে কখনো কখনো পণ্য সম্পর্কিত কিছু সমস্যা দেখা দিতে পারে — সে ক্ষেত্রে
       আমরা আছি আপনার পাশে।
      </p>
      <p>
       আমাদের কিছু পণ্যে ব্র্যান্ড ওয়ারেন্টি থাকে, আবার কিছু পণ্যে নাও থাকতে
       পারে। সংশ্লিষ্ট ওয়ারেন্টির তথ্য পণ্যের পেইজ, চালান (invoice), বা আলাদা
       ওয়ারেন্টি কার্ডের মাধ্যমে জানিয়ে দেওয়া হবে।
      </p>
     </section>

     <section className="content-section">
      <h2>একবারের রিপ্লেসমেন্ট গ্যারান্টি</h2>
      <p>
       যদি কোনো পণ্যে রিপ্লেসমেন্ট ওয়ারেন্টি থাকে, তাহলে আপনি একবারের জন্য নতুন
       পণ্য পাওয়ার জন্য আবেদন করতে পারবেন। মনে রাখবেন:
      </p>
      <ul>
       <li>রিপ্লেসমেন্ট শুধুমাত্র একবারই প্রযোজ্য।</li>
       <li>
        যদি রিপ্লেসমেন্টের পর আবার কোনো সমস্যা দেখা দেয়, তাহলে তা সার্ভিস
        ওয়ারেন্টির আওতায় পড়বে — আর রিপ্লেস করা হবে না।
       </li>
      </ul>
     </section>

     <section className="content-section">
      <h2>কখন রিপ্লেসমেন্টের জন্য আবেদন করা যাবে?</h2>
      <p>
       নিচের যেকোনো সমস্যা থাকলে আপনি রিপ্লেসমেন্টের জন্য আবেদন করতে পারেন (যদি
       পণ্যটি রিপ্লেসমেন্ট ওয়ারেন্টির আওতাভুক্ত হয়)—
      </p>
      <ul>
       <li>ফ্যাক্টরি ডিফেক্ট/ম্যানুফ্যাকচারিং ত্রুটি</li>
       <li>
        অপারেটিং সিস্টেম সংক্রান্ত সমস্যা (কোনো অ্যাপসের সমস্যা হলে প্রযোজ্য নয়)
       </li>
       <li>
        পাওয়ার অন না হওয়া (অ্যাকসেসরিজ যেমন রিমোট, ব্যাটারি, লাইট ইত্যাদি এতে
        অন্তর্ভুক্ত নয়)
       </li>
       <li>বারবার রিস্টার্ট হওয়া বা পারফর্মেন্স ৬০% এর নিচে থাকা</li>
      </ul>
      <p>
       যদি আমাদের টিম কর্তৃক যাচাইয়ের পর সমস্যা প্রমাণিত হয়, তাহলে আপনি একটি
       নতুন পণ্য পাবেন।
      </p>
     </section>

     <section className="content-section">
      <h2>যেসব ক্ষেত্রে রিপ্লেসমেন্ট প্রযোজ্য নয়</h2>
      <p>নিম্নোক্ত পরিস্থিতিতে আমরা রিপ্লেসমেন্ট দিতে পারব না—</p>
      <ul>
       <li>বাহ্যিক ক্ষতি বা ভাঙা</li>
       <li>পোড়া বা শর্ট সার্কিট হওয়া</li>
       <li>সফটওয়্যার পরিবর্তন, রুটিং, ওয়ারেন্টি স্টিকার খোলা বা নষ্ট করা</li>
       <li>
        ভুল ব্যবহার বা অনুপযুক্ত পরিবেশে (উচ্চ তাপ, পানি, বিদ্যুতের ওঠানামা)
        ব্যবহার
       </li>
      </ul>
     </section>

     <section className="content-section">
      <h2>রিপ্লেসমেন্ট প্রক্রিয়া ও সময়সীমা</h2>
      <ul>
       <li>আমাদের টেকনিক্যাল টিম পণ্য যাচাই করবে।</li>
       <li>স্টকে পণ্য থাকলে দ্রুত রিপ্লেসমেন্ট দেওয়া হবে।</li>
       <li>স্টকে না থাকলে বা পণ্য বন্ধ হয়ে গেলে, আমরা—</li>
       <ul>
        <li>সার্ভিস ওয়ারেন্টি অফার করতে পারি</li>
        <li>অথবা সাদৃশ্যপূর্ণ অন্য পণ্য অফার করতে পারি (আপনার সম্মতিতে)</li>
       </ul>
      </ul>
     </section>

     <section className="content-section">
      <h2>আরও সহায়তার জন্য</h2>
      <p>
       রিপ্লেসমেন্ট ছাড়াও রিটার্ন, রিফান্ড বা অন্যান্য সমস্যা নিয়ে জানতে আমাদের
       রিটার্ন ও রিফান্ড নীতিমালা পড়ুন।
      </p>
     </section>
    </main>
   </div>
  </>
 );
};

export default ReplacementPolicy;
