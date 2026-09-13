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
 /** Client-side paging: the full list that gets sliced by the caller. */
 orderList?: Order[];
 ordersPerPage?: number;
 /** Server-side paging: page count straight from the API meta. Wins over orderList. */
 pageCount?: number;
 currentPage: number;
 onPageChange: (page: number) => void;
}

export default function OrdersPagination({
 orderList,
 ordersPerPage,
 pageCount: pageCountProp,
 currentPage,
 onPageChange,
}: OrdersPaginationProps) {
 const pageCount =
  pageCountProp ??
  Math.ceil((orderList?.length ?? 0) / (ordersPerPage || 10));

 if (pageCount <= 1) return null;

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
