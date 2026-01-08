// 'use client'

// import { useState, useEffect } from 'react'
// import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'

// export default function ResponsiveCategory() {
//   const [isExpanded, setIsExpanded] = useState(false)
//   const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobileOrTablet(window.innerWidth < 1024)
//     }

//     checkScreenSize()
//     window.addEventListener('resize', checkScreenSize)

//     return () => window.removeEventListener('resize', checkScreenSize)
//   }, [])

//   const breadcrumbs = [
//     { label: 'Health & Beauty', href: '#' },
//     { label: 'Personal Care', href: '#' },
//     { label: 'Oral Care', href: '#' },
//     { label: 'Toothpaste', href: '#' },
//     { label: 'Closeup Toothpaste Menthol Fresh Combo Pack of 2-(150g x 2)', href: '#' },
//   ]

//   const containerStyle: React.CSSProperties = {
//     fontFamily: 'Arial, sans-serif',
//     padding: '10px',
//     backgroundColor: '#F6F9FC',
//     borderRadius: '5px',
//   }

//   const breadcrumbStyle: React.CSSProperties = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     listStyle: 'none',
//     padding: 0,
//     margin: 0,
//   }

//   const itemStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     marginRight: '5px',
//   }

//   const linkStyle: React.CSSProperties = {
//     color: '#0066c0',
//     textDecoration: 'none',
//     fontSize: '14px',
//   }

//   const currentPageStyle: React.CSSProperties = {
//     color: '#6c757d',
//     fontSize: '14px',
//   }

//   const toggleStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     background: 'none',
//     border: 'none',
//     color: '#0066c0',
//     cursor: 'pointer',
//     fontSize: '14px',
//     padding: '5px',
//   }

//   const renderBreadcrumbs = () => {
//     if (isMobileOrTablet && !isExpanded) {
//       return (
//         <li style={itemStyle}>
//           <span style={currentPageStyle}>{breadcrumbs[breadcrumbs.length - 1].label}</span>
//         </li>
//       )
//     }

//     return breadcrumbs.map((crumb, index) => (
//       <li key={index} style={itemStyle}>
//         {index > 0 && <ChevronRight size={16} style={{ color: '#6c757d', margin: '0 5px' }} />}
//         {index === breadcrumbs.length - 1 ? (
//           <span style={currentPageStyle}>{crumb.label}</span>
//         ) : (
//           <a href={crumb.href} style={linkStyle}>
//             {crumb.label}
//           </a>
//         )}
//       </li>
//     ))
//   }

//   return (
//     <nav style={containerStyle}>
//       {isMobileOrTablet && (
//         <button style={toggleStyle} onClick={() => setIsExpanded(!isExpanded)}>
//           {isExpanded ? (
//             <>
//               <ChevronUp size={16} style={{ marginRight: '5px' }} />
//               Hide categories
//             </>
//           ) : (
//             <>
//               <ChevronDown size={16} style={{ marginRight: '5px' }} />
//               Show categories
//             </>
//           )}
//         </button>
//       )}
//       <ol style={breadcrumbStyle}>{renderBreadcrumbs()}</ol>
//     </nav>
//   )
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
// import ApiBaseUrl from 'api/ApiBaseUrl';

// interface ProductDetails {
//   product_name: string;
// }

// interface SitemapItem {
//   id: number;
//   categorie_name: string;
//   parent_id: number | null;
//   categorie_name_slug: string;
//   level: number;
// }

// export default function ResponsiveCategory({ slug }: { slug: string }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
//   const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
//   const [sitemap, setSitemap] = useState<SitemapItem[]>([]);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobileOrTablet(window.innerWidth < 1024);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);

//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${slug}`);
//         //console.log(response.data); // Log the full response to check the structure
//         const { productsingledetails, sitemap } = response.data;

//         //console.log("s",sitemap);

//         if (productsingledetails) {
//           setProductDetails(productsingledetails);
//         } else {
//           console.error('Product details are missing in the response');
//         }

