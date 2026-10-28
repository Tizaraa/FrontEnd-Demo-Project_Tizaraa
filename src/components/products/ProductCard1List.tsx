// "use client";

// import FlexBox from "@component/FlexBox";
// import Grid from "@component/grid/Grid";
// import Pagination from "@component/pagination";
// import { ProductCard1 } from "@component/product-cards";
// import { SemiSpan } from "@component/Typography";
// import Product from "@models/product.model";

// // ==========================================================
// // Define the props for the ProductGridView component
// type Props = {
//   products: Product[];
//   totalProducts: number; // Total number of products from API
//   currentPage: number; // Current page number
//   productsPerPage: number; // Number of products per page
//   onPageChange: (page: number) => void; // Handler for page change
// };
// // ==========================================================

// export default function ProductGridView({
//   products,
//   totalProducts,
//   currentPage,
//   productsPerPage,
//   onPageChange,
// }: Props) {
//   const startProduct = (currentPage - 1) * productsPerPage + 1;
//   const endProduct = Math.min(currentPage * productsPerPage, totalProducts);

//   return (
//     <div>
//       <Grid container spacing={6}>
//         {products.map((item) => (
//           <Grid item lg={4} sm={6} xs={12} key={item.id}>
//             <ProductCard1
//               id={item.id}
//               slug={item.slug}
//               price={item.price}
//               title={item.title}
//               off={item.discount}
//               images={item.images}
//               imgUrl={item.thumbnail}
//               rating={item.rating}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       <FlexBox flexWrap="wrap" justifyContent="space-between" alignItems="center" mt="32px">
//         <SemiSpan>
//           Showing {startProduct}-{endProduct} of {totalProducts} Products
//         </SemiSpan>
//         <Pagination
//           pageCount={Math.ceil(totalProducts / productsPerPage)}
//           onChange={onPageChange}
//           pageRangeDisplayed={3} // Adjust as needed
//           marginPagesDisplayed={2} // Adjust as needed
//         />
//       </FlexBox>

//     </div>
//   );
// }

// "use client";

// import FlexBox from "@component/FlexBox";
// import Grid from "@component/grid/Grid";
// import { ProductCard1 } from "@component/product-cards";
// import { SemiSpan } from "@component/Typography";
// import Product from "@models/product.model";
// import { Button } from "@component/buttons";

// // ==========================================================
// // Define the props for the ProductGridView component
// type Props = {
//   products: Product[];
//   totalProducts: number; // Total number of products from API
//   currentPage: number; // Current page number
//   productsPerPage: number; // Number of products per page
//   onPageChange: (page: number) => void; // Handler for page change
// };
// // ==========================================================

// export default function ProductGridView({
//   products,
//   totalProducts,
//   currentPage,
//   productsPerPage,
//   onPageChange,
// }: Props) {
//   //const startProduct = (currentPage - 1) * productsPerPage + 1;
//   const startProduct = (currentPage - 1) * productsPerPage + 1;
//   const endProduct = Math.min(currentPage * productsPerPage, totalProducts);

//   return (
//     <div>
//       <Grid container spacing={6}>
//         {products.map((item) => (
//           <Grid item lg={4} sm={6} xs={12} key={item.id}>
//             <ProductCard1
//               id={item?.id || ""}
//               slug={item?.slug || ""}
//               price={item?.price || 0}
//               title={item?.title || "No Title"}
//               off={item?.discount || 0}
//               images={item?.images || []}
//               imgUrl={item?.thumbnail || ""}
//               rating={item?.rating || 0}
//             />
//           </Grid>
//         ))}
//       </Grid>

//       <FlexBox justifyContent="center" alignItems="center" mt="32px">
//         {/* <SemiSpan>
//           Showing {startProduct}-{endProduct} of {totalProducts} Products
//         </SemiSpan> */}
//         {products.length > 0 && endProduct < totalProducts && endProduct > 0 && (
//           <Button
//             onClick={() => onPageChange(currentPage)}
//             variant="contained"
//             color="primary"
//           >
//             Show More
//           </Button>
//         )}
//       </FlexBox>
//     </div>
//   );
// }

