import Head from 'next/head';
import '../about-tizaraa/about.css';

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>About Us | Tizaraa</title>
        <meta name="description" content="Learn about Tizaraa's story, mission, and what makes us your ideal online shopping destination" />
      </Head>
      
      <main className="container">
        {/* Hero Section */}
        <section className="hero">
          <h1 className="mainTitle">About Tizaraa</h1>
          <div className="section">
            <h2 className="sectionTitle">Our Story</h2>
            <p className="sectionText">
              Welcome to Tizaraa, your go-to destination for a seamless and diverse online shopping experience. 
              Founded in [Year], Tizaraa was born out of a passion for connecting buyers with quality products 
              from trusted sellers across the globe.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="section">
          <h2 className="sectionTitle">Mission & Vision</h2>
          <p className="sectionText">
            At Tizaraa, our mission is to provide a reliable and user-friendly platform that empowers both buyers and sellers. 
            We strive to create a vibrant online marketplace where everyone can discover unique products, 
            build lasting connections, and experience the joy of hassle-free transactions.
          </p>
        </section>

        {/* Trade License */}
        <section className="section">
          <h2 className="sectionTitle">Trade License</h2>
          <p className="sectionText">
            Tizaraa is a legally registered business with the appropriate trade licenses to operate in the e-commerce space. 
            Our Trade License Number is <strong>TRAD/DNCC/010245/2024</strong>. We are committed to complying with all local 
            regulations and standards to ensure a safe and reliable shopping experience.
          </p>
        </section>

        {/* What Sets Us Apart */}
        <section className="section">
          <h2 className="sectionTitle">What Sets Us Apart</h2>
          
          <div className="featureGrid">
            <div className="featureCard">
              <h3 className="featureTitle">Curated Selection</h3>
              <p>
                We take pride in curating a collection of products that align with our commitment to quality, 
                innovation, and style. Every item in our inventory is handpicked to ensure it meets our high standards.
              </p>
            </div>
            
            <div className="featureCard">
              <h3 className="featureTitle">Customer-Centric Approach</h3>
              <p>
                At Tizaraa, customers are at the heart of everything we do. Our dedicated customer support team 
                is always ready to assist you with any questions or needs.
              </p>
            </div>
            
            <div className="featureCard">
              <h3 className="featureTitle">Secure Shopping</h3>
              <p>
                We've invested in the latest technology to ensure your transactions are safe and your personal 
                information is protected.
              </p>
            </div>
            
            <div className="featureCard">
              <h3 className="featureTitle">Innovation and Technology</h3>
              <p>
                Tizaraa embraces the latest in e-commerce technology to provide a modern, efficient, 
                and reliable platform.
              </p>
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="section">
          <h2 className="sectionTitle">Our Commitment</h2>
          
          <div className="commitmentGrid">
            <div className="commitmentCard">
              <h3 className="featureTitle">Quality Assurance</h3>
              <p>
                Tizaraa is committed to ensuring the quality of products on our platform. 
                We work closely with sellers to maintain high standards.
              </p>
            </div>
            
            <div className="commitmentCard">
              <h3 className="featureTitle">Community Building</h3>
              <p>
                Beyond transactions, Tizaraa is a community. Join us in building connections and 
                sharing experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Information */}
        <section className="section">
          <h2 className="sectionTitle">Shipping Information</h2>
          <p className="sectionText">
            We are committed to delivering your orders in a timely manner. Here's our shipping policy:
          </p>
          <ul className="shippingList">
            <li>Inside Dhaka: Delivery within 3 business days</li>
            <li>Outside Dhaka: Delivery within 5 business days</li>
          </ul>
        </section>

        {/*  ============================================  */}



        {/* Hero Section - Bangla */}
<div className="section bangla-section">
  <h2 className="sectionTitle">আমাদের গল্প</h2>
  <p className="sectionText">
    তিজারা একটি অনলাইন মার্কেটপ্লেস, যেখানে ক্রেতা ও বিক্রেতারা নির্বিঘ্নে ও নিরাপদে কেনাকাটার অভিজ্ঞতা উপভোগ করতে পারেন। ২০২৫-এ যাত্রা শুরুর মাধ্যমে, আমরা এমন একটি প্ল্যাটফর্ম হিসেবে নিজেদের গড়ে তুলছি, যা বিশ্বস্ত বিক্রেতাদের মানসম্মত পণ্য ক্রেতাদের কাছে সরবরাহ করবে এবং একটু সুসম্পর্ক গড়ে তুলবে।
  </p>
</div>

{/* Mission Section - Bangla */}
<div className="section bangla-section">
  <h2 className="sectionTitle">মিশন ও ভিশন</h2>
  <p className="sectionText">
    আমাদের লক্ষ্য হলো একটি বিশ্বাসযোগ্য, সহজে ব্যবহারযোগ্য এবং প্রযুক্তিনির্ভর অনলাইন মার্কেটপ্লেস তৈরি করা, যেখানে ক্রেতা ও বিক্রেতা উভয়ই বিভিন্ন সুযোগ-সুবিধার পাশাপাশি অভিনব একটি শপিং অভিজ্ঞতা পাবেন।
  </p>
</div>

