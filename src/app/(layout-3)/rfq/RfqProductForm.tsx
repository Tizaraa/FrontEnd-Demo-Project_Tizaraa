// 'use client'

// import { useState } from 'react'
// import { ChevronDown, Upload } from 'lucide-react'

// export default function RfqProductForm() {
//   const [category, setCategory] = useState('')
//   const [quantity, setQuantity] = useState('')
//   const [agree, setAgree] = useState(false)

//   const containerStyle = {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
//     borderRadius: '8px',
//     backgroundColor: '#fff',
//   }

//   const headerStyle = {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#343a40',
//     marginBottom: '20px',
//     textAlign: 'center' as const,
//   }

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//     backgroundColor: '#f8f9fa',
//     color: '#343a40',
//   }

//   const labelStyle = {
//     display: 'block',
//     marginBottom: '5px',
//     color: '#6c757d',
//     fontSize: '18px',
//   }

//   const dropdownStyle = {
//     ...inputStyle,
//     appearance: 'none' as const,
//     paddingRight: '30px',
//     background: `#f8f9fa url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`,
//     backgroundSize: '20px',
//   }

//   const textareaStyle = {
//     ...inputStyle,
//     height: '150px',
//     resize: 'vertical' as const,
//   }

//   const uploadAreaStyle = {
//     border: '2px dashed #ccc',
//     borderRadius: '4px',
//     padding: '20px',
//     textAlign: 'center' as const,
//     cursor: 'pointer',
//     color: '#6c757d',
//     marginBottom: '20px',
//   }

//   const checkboxStyle = {
//     marginRight: '10px',
//   }

//   const submitButtonStyle = {
//     backgroundColor: 'rgb(231, 75, 50)',
//     color: '#fff',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '18px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   }

//   return (
//     <div style={containerStyle}>
//       <h2 style={headerStyle}>Request for Quotation</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label style={labelStyle}>Product Name</label>
//         <input type="text" placeholder="Product Name" style={inputStyle} />
//       </div>

//       <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
//         <div style={{ flex: 1 }}>
//           <label style={labelStyle}>Quantity</label>
//           <input type="number" placeholder="Please Enter" style={inputStyle} />
//         </div>
//         <div style={{ flex: 1 }}>
//           <label style={labelStyle}>&nbsp;</label>
//           <select 
//             value={quantity} 
//             onChange={(e) => setQuantity(e.target.value)}
//             style={dropdownStyle}
//           >
//             <option value="">Pieces</option>
//             <option value="units">Units</option>
//             <option value="kg">Kilograms</option>
//             <option value="liters">Liters</option>
//           </select>
//         </div>
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label style={labelStyle}>Detailed Requirements</label>
//         <textarea placeholder="I'm looking for..." style={textareaStyle}></textarea>
//       </div>

//       <div style={uploadAreaStyle}>
//         <Upload size={48} />
//         <p>Click to upload or drag and drop</p>
//         <p>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//           <input 
//             type="checkbox" 
//             checked={agree}
//             onChange={() => setAgree(!agree)}
//             style={checkboxStyle}
//           />
//           I agree to share my Business card with quoted suppliers
//         </label>
//       </div>

//       <button 
//         style={submitButtonStyle} 
//         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E97451'}
//         onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgb(231, 75, 50)'}
//       >
//         Submit
//       </button>
//     </div>
//   )
// }

// 'use client'

// import { useState, useEffect } from 'react'
// import { Upload } from 'lucide-react'
// import axios from 'axios'
// import authService from "services/authService";

// // Define interfaces for API response
// interface ProductSuggestion {
//   product_name: string;
// }

// interface ApiResponse {
//   data: ProductSuggestion[];
// }

// export default function RfqProductForm() {
//   const [productName, setProductName] = useState('')
//   const [quantity, setQuantity] = useState('')
//   const [agree, setAgree] = useState(false)
//   const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([])
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)

//   // Styles
//   const containerStyle = {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
//     borderRadius: '8px',
//     backgroundColor: '#fff',
//   }

//   const headerStyle = {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#343a40',
//     marginBottom: '20px',
//     textAlign: 'center' as const,
//   }

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//     backgroundColor: '#f8f9fa',
//     color: '#343a40',
//   }

//   const labelStyle = {
//     display: 'block',
//     marginBottom: '5px',
//     color: '#6c757d',
//     fontSize: '18px',
//   }

//   const dropdownStyle = {
//     ...inputStyle,
//     appearance: 'none' as const,
//     paddingRight: '30px',
//     background: `#f8f9fa url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`,
//     backgroundSize: '20px',
//   }

//   const textareaStyle = {
//     ...inputStyle,
//     height: '150px',
//     resize: 'vertical' as const,
//   }

