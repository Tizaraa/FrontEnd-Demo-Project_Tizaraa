// 'use client'

// import { useState } from 'react'
// import { Download, FileText, Eye } from 'lucide-react'

// export default function Component() {
//   const [isFileOpen, setIsFileOpen] = useState(false)
//   const [fileContent, setFileContent] = useState('')

//   const productDetails = {
//     id: 'RFQ-2023-001',
//     productName: 'Industrial Grade Steel Pipes',
//     quantity: 1000,
//     measurementUnit: 'Meters',
//     detailedRequirements: 'We require 1000 meters of industrial-grade steel pipes. The pipes should be 2 inches in diameter, with a wall thickness of 0.25 inches. They must be corrosion-resistant and suitable for high-pressure applications.',
//     uploadedFile: 'technical_specifications.pdf'
//   }

//   const shopDetails = {
//     name: 'Steel Masters Inc.',
//     logo: '/placeholder.svg?height=100&width=100',
//     address: '123 Industrial Avenue, Steel City, SC 12345',
//     phone: '+1 (555) 123-4567',
//     email: 'info@steelmasters.com'
//   }

//   const handleFileOpen = () => {
//     // Simulating file content reading
//     setFileContent('This is the content of the technical specifications file...')
//     setIsFileOpen(true)
//   }

//   return (
//     <div style={{
//       fontFamily: 'Arial, sans-serif',
//       maxWidth: '800px',
//       margin: '0 auto',
//       padding: '20px',
//       backgroundColor: '#f0f4f8',
//       borderRadius: '10px',
//       boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//     }}>
//       <h1 style={{
//         color: '#2c3e50',
//         borderBottom: '2px solid #E94560',
//         paddingBottom: '10px',
//         marginBottom: '20px'
//       }}>Request for Quotation Details</h1>
      
//       <div style={{
//         backgroundColor: 'white',
//         padding: '20px',
//         borderRadius: '8px',
//         marginBottom: '20px'
//       }}>
//         <h2 style={{ color: '#E94560', marginBottom: '15px' }}>Product Information</h2>
//         <p><strong>ID:</strong> {productDetails.id}</p>
//         <p><strong>Product Name:</strong> {productDetails.productName}</p>
//         <p><strong>Quantity:</strong> {productDetails.quantity}</p>
//         <p><strong>Measurement Unit:</strong> {productDetails.measurementUnit}</p>
//       </div>

//       <div style={{
//         backgroundColor: 'white',
//         padding: '20px',
//         borderRadius: '8px',
//         marginBottom: '20px'
//       }}>
//         <h2 style={{ color: '#E94560', marginBottom: '15px' }}>Detailed Requirements</h2>
//         <p style={{ lineHeight: '1.6' }}>{productDetails.detailedRequirements}</p>
//       </div>

//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'
import authService from 'services/authService'

export default function Component({ params }: { params: { id: string } }) {
  // const [isHovered, setIsHovered] = useState(false)
  const [productDetails, setProductDetails] = useState({
    id: '',
    productName: '',
    quantity: 0,
    measurementUnit: '',
    detailedRequirements: '',
  })
  const [rfqVendorData, setRfqVendorData] = useState([])

  const token = authService.getToken()
  const rfqVendorResponseApiUrl = `https://frontend.tizaraa.com/api/rfq-vendor-responses/${params.id}`

  // Fetch RFQ vendor response data from the API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(rfqVendorResponseApiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()
        if (data.success) {
          const rfqData = data.rfq_details_data
          setProductDetails({
            id: rfqData.id,
            productName: rfqData.product_name,
            quantity: rfqData.quantity,
            measurementUnit: rfqData.measurement_name,
            detailedRequirements: rfqData.specifications,
          })
          setRfqVendorData(data.vendor_responses)
        }
      } catch (error) {
        console.error('Error fetching RFQ vendor response:', error)
      }
    }

    fetchProductDetails()
  }, [params.id, token])

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f0f4f8',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      <h1 style={{
        color: '#2c3e50',
        borderBottom: '2px solid #E94560',
        paddingBottom: '10px',
        marginBottom: '20px',
      }}>Request for Quotation Details</h1>

      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
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
        marginBottom: '20px',
      }}>
        <h2 style={{ color: '#E94560', marginBottom: '15px' }}>Detailed Requirements</h2>
        <p style={{ lineHeight: '1.6' }}>{productDetails.detailedRequirements}</p>
      </div>

      {rfqVendorData.length > 0 && (
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
        }}>
          <h2 style={{ color: '#E94560', marginBottom: '15px' }}>Seller Responses</h2>
          {rfqVendorData.map((vendor, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              marginBottom: '15px',
              transition: 'all 0.3s ease',
              // transform: isHovered ? 'scale(1.02)' : 'scale(1)',
              // boxShadow: isHovered ? '0 6px 12px rgba(0, 0, 0, 0.1)' : 'none'
            }}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
            >
              <img 
                src={vendor.seller_logo} 
                alt={`${vendor.shop_name} logo`}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  marginRight: '20px',
                  border: '2px solid #E94560'
                }}
              />
              <div>
                <h3 style={{ color: '#E94560', marginBottom: '10px', fontSize: '1.2em' }}>{vendor.shop_name}</h3>
                <p style={{ marginBottom: '5px' }}><strong>Seller:</strong> {vendor.seller_info}</p>
                {/* Example of contact info display */}
                {/* Uncomment and add appropriate fields if needed */}
                {/* <p style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <Mail size={16} style={{ marginRight: '5px', color: '#E94560' }} />
                  {vendor.seller_info.email}
                </p>
                <p style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                  <Phone size={16} style={{ marginRight: '5px', color: '#E94560' }} />
                  {vendor.seller_info.phone}
                </p>
                <p style={{ display: 'flex', alignItems: 'center' }}>
                  <MapPin size={16} style={{ marginRight: '5px', color: '#E94560' }} />
                  {vendor.seller_info.address}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
