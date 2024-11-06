// 'use client'

// import { useState } from 'react'
// import { ChevronLeft, ChevronRight, Plus, SortAsc, SortDesc } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// // Mock data for RFQs
// const mockRFQs = [
//   { id: 1, product_name: 'Office Supplies', quantity: "5", measurement_name: "Liters", create_date: '2023-05-15', expire_date: "2023-05-15", status: 'Pending' },
//   { id: 2, product_name: 'IT Equipment', quantity: "5", measurement_name: "Liters", create_date: '2023-05-14',expire_date: "2023-05-15", status: 'Approved' },
//   { id: 3, product_name: 'Cleaning Services', quantity: "5", measurement_name: "Liters", create_date: '2023-05-13',expire_date: "2023-05-15", status: 'Pending' },
//   { id: 4, product_name: 'Marketing Materials', quantity: "5", measurement_name: "Liters", create_date: '2023-05-12',expire_date: "2023-05-15", status: 'Approved' },
//   { id: 5, product_name: 'Catering Services', quantity: "5", measurement_name: "Liters", create_date: '2023-05-11',expire_date: "2023-05-15", status: 'Pending', },
// ]

// export default function RfqProductList() {
//   const [searchTerm, setSearchTerm] = useState('')
//   //const [sortBy, setSortBy] = useState('create_date')
//   const [sortBy, setSortBy] = useState('expire_date')
//   const [sortOrder, setSortOrder] = useState('desc')
//   const [currentPage, setCurrentPage] = useState(1)
//   const router = useRouter();

//   const itemsPerPage = 3

//   // Filter and sort RFQs
//   const filteredAndSortedRFQs = mockRFQs
//     .filter(rfq => rfq.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
//     .sort((a, b) => {
//       if (sortBy === 'expire_date') {
//         return sortOrder === 'asc'
//           ? new Date(a.expire_date).getTime() - new Date(b.expire_date).getTime()
//           : new Date(b.expire_date).getTime() - new Date(a.expire_date).getTime()
//       } else {
//         return sortOrder === 'asc'
//           ? a.product_name.localeCompare(b.product_name)
//           : b.product_name.localeCompare(a.product_name)
//       }
//     })

//   // Paginate RFQs
//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage
//   const currentRFQs = filteredAndSortedRFQs.slice(indexOfFirstItem, indexOfLastItem)

//   const pageCount = Math.ceil(filteredAndSortedRFQs.length / itemsPerPage)

//   const toggleSortOrder = () => {
//     setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc')
//   }

//   return (
//     <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
//       <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
//         <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937' }}>Request for Quotations</h1>
//         <button
//           onClick={()=>router.push("/rfq//rfq-form")}
//           style={{
//             backgroundColor: '#E94560',
//             color: 'white',
//             padding: '0.7rem 1rem',
//             borderRadius: '0.375rem',
//             display: 'flex',
//             alignItems: 'center',
//             border: 'none',
//             cursor: 'pointer',
//             transition: 'background-color 0.2s',
//           }}
//           onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E94560'}
//           onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#E94560'}
//         >
//           <Plus style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} /> Create New RFQ
//         </button>
//       </header>

//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
//         <input
//           type="text"
//           placeholder="Search RFQs..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{
//             flex: 1,
//             padding: '0.5rem',
//             border: '1px solid #d1d5db',
//             borderRadius: '0.375rem',
//             fontSize: '0.875rem',
//           }}
//         />
//         <select
//           value={sortBy}
//           onChange={(e) => setSortBy(e.target.value)}
//           style={{
//             width: '180px',
//             padding: '0.5rem',
//             border: '1px solid #d1d5db',
//             borderRadius: '0.375rem',
//             backgroundColor: 'white',
//             fontSize: '0.875rem',
//           }}
//         >
//           <option value="expire_date">Sort by Date</option>
//           <option value="product_name">Sort by Product Name</option>
//         </select>
//         <button
//           onClick={toggleSortOrder}
//           style={{
//             padding: '0.5rem',
//             border: '1px solid #d1d5db',
//             borderRadius: '0.375rem',
//             backgroundColor: 'white',
//             cursor: 'pointer',
//           }}
//         >
//           {sortOrder === 'asc' ? <SortAsc style={{ height: '1rem', width: '1rem' }} /> : <SortDesc style={{ height: '1rem', width: '1rem' }} />}
//         </button>
//       </div>

