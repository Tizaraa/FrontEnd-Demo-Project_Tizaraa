import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@component/Box";
import Rating from "@component/rating";
import FlexBox from "@component/FlexBox";
import TextArea from "@component/textarea";
import { Button } from "@component/buttons";
import { H2, H5 } from "@component/Typography";
import ProductComment from "./ProductComment";
import * as yup from "yup";
import { useFormik } from "formik";
import ApiBaseUrl from "api/ApiBaseUrl";

export default function ProductReview({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Retrieve token from sessionStorage
  const token = sessionStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`, // Attach token as Authorization header
  };

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${ApiBaseUrl.baseUrl}order/product/review`,
          {
            params: { productId }, // Send the productId as a query parameter
            headers, // Pass the headers with the token
          }
        );
        setReviews(response.data); // Set the reviews from the response
        setLoading(false);
      } catch (err) {
        setError("Failed to load reviews. Please try again later.");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  // Formik setup for the review form
  const initialValues = {
    rating: "",
    comment: "",
    date: new Date().toISOString(),
  };

  const validationSchema = yup.object().shape({
    rating: yup.number().required("Rating is required"),
    comment: yup.string().required("Review is required"),
  });

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* Display reviews */}
      {reviews.length > 0 ? (
        reviews.map((review: any, index: number) => (
          <ProductComment {...review} key={index} />
        ))
      ) : (
        <div>No reviews yet.</div>
      )}
    </div>
  );
}