// import FlexBox from "@component/FlexBox";
// import Grid from "@component/grid/Grid";
// import { ProductCard1 } from "@component/product-cards";
// import { SemiSpan } from "@component/Typography";
// import Product from "@models/product.model";
// import { Button } from "@component/buttons";
// import { log } from "util";
// import ApiBaseUrl from "api/ApiBaseUrl";

// type Props = {
//   products: Product[];
//   totalProducts: number; // Total number of products from API
//   currentPage: number; // Current page number
//   productsPerPage: number; // Number of products per page
//   onPageChange: (page: number) => void; // Handler for page change
// };

// export default function ProductGridView({
//   products,
//   totalProducts,
//   currentPage,
//   productsPerPage,
//   onPageChange,
// }: Props) {
//   const startProduct = (currentPage - 1) * productsPerPage + 1;
//   const endProduct = Math.min(currentPage * productsPerPage, totalProducts);
//   // console.log(currentPage);
//   // console.log(endProduct);
//   // console.log(totalProducts);
//   // console.log(products.length);

//   return (
//     <div>
//       <Grid container spacing={3}>
//         {products.length > 0 ? (
//           products.map((item) => (
//             <Grid item lg={4} sm={6} xs={6} key={item.id}>
//               <ProductCard1
//                 id={item?.id || ""}
//                 slug={item?.slug || ""}
//                 price={item?.price || 0}
//                 discountPrice={item?.discount_price || 0}
//                 productStock={item?.product_stock || 0}
//                 title={item?.title || "No Title"}
//                 off={item?.discount || 0}
//                 images={item?.images?.map(image => `${ApiBaseUrl.ImgUrl}${image}`) || []}
//                 imgUrl={item?.thumbnail ? (item.thumbnail.startsWith("http") ? item.thumbnail : `${ApiBaseUrl.ImgUrl}${item.thumbnail}`) : ""}
//                 rating={item?.rating || 0}
//               />
//             </Grid>
//           ))
//         ) : (
//           <FlexBox justifyContent="center" alignItems="center" width="100%">
//             <SemiSpan>No products found.</SemiSpan>
//           </FlexBox>
//         )}
//       </Grid>

//       {/* Show More button */}
//       {/* <FlexBox justifyContent="center" alignItems="center" mt="32px">
//         <Button
//           onClick={() => onPageChange(currentPage)} // Increment the page number for loading more products
//           variant="contained"
//           color="primary"
//           style={{
//             display: endProduct < totalProducts && products.length !== totalProducts ? 'block' : 'none', // Conditionally set display
//           }}
//         >
//           Show More
//         </Button>
//       </FlexBox> */}

//     </div>
//   );
// }

"use client";

import { ProductCard1 } from "@component/product-cards";
import { ListingEmpty, ListingGrid } from "@component/listing/Listing";
import Product from "@models/product.model";
import ApiBaseUrl from "api/ApiBaseUrl";

type Props = {
 products: Product[];
 totalProducts: number;
 currentPage: number;
 productsPerPage: number;
 onPageChange: (page: number) => void;
};

export default function ProductGridView({ products }: Props) {
 if (!products?.length) {
  return (
   <ListingEmpty
    title="No products found for this selection"
    message="Try adjusting your filters or explore other categories."
   />
  );
 }

 return (
  <ListingGrid>
   {products.map((item) => (
    <ProductCard1
     key={item.id}
     id={item?.id || ""}
     slug={item?.slug || ""}
     price={item?.original_price || item?.price || 0}
     discountPrice={item?.original_price && item.original_price !== item.price ? (item?.price || 0) : (item?.discount_price || 0)}
     productStock={item?.product_stock || 0}
     title={item?.title || "No Title"}
     off={item?.discount || 0}
     images={
      item?.images?.map((image) => `${ApiBaseUrl.ImgUrl}${image}`) || []
     }
     imgUrl={item?.thumbnail ? (item.thumbnail.startsWith("http") ? item.thumbnail : `${ApiBaseUrl.ImgUrl}${item.thumbnail}`) : ""}
     rating={item?.rating || 0}
    />
   ))}
  </ListingGrid>
 );
}
