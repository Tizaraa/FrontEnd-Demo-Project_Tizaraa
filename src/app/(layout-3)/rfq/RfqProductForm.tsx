// 'use client'

// import { useState } from 'react'
// import { ChevronDown, Upload } from 'lucide-react'

// export default function Component() {
//   const [category, setCategory] = useState('')
//   const [quantity, setQuantity] = useState('')
//   const [agree, setAgree] = useState(false)

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
//     appearance: 'none',
//     paddingRight: '30px',
//     background: `#f8f9fa url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`,
//     backgroundSize: '20px',
//   }

//   const textareaStyle = {
//     ...inputStyle,
//     height: '150px',
//     resize: 'vertical',
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
//     backgroundColor: '#ffc107',
//     color: '#000',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '18px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   }

//   return (
//     <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
//       <div style={{ marginBottom: '20px' }}>
//         <label style={labelStyle}>Product Name</label>
//         <input type="text" placeholder="Product Name" style={inputStyle} />
//       </div>

//       <div style={{ marginBottom: '20px' }}>
//         <label style={labelStyle}>Choose Category</label>
//         <select 
//           value={category} 
//           onChange={(e) => setCategory(e.target.value)}
//           style={dropdownStyle}
//         >
//           <option value="">Choose a category</option>
//           <option value="category1">Category 1</option>
//           <option value="category2">Category 2</option>
//           <option value="category3">Category 3</option>
//         </select>
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
//         onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ffca2c'}
//         onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffc107'}
//       >
//         Submit
//       </button>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { ChevronDown, Upload } from 'lucide-react'

export default function RfqProductForm() {
  const [category, setCategory] = useState('')
  const [quantity, setQuantity] = useState('')
  const [agree, setAgree] = useState(false)

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    backgroundColor: '#f8f9fa',
    color: '#343a40',
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    color: '#6c757d',
    fontSize: '18px',
  }

  const dropdownStyle = {
    ...inputStyle,
    appearance: 'none' as const, // Fixing the error with 'as const'
    paddingRight: '30px',
    background: `#f8f9fa url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 10px center`,
    backgroundSize: '20px',
  }

  const textareaStyle = {
    ...inputStyle,
    height: '150px',
    resize: 'vertical' as const, // Fixing the error with 'as const'
  }

  const uploadAreaStyle = {
    border: '2px dashed #ccc',
    borderRadius: '4px',
    padding: '20px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    color: '#6c757d',
    marginBottom: '20px',
  }

  const checkboxStyle = {
    marginRight: '10px',
  }

  const submitButtonStyle = {
    backgroundColor: 'rgb(231, 75, 50)',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Product Name</label>
        <input type="text" placeholder="Product Name" style={inputStyle} />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={labelStyle}>Choose Category</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          style={dropdownStyle}
        >
          <option value="">Choose a category</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
          <option value="category3">Category 3</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>Quantity</label>
          <input type="number" placeholder="Please Enter" style={inputStyle} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>&nbsp;</label>
          <select 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)}
            style={dropdownStyle}
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
        <textarea placeholder="I'm looking for..." style={textareaStyle}></textarea>
      </div>

      <div style={uploadAreaStyle}>
        <Upload size={48} />
        <p>Click to upload or drag and drop</p>
        <p>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={agree}
            onChange={() => setAgree(!agree)}
            style={checkboxStyle}
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
  )
}

