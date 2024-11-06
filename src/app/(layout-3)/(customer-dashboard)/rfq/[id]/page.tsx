'use client'

import { useState } from 'react'
import { Download, FileText, Eye } from 'lucide-react'

export default function Component() {
  const [isFileOpen, setIsFileOpen] = useState(false)
  const [fileContent, setFileContent] = useState('')

  const productDetails = {
    id: 'RFQ-2023-001',
    productName: 'Industrial Grade Steel Pipes',
    quantity: 1000,
    measurementUnit: 'Meters',
    detailedRequirements: 'We require 1000 meters of industrial-grade steel pipes. The pipes should be 2 inches in diameter, with a wall thickness of 0.25 inches. They must be corrosion-resistant and suitable for high-pressure applications.',
    uploadedFile: 'technical_specifications.pdf'
  }

  const handleFileOpen = () => {
    // Simulating file content reading
    setFileContent('This is the content of the technical specifications file...')
    setIsFileOpen(true)
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f0f4f8',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{
        color: '#2c3e50',
        borderBottom: '2px solid #E94560',
        paddingBottom: '10px',
        marginBottom: '20px'
      }}>Request for Quotation Details</h1>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#E94560', marginBottom: '15px' }}>Product Information</h2>
        <p><strong>ID:</strong> {productDetails.id}</p>
        <p><strong>Product Name:</strong> {productDetails.productName}</p>
        <p><strong>Quantity:</strong> {productDetails.quantity}</p>
        <p><strong>Measurement Unit:</strong> {productDetails.measurementUnit}</p>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#E94560', marginBottom: '15px' }}>Detailed Requirements</h2>
        <p style={{ lineHeight: '1.6' }}>{productDetails.detailedRequirements}</p>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: '#E94560', marginBottom: '15px' }}>Uploaded File</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FileText size={24} color="#E94560" />
          <div style={{display: "flex", gap: "10px", flexDirection: "column"}}>
          <span>{productDetails.uploadedFile}</span>
          <button
            onClick={() => window.open('/download-link', '_blank')}
            style={{
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Download size={18} />
            Download
          </button>
          <button
            onClick={handleFileOpen}
            style={{
              backgroundColor: '#E94560',
              color: 'white',
              border: 'none',
              padding: '8px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Eye size={18} />
            Open File
          </button>
          </div>
        </div>
      </div>

      {isFileOpen && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
          border: '1px solid #bdc3c7'
        }}>
          <h3 style={{ color: '#E94560', marginBottom: '10px' }}>File Content</h3>
          <p style={{
            backgroundColor: '#ecf0f1',
            padding: '15px',
            borderRadius: '5px',
            whiteSpace: 'pre-wrap'
          }}>{fileContent}</p>
        </div>
      )}
    </div>
  )
}