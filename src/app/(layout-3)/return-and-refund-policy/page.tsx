"use client"

import Head from 'next/head';
import Link from 'next/link';
import '../return-and-refund-policy/terms.css'
import { useState } from 'react';


export default function ReturnRefundPolicy() {
  
  const [language, setLanguage] = useState('english');

  return (
    <div className="terms-container">
      <Head>
        <title>Return and Refund Policy | Tizaraa</title>
        <meta name="description" content="Return and Refund Policy" />
      </Head>

      <div className="terms-content">
        {/* Header */}
        <div className="terms-header">
          <h1 className="terms-title">Return and Refund Policy</h1>
          {/* <div className="terms-divider"></div> */}
        </div>

        <div className="btn-header">
          <button
            className={`tab-button ${language === 'english' ? 'active' : ''}`}
            onClick={() => setLanguage('english')}
          >
            English
          </button>
          <button
            className={`tab-button ${language === 'bangla' ? 'active' : ''}`}
            onClick={() => setLanguage('bangla')}
          >
            বাংলা
          </button>
        </div>

        {/* Content English */}
        {language === 'english' && (
        <div className="terms-body">
          <section className="section">
            <div className="section-content">
              <p>
                Thank you for your purchase. We hope you are happy with your purchase. However, if you are not completely satisfied with your purchase for any reason, you may return it to us for a full refund or an exchange.
              </p>
              <p>
                If your product is damaged, defective, incorrecson our return and refund policy.
              </p>
              <p>
                If you wish to return a Product to us you may contact us through our website, by email at info@tizaraa.com or by calling our phone number (+8801792223444). We will then inform you of the arrangements to return the Product to us.
              </p>
            </div>
          </section>

          <section className="section">
            <div className="section-content">
              <h3 className="section-title">GENERAL RULES FOR A SUCCESSFUL RETURN</h3>
              <p>
                Subject to the terms below, if you believe that a Product you have ordered from us is defective, you should contact us via our website or by email or by telephoning the Customer Call Centre (details are available under Contact Us). We will advise you of the appropriate steps to take. If you notify us within 3 days of delivery of the Product that the Product is defective, you will have the option to select a repair, an exchange or a refund. If a fault is found after 3 days from delivery of the Product, you should contact us by telephoning and we will at our discretion either repair or replace the Product and deliver the repaired or replacement Product to you, or provide a refund.
              </p>
              <p>
                Customers have a legal obligation to take reasonable care of the Products while they are in your possession. If you fail to comply with this obligation and return the Products to us, we may have a right of action against you for compensation. When returning a Product to us, we recommend you obtain proof of posting. In all cases, we reserve the right to inspect the Product and verify the fault. For an exchange or refund, the Product must be in otherwise 'as new' condition and if possible, with the original packaging. We reserve the right to refuse a refund or exchange if the Product returned is deemed to have been damaged.
              </p>
              <p>
                The product must be returned in the original and undamaged manufacturer packaging/box along with the original tags, user manual, warranty cards, freebies and accessories.
              </p>
              <p>
                We do not cover faults caused by misuse, neglect, physical damage, tampering or incorrect adjustment or normal wear and tear. Products sold on our website are intended for domestic use only and are not for commercial use or resale. Nor do we cover faults due to incorrect installation in your home. Please do not remove the serial numbers.
              </p>
              <p>
                In case the product was not delivered and you received a delivery confirmation email/SMS, report the issue within 15 days from the date of delivery confirmation for the seller to investigate.
              </p>
              <p>
                For device-related issues after usage or the expiration of the return window, seller warranty or brand warranty could be given by the seller. For the seller's warranty, please contact the seller. For more information on warranty claims please view our Warranty Policy.
              </p>
            </div>
          </section>

          <section className="section">
            <div className="section-content">
              <h3 className="section-title">WARRANTY POLICY</h3>
              <p>
                If a warranty is offered on a product, the warranty period will be displayed on the product page. If a product is sold by multiple vendors, the warranty period offered by each vendor will be displayed.
              </p>
              
              <h4>Types of Warranties:</h4>
              <p>
                <strong>1. Brand Warranty:</strong> This limited warranty will apply to the products. For product defects under normal use circumstances and at the discretion of the company, Brand will provide free of charge repair and/or replacement services within the warranty period as per the Brand warranty policy. Tizaraa will not take any responsibility for the after-sale services.
              </p>
              <p>
                <strong>2. Service warranty:</strong> Tizaraa is not liable to get the product serviced from the Merchant. The customer has to visit the vendor directly as well with the invoice paper to claim the warranty. Please note if any part of the product needs to be replaced for repair under their warranty policy, the customer will have to pay for that part.
              </p>
            </div>
          </section>

          <section className="section">
            <div className="section-content">
              <h3 className="section-title">PRODUCT SERVICE POLICY</h3>
              <p>
                If you bought a product that is eligible for servicing, please send the product(s) directly to the Service Center indicated on the warranty card included with your product. If there is no warranty card, please check the user manual or product packaging for more details.
              </p>
              <p>
                For a prompt warranty claim kindly include all the accessories, information included in packaging and proof of purchase from Tizaraa (invoice).
              </p>
              
              <h4 className="subsection-title">SERVICE CENTERS</h4>
              <p>
                Please refer to the manufacturer (or service center) details on the warranty card included with your product or go to your product page on tizaraa.com and look for warranty/service center information in the 'description' tab.
              </p>
              <p>
                If there is no warranty card, please check the user manual or product packaging for more details. If your product is within the warranty duration and is damaged by mechanical or electrical systems, you don't have to worry about the repairing cost. You will be covered.
              </p>
            </div>
          </section>

          <section className="section">
            <div className="section-content">
              <h3 className="section-title">PAYMENT REFUND POLICY</h3>
              <p>
                If your product is eligible for a refund, you can choose your preferred refund method based on the table below. The shipping fee is refunded along with the amount paid for your returned product except the Bank Charges charges on EMI in case of product shipped properly & customer declines during the delivery process.
              </p>
              <p>
                The time required to complete a refund depends on the refund method you have selected. Once we have received your product (6 working days) and it has undergone a quality control (2 working days), the expected refund processing times are as follows:
              </p>

              <div className="refund-table">
                <table style={{width: "100%"}}>
                  <thead>
                    <tr>
                      <th>PAYMENT METHOD</th>
                      <th>REFUND OPTION</th>
                      <th>REFUND TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>All</td>
                      <td>Refund Voucher</td>
                      <td>5-7 working days</td>
                    </tr>
                    <tr>
                      <td>Cash on Delivery (COD)</td>
                      <td>Bank Deposit</td>
                      <td>5-7 working days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="note">
                Note: Maximum refund timeline excludes weekends and public holidays.
              </p>
              <p className="important-note">
                Important Note: The Voucher discount code can only be applied once. The leftover amount will not be refunded or used for the next purchase even if the value of the order is smaller than the voucher value. Tizaraa reserves the right to deduct the Bank Charges on EMI if the product initiated to deliver as per the order.
              </p>
            </div>
          </section>
        </div>
        )}


        {/* Content Bangla */}
        {language === 'bangla' && (
        <div className="terms-body-bangla">
          <section id="introduction" className="section">
            <div className="section-content">
              <p>
              আপনার ক্রয়ের জন্য ধন্যবাদ। আমরা আশা করি আপনি আপনার ক্রয় নিয়ে খুশি। তবে, যদি আপনি কোনও কারণে আপনার ক্রয় নিয়ে সম্পূর্ণ সন্তুষ্ট না হন, তবে আপনি সম্পূর্ণ অর্থ ফেরত বা বিনিময়ের জন্য এটি আমাদের কাছে ফেরত দিতে পারেন। ডেলিভারির সময় আপনার পণ্য ক্ষতিগ্রস্ত, ত্রুটিপূর্ণ, ভুল বা অসম্পূর্ণ হলে, অনুগ্রহ করে ৩ দিনের মধ্যে অ্যাপ বা ওয়েবসাইটে রিটার্ন অনুরোধ দাখিল করুন। আমাদের রিটার্ন এবং রিফান্ড নীতি সম্পর্কে আরও তথ্যের জন্য নীচে দেখুন। আপনি যদি কোনও পণ্য আমাদের কাছে ফেরত দিতে চান তবে আপনি আমাদের ওয়েবসাইটের মাধ্যমে, ইমেল info@tizaraa.com এর মাধ্যমে অথবা আমাদের ফোন নম্বরে (+৮৮০১৭৯২২২৩৪৪৪) কল করে আমাদের সাথে যোগাযোগ করতে পারেন। তারপরে আমরা আপনাকে পণ্যটি আমাদের কাছে ফেরত দেওয়ার ব্যবস্থা সম্পর্কে অবহিত করব।
              </p>
            </div>
          </section>

          <section className="section">
            <div className="section-content">
              <h3 className="section-title">সফল রিটার্নের জন্য সাধারণ নিয়মাবলী</h3>
              <p>
                নীচের শর্তাবলীর সাপেক্ষে, যদি আপনি বিশ্বাস করেন যে আপনি আমাদের কাছ থেকে অর্ডার করা কোনও পণ্য ত্রুটিপূর্ণ, তবে আপনাকে আমাদের ওয়েবসাইটের মাধ্যমে বা ইমেলের মাধ্যমে বা গ্রাহক কল সেন্টারে (যোগাযোগ করুন বিভাগে বিশদ উপলব্ধ) টেলিফোন করে আমাদের সাথে যোগাযোগ করতে হবে। আমরা আপনাকে উপযুক্ত পদক্ষেপ গ্রহণের পরামর্শ দেব। যদি আপনি পণ্য ডেলিভারির ৩ দিনের মধ্যে আমাদের জানান যে পণ্যটি ত্রুটিপূর্ণ, তবে আপনার মেরামত, বিনিময় বা ফেরত নির্বাচন করার বিকল্প থাকবে। পণ্য ডেলিভারির ৩ দিন পর যদি কোনও ত্রুটি পাওয়া যায়, তবে আপনাকে টেলিফোন করে আমাদের সাথে যোগাযোগ করতে হবে এবং আমরা আমাদের বিবেচনার ভিত্তিতে হয় পণ্যটি মেরামত বা প্রতিস্থাপন করব এবং মেরামত করা বা প্রতিস্থাপিত পণ্যটি আপনাকে সরবরাহ করব, অথবা ফেরত দেব।
              </p>
              <p>
                গ্রাহকদের কাছে পণ্য থাকার সময় তাদের যুক্তিসঙ্গত যত্ন নেওয়ার আইনি বাধ্যবাধকতা রয়েছে। আপনি যদি এই বাধ্যবাধকতা মেনে চলতে ব্যর্থ হন এবং পণ্যগুলি আমাদের কাছে ফেরত দেন, তবে আমাদের ক্ষতিপূরণের জন্য আপনার বিরুদ্ধে আইনি ব্যবস্থা নেওয়ার অধিকার থাকতে পারে। আমাদের কাছে পণ্য ফেরত দেওয়ার সময়, আমরা আপনাকে পোস্ট করার প্রমাণ নেওয়ার পরামর্শ দিই। সমস্ত ক্ষেত্রে, আমরা পণ্যটি পরিদর্শন করার এবং ত্রুটি যাচাই করার অধিকার সংরক্ষণ করি। বিনিময় বা ফেরতের জন্য, পণ্যটি অন্যথায় 'যেমন নতুন' অবস্থায় থাকতে হবে এবং সম্ভব হলে, মূল প্যাকেজিং সহ। ফেরত দেওয়া পণ্যটি ক্ষতিগ্রস্ত বলে মনে হলে আমরা ফেরত বা বিনিময় প্রত্যাখ্যান করার অধিকার সংরক্ষণ করি।
              </p>
              <p>
                পণ্যটি অবশ্যই মূল এবং অক্ষত প্রস্তুতকারকের প্যাকেজিং/বক্সের মধ্যে মূল ট্যাগ, ব্যবহারকারীর ম্যানুয়াল, ওয়ারেন্টি কার্ড, ফ্রিবি এবং আনুষাঙ্গিক সহ ফেরত দিতে হবে।
              </p>
              <p>
                আমরা অপব্যবহার, অবহেলা, শারীরিক ক্ষতি, কারসাজি বা ভুল সমন্বয় বা স্বাভাবিক পরিধান এবং টিয়ার কারণে সৃষ্ট ত্রুটিগুলি কভার করি না। আমাদের ওয়েবসাইটে বিক্রি হওয়া পণ্যগুলি শুধুমাত্র ঘরোয়া ব্যবহারের জন্য এবং বাণিজ্যিক ব্যবহার বা পুনঃ বিক্রয়ের জন্য নয়। আমরা আপনার বাড়িতে ভুল ইনস্টলেশনের কারণে সৃষ্ট ত্রুটিগুলিও কভার করি না। অনুগ্রহ করে সিরিয়াল নম্বরগুলি সরিয়ে ফেলবেন না।
              </p>
              <p>
                যদি পণ্যটি সরবরাহ করা না হয় এবং আপনি একটি ডেলিভারি নিশ্চিতকরণ ইমেল/এসএমএস পান, তবে বিক্রেতার তদন্তের জন্য ডেলিভারি নিশ্চিতকরণের তারিখ থেকে ১৫ দিনের মধ্যে সমস্যাটি জানান।
              </p>
              <p>
                ব্যবহারের পরে বা রিটার্ন উইন্ডো শেষ হওয়ার পরে ডিভাইস-সম্পর্কিত সমস্যাগুলির জন্য, বিক্রেতা ওয়ারেন্টি বা ব্র্যান্ড ওয়ারেন্টি বিক্রেতা কর্তৃক দেওয়া হতে পারে। বিক্রেতার ওয়ারেন্টির জন্য, অনুগ্রহ করে বিক্রেতার সাথে যোগাযোগ করুন। ওয়ারেন্টি দাবি সম্পর্কে আরও তথ্যের জন্য অনুগ্রহ করে আমাদের ওয়ারেন্টি নীতি দেখুন।
              </p>
            </div>
          </section>

          <section className="section">
            <div className="section-content">
              <h3 className="section-title">ওয়ারেন্টি নীতি</h3>
              <p>
                যদি কোনও পণ্যের উপর ওয়ারেন্টি দেওয়া হয়, তবে ওয়ারেন্টি সময়কাল পণ্যের পৃষ্ঠায় প্রদর্শিত হবে। যদি একাধিক বিক্রেতা কর্তৃক কোনও পণ্য বিক্রি করা হয়, তবে প্রতিটি বিক্রেতা কর্তৃক প্রদত্ত ওয়ারেন্টি সময়কাল প্রদর্শিত হবে।
              </p>
              
              <h4>ওয়ারেন্টির প্রকারভেদ:</h4>
              
              <p>
                <strong>ব্র্যান্ড ওয়ারেন্টি:</strong> এই সীমিত ওয়ারেন্টি পণ্যগুলিতে প্রযোজ্য হবে। স্বাভাবিক ব্যবহারের পরিস্থিতিতে এবং কোম্পানির বিবেচনার ভিত্তিতে পণ্যের ত্রুটির জন্য, ব্র্যান্ড ব্র্যান্ড ওয়ারেন্টি নীতি অনুসারে ওয়ারেন্টি সময়কালের মধ্যে বিনামূল্যে মেরামত এবং/অথবা প্রতিস্থাপন পরিষেবা সরবরাহ করবে। বিক্রয়োত্তর পরিষেবাগুলির জন্য টিজারা কোনও দায় নেবে না।
              </p>
              
              <p>
                <strong>পরিষেবা ওয়ারেন্টি:</strong> টিজারা বণিকের কাছ থেকে পণ্য পরিষেবা করার জন্য দায়বদ্ধ নয়। ওয়ারেন্টি দাবি করার জন্য গ্রাহককে চালানপত্র সহ সরাসরি বিক্রেতার কাছে যেতে হবে। অনুগ্রহ করে মনে রাখবেন যে তাদের ওয়ারেন্টি নীতির অধীনে মেরামতের জন্য পণ্যের কোনও অংশ প্রতিস্থাপনের প্রয়োজন হলে, গ্রাহককে সেই অংশের জন্য অর্থ প্রদান করতে হবে।
              </p>
            </div>
          </section>

          <section className="section">
            <div className="section-content">
              <h3 className="section-title">পণ্য পরিষেবা নীতি</h3>
              <p>
                আপনি যদি এমন কোনও পণ্য কিনে থাকেন যা পরিষেবার জন্য যোগ্য, তবে অনুগ্রহ করে আপনার পণ্যের সাথে অন্তর্ভুক্ত ওয়ারেন্টি কার্ডে নির্দেশিত পরিষেবা কেন্দ্রে সরাসরি পণ্য(গুলি) পাঠান। যদি কোনও ওয়ারেন্টি কার্ড না থাকে, তবে আরও বিস্তারিত জানার জন্য ব্যবহারকারীর ম্যানুয়াল বা পণ্যের প্যাকেজিং পরীক্ষা করুন।
              </p>
              <p>
                দ্রুত ওয়ারেন্টি দাবির জন্য অনুগ্রহ করে প্যাকেজিংয়ে অন্তর্ভুক্ত সমস্ত আনুষাঙ্গিক, তথ্য এবং টিজারা থেকে ক্রয়ের প্রমাণ (ইনভয়েস) অন্তর্ভুক্ত করুন।
              </p>
              
              <h4>পরিষেবা কেন্দ্র</h4>
              
              <p>
                আপনার পণ্যের সাথে অন্তর্ভুক্ত ওয়ারেন্টি কার্ডে প্রস্তুতকারক (বা পরিষেবা কেন্দ্র) এর বিবরণ দেখুন অথবা টিজারা ডটকম-এ আপনার পণ্যের পৃষ্ঠায় যান এবং 'বিবরণ' ট্যাবে ওয়ারেন্টি/পরিষেবা কেন্দ্রের তথ্য সন্ধান করুন।
              </p>
              <p>
                যদি কোনও ওয়ারেন্টি কার্ড না থাকে, তবে আরও বিস্তারিত জানার জন্য ব্যবহারকারীর ম্যানুয়াল বা পণ্যের প্যাকেজিং পরীক্ষা করুন। যদি আপনার পণ্য ওয়ারেন্টি সময়কালের মধ্যে থাকে এবং যান্ত্রিক বা বৈদ্যুতিক সিস্টেমের কারণে ক্ষতিগ্রস্ত হয়, তবে আপনাকে মেরামতের খরচ নিয়ে চিন্তা করতে হবে না। আপনি কভার হবেন।
              </p>
            </div>
          </section>

          <section className="section">
            <div className="section-content">
              <h3 className="section-title">পরিশোধ ফেরত নীতি</h3>
              <p>
                যদি আপনার পণ্য ফেরতের জন্য যোগ্য হয়, তবে আপনি নীচের টেবিলের উপর ভিত্তি করে আপনার পছন্দের ফেরতের পদ্ধতিটি বেছে নিতে পারেন। আপনার ফেরত দেওয়া পণ্যের জন্য পরিশোধিত অর্থের সাথে শিপিং ফি ফেরত দেওয়া হবে, তবে পণ্য সঠিকভাবে প্রেরণ করা হলে এবং গ্রাহক ডেলিভারি প্রক্রিয়ার সময় প্রত্যাখ্যান করলে ইএমআই-এর উপর ব্যাংক চার্জ ব্যতীত।
              </p>
              <p>
                ফেরত প্রক্রিয়া সম্পন্ন করতে প্রয়োজনীয় সময় আপনার নির্বাচিত ফেরতের পদ্ধতির উপর নির্ভর করে। একবার আমরা আপনার পণ্য (৬ কার্যদিবস) পাওয়ার পরে এবং এটি গুণমান নিয়ন্ত্রণের (২ কার্যদিবস) মধ্য দিয়ে গেলে, প্রত্যাশিত ফেরত প্রক্রিয়াকরণের সময়গুলি নিম্নরূপ:
              </p>

              <div className="refund-table">
                <table style={{width: "100%"}}>
                  <thead>
                    <tr>
                      <th>পরিশোধের পদ্ধতি</th>
                      <th>ফেরতের বিকল্প</th>
                      <th>ফেরতের সময়</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>সমস্ত</td>
                      <td>ফেরত ভাউচার</td>
                      <td>৫-৭ কার্যদিবস</td>
                    </tr>
                    <tr>
                      <td>ক্যাশ অন ডেলিভারি (সিওডি)</td>
                      <td>ব্যাংক ডিপোজিট</td>
                      <td>৫-৭ কার্যদিবস</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="note">
                দ্রষ্টব্য: সর্বাধিক ফেরতের সময়সীমার মধ্যে সপ্তাহান্ত এবং সরকারি ছুটি অন্তর্ভুক্ত নয়।
              </p>
              <p className="important-note">
                গুরুত্বপূর্ণ দ্রষ্টব্য: ভাউচার ডিসকাউন্ট কোড শুধুমাত্র একবার ব্যবহার করা যাবে। অর্ডারের মূল্য ভাউচারের মূল্যের চেয়ে কম হলেও অবশিষ্ট অর্থ ফেরত দেওয়া হবে না বা পরবর্তী ক্রয়ের জন্য ব্যবহার করা যাবে না। টিজারা অর্ডার অনুযায়ী পণ্য সরবরাহ শুরু করলে ইএমআই-এর উপর ব্যাংক চার্জ কাটার অধিকার সংরক্ষণ করে।
              </p>
            </div>
          </section>


        </div>
        )}
      </div>
    </div>
  );
}