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



"use client";

import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import { ProductCard1 } from "@component/product-cards";
import { SemiSpan } from "@component/Typography";
import Product from "@models/product.model";
import { Button } from "@component/buttons";

// ==========================================================
// Define the props for the ProductGridView component
type Props = {
  products: Product[];
  totalProducts: number; // Total number of products from API
  currentPage: number; // Current page number
  productsPerPage: number; // Number of products per page
  onPageChange: (page: number) => void; // Handler for page change
};
// ==========================================================

export default function ProductGridView({
  products,
  totalProducts,
  currentPage,
  productsPerPage,
  onPageChange,
}: Props) {
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = Math.min(currentPage * productsPerPage, totalProducts);

  return (
    <div>
      <Grid container spacing={6}>
        {products.map((item) => (
          <Grid item lg={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              price={item.price}
              title={item.title}
              off={item.discount}
              images={item.images}
              imgUrl={item.thumbnail}
              rating={item.rating}
            />
          </Grid>
        ))}
      </Grid>

      <FlexBox justifyContent="center"  alignItems="center" mt="32px">
        {/* <SemiSpan>
          Showing {startProduct}-{endProduct} of {totalProducts} Products
        </SemiSpan> */}
        {endProduct < totalProducts && (
          <Button onClick={() => onPageChange(currentPage)} variant="contained" color="primary">
            Show More
          </Button>
        )}
      </FlexBox>
    </div>
  );
}
