// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import DOMPurify from 'dompurify';
// import ProductIntro from "@component/products/ProductIntro";
// import ProductView from "@component/products/ProductView";
// import OTProductsIntro from "@component/products/OTproductsIntro";
// // const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// // Interfaces for the models
// interface PictureSize {
//   Url: string;
//   Width?: number;
//   Height?: number;
// }

// interface Picture {
//   Url: string;
//   Small: PictureSize;
//   Medium: PictureSize;
//   Large: PictureSize;
//   IsMain: boolean;
// }

// export interface Location {
//   City: string;
//   State: string;
// }

// export interface Price {
//   OriginalPrice: number;
//   OriginalCurrencyCode: string;
//   ConvertedPriceWithoutSign: string;
//   CurrencySign:string;
// }

// export interface Product {
//   Id: string;
//   Title: string;
//   OriginalTitle: string;
//   MainPictureUrl: string;
//   Pictures: Picture[];
//   Price: Price;
//   VendorDisplayName: string;
//   VendorName: string;
//   Location: Location;
//   ExternalItemUrl: string;
//   Description: string;
// }

// export interface RelatedProduct {
//   Id: string;
//   Image: Picture;
//   Name: string;
//   OriginalTitle: string;
//   Price: Price;
//   Title: string;
// }

// const ProductPage = () => {
//   const { id } = useParams(); // Get the product ID from the URL
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);

//   // Fetch the product data
//   useEffect(() => {
//     const fetchProductData = async () => {
//       if (!id) return; // Wait for the ID to be available

//       try {
//         const response = await fetch(`https://tizaraa.com/api/otpi/get-item-full-info/${id}`, {
//           method: "GET", // Use GET method
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch product data");
//         }

//         const data = await response.json();

//         if (data && data.Result && data.Result.Item) {
//           setProduct(data.Result.Item); // Set the product data

//           // Check if RelatedGroups exists and has at least one group with items
//           if (data.Result.Item.RelatedGroups && data.Result.Item.RelatedGroups.length > 0) {
//             setRelatedProducts(data.Result.Item.RelatedGroups[0].Items); // Set related products
//           } else {
//             setRelatedProducts([]); // If no related products, set an empty array
//           }
//         } else {
//           throw new Error("Product not found");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProductData();
//   }, [id]);

//   if (loading) {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;
//   }

//   if (!product) {
//     return <div className="flex items-center justify-center min-h-screen">Product not found.</div>;
//   }

//   const sanitizedDescription = DOMPurify.sanitize(product.Description);

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-8">
//       <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
//         {/* Replace this section with ProductIntro */}
//         <OTProductsIntro
//           images={product.Pictures.map(p => p.Url)}
//           title={product.Title}
//           price={parseFloat(product.Price.ConvertedPriceWithoutSign)}
//           id={""}
//           sellerShopName={product.VendorDisplayName}
//           rating={4} // Pass the actual rating here
//           discountPrice={0}
//           totalDiscount={0}
//           slug={""}
//           productStock={10}
//           productId={""}
//           sellerId={""}
//         />

//        {/* product description  */}
//        <div className="mt-4 text-black">
//           <h2 className="text-xl font-semibold">Description:</h2>
//           <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
//         </div>