{/* Trade License - Bangla */}
<div className="section bangla-section">
  <h2 className="sectionTitle">ট্রেড লাইসেন্স ও বৈধতা</h2>
  <p className="sectionText">
    তিজারা একটি বৈধভাবে নিবন্ধিত ব্যবসা প্রতিষ্ঠান, যার ট্রেড লাইসেন্স নম্বর <strong>TRAD/DNCC/010245/2024</strong>। আমরা বাংলাদেশের প্রযোজ্য আইন ও ই-কমার্স নীতিমালা অনুযায়ী পরিচালিত হচ্ছি এবং গ্রাহকদের একটি সুরক্ষিত ও নির্ভরযোগ্য কেনাকাটার অভিজ্ঞতা প্রদানে প্রতিশ্রুতিবদ্ধ।
  </p>
</div>

{/* What Sets Us Apart - Bangla */}
<div className="section bangla-section">
  <h2 className="sectionTitle">আমাদের বৈশিষ্ট্য</h2>
  <div className="featureGrid">
    <div className="featureCard">
      <h3 className="featureTitle">মানসম্পন্ন পণ্যের সংগ্রহ</h3>
      <p>
        আমরা প্রতিটি যথাযথ বাছাই পদ্ধতি অনুসরণের মাধ্যমে আমাদের প্ল্যাটফর্মে যুক্ত করি। গুণমান, নান্দনিকতা ও কার্যকারিতার দিক বিবেচনা করেই আমরা আমাদের ইনভেন্টরি গড়ে তুলি, যেন ক্রেতারা সর্বোত্তম পণ্য গ্রহণ করতে পারেন।
      </p>
    </div>
    <div className="featureCard">
      <h3 className="featureTitle">গ্রাহক-কেন্দ্রিক সেবা</h3>
      <p>
        আমাদের সেবার কেন্দ্রে রয়েছে আমাদের সম্মানিত গ্রাহকরা। পণ্যের তথ্য, অর্ডার সংক্রান্ত সহযোগিতা কিংবা পরামর্শ - আমাদের অভিজ্ঞ কাস্টমার সাপোর্ট টিম সবসময় প্রস্তুত থাকছে সহায়তার জন্য।
      </p>
    </div>
    <div className="featureCard">
      <h3 className="featureTitle">নিরাপদ এবং সুবিধাজনক কেনাকাটা</h3>
      <p>
        তিজারা সেরা নিরাপত্তা প্রযুক্তি ব্যবহার করে ক্রেতাদের ব্যাক্তিগত ও লেনদেন সংক্রান্ত তথ্য সুরক্ষিত রাখে। আপনার ব্যক্তিগত গোপনীয়তা এবং লেনদেনের নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার।
      </p>
    </div>
    <div className="featureCard">
      <h3 className="featureTitle">উদ্ভাবন ও প্রযুক্তির সমন্বয়</h3>
      <p>
        আমরা সর্বদা চেষ্টা করি আধুনিক প্রযুক্তির সঙ্গে তাল মিলিয়ে একটি উন্নত, সহজ ও দক্ষ অনলাইন শপিং প্ল্যাটফর্ম গড়ে তুলতে। আমাদের ওয়েবসাইট ও অ্যাপের ব্যবহারযোগ্যতা নিয়মিত উন্নত করা হয়, যেন আপনার অভিজ্ঞতা সর্বোচ্চ মানের হয়।
      </p>
    </div>
  </div>
</div>

{/* Our Commitment - Bangla */}
<div className="section bangla-section">
  <h2 className="sectionTitle">আমাদের প্রতিশ্রুতি</h2>
  <div className="commitmentGrid">
    <div className="commitmentCard">
      <h3 className="featureTitle">গুণগত মানে আপোষ নয়</h3>
      <p>
        আমরা আমাদের প্ল্যাটফর্মে পণ্যের গুণগত মান বজায় রাখার জন্য সর্বোচ্চ গুরুত্ব দিয়ে থাকি। এজন্য আমরা নিয়মিতভাবে আমাদের বিক্রেতা ও পণ্য যাচাই করি।
      </p>
    </div>
    <div className="commitmentCard">
      <h3 className="featureTitle">একটি সংযুক্ত কমিউনিটি</h3>
      <p>
        তিজারা শুধু একটি কেনাকাটার জায়গা নয় - এটি একটি অনলাইন কমিউনিটি। যেখানে বিক্রেতা ও ক্রেতা পরস্পরের সঙ্গে সংযোগ স্থাপন করে, অভিজ্ঞতা ভাগ করে নেয় এবং একসঙ্গে একটি নির্ভরযোগ্য ই-কমার্স পরিবেশ গড়ে তোলে।
      </p>
    </div>
  </div>
</div>

{/* Shipping Information - Bangla */}
<div className="section bangla-section">
  <h2 className="sectionTitle">শিপিং সংক্রান্ত তথ্য</h2>
  <p className="sectionText">
    আমরা সময়মত আপনার অর্ডার সরবরাহ করতে প্রতিশ্রুতিবদ্ধ। আমাদের শিপিং নীতি এখানে দেওয়া হল:
  </p>
  <ul className="shippingList">
    <li>ঢাকার ভিতরে: ৩ কার্যদিবসের মধ্যে ডেলিভারি</li>
    <li>ঢাকার বাইরে: ৫ কার্যদিবসের মধ্যে ডেলিভারি</li>
  </ul>
  <p className="sectionText" style={{marginTop: '1rem'}}>
    আপনার অনলাইন কেনাকাটাকে আরও সহজ, নিরাপদ ও আনন্দদায়ক করে তুলতে তিজারা আপনার পাশে রয়েছে সবসময়।
  </p>
</div>
      </main>
    </>
  );
}