//   const uploadAreaStyle = {
//     border: '2px dashed #ccc',
//     borderRadius: '4px',
//     padding: '20px',
//     textAlign: 'center' as const,
//     cursor: 'pointer',
//     color: '#6c757d',
//     marginBottom: '20px',
//   }

//   const checkboxStyle = {
//     marginRight: '10px',
//   }

//   const submitButtonStyle = {
//     backgroundColor: 'rgb(231, 75, 50)',
//     color: '#fff',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '18px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   }
  
//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       const token = authService.getToken();
//       if (productName) {
//         try {
//           const response = await axios.get<ApiResponse>(`https://frontend.tizaraa.com/api/product-suggestions?search=${productName}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setSuggestions(response.data.data); // Adjusted to correctly access the 'data' field
//         } catch (error) {
//           console.error('Error fetching product suggestions:', error);
//         }
//       } else {
//         setSuggestions([]); // Clear suggestions if input is empty
//       }
//     };

//     fetchSuggestions();
//   }, [productName]);

//   const handleProductSelection = (name: string) => {
//     setProductName(name);
//     setSuggestions([]); // Clear suggestions on selection
//     setIsDropdownOpen(false); // Close dropdown
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={headerStyle}>Request for Quotation</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label style={labelStyle}>Product Name</label>
//         <input 
//           type="text" 
//           value={productName}
//           onChange={(e) => {
//             setProductName(e.target.value);
//             setIsDropdownOpen(true); // Open dropdown on input change
//           }}
//           onBlur={() => setIsDropdownOpen(false)} // Close dropdown on blur
//           onFocus={() => setIsDropdownOpen(suggestions.length > 0)} // Keep dropdown open on focus if suggestions exist
//           placeholder="Product Name" 
//           style={inputStyle} 
//         />
//         {isDropdownOpen && suggestions.length > 0 && (
//           <ul style={{ border: '1px solid #ccc', borderRadius: '4px', maxHeight: '150px', overflowY: 'auto', padding: '0', margin: '5px 0', listStyleType: 'none', backgroundColor: '#fff' }}>
//             {suggestions.map((suggestion) => (
//               <li 
//                 key={suggestion.product_name} // Assuming product_name is unique
//                 onClick={() => handleProductSelection(suggestion.product_name)}
//                 style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ddd' }}
//               >
//                 {suggestion.product_name}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
//         <div style={{ flex: 1 }}>
//           <label style={labelStyle}>Quantity</label>
//           <input type="number" placeholder="Please Enter" style={inputStyle} />
//         </div>
//         <div style={{ flex: 1 }}>
//           <label style={labelStyle}>&nbsp;</label>
//           <select 
//             value={quantity} 
//             onChange={(e) => setQuantity(e.target.value)}
//             style={dropdownStyle}
//           >
//             <option value="">Pieces</option>
//             <option value="units">Units</option>
//             <option value="kg">Kilograms</option>
//             <option value="liters">Liters</option>
//           </select>
//         </div>
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label style={labelStyle}>Detailed Requirements</label>
//         <textarea placeholder="I'm looking for..." style={textareaStyle}></textarea>
//       </div>

//       <div style={uploadAreaStyle}>
//         <Upload size={48} />
//         <p>Click to upload or drag and drop</p>
//         <p>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//           <input 
//             type="checkbox" 
//             checked={agree}
//             onChange={() => setAgree(!agree)}
//             style={checkboxStyle}
//           />
//           I agree to share my Business card with quoted suppliers
//         </label>
//       </div>

//       <button 
//         style={submitButtonStyle} 
//         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E97451'}
//         onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgb(231, 75, 50)'}
//       >
//         Submit
//       </button>
//     </div>
//   )
// }

// 'use client'

// import { useState, useEffect } from 'react';
// import { Upload } from 'lucide-react';
// import axios from 'axios';
// import authService from "services/authService";

// // Define interfaces for API response
// interface ProductSuggestion {
//   product_name: string;
//   id: number;
// }

// interface ApiResponse {
//   data: ProductSuggestion[];
// }

// export default function RfqProductForm() {
//   const [productName, setProductName] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [agree, setAgree] = useState(false);
//   const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // Styles for the component
//   const containerStyle = {
//     maxWidth: '600px',
//     margin: '0 auto',
//     padding: '20px',
//     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
//     borderRadius: '8px',
//     backgroundColor: '#fff',
//   };

//   const headerStyle = {
//     fontSize: '24px',
//     fontWeight: 'bold',
//     color: '#343a40',
//     marginBottom: '20px',
//     textAlign: 'center' as const,
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//     backgroundColor: '#f8f9fa',
//     color: '#343a40',
//     position: 'relative' as const,
//   };

