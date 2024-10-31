// import Box from "@component/Box";
// import { useState } from "react";
// import Typography from "@component/Typography";

// type SizeColorOption = {
//   size: string;
//   color: string;
//   price: number;
//   b2bPricing: { min_qty: number; price: number }[];
//   stock_quantity: number;
// };

// type SizeColorSelectorProps = {
//   productId: string | number;
//   sellerId: string | number;
//   stockQuantity: number;
//   setSelectedSize: (size: string | null) => void;
//   setSelectedColor: (color: string | null) => void;
//   dummySizes: SizeColorOption[];
// };

// const SizeColorSelector = ({
//   productId,
//   sellerId,
//   stockQuantity,
//   setSelectedSize,
//   setSelectedColor,
//   dummySizes,
// }: SizeColorSelectorProps) => {



//   const [selectedRows, setSelectedRows] = useState<SizeColorOption[]>([]);

//   const handleRowClick = (item: SizeColorOption) => {
//     if (selectedRows.includes(item)) {
//       setSelectedRows(selectedRows.filter((selectedItem) => selectedItem !== item));
//       setSelectedSize(null); // Reset size
//       setSelectedColor(null); // Reset color
//     } else {
//       setSelectedRows([item]); // Allow only one selection
//       setSelectedSize(item.size); // Update selected size
//       setSelectedColor(item.color); // Update selected color
//     }
//   };

//   return (
    // <Box>
    //   {dummySizes.map((item) => (
    //     <Box
    //       key={`${item.size}-${item.color}`} // Unique key for each item
    //       onClick={() => handleRowClick(item)}
    //       style={{
    //         border: selectedRows.includes(item) ? '2px solid blue' : '1px solid gray',
    //         backgroundColor: selectedRows.includes(item) ? '#e0f7fa' : 'white', // Change background color for selected item
    //         padding: '10px',
    //         margin: '5px',
    //         borderRadius: '5px',
    //         cursor: 'pointer',
    //         display: 'flex',
    //         justifyContent: 'space-between',
    //         alignItems: 'center',
    //       }}
    //       role="button"
    //       tabIndex={0} // Make it focusable
    //       aria-selected={selectedRows.includes(item)} // Accessibility attribute
    //     >
    //       <Box style={{ display: 'flex', flexDirection: 'column' }}>
    //         <Typography variant="h6">{`${item.size} - ${item.color}`}</Typography>
    //         <Typography variant="body1">{`Price: $${item.price}`}</Typography>
    //       </Box>

    //       {/* Display B2B Pricing */}
    //       <Box>
    //         <Typography variant="body2" style={{ fontWeight: 'bold' }}>
    //           B2B Pricing:
    //         </Typography>
    //         {item.b2bPricing.map((b2b, b2bIndex) => (
    //           <Typography key={b2bIndex} variant="body2">
    //             {`Min Qty: ${b2b.min_qty} - Price: $${b2b.price}`}
    //           </Typography>
    //         ))}
    //       </Box>
    //     </Box>
    //   ))}
    // </Box>
//   );
// };

// export default SizeColorSelector;


import Box from "@component/Box";
import { useState } from "react";
import Typography from "@component/Typography";

type SizeColorOption = {
  size: string;
  color: string;
  price: number;
  b2bPricing: { min_qty: number; price: number }[];
  stock: number;
};

type SizeColorSelectorProps = {
  productId: string | number;
  sellerId: string | number;
  stockQuantity: number;
  setSelectedSize: (size: string | null) => void;
  setSelectedColor: (color: string | null) => void;
  dummySizes: SizeColorOption[];
};

const SizeColorSelector = ({
  productId,
  sellerId,
  stockQuantity,
  setSelectedSize,
  setSelectedColor,
  dummySizes,
}: SizeColorSelectorProps) => {
  const [selectedRows, setSelectedRows] = useState<SizeColorOption[]>([]);

  const handleRowClick = (item: SizeColorOption) => {
    if (selectedRows.includes(item)) {
      setSelectedRows(selectedRows.filter((selectedItem) => selectedItem !== item));
      setSelectedSize(null); // Reset size
      setSelectedColor(null); // Reset color
    } else {
      setSelectedRows([item]); // Allow only one selection
      setSelectedSize(item.size); // Update selected size
      setSelectedColor(item.color); // Update selected color
    }
  };

  return (
    <Box>
      {dummySizes.map((item) => (
        <Box
          key={`${item.size}-${item.color}`} // Unique key for each item
          onClick={() => handleRowClick(item)}
          style={{
            border: selectedRows.includes(item) ? '2px solid blue' : '1px solid gray',
            backgroundColor: selectedRows.includes(item) ? '#e0f7fa' : 'white', // Change background color for selected item
            padding: '10px',
            margin: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          role="button"
          tabIndex={0} // Make it focusable
          aria-selected={selectedRows.includes(item)} // Accessibility attribute
        >
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">{`${item.size} - ${item.color}`}</Typography>
            <Typography variant="body1">{`Price: ${item.price}`}</Typography>
          </Box>

          {/* Display B2B Pricing */}
          <Box>
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>
              B2B Pricing:
            </Typography>
            {item.b2bPricing.map((b2b, b2bIndex) => (
              <Typography key={b2bIndex} variant="body2">
                {`Min Qty: ${b2b.min_qty} - Price: ${b2b.price}`}
              </Typography>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SizeColorSelector;

