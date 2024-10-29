"use client";

import Box from "@component/Box";
import Card, { CardProps } from "@component/Card";
import Modal from "@component/Modal";
import Icon from "@component/icon/Icon";
import NextImage from "@component/NextImage"; // Import NextImage for image display
import Typography, { H3, H4 } from "@component/Typography"; // Import Typography components

// ===================================================
// Extend Props with CardProps for additional props
interface Props extends CardProps {
  open: boolean;
  onClose: () => void;
  product: {
    slug: string;
    title: string;
    price: number;
    imgUrl: string;
    id: string | number;
    discountPrice?: number; 
  };
};


// =======================================================================
export default function ProductQuickView({ open, onClose, product }: Props) {
  const finalPrice = product.discountPrice || product.price;

  return (
    <Modal open={open} onClose={onClose}>
      <Card p="1rem" width="100%" maxWidth="800px" borderRadius={8} position="relative">
        <Box position="absolute" top="0.75rem" right="0.75rem" cursor="pointer">
          <Icon className="close" color="primary" variant="small" onClick={onClose}>
            close
          </Icon>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" style={{ maxWidth: '300px', height: 'auto' }}>
  <Box style={{ position: 'relative', width: '100%', height: '200px' }}>
    <NextImage
      alt={product.title}
      src={product.imgUrl}
      layout="fill" 
      objectFit="contain" 
    />
  </Box>
  <H3 mt="1rem">{product.title}</H3>
  <H4 mt="0.5rem" color="primary.main">
    {finalPrice}
  </H4>
  {product.discountPrice && (
    <H4 mt="0.5rem" color="text.secondary" textDecoration="line-through">
      {product.price}
    </H4>
  )}
</Box>


      </Card>
    </Modal>
  );
}