//   const labelStyle = {
//     display: 'block',
//     marginBottom: '5px',
//     color: '#6c757d',
//     fontSize: '18px',
//   };

//   const dropdownStyle: React.CSSProperties = {
//     position: 'absolute',
//     zIndex: 1000,
//     backgroundColor: '#fff',
//     maxHeight: '150px',
//     overflowY: 'auto', // Ensure this is a valid value
//     marginTop: '5px',
//     border: '1px solid #ccc',
//     width: '100%',
//     borderRadius: '4px',
//   };

//   const submitButtonStyle = {
//     backgroundColor: 'rgb(231, 75, 50)',
//     color: '#fff',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '18px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   };

//   useEffect(() => {
//     const fetchSuggestions = async () => {
//       const token = authService.getToken();
//       if (productName) {
//         try {
//           const response = await axios.get<ApiResponse>(
//             `https://frontend.tizaraa.com/api/product-suggestions?search=${productName}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );
//           setSuggestions(response.data.data); // Fetch suggestions
//           setIsDropdownOpen(response.data.data.length > 0); // Open dropdown if there are suggestions
//         } catch (error) {
//           console.error('Error fetching product suggestions:', error);
//         }
//       } else {
//         setSuggestions([]); // Clear suggestions if input is empty
//         setIsDropdownOpen(false); // Close dropdown
//       }
//     };

//     fetchSuggestions();
//   }, [productName]);

//   const handleProductSelection = (product_name: string) => {
//     setProductName(product_name); // Set the selected product name in the input
//     setSuggestions([]); // Clear suggestions on selection
//     setIsDropdownOpen(false); // Close dropdown
//   };

//   const handleClearProductName = () => {
//     setProductName(''); // Clear the product name
//     setSuggestions([]); // Clear suggestions
//     setIsDropdownOpen(false); // Close dropdown
//   };

//   return (
//     <div style={containerStyle}>
//       <h2 style={headerStyle}>Request for Quotation</h2>

//       <div style={{ marginBottom: '20px' }}>
//         <label style={labelStyle}>Product Name</label>
//         <div style={{ position: 'relative' }}>
//           <input 
//             type="text" 
//             value={productName}
//             onChange={(e) => {
//               setProductName(e.target.value);
//               setIsDropdownOpen(true); // Open dropdown on input change
//             }}
//             onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Close dropdown on blur after a delay
//             onFocus={() => setIsDropdownOpen(suggestions.length > 0)} // Keep dropdown open on focus if suggestions exist
//             placeholder="Product Name" 
//             style={inputStyle} 
//           />
//           {productName && (
//             <button 
//               onClick={handleClearProductName} 
//               style={{
//                 position: 'absolute',
//                 right: '10px',
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 background: 'transparent',
//                 border: 'none',
//                 cursor: 'pointer',
//                 color: '#6c757d',
//               }}
//             >
//               &times; {/* Close symbol */}
//             </button>
//           )}
//         </div>
//         {isDropdownOpen && suggestions.length > 0 && (
//           <ul style={dropdownStyle}>
//             {suggestions.map((suggestion) => (
//               <li 
//                 key={suggestion.id} // Using id for unique key
//                 onClick={() => handleProductSelection(suggestion.product_name)} // Set selected product name on click
//                 style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #ddd' }}
//               >
//                 {suggestion.product_name} {/* Display product name from suggestions */}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label style={labelStyle}>Quantity</label>
//         <input 
//           type="number" 
//           placeholder="Please Enter" 
//           value={quantity}
//           onChange={(e) => setQuantity(e.target.value)} 
//           style={inputStyle} 
//         />
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label style={labelStyle}>Detailed Requirements</label>
//         <textarea placeholder="I'm looking for..." style={{ ...inputStyle, height: '150px' }}></textarea>
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
//           <input 
//             type="checkbox" 
//             checked={agree}
//             onChange={() => setAgree(!agree)}
//             style={{ marginRight: '10px' }}
//           />
//           I agree to share my Business card with quoted suppliers
//         </label>
//       </div>

//       <button 
//         style={submitButtonStyle} 
//         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E97451'}
//         onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgb(231, 75, 50)'}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }

'use client'

import { useState, useEffect } from 'react';
import { Upload } from 'lucide-react';
import axios from 'axios';
import authService from "services/authService";

// Define interfaces for API response
interface ProductSuggestion {
  product_name: string;
  id: number;
}

interface ApiResponse {
  data: ProductSuggestion[];
}

