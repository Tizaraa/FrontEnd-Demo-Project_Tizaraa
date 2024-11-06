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

"use client";

import { useRef, useState, useEffect } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import authService from "services/authService";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css";
import BeatLoader from "react-spinners/BeatLoader";

// Define interfaces for API responses
interface ProductSuggestion {
  product_name: string;
  id: number;
}

interface ApiResponse {
  data: ProductSuggestion[];
}

interface MeasurementUnit {
  id: number;
  measure: string;
  sm_measure: string;
}

export default function RfqProductForm() {
  const [productName, setProductName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [agree, setAgree] = useState(false);
  const [specifications, setSpecifications] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [suggestions, setSuggestions] = useState<ProductSuggestion[]>([]);
  const [measurementUnits, setMeasurementUnits] = useState<MeasurementUnit[]>(
    []
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Loader state

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Styles for the component
  const containerStyle: React.CSSProperties = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
    borderRadius: "8px",
    backgroundColor: "#fff",
    position: "relative",
  };

  const headerStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: "20px",
    textAlign: "center" as const,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    backgroundColor: "#f8f9fa",
    color: "#343a40",
    textOverflow: "ellipsis",
    overflow: "hidden",
    position: "relative" as const,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "5px",
    color: "#6c757d",
    fontSize: "18px",
  };

  const errorMessageStyle: React.CSSProperties = {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  };

  const dropdownStyles = {
    ...inputStyle,
    appearance: "none" as const,
    paddingRight: "30px",
    background: `#f8f9fa url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`,
    backgroundSize: "20px",
  };

  const dropdownStyle: React.CSSProperties = {
    ...inputStyle,
    position: "relative" as const,
    zIndex: 1000,
    backgroundColor: "#fff",
    maxHeight: "150px",
    overflow: "auto",
    marginTop: "5px",
    border: "1px solid #ccc",
    width: "100%",
    borderRadius: "4px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "left" as const,
    padding: "5px 0",
  };

  const dropdownItemStyle: React.CSSProperties = {
    padding: "10px 15px",
    cursor: "pointer",
    borderBottom: "1px solid #ddd",
    whiteSpace: "",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "100%",
    textAlign: "left" as const,
  };

  const submitButtonStyle: React.CSSProperties = {
    backgroundColor: "rgb(231, 75, 50)",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    fontSize: "18px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const uploadAreaStyle = {
    border: "2px dashed #ccc",
    borderRadius: "4px",
    padding: "20px",
    textAlign: "center" as const,
    cursor: "pointer",
    color: "#6c757d",
    marginBottom: "20px",
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
          setSuggestions(response.data.data);
          setIsDropdownOpen(response.data.data.length > 0);
        } catch (error) {
          console.error("Error fetching product suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setIsDropdownOpen(false);
      }
    };

    fetchSuggestions();
  }, [productName, selectedProduct]);

  useEffect(() => {
    const fetchMeasurementUnits = async () => {
      const token = authService.getToken();
      try {
        const response = await axios.get<{ data: MeasurementUnit[] }>(
          `https://frontend.tizaraa.com/api/measurements`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setMeasurementUnits(response.data.data);
      } catch (error) {
        console.error("Error fetching measurement units:", error);
      }
    };

    fetchMeasurementUnits();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height based on scrollHeight
    }
  }, [productName]);

  const handleProductSelection = (product_name: string) => {
    setProductName(product_name);
    setSelectedProduct(product_name);
    setSuggestions([]);
    setIsDropdownOpen(false);
    setErrors((prev) => ({ ...prev, productName: "" }));
  };

  const handleClearProductName = () => {
    setProductName("");
    setSelectedProduct("");
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height based on scrollHeight
    setProductName(textarea.value);
    setSelectedProduct("");
    setIsDropdownOpen(true);
    setErrors((prev) => ({ ...prev, productName: "" }));
  };

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || parseInt(value) > 0) {
      // Allow empty or positive values
      setQuantity(value);
      setErrors((prev) => ({ ...prev, quantity: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    // Validation logic
    const newErrors: { [key: string]: string } = {};
    if (!productName) newErrors.productName = "Product name is required.";
    if (!quantity || parseInt(quantity) <= 0)
      newErrors.quantity = "Quantity must be a positive number.";
    if (!unit) newErrors.unit = "Unit is required.";
    if (!specifications)
      newErrors.specifications = "Specifications are required.";
    if (!agree) newErrors.agree = "You must agree to the terms.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false); // Stop loading if there are errors
      return; // Stop submission if there are errors
    }
    const token = authService.getToken();
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("quantity", quantity);
    formData.append("specifications", specifications);
    formData.append("measurement_id", unit);
    if (file) formData.append("file", file);

    try {
      await axios.post(
        "https://frontend.tizaraa.com/api/create-rfq",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProductName("");
      setSelectedProduct("");
      setQuantity("");
      setUnit("");
      setSpecifications("");
      setFile(null);
      setFileName("");
      setAgree(false);
      setErrors({});
      setSuggestions([]);
      setIsDropdownOpen(false);
      toast.success("Request For Quotation form submitted successfully!");
      //toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to submit RFQ");
    }finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Request for Quotation</h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Product Name</label>
        <div style={{ position: "relative", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          
          <textarea
            ref={textareaRef} // Reference to the textarea
            value={productName}
            onChange={handleInputChange}
            onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
            onFocus={() => setIsDropdownOpen(suggestions.length > 0)}
            placeholder="Product Name"
            style={{ ...inputStyle, overflow: "hidden", resize: "none", paddingRight: "30px" }}
            rows={1} // Initial rows
          ></textarea>
          {productName && (
            <button
              onClick={handleClearProductName}
              style={{
                paddingLeft: "16px",
                position: "absolute",
                right: "1px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "30px",
                color: "#6c757d",
                textAlign: "center"
              }}
            >
              &times;
            </button>
          )}
        </div>
        {errors.productName && (
            <div style={{ color: "red" }}>{errors.productName}</div>
          )}
        {isDropdownOpen && suggestions.length > 0 && (
          <ul style={dropdownStyle}>
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.product_name}
                onClick={() => handleProductSelection(suggestion.product_name)}
                style={dropdownItemStyle}
              >
                {suggestion.product_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={handleQuantity}
            min="1"
            placeholder="Enter Quantity"
            style={inputStyle}
          />
          {errors.quantity && (
            <div style={{ color: "red" }}>{errors.quantity}</div>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Unit</label>
          <select
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value);
              setErrors((prev) => ({ ...prev, unit: "" })); // Clear unit error
            }}
            style={dropdownStyles}
          >
            <option value="">Select Unit</option>
            {measurementUnits.map((unit) => (
              <option key={unit.id} value={unit.id.toString()}>
                {unit.measure} ({unit.sm_measure})
              </option>
            ))}
          </select>
          {errors.unit && <div style={{ color: "red" }}>{errors.unit}</div>}
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Detailed Requirements</label>
        <textarea
          value={specifications}
          onChange={(e) => {
            setSpecifications(e.target.value);
            setErrors((prev) => ({ ...prev, specifications: "" })); // Clear specifications error
          }}
          placeholder="I'm looking for..."
          style={{ ...inputStyle, height: "150px" }}
        ></textarea>
        {errors.specifications && (
          <div style={{ color: "red" }}>{errors.specifications}</div>
        )}
      </div>

      <div
        style={uploadAreaStyle}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Upload size={48} />
        {fileName ? <p>{fileName}</p> : <p>Click to upload or drag and drop</p>}
        <p>SVG, PNG, JPG or GIF (MAX. 800x400px), PDF, DOCX</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <input
            type="checkbox"
            checked={agree}
            onChange={() => {
              const newAgree = !agree;
              setAgree(newAgree);
              // Set or clear error based on the new state of the checkbox
              setErrors((prev) => ({
                ...prev,
                agree: newAgree ? "" : "You must agree to the terms.",
              }));
            }}
            style={{ marginRight: "10px" }}
          />
          I agree to share my Business card with quoted suppliers
        </label>
        {errors.agree && <div style={{ color: "red" }}>{errors.agree}</div>}
      </div>

      <button
        style={submitButtonStyle}
        onClick={handleSubmit}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#E97451")}
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "rgb(231, 75, 50)")
        }
        disabled={loading}
      >
        {loading ? <BeatLoader size={18} color="#ec7f5f"  /> : "Submit"}
      </button>
    </div>
  );
}
