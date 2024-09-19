// import Box from "@component/Box";
// import CategoryResult from "./CategoryResult";
// import layout3 from "@component/layout/layout-3";




// export default function ProductSearchResult({ params })
// {

//   return (
//     <div>
//       {/* <h1>Category Page {params.id}</h1> */}

//       <CategoryResult categoryid={params.id}/>
//     </div>
//   );
  
// }

// const sortOptions = [
//   { label: "Relevance", value: "Relevance" },
//   { label: "Date", value: "Date" },
//   { label: "Price Low to High", value: "Price Low to High" },
//   { label: "Price High to Low", value: "Price High to Low" }
// ];




import CategoryResult from "./CategoryResult";

export default function ProductSearchResult({ params }) {
  return (
    <div>
      <CategoryResult categoryid={params.id} />
    </div>
  );
}
