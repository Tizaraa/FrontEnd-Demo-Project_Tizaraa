"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ApiBaseUrl from "api/ApiBaseUrl";

export default function InvoicePage({ params }) {
  const { id } = params;

  const [pdfUrl, setPdfUrl] = useState(null); // State to hold the PDF URL
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // State to hold error message

  useEffect(() => {
    const fetchInvoiceData = async () => {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        setError("Authentication token not found. Please log in."); // Handle missing token
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${ApiBaseUrl.baseUrl}get-invoice?id=${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          responseType: 'blob', // Set response type to blob for binary data
        });

        // Create a URL for the PDF blob and set it to state
        const pdfBlobUrl = URL.createObjectURL(response.data);
        setPdfUrl(pdfBlobUrl);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
        setError('Failed to load invoice. Please try again.'); // Set error message for user
      } finally {
        setLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchInvoiceData();
  }, [id]);

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl); // Revoke the URL when the component unmounts or pdfUrl changes
      }
    };
  }, [pdfUrl]);

  if (loading) {
    return <p>Loading...</p>; // Loading state
  }

  if (error) {
    return <p className="mt-5 text-red-500">{error}</p>; // Error message
  }

  return (
    <>
      {/* <h1>Hello, Invoice ID: {id}</h1> */}
      {pdfUrl && (
        // <iframe
        //   src={pdfUrl}
        //   style={{ width: '100%', height: '600px' }} // Adjust height as necessary
        //   frameBorder="0"
        //   title={`Invoice PDF ${id}`}
        // ></iframe>
        <embed
                  src={pdfUrl}
                  type="application/pdf"
                  style={{ width: '100%', height: '600px' }}
                  title={`Invoice PDF ${params.id}`}
                />
      )}
    </>
  );
}
