"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DOMPurify from 'dompurify';
import ProductIntro from "@component/products/ProductIntro";
import ProductView from "@component/products/ProductView";
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
  CurrencySign:string;
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
        const response = await fetch(`https://tizaraa.com/api/otpi/get-item-full-info/${id}`, {
          method: "GET", // Use GET method
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }

        const data = await response.json();
        
        if (data && data.Result && data.Result.Item) {
          setProduct(data.Result.Item); // Set the product data

          // Check if RelatedGroups exists and has at least one group with items
          if (data.Result.Item.RelatedGroups && data.Result.Item.RelatedGroups.length > 0) {
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
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Product not found.</div>;
  }


  const sanitizedDescription = DOMPurify.sanitize(product.Description);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        {/* Replace this section with ProductIntro */}
        <OTProductsIntro
          images={product.Pictures.map(p => p.Url)} 
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


       {/* product description  */}
       <div className="mt-4 text-black">
          <h2 className="text-xl font-semibold">Description:</h2>
          <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div> 

 

        {/* Related Products Section */}
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50">
          {relatedProducts.length > 0 ? (
            <div className="w-full max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
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
                        {relatedProduct.Price.OriginalPrice} {relatedProduct.Price.OriginalCurrencyCode}
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
