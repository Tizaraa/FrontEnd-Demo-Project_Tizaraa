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
import ReviewCard from "@component/product-cards/review-card";

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


  return (
    <div>
      <ReviewCard productId={productId} />
    </div>
  );
}
