// import * as yup from "yup";
// import { useFormik } from "formik";

// import Box from "@component/Box";
// import Rating from "@component/rating";
// import FlexBox from "@component/FlexBox";
// import TextArea from "@component/textarea";
// import { Button } from "@component/buttons";
// import { H2, H5 } from "@component/Typography";
// import ProductComment from "./ProductComment";

// export default function ProductReview() {
//   const initialValues = {
//     rating: "",
//     comment: "",
//     date: new Date().toISOString()
//   };

//   const validationSchema = yup.object().shape({
//     rating: yup.number().required("required"),
//     comment: yup.string().required("required")
//   });

//   const handleFormSubmit = async (values: any, { resetForm }: any) => {
//     console.log(values);
//     resetForm();
//   };

//   const {
//     values,
//     errors,
//     touched,
//     dirty,
//     isValid,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//     setFieldValue
//   } = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit: handleFormSubmit
//   });

//   return (
//     <div>
//       {commentList.map((item, ind) => (
//         <ProductComment {...item} key={ind} />
//       ))}

//       <H2 fontWeight="600" mt="55px" mb="20">
//         Write a Review for this product
//       </H2>

//       <form onSubmit={handleSubmit}>
//         <Box mb="20px">
//           <FlexBox mb="12px">
//             <H5 color="gray.700" mr="6px">
//               Your Rating
//             </H5>
//             <H5 color="error.main">*</H5>
//           </FlexBox>

//           <Rating
//             outof={5}
//             color="warn"
//             size="medium"
//             readOnly={false}
//             value={parseInt(values.rating) || 0}
//             onChange={(value) => setFieldValue("rating", value)}
//           />
//         </Box>

//         <Box mb="24px">
//           <FlexBox mb="12px">
//             <H5 color="gray.700" mr="6px">
//               Your Review
//             </H5>
//             <H5 color="error.main">*</H5>
//           </FlexBox>

//           <TextArea
//             fullwidth
//             rows={8}
//             name="comment"
//             onBlur={handleBlur}
//             onChange={handleChange}
//             value={values.comment || ""}
//             placeholder="Write a review here..."
//             errorText={touched.comment && errors.comment}
//           />
//         </Box>

//         <Button
//           size="small"
//           type="submit"
//           color="primary"
//           variant="contained"
//           disabled={!(dirty && isValid)}>
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// }

// const commentList = [
//   {
//     name: "Jannie Schumm",
//     imgUrl: "/assets/images/faces/7.png",
//     rating: 4.7,
//     date: "2021-02-14",
//     comment:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account."
//   },
//   {
//     name: "Joe Kenan",
//     imgUrl: "/assets/images/faces/6.png",
//     rating: 4.7,
//     date: "2019-08-10",
//     comment:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account."
//   },
//   {
//     name: "Jenifer Tulio",
//     imgUrl: "/assets/images/faces/8.png",
//     rating: 4.7,
//     date: "2021-02-05",
//     comment:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account."
//   }
// ];





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

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${ApiBaseUrl.baseUrl}product/comment/${productId}`);
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
      await axios.post(`${ApiBaseUrl.baseUrl}product/comment/${productId}`, values); // Submit the review to the API
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

      <H2 fontWeight="600" mt="55px" mb="20">
        Write a Review for this product
      </H2>

      <form onSubmit={handleSubmit}>
        <Box mb="20px">
          <FlexBox mb="12px">
            <H5 color="gray.700" mr="6px">
              Your Rating
            </H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <Rating
            outof={5}
            color="warn"
            size="medium"
            readOnly={false}
            value={parseInt(values.rating) || 0}
            onChange={(value) => setFieldValue("rating", value)}
          />
          {/* {touched.rating && errors.rating && <div style={{ color: "red" }}>{errors.rating}</div>} */}
          {touched.rating && errors.rating && (
  <div style={{ color: "red" }}>
    {typeof errors.rating === 'string' 
      ? errors.rating 
      : Array.isArray(errors.rating) 
      ? errors.rating.join(", ") 
      : typeof errors.rating === 'object' && errors.rating 
      ? Object.values(errors.rating).join(", ") 
      : "Error occurred"}
  </div>
)}

        </Box>

        <Box mb="24px">
          <FlexBox mb="12px">
            <H5 color="gray.700" mr="6px">
              Your Review
            </H5>
            <H5 color="error.main">*</H5>
          </FlexBox>

          <TextArea
            fullwidth
            rows={8}
            name="comment"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.comment || ""}
            placeholder="Write a review here..."
            errorText={touched.comment && errors.comment}
          />
        </Box>

        <Button
          size="small"
          type="submit"
          color="primary"
          variant="contained"
          disabled={!(dirty && isValid)}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
