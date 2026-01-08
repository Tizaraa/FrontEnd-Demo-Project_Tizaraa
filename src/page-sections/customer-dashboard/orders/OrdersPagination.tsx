// "use client";

// import FlexBox from "@component/FlexBox";
// import Pagination from "@component/pagination";
// import Order from "@models/order.model";

// export default function OrdersPagination({ orderList }: { orderList: Order[] }) {
//   return (
//     <FlexBox justifyContent="center" mt="2.5rem">
//       <Pagination
//         onChange={(data) => console.log(data)}
//         pageCount={Math.ceil(orderList.length / 10)}
//       />
//     </FlexBox>
//   );
// }

"use client";

import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import Order from "@models/order.model";

interface OrdersPaginationProps {
 orderList: Order[];
 ordersPerPage: number;
 currentPage: number;
 onPageChange: (page: number) => void;
}

export default function OrdersPagination({
 orderList,
 ordersPerPage,
 currentPage,
 onPageChange,
}: OrdersPaginationProps) {
 const pageCount = Math.ceil(orderList.length / ordersPerPage);

 const handlePageChange = (selectedPage: number) => {
  onPageChange(selectedPage);
 };

 return (
  <FlexBox justifyContent="center" mt="2.5rem">
   <Pagination
    currentPage={currentPage}
    pageCount={pageCount}
    onChange={handlePageChange}
   />
  </FlexBox>
 );
}
