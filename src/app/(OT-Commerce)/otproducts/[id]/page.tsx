"use client";
import React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import ProductIntro from "@component/products/ProductIntro";
import OTProductsIntro from "@component/products/OTproductsIntro";
//import Component from "./responsive";
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import Link from "next/link";
import Box from "@component/Box";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import { H4 } from "@component/Typography";
import Rating from "@component/rating";
import { currency } from "@utils/utils";
import { Chip } from "@component/Chip";

import styles from "../../../../components/products/RelatedProductsStyle.module.css";
import ApiBaseUrl from 'api/ApiBaseUrl';



// Interfaces for the models
interface PictureSize {
  Url: string;
  Width?: number;
  Height?: number;
}

interface Picture {
  Url: string;
  Small: PictureSize;
  Medium: PictureSize;
  Large: PictureSize;
  IsMain: boolean;
}

export interface Location {
  City: string;
  State: string;
}

export interface Price {
  OriginalPrice: number;
  OriginalCurrencyCode: string;
  ConvertedPriceWithoutSign: string;
  CurrencySign: string;
}

export interface Product {
  Id: string;
  Title: string;
  OriginalTitle: string;
  MainPictureUrl: string;
  Pictures: Picture[];
  Price: Price;
  VendorDisplayName: string;
  MasterQuantity: number;
  VendorName: string;
  Location: Location;
  ExternalItemUrl: string;
  Description: string;
  ConfiguredItems?: ConfiguredItem[]; 
  Attributes?: Attribute[];
}


interface Attribute {
  ImageUrl: string;
  IsConfigurator: boolean;
  MiniImageUrl: string;
  OriginalPropertyName: string;
  OriginalValue: string;
  Pid: string;
  PropertyName: string;
  Value: string;
  Vid: string;
}

type ConfiguredItem = {
  Id: string;
  Price: {
    ConvertedPriceWithoutSign: number; // This should be a number
    CurrencySign: string;
  };
  Quantity: number;
  SalesCount: number;
  Configurators: {
    Vid: string;
  }[];
  QuantityRanges: {
    MinQuantity: number;
    MaxQuantity: number;
    Price: {
      OriginalPrice: number;
      MarginPrice: number;
      ConvertedPrice: string;
      ConvertedPriceWithoutSign: string;
    };
  }[];
};