//         {/* Related Products Section */}
//         <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
//           {relatedProducts.length > 0 ? (
//             <div className="w-full max-w-5xl mx-auto">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {relatedProducts.map((relatedProduct) => (
//                   <div
//                     key={relatedProduct.Id}
//                     className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
//                   >
//                     <img
//                       src={relatedProduct.Image.Url}
//                       alt={relatedProduct.Name}
//                       className="w-full h-48 object-cover mb-4 rounded-lg"
//                     />
//                     <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
//                       {relatedProduct.Title}
//                     </h3>
//                     <p className="text-sm text-gray-600 mb-2">
//                       Price:{" "}
//                       <span className="font-medium text-gray-900">
//                         {relatedProduct.Price.OriginalPrice} {relatedProduct.Price.OriginalCurrencyCode}
//                       </span>
//                     </p>
//                     {/* View Product Button */}
//                     <a
//                       href={`/product/${relatedProduct.Id}`} // Assuming you have a route to view individual products
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block mt-4 text-center text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 py-2 px-4 rounded-md text-sm"
//                     >
//                       View Product
//                     </a>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="text-gray-600">No related products found.</p>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProductPage;

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DOMPurify from "dompurify";
import ProductIntro from "@component/products/ProductIntro";
import OTProductsIntro from "@component/products/OTproductsIntro";
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
  VendorName: string;
  Location: Location;
  ExternalItemUrl: string;
  Description: string;
}

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

  // Fetch the product data
  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return; // Wait for the ID to be available

      try {
        const response = await fetch(
          `https://tizaraa.com/api/otpi/get-item-full-info/${id}`,
          {
            method: "GET", // Use GET method
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();

        if (data && data.Result && data.Result.Item) {
          setProduct(data.Result.Item); // Set the product data

          // Check if RelatedGroups exists and has at least one group with items
          if (
            data.Result.Item.RelatedGroups &&
            data.Result.Item.RelatedGroups.length > 0
          ) {
            setRelatedProducts(data.Result.Item.RelatedGroups[0].Items); // Set related products
          } else {
            setRelatedProducts([]); // If no related products, set an empty array
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
          id={""}
          sellerShopName={product.VendorDisplayName}
          rating={4} // Pass the actual rating here
          discountPrice={0}
          totalDiscount={0}
          slug={""}
          productStock={10}
          productId={""}
          sellerId={""}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          {/* Product description on the left */}
          <div className="lg:w-2/3 lg:pr-8">
            <h2 className="text-xl font-semibold">Description:</h2>
            <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          </div>

          {/* Static text on the right */}
          <div
            className="lg:w-1/3 lg:pl-8 bg-gray-100 p-4 rounded-lg"
            style={{
              border: "2px solid #ff6e33",
              textAlign: "center",
              padding: "5px",
              borderRadius: "15px"
            }}
          >
            <h2
              className="text-xl font-semibold"
              style={{
                borderBottom: "2px solid #ff6e33",
                paddingBottom: "4px",
              }}
            >
              শর্ত সমুহ:
            </h2>
            <p
              className="text-sm text-gray-700"
              style={{ paddingBottom: "30px" }}
            >
              সর্বনিম্ন ১০০০ টাকার পণ্য অর্ডার করতে হবে। অর্ডার প্লেসের পরে
              আপনার সাপ্লায়ার থেকে আমাদের চায়না ওয়্যারহাউস পর্যন্ত প্রডাক্ট
              পৌছানোর ডেলিভারির চার্জ (চায়না লোকাল ডেলিভারি চার্জ) ধার্য হবে।
              উল্লেখিত পণ্যের ওজন সম্পূর্ণ সঠিক নয়, আনুমানিক মাত্র। বাংলাদেশে
              আসার পর পণ্যটির প্রকৃত ওজন মেপে শিপিং চার্জ হিসাব করা হবে। পণ্যের
              ক্যাটাগরির উপর নির্ভর করে শিপিং চার্জ নির্ধারণ করা হবে প্রতি কেজি
              ৭৪০/৯৩০ টাকা।
            </p>
            <h2
              className="text-xl font-semibold"
              style={{
                borderBottom: "2px solid #ff6e33",
                paddingBottom: "4px",
              }}
            >
              শিপিং চার্জ:
            </h2>
            <h1
              className="text-xl font-bold"
              style={{ color: "#ff6e33", fontSize: "20px" }}
            >
              ক্যাটাগরিঃ এ
            </h1>
            <h2 className="">৭৪০ টাকা প্রতি কেজি</h2>
            <p className="text-sm text-gray-700" style={{ paddingBottom: "30px" }}>
              জুতা, ব্যাগ, জুয়েলারি, যন্ত্রপাতি, স্টিকার, কম্পিউটার এক্সেসরিজ,
              সিরামিক, ধাতব, চামড়া, রাবার, প্লাস্টিক জাতীয় পণ্য, কসমেটিক্স
              এক্সেসরিজ, ব্যাটারি ব্যতীত খেলনা / ইলেকট্রনিক্স পণ্য।
            </p>
            <h1
              className="text-xl font-bold"
              style={{ color: "#ff6e33", fontSize: "20px" }}
            >
              ক্যাটাগরিঃ বি
            </h1>
            <h2 className="">৯৩০ টাকা প্রতি কেজি</h2>
            <p className="text-sm text-gray-700" style={{ paddingBottom: "30px" }}>
              ব্যাটারি জাতীয় যেকোন পণ্য, ডুপ্লিকেট ব্রান্ড বা কপি পণ্য, বীজ,
              রাসায়নিক দ্রব্য, নেটওয়ার্কিং আইটেম, ম্যাগনেট বা লেজার জাতীয় পণ্য।
            </p>
            <h1
              className="text-xl font-bold"
              style={{ color: "#ff6e33", fontSize: "20px" }}
            >
              ক্যাটাগরিঃ সি
            </h1>
            <p className="text-sm text-gray-700">
              *পোশাক /গার্মেন্টস/হিজাব/ওড়না - ৮৪০ টাকা * শুধু ব্যাটারি/পাওয়ার
              ব্যাংক – ১২৫০ টাকা * সানগ্লাস - ৩৩০০ টাকা * ট্রিমার – ১৫০০ টাকা *
              কসমেটিক্স – ১০৮০ টাকা * স্মার্ট ওয়াচ - ১১০০ টাকা * সাধারন ঘড়ি -
              ১০০০ টাকা * ব্লুটুথ হেডফোন - ১০৫০ টাকা * তরল বা লিকুইড পণ্য - ১০০০
              টাকা *পারফিউম -১২৫০ টাকা * খাদ্য - ১২৫০ টাকা * পাউডার - ১০৫০ টাকা
              * জীবন্ত উদ্ভিদ - ১২৫০ টাকা * শিট মাক্স- ১২৫০ টাকা * সিরাম- ১২৫০
              টাকা
            </p>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
          {relatedProducts.length > 0 ? (
            <div className="w-full max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Related Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct) => (
                  <div
                    key={relatedProduct.Id}
                    className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out"
                  >
                    <img
                      src={relatedProduct.Image.Url}
                      alt={relatedProduct.Name}
                      className="w-full h-48 object-cover mb-4 rounded-lg"
                    />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                      {relatedProduct.Title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Price:{" "}
                      <span className="font-medium text-gray-900">
                        {relatedProduct.Price.OriginalPrice}{" "}
                        {relatedProduct.Price.OriginalCurrencyCode}
                      </span>
                    </p>
                    {/* View Product Button */}
                    <a
                      href={`/product/${relatedProduct.Id}`} // Assuming you have a route to view individual products
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-4 text-center text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 py-2 px-4 rounded-md text-sm"
                    >
                      View Product
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No related products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
