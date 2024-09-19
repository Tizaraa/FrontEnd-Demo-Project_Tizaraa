import Box from "@component/Box";
import CategoryResult from "./CategoryResult";
import layout3 from "@component/layout/layout-3";

export default function ProductSearchResult() {
  return (
    <Box pt="20px">
      <CategoryResult sortOptions={sortOptions} />
    </Box>
  );
}

const sortOptions = [
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" }
];