export interface RelatedProduct {
  Id: string;
  Image: Picture;
  Name: string;
  OriginalTitle: string;
  Price: Price;
  Title: string;
}

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [pricingTiers, setPricingTiers] = useState([]);

   // Inline style for images
   const imageStyle = {
    maxWidth: '100%', // Make images responsive
    height: 'auto',   // Maintain aspect ratio
  };

  // Inline style for tables
  const tableStyle = {
    width: '100%',      // Table should take full width
    borderCollapse: 'collapse', 
  };

  const tdStyle = {
    padding: '8px', 
    border: '1px solid #ddd',
  };

  const [displayCount, setDisplayCount] = useState(10);

  // Function to load more products
  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 10); 
  };

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobileOrTablet = windowWidth < 1024;

  const containerStyle: React.CSSProperties = {
    display: isMobileOrTablet ? 'block' : 'flex',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  };

  const descriptionStyle: React.CSSProperties = {
    flex: isMobileOrTablet ? 'none' : '2',
    marginBottom: isMobileOrTablet ? '20px' : '0',
  };

  const bengaliTextStyle: React.CSSProperties = {
    flex: isMobileOrTablet ? 'none' : '1',
    backgroundColor: '#f3f4f6',
    border: '2px solid #e94560',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'center',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 600,
    borderBottom: '2px solid #e94560',
    paddingBottom: '4px',
    marginBottom: '10px',
  };

  const paragraphStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    color: '#4b5563',
    marginBottom: '30px',
  };

  const categoryStyle: React.CSSProperties = {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#e94560',
    marginBottom: '5px',
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch and render product attributes
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return;
  
      try {
        const response = await fetch(
          `${ApiBaseUrl.baseUrl}otpi/get-item-full-info/${id}`,
          { method: "GET" }
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
  
        const data = await response.json();
        console.log("details:", data);
  
        if (data && data.Result && data.Result.Item) {
          setProduct(data.Result.Item);
        
          // Extract pricing tiers from the QuantityRanges array
          const pricingTiers = data.Result.Item.QuantityRanges?.map((range) => ({
            MinQuantity: range.MinQuantity, // Extract MinQuantity
            Price: {
              ConvertedPriceWithoutSign: range.Price.ConvertedPrice.replace(/[^0-9.]/g, ""), // Extract numeric value from "199.50৳"
              CurrencySign: range.Price.ConvertedPrice.replace(/[0-9.]/g, ""), // Extract currency sign from "199.50৳"
            },
          })) || []; // Fallback to an empty array if QuantityRanges is missing
        
          // Set pricing tiers in the state
          setPricingTiers(pricingTiers);
        
          // Handle Related Products
          if (
            data.Result.Item.RelatedGroups &&
            data.Result.Item.RelatedGroups.length > 0
          ) {
            setRelatedProducts(data.Result.Item.RelatedGroups[0].Items);
          } else {
            setRelatedProducts([]);
          }
        } else {
          throw new Error("Product not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProductData();
  }, [id]);

// Rendering Attributes
const renderAttributes = (attributes: Attribute[]) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {attributes.map((attribute) => (
        <div key={attribute.Pid} style={{ marginBottom: '10px' }}>
          <h4 style={{ fontWeight: '600' }}>{attribute.PropertyName}:</h4>
          <p>{attribute.Value}</p>
          <img
            src={attribute.ImageUrl}
            alt={attribute.Value}
            style={{ maxWidth: '100px', height: 'auto', marginRight: '10px' }}
          />
        </div>
      ))}
    </div>
  );
};
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Product not found.
      </div>
    );
  }

  const sanitizedDescription = DOMPurify.sanitize(product.Description);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        {/* Replace this section with ProductIntro */}
        <OTProductsIntro
  images={product.Pictures.map((p) => p.Url)}
  title={product.Title}
  price={parseFloat(product.Price.ConvertedPriceWithoutSign)}
  id={product.Id}
  sellerShopName={product.VendorDisplayName}
  rating={4} // Replace with actual rating if available
  discountPrice={0} // Replace with actual discount if available
  totalDiscount={0} // Replace with actual discount if available
  slug={""}
  productStock={product.MasterQuantity}  // Replace with actual stock if available
  productId={""}
  sellerId={""}
  configuredItems={product?.ConfiguredItems || []}
  Attributes={product.Attributes || []}
  pricingTiers={pricingTiers}