//       <div style={{ marginBottom: '1.5rem' }}>
//         {currentRFQs.map(rfq => (
//           <div key={rfq.id} style={{
//             backgroundColor: 'white',
//             border: '1px solid #e5e7eb',
//             borderRadius: '0.5rem',
//             padding: '1.5rem',
//             marginBottom: '1rem',
//             boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
//             transition: 'box-shadow 0.3s',
//           }}
//           onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}
//           onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)'}
//           >
//             <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>{rfq.product_name}</h2>
//             {/* <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.25rem' }}>Company: {rfq.company}</p> */}
//             <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Quantity: {rfq.quantity}</p>
//             <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Unit: {rfq.measurement_name}</p>
//             <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Created Date: {rfq.create_date}</p>
//             <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '0.5rem' }}>Expired Date: {rfq.expire_date}</p>
//             <span style={{
//               fontSize: '0.75rem',
//               fontWeight: '500',
//               padding: '0.25rem 0.625rem',
//               borderRadius: '9999px',
//               backgroundColor: rfq.status === 'Approved' ? '#d1fae5' : rfq.status === 'Pending' ? '#fee2e2' : '#fef3c7',
//               color: rfq.status === 'Approved' ? '#065f46' : rfq.status === 'Pending' ? '#991b1b' : '#92400e',
//             }}>
//               {rfq.status}
//             </span>
//           </div>
//         ))}
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <button
//           onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           style={{
//             padding: '0.5rem 1rem',
//             border: '1px solid #d1d5db',
//             borderRadius: '0.375rem',
//             backgroundColor: '#E94560',
//             color: "white",
//             display: 'flex',
//             alignItems: 'center',
//             cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
//             opacity: currentPage === 1 ? 0.5 : 1,
//           }}
//         >
//           <ChevronLeft style={{ marginRight: '0.5rem', height: '1rem', width: '1rem' }} /> Previous
//         </button>
//         <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>Page {currentPage} of {pageCount}</span>
//         <button
//           onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
//           disabled={currentPage === pageCount}
//           style={{
//             padding: '0.5rem 1rem',
//             border: '1px solid #d1d5db',
//             borderRadius: '0.375rem',
//             backgroundColor: '#E94560',
//             color: "white",
//             display: 'flex',
//             alignItems: 'center',
//             cursor: currentPage === pageCount ? 'not-allowed' : 'pointer',
//             opacity: currentPage === pageCount ? 0.5 : 1,
//           }}
//         >
//           Next <ChevronRight style={{ marginLeft: '0.5rem', height: '1rem', width: '1rem' }} />
//         </button>
//       </div>
//     </div>
//   )
// }
"use client";

import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  SortAsc,
  SortDesc,
} from "lucide-react";
import { useRouter } from "next/navigation";
import authService from "services/authService";
import Link from "next/link";

// API endpoint and token
const rfqApiUrl = "https://frontend.tizaraa.com/api/rfqs";