//         if (Array.isArray(sitemap)) {
//           setSitemap(sitemap);
//           //console.log('Sitemap:', sitemap); // Log the sitemap data
//         } else {
//           console.error('Sitemap is not an array or is undefined:');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [slug]);

//   const breadcrumbs = [
//     { label: sitemap[0]?.categorie_name || "No Category found", href: `/category/${sitemap[0]?.categorie_name_slug || ''}` },
//     { label: sitemap[1]?.categorie_name || "No Sub Category found", href: `/category/${sitemap[1]?.categorie_name_slug || ''}` },
//     { label: sitemap[2]?.categorie_name || "No Sub Sub Category found", href: `/category/${sitemap[2]?.categorie_name_slug || ''}` },
//     { label: productDetails?.product_name || 'No Product Name' },
//   ];

//   const containerStyle: React.CSSProperties = {
//     fontFamily: 'Arial, sans-serif',
//     padding: '10px',
//     backgroundColor: '#F6F9FC',
//     borderRadius: '5px',
//   };

//   const breadcrumbStyle: React.CSSProperties = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     listStyle: 'none',
//     padding: 0,
//     margin: 0,
//   };

//   const itemStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     marginRight: '5px',
//   };

//   const linkStyle: React.CSSProperties = {
//     color: '#000',
//     textDecoration: 'none',
//     fontSize: '14px',
//     fontWeight: "bold"
//   };

//   const currentPageStyle: React.CSSProperties = {
//     color: '#6c757d',
//     fontSize: '14px',
//   };

//   const toggleStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     background: 'none',
//     border: 'none',
//     color: '#0066c0',
//     cursor: 'pointer',
//     fontSize: '14px',
//     padding: '5px',
//   };

//   const renderBreadcrumbs = () => {
//     if (isMobileOrTablet && !isExpanded) {
//       return (
//         <li style={itemStyle}>
//           <span style={currentPageStyle}>{breadcrumbs[breadcrumbs.length - 1].label}</span>
//         </li>
//       );
//     }

//     return breadcrumbs.map((crumb, index) => (
//       <li key={index} style={itemStyle}>
//         {index > 0 && <ChevronRight size={16} style={{ color: '#6c757d', margin: '0 5px' }} />}
//         {index === breadcrumbs.length - 1 ? (
//           <span style={currentPageStyle}>{crumb.label}</span>
//         ) : (
//           <a href={crumb.href} style={linkStyle}>
//             {crumb.label}
//           </a>
//         )}
//       </li>
//     ));
//   };

//   const renderSitemap = () => (
//     <ul style={{ paddingLeft: '20px', color: '#333' }}>
//       {sitemap.length ? (
//         sitemap.map((item) => (
//           <li key={item.id} style={{ fontSize: '14px', padding: '4px 0', marginLeft: item.level * 20 }}>
//             {item.categorie_name}
//           </li>
//         ))
//       ) : (
//         <li>No categories available</li>
//       )}
//     </ul>
//   );

//   return (
//     <nav style={containerStyle}>
//       {isMobileOrTablet && (
//         <button style={toggleStyle} onClick={() => setIsExpanded(!isExpanded)}>
//           {isExpanded ? (
//             <>
//               <ChevronUp size={16} style={{ marginRight: '5px' }} />
//               Hide categories
//             </>
//           ) : (
//             <>
//               <ChevronDown size={16} style={{ marginRight: '5px' }} />
//               Show categories
//             </>
//           )}
//         </button>
//       )}
//       <ol style={breadcrumbStyle}>{renderBreadcrumbs()}</ol>
//       {isExpanded && renderSitemap()}
//     </nav>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
// import ApiBaseUrl from 'api/ApiBaseUrl';

// interface ProductDetails {
//   product_name: string;
// }

// interface SitemapItem {
//   id: number;
//   categorie_name: string;
//   parent_id: number | null;
//   categorie_name_slug: string;
//   level: number;
// }

// export default function ResponsiveCategory({ slug }: { slug: string }) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
//   const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);
//   const [sitemap, setSitemap] = useState<SitemapItem[]>([]);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobileOrTablet(window.innerWidth < 1024);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);

