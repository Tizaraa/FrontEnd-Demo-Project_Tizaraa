// "use client";

// import { useCallback,useEffect, useState } from "react";

// import Box from "@component/Box";
// import Card from "@component/Card";
// import Select from "@component/Select";
// import Hidden from "@component/hidden";
// import Icon from "@component/icon/Icon";
// import Grid from "@component/grid/Grid";
// import FlexBox from "@component/FlexBox";
// import { IconButton } from "@component/buttons";
// import Sidenav from "@component/sidenav/Sidenav";
// import { H5, Paragraph } from "@component/Typography";

// import ProductGridView from "@component/products/ProductCard1List";
// import ProductListView from "@component/products/ProductCard9List";
// import ProductFilterCard from "@component/products/ProductFilterCard";
// import useWindowSize from "@hook/useWindowSize";
// import db from "@data/db";
// import axios from "axios";
// import JustForYouProducts from "@sections/market-1/JustForYouPeoducts/JustForYouProducts";

// // ==============================================================

// // ==============================================================

// export default function CategoryResult({ categoryid }) {

//   useEffect(() => {

//     categoryProductLoad(40,1)

//   },[])

//     const categoryProductLoad = (id,orderby)=>{

//       const url = 'https://frontend.tizaraa.com/api/category/product/34'; // Example API

//       // ===
//       axios.post(url, {
//         brand_filter_id: id,
//         order_by: orderby
//       })
//       .then(function (response) {
//         const proName = response.data['products'][1].product_name;

//         console.log(response.data)

//       })
//       .catch(function (error) {
//         console.log(error);
//       });

//       // ===

//     }

//   const width = useWindowSize();
//   const [view, setView] = useState<"grid" | "list">("grid");

//   const isTablet = width < 1025;
//   const toggleView = useCallback((v: any) => () => setView(v), []);

//   return (
//     <>
//       <FlexBox
//         as={Card}
//         mb="55px"
//         p="1.25rem"
//         elevation={5}
//         flexWrap="wrap"
//         borderRadius={8}
//         alignItems="center"
//         justifyContent="space-between">
//         <div>
//           <H5>Searching for “ mobile phone ”</H5>
//           <Paragraph color="text.muted">48 results found</Paragraph>
//         </div>

//         <FlexBox alignItems="center" flexWrap="wrap">
//           <Paragraph color="text.muted" mr="1rem">
//             Short by:
//           </Paragraph>

//           <Box flex="1 1 0" mr="1.75rem" minWidth="150px">
//             {/* <Select placeholder="Short by"/> */}
//           </Box>

//           <Paragraph color="text.muted" mr="0.5rem">
//             View:
//           </Paragraph>

//           <IconButton onClick={toggleView("grid")}>
//             <Icon
//               variant="small"
//               defaultcolor="auto"
//               color={view === "grid" ? "primary" : "inherit"}>
//               grid
//             </Icon>
//           </IconButton>

//           <IconButton onClick={toggleView("list")}>
//             <Icon
//               variant="small"
//               defaultcolor="auto"
//               color={view === "list" ? "primary" : "inherit"}>
//               menu
//             </Icon>
//           </IconButton>

//           {isTablet && (
//             <Sidenav
//               position="left"
//               scroll={true}
//               handle={
//                 <IconButton>
//                   <Icon>options</Icon>
//                 </IconButton>
//               }>
//               <ProductFilterCard />
//             </Sidenav>
//           )}
//         </FlexBox>
//       </FlexBox>

//       <Grid container spacing={6}>
//         {/* <Hidden as={Grid} item lg={3} xs={12} down={1024}>
//           <ProductFilterCard />
//         </Hidden> */}
//         <Grid item lg={3} xs={12}>
//           <ProductFilterCard />
//         </Grid>

//         <Grid item lg={9} xs={12}>
//           {view === "grid" ? (
//             <ProductGridView products={db.slice(95, 104)} />
//           ) : (
//             <ProductListView products={db.slice(95, 104)} />
//           )}

//         </Grid>
//       </Grid>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@component/grid/Grid";
import ProductFilterCard from "@component/products/ProductFilterCard";
import CategoryRelatedProducts from "@sections/market-1/CategoryRelatedProducts";
import { Vortex } from "react-loader-spinner";
import styled from "@emotion/styled";
import ApiBaseUrl from "api/ApiBaseUrl";

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function CategoryResult({ categoryid }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const categoryProductLoad = async () => {
      try {
        const response = await axios.post(
          `${ApiBaseUrl.baseUrl}category/product/${categoryid}`
        );

        // Console log the result before setting state
        // console.log("Category Products Data:", response.data.products);

        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        setError("Error fetching category products");
        console.error("Error fetching category products:", error);
        setLoading(false);
      }
    };

    categoryProductLoad();
  }, [categoryid]);

  if (loading) {
    return (
      <LoaderWrapper>
        <Vortex />
      </LoaderWrapper>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Grid container spacing={6}>
      {/* <Grid item lg={3} xs={12}>
        <ProductFilterCard />
      </Grid> */}

      <Grid item lg={9} xs={12}>
        <CategoryRelatedProducts products={products} />
      </Grid>
    </Grid>
  );
}