export default function RfqProductForm() {
  const [productName, setProductName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(''); 
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [agree, setAgree] = useState(false);
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Styles for the component
  const containerStyle: React.CSSProperties = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
    borderRadius: '8px',
    backgroundColor: '#fff',
    position: 'relative', // Position the container relative to position dropdown absolutely within it
  };

  const headerStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: '20px',
    textAlign: 'center' as const,
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: '#f8f9fa',
    color: '#343a40',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    position: 'relative' as const,
    
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    color: '#6c757d',
    fontSize: '18px',
  };

  const dropdownStyles = {
         ...inputStyle,
         appearance: 'none' as const, // Fixing the error with 'as const'
         paddingRight: '30px',
         background: `#f8f9fa url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`,
         backgroundSize: '20px',
       }

  const dropdownStyle: React.CSSProperties = {
    ...inputStyle,
    position: 'relative' as const,
    zIndex: 1000,
    backgroundColor: '#fff',
    maxHeight: '150px',
    overflow: 'auto', 
    marginTop: '5px',
    border: '1px solid #ccc',
    width: '100%',
    borderRadius: '4px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'left' as const,
    padding: '5px 0',
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: '10px 15px',
    cursor: 'pointer',
    borderBottom: '1px solid #ddd',
    whiteSpace: '',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '100%',
    textAlign: 'left' as const,
  };

  const submitButtonStyle: React.CSSProperties = {
    backgroundColor: 'rgb(231, 75, 50)',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      const token = authService.getToken();
      if (productName && !selectedProduct) {
        try {
          const response = await axios.get<ApiResponse>(
            `https://frontend.tizaraa.com/api/product-suggestions?search=${productName}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setSuggestions(response.data.data); // Fetch suggestions
          setIsDropdownOpen(response.data.data.length > 0); // Open dropdown if there are suggestions
        } catch (error) {
          console.error('Error fetching product suggestions:', error);
        }
      } else {
        setSuggestions([]); // Clear suggestions if input is empty
        setIsDropdownOpen(false); // Close dropdown
      }
    };

    fetchSuggestions();
  }, [productName,selectedProduct]);

  const handleProductSelection = (product_name: string) => {
    setProductName(product_name);
    setSelectedProduct(product_name); // Set the selected product name in the input
    setSuggestions([]); // Clear suggestions on selection
    setIsDropdownOpen(false); // Close dropdown
    
  };

  const handleClearProductName = () => {
    setProductName(''); // Clear the product name
    setSelectedProduct('');
    setSuggestions([]); // Clear suggestions
    setIsDropdownOpen(false); // Close dropdown
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
    setSelectedProduct('');
    setIsDropdownOpen(true); // Reopen dropdown on input change
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Request for Quotation</h2>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Product Name</label>
        <div style={{ position: 'relative' }}>
          <input 
            type="text" 
            value={productName}
            onChange={handleInputChange}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)} // Close dropdown on blur after a delay
            onFocus={() => setIsDropdownOpen(suggestions.length > 0)} // Keep dropdown open on focus if suggestions exist
            placeholder="Product Name" 
            style={inputStyle} 
          />
          {productName && (
            <button 
              onClick={handleClearProductName} 
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#6c757d',
              }}
            >
              &times; {/* Close symbol */}
            </button>
          )}
        </div>
        {isDropdownOpen && suggestions.length > 0 && (
          <ul style={dropdownStyle}>
            {suggestions.map((suggestion) => (
              <li 
                key={suggestion.product_name} // Using id for unique key
                onClick={() => handleProductSelection(suggestion.product_name)} // Set selected product name on click
                style={dropdownItemStyle}
              >
                {suggestion.product_name} {/* Display product name from suggestions */}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
         <div style={{ flex: 1 }}>
           <label style={labelStyle}>Quantity</label>
           <input type="number" placeholder="Please Enter" style={inputStyle} />
         </div>
         <div style={{ flex: 1 }}>
           <label style={labelStyle}>Unit</label>
           <select 
             value={quantity} 
             onChange={(e) => setQuantity(e.target.value)}
             style={dropdownStyles}
           >
             <option value="">Pieces</option>
             <option value="units">Units</option>
             <option value="kg">Kilograms</option>
             <option value="liters">Liters</option>
           </select>
         </div>
       </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Detailed Requirements</label>
        <textarea placeholder="I'm looking for..." style={{ ...inputStyle, height: '150px' }}></textarea>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={agree}
            onChange={() => setAgree(!agree)}
            style={{ marginRight: '10px' }}
          />
          I agree to share my Business card with quoted suppliers
        </label>
      </div>

      <button 
        style={submitButtonStyle} 
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E97451'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgb(231, 75, 50)'}
      >
        Submit
      </button>
    </div>
  );
}