//     return () => window.removeEventListener('resize', checkScreenSize);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${ApiBaseUrl.baseUrl}product/details/${slug}`);
//         const { productsingledetails, sitemap } = response.data;

//         if (productsingledetails) {
//           setProductDetails(productsingledetails);
//         } else {
//           console.error('Product details are missing in the response');
//         }

//         if (Array.isArray(sitemap)) {
//           setSitemap(sitemap);
//         } else {
//           console.error('Sitemap is not an array or is undefined');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [slug]);

//   const breadcrumbs = [
//     sitemap[0] ? { label: sitemap[0].categorie_name, href: `/category/${sitemap[0].categorie_name_slug}` } : null,
//     sitemap[1] ? { label: sitemap[1].categorie_name, href: `/category/${sitemap[1].categorie_name_slug}` } : null,
//     sitemap[2] ? { label: sitemap[2].categorie_name, href: `/category/${sitemap[2].categorie_name_slug}` } : null,
//     productDetails ? { label: productDetails.product_name } : null,
//   ].filter(Boolean); // Filters out any null values

//   const containerStyle: React.CSSProperties = {
//     fontFamily: 'Arial, sans-serif',
//     padding: '10px',
//     backgroundColor: '#F6F9FC',
//     borderRadius: '5px',
//   };

//   const breadcrumbStyle: React.CSSProperties = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     alignItems: 'center',
//     listStyle: 'none',
//     padding: 0,
//     margin: 0,
//   };

//   const itemStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     marginRight: '5px',
//   };

//   const linkStyle: React.CSSProperties = {
//     color: '#000',
//     textDecoration: 'none',
//     fontSize: '14px',
//     fontWeight: "bold"
//   };

//   const currentPageStyle: React.CSSProperties = {
//     color: '#6c757d',
//     fontSize: '14px',
//   };

//   const toggleStyle: React.CSSProperties = {
//     display: 'flex',
//     alignItems: 'center',
//     background: 'none',
//     border: 'none',
//     color: '#0066c0',
//     cursor: 'pointer',
//     fontSize: '14px',
//     padding: '5px',
//   };

//   const renderBreadcrumbs = () => {
//     if (isMobileOrTablet && !isExpanded) {
//       return (
//         <li style={itemStyle}>
//           <span style={currentPageStyle}>{breadcrumbs[breadcrumbs.length - 1]?.label}</span>
//         </li>
//       );
//     }

//     return breadcrumbs.map((crumb, index) => (
//       <li key={index} style={itemStyle}>
//         {index > 0 && <ChevronRight size={16} style={{ color: '#6c757d', margin: '0 5px' }} />}
//         {index === breadcrumbs.length - 1 ? (
//           <span style={currentPageStyle}>{crumb.label}</span>
//         ) : (
//           <a href={crumb.href} style={linkStyle}>
//             {crumb.label}
//           </a>
//         )}
//       </li>
//     ));
//   };

//   const renderSitemap = () => (
//     <ul style={{ paddingLeft: '20px', color: '#333' }}>
//       {sitemap.length ? (
//         sitemap.map((item) => (
//           <li key={item.id} style={{ fontSize: '14px', padding: '4px 0', marginLeft: item.level * 20 }}>
//             {item.categorie_name}
//           </li>
//         ))
//       ) : (
//         <li>No categories available</li>
//       )}
//     </ul>
//   );

//   return (
//     <nav style={containerStyle}>
//       {isMobileOrTablet && (
//         <button style={toggleStyle} onClick={() => setIsExpanded(!isExpanded)}>
//           {isExpanded ? (
//             <>
//               <ChevronUp size={16} style={{ marginRight: '5px' }} />
//               Hide categories
//             </>
//           ) : (
//             <>
//               <ChevronDown size={16} style={{ marginRight: '5px' }} />
//               Show categories
//             </>
//           )}
//         </button>
//       )}
//       <ol style={breadcrumbStyle}>{renderBreadcrumbs()}</ol>
//       {isExpanded && renderSitemap()}
//     </nav>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import ApiBaseUrl from "api/ApiBaseUrl";

