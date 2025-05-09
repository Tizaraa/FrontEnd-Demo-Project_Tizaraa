"use client";

import Grid from "@component/grid/Grid";
import { H2 } from "@component/Typography";
import Container from "@component/Container";
import ProductCard17 from "@component/product-cards/ProductCard17";
import Product from "@models/product.model";

// ======================================================================
type Section3Props = { products: Product[] };
// ======================================================================

export default function Section3({ products }: Section3Props) {
  return (
    <Container mt="4rem">
      <H2 textAlign="center" mb={4}>
        Best Selling Product
      </H2>

      <Grid container spacing={5}>
        {products.map((product) => (
          <Grid item md={3} sm={6} xs={12} key={product.id}>
            <ProductCard17
              id={product.id}
              slug={product.slug}
              title={product.title}
              price={product.price}
              productStock={product.product_stock}
              images={product.images}
              imgUrl={product.thumbnail}
              category={product.categories[0]}
              reviews={product.reviews?.length || 5}
              productId={product.id}
              sellerId={product.id}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