/>

       {/* <Component /> */}
       <div style={containerStyle}>
      <div style={descriptionStyle}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '10px' }}>Description:</h2>
        {/* <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} /> */}
        <div
            className="product-description-content"
            dangerouslySetInnerHTML={{
                __html: sanitizedDescription
                    .replace(/<img /g, `<img style="max-width: 100%; height: auto;" `)
                    .replace(/<table /g, `<table style="width: 100%; border-collapse: collapse;">`)
                    .replace(/<td /g, `<td style="padding: 8px; border: 1px solid #ddd;">`)
                    .replace(/<th /g, `<th style="padding: 8px; border: 1px solid #ddd;">`)
            }}
        />
      </div>

      <div style={bengaliTextStyle}>
        <h2 style={headingStyle}>শর্ত সমুহ:</h2>
        <p style={paragraphStyle}>
          সর্বনিম্ন ১০০০ টাকার পণ্য অর্ডার করতে হবে। অর্ডার প্লেসের পরে আপনার সাপ্লায়ার থেকে আমাদের চায়না ওয়্যারহাউস পর্যন্ত প্রডাক্ট পৌছানোর ডেলিভারির চার্জ (চায়না লোকাল ডেলিভারি চার্জ) ধার্য হবে। উল্লেখিত পণ্যের ওজন সম্পূর্ণ সঠিক নয়, আনুমানিক মাত্র। বাংলাদেশে আসার পর পণ্যটির প্রকৃত ওজন মেপে শিপিং চার্জ হিসাব করা হবে। পণ্যের ক্যাটাগরির উপর নির্ভর করে শিপিং চার্জ নির্ধারণ করা হবে প্রতি কেজি ৭৪০/৯৩০ টাকা।
        </p>

        <h2 style={headingStyle}>শিপিং চার্জ:</h2>

        <h1 style={categoryStyle}>ক্যাটাগরিঃ এ</h1>
        <h2 style={{ marginBottom: '5px' }}>৭৪০ টাকা প্রতি কেজি</h2>
        <p style={paragraphStyle}>
          জুতা, ব্যাগ, জুয়েলারি, যন্ত্রপাতি, স্টিকার, কম্পিউটার এক্সেসরিজ, সিরামিক, ধাতব, চামড়া, রাবার, প্লাস্টিক জাতীয় পণ্য, কসমেটিক্স এক্সেসরিজ, ব্যাটারি ব্যতীত খেলনা / ইলেকট্রনিক্স পণ্য।
        </p>

        <h1 style={categoryStyle}>ক্যাটাগরিঃ বি</h1>
        <h2 style={{ marginBottom: '5px' }}>৯৩০ টাকা প্রতি কেজি</h2>
        <p style={paragraphStyle}>
          ব্যাটারি জাতীয় যেকোন পণ্য, ডুপ্লিকেট ব্রান্ড বা কপি পণ্য, বীজ, রাসায়নিক দ্রব্য, নেটওয়ার্কিং আইটেম, ম্যাগনেট বা লেজার জাতীয় পণ্য।
        </p>

        <h1 style={categoryStyle}>ক্যাটাগরিঃ সি</h1>
        <p style={{ ...paragraphStyle, marginBottom: '0' }}>
          *পোশাক /গার্মেন্টস/হিজাব/ওড়না - ৮৪০ টাকা * শুধু ব্যাটারি/পাওয়ার ব্যাংক – ১২৫০ টাকা * সানগ্লাস - ৩৩০০ টাকা * ট্রিমার – ১৫০০ টাকা * কসমেটিক্স – ১০৮০ টাকা * স্মার্ট ওয়াচ - ১১০০ টাকা * সাধারন ঘড়ি - ১০০০ টাকা * ব্লুটুথ হেডফোন - ১০৫০ টাকা * তরল বা লিকুইড পণ্য - ১০০০ টাকা *পারফিউম -১২৫০ টাকা * খাদ্য - ১২৫০ টাকা * পাউডার - ১০৫০ টাকা * জীবন্ত উদ্ভিদ - ১২৫০ টাকা * শিট মাক্স- ১২৫০ টাকা * সিরাম- ১২৫০ টাকা
        </p>
      </div>
    </div>

        {/* Related Products Section */}
        
        {relatedProducts.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Related Products
          </h2>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'flex-start',
            }}
          >
            {relatedProducts.slice(0, displayCount).map((relatedProduct) => (
              <Box
                key={relatedProduct.Id}
                className={styles.productCard} // Use the flexbox-based card layout
                height="350px"
              >
                <Card p="1rem" borderRadius={8} display="flex" flexDirection="column" height="100%">
                  <Link href={`/otproducts/${relatedProduct.Id}`}>
                    <Box position="relative">
                      <img
                        src={relatedProduct.Image.Url}
                        alt={relatedProduct.Name}
                        style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
                      />
                    </Box>
                    <H4
                      fontWeight="600"
                      fontSize="18px"
                      mb="0.25rem"
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {relatedProduct.Title}
                    </H4>
                  </Link>
                  <p className="text-sm mb-2"> 
                  <span style={{ color: '#e74c3c', fontWeight: '500' }}> 
  BDT {parseFloat(relatedProduct.Price.ConvertedPriceWithoutSign)}
</span>

</p>

                </Card>
              </Box>
            ))}
          </div>

          {displayCount < relatedProducts.length && (
              <Box mt="1rem" textAlign="center">
              <button 
                onClick={handleShowMore} 
                style={{ 
                  padding: '10px 20px', 
                  fontSize: '16px', 
                  cursor: 'pointer',
                  backgroundColor: '#e94560',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: 'bold',
                  outline: 'none'
                }}
              >
                Show More
              </button>
            </Box>
          )}
        </div>
      ) : (
        <p className="text-gray-600">No related products found.</p>
      )}
    </div>
    </div>
  );
};

export default ProductPage;