export default function RfqProductList() {
  const [rfqs, setRfqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("expire_date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const token = authService.getToken();

  // Fetch RFQ data from the API
  useEffect(() => {
    const fetchRFQs = async () => {
      try {
        const response = await fetch(rfqApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setRfqs(data.data);
        }
      } catch (error) {
        console.error("Error fetching RFQ data:", error);
      }
    };

    fetchRFQs();
  }, [token]);

  // Filter and sort RFQs
  const filteredAndSortedRFQs = rfqs
    .filter((rfq) =>
      rfq.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "expire_date") {
        return sortOrder === "asc"
          ? new Date(a.expire_date).getTime() -
              new Date(b.expire_date).getTime()
          : new Date(b.expire_date).getTime() -
              new Date(a.expire_date).getTime();
      } else {
        return sortOrder === "asc"
          ? a.product_name.localeCompare(b.product_name)
          : b.product_name.localeCompare(a.product_name);
      }
    });

  // Paginate RFQs
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRFQs = filteredAndSortedRFQs.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const pageCount = Math.ceil(filteredAndSortedRFQs.length / itemsPerPage);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1
          style={{ fontSize: "1.875rem", fontWeight: "bold", color: "#1f2937" }}
        >
          Request for Quotations
        </h1>
        <button
          onClick={() => router.push("/rfq/rfq-form")}
          style={{
            backgroundColor: "#E94560",
            color: "white",
            padding: "0.7rem 1rem",
            borderRadius: "0.375rem",
            display: "flex",
            alignItems: "center",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#E94560")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#E94560")
          }
        >
          <Plus
            style={{ marginRight: "0.5rem", height: "1rem", width: "1rem" }}
          />{" "}
          Create New RFQ
        </button>
      </header>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search RFQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            fontSize: "0.875rem",
          }}
        />
        {/* <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            width: "180px",
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            backgroundColor: "white",
            fontSize: "0.875rem",
          }}
        >
          <option value="expire_date">Sort by Date</option>
          <option value="product_name">Sort by Product Name</option>
        </select> */}
        {/* <button
          onClick={toggleSortOrder}
          style={{
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            backgroundColor: "white",
            cursor: "pointer",
          }}
        >
          {sortOrder === "asc" ? (
            <SortAsc style={{ height: "1rem", width: "1rem" }} />
          ) : (
            <SortDesc style={{ height: "1rem", width: "1rem" }} />
          )}
        </button> */}
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        {currentRFQs.map((rfq) => (
          <Link
            key={rfq.id}
            href={`/rfq/${rfq.id}`}
            style={{ textDecoration: "none" }}
          >
            <div
              key={rfq.id}
              style={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                padding: "1.5rem",
                marginBottom: "1rem",
                boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 1px 2px 0 rgba(0, 0, 0, 0.05)")
              }
            >
              <Link
                key={rfq.id}
                href={`/rfq/${rfq.id}`}
                style={{ textDecoration: "none" }}
              >
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "0.5rem",
                  }}
                >
                  {rfq.product_name}
                </h2>
              </Link>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                Quantity: {rfq.quantity}
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                Unit: {rfq.measurement_name}
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                Created Date: {new Date(rfq.created_at).toLocaleDateString()}
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#4b5563",
                  marginBottom: "0.5rem",
                }}
              >
                Expired Date: {new Date(rfq.expire_date).toLocaleDateString()}
              </p>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "500",
                  padding: "0.25rem 0.625rem",
                  borderRadius: "9999px",
                  backgroundColor: rfq.status === 1 ? "#d1fae5" : "#fee2e2",
                  color: rfq.status === 1 ? "#065f46" : "#991b1b",
                }}
              >
                {rfq.status === 1 ? "Approved" : "Pending"}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            backgroundColor: "#E94560",
            color: "white",
            display: "flex",
            alignItems: "center",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            opacity: currentPage === 1 ? 0.5 : 1,
          }}
        >
          <ChevronLeft
            style={{ marginRight: "0.5rem", height: "1rem", width: "1rem" }}
          />{" "}
          Previous
        </button>
        <span
          style={{ fontSize: "0.875rem", fontWeight: "500", color: "#4b5563" }}
        >
          Page {currentPage} of {pageCount}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageCount))
          }
          disabled={currentPage === pageCount}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            backgroundColor: "#E94560",
            color: "white",
            display: "flex",
            alignItems: "center",
            cursor: currentPage === pageCount ? "not-allowed" : "pointer",
            opacity: currentPage === pageCount ? 0.5 : 1,
          }}
        >
          Next{" "}
          <ChevronRight
            style={{ marginLeft: "0.5rem", height: "1rem", width: "1rem" }}
          />
        </button>
      </div>
    </div>
  );
}
