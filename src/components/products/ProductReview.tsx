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

  // Retrieve token from localStorage/sessionStorage
  const token = sessionStorage.getItem("token"); // Replace with your token storage method
  const headers = {
    Authorization: `Bearer ${token}`, // Attach token as Authorization header
  };

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${ApiBaseUrl.baseUrl}product/comment/${productId}`,
          { headers }
        );
        setReviews(response.data.comments || []); // Assuming `comments` is the field in the response
        setLoading(false);
      } catch (error) {
        setError("Failed to load reviews");
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

  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    try {
      await axios.post(
        `${ApiBaseUrl.baseUrl}product/comment/${productId}`,
        values,
        { headers } // Attach headers with the token
      );
      setReviews([...reviews, values]); // Add the new review to the list
      resetForm(); // Reset the form after submission
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review");
    }
  };

  const {
    values,
    errors,
    touched,
    dirty,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleFormSubmit,
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