interface ProductDetails {
 product_name: string;
}

interface SitemapItem {
 id: number;
 categorie_name: string;
 parent_id: number | null;
 categorie_name_slug: string;
 level: number;
}

export default function ResponsiveCategory({ slug }: { slug: string }) {
 const [isExpanded, setIsExpanded] = useState(false);
 const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
 const [productDetails, setProductDetails] = useState<ProductDetails | null>(
  null
 );
 const [sitemap, setSitemap] = useState<SitemapItem[]>([]);

 useEffect(() => {
  const checkScreenSize = () => {
   setIsMobileOrTablet(window.innerWidth < 1024);
  };

  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);

  return () => window.removeEventListener("resize", checkScreenSize);
 }, []);

 useEffect(() => {
  const fetchData = async () => {
   try {
    const response = await axios.get(
     `${ApiBaseUrl.baseUrl}product/b2b/details/${slug}`
    );
    const { productsingledetails, sitemap } = response.data;

    if (productsingledetails) {
     setProductDetails(productsingledetails);
    } else {
     console.error("Product details are missing in the response");
    }

    if (Array.isArray(sitemap)) {
     setSitemap(sitemap);
    } else {
     console.error("Sitemap is not an array or is undefined");
    }
   } catch (error) {
    console.error("Error fetching data:", error);
   }
  };

  fetchData();
 }, [slug]);

 const containerStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  padding: "10px",
  backgroundColor: "#F6F9FC",
  borderRadius: "5px",
 };

 const breadcrumbStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  listStyle: "none",
  padding: 0,
  margin: 0,
 };

 const itemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginRight: "5px",
 };

 const linkStyle: React.CSSProperties = {
  color: "#000",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "bold",
 };

 const currentPageStyle: React.CSSProperties = {
  color: "#6c757d",
  fontSize: "14px",
 };

 const toggleStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  background: "none",
  border: "none",
  color: "#ff8c00",
  cursor: "pointer",
  fontSize: "14px",
  padding: "5px",
 };

 const renderBreadcrumbs = () => {
  if (isMobileOrTablet && !isExpanded) {
   return (
    <li style={itemStyle}>
     <span style={currentPageStyle}>
      {productDetails?.product_name || "No Product Name"}
     </span>
    </li>
   );
  }

  const breadcrumbItems = sitemap.map((item, index) => ({
   label: item.categorie_name,
   href: `/category/${item.categorie_name_slug}`,
  }));

  return (
   <>
    {breadcrumbItems.map((crumb, index) => (
     <li key={index} style={itemStyle}>
      {index > 0 && (
       <ChevronRight size={16} style={{ color: "#6c757d", margin: "0 5px" }} />
      )}
      <a href={crumb.href} style={linkStyle}>
       {crumb.label}
      </a>
     </li>
    ))}
    {productDetails && (
     <>
      <ChevronRight size={16} style={{ color: "#6c757d", margin: "0 5px" }} />
      <span style={currentPageStyle}>{productDetails.product_name}</span>
     </>
    )}
   </>
  );
 };

 const renderSitemap = () => (
  <ul style={{ paddingLeft: "20px", color: "#333" }}>
   {sitemap.length ? (
    sitemap.map((item) => (
     <li
      key={item.id}
      style={{
       fontSize: "14px",
       padding: "4px 0",
       marginLeft: item.level * 20,
      }}
     >
      {item.categorie_name}
     </li>
    ))
   ) : (
    <li>No categories available</li>
   )}
  </ul>
 );

 return (
  <nav style={containerStyle}>
   {isMobileOrTablet && (
    <button style={toggleStyle} onClick={() => setIsExpanded(!isExpanded)}>
     {isExpanded ? (
      <>
       <ChevronUp size={16} style={{ marginRight: "5px" }} />
       Hide categories
      </>
     ) : (
      <>
       <ChevronDown size={16} style={{ marginRight: "5px" }} />
       Show categories
      </>
     )}
    </button>
   )}
   <ol style={breadcrumbStyle}>{renderBreadcrumbs()}</ol>
   {isExpanded}
  </nav>
 );
}
