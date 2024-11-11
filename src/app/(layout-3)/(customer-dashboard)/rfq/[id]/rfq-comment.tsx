'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
//import { Avatar } from '@/components/ui/avatar'
//import { Button } from '@/components/ui/button'
import { ChevronLeft, Send } from 'lucide-react'
import Avatar from '@component/avatar'
import { Button } from '@component/buttons'
import 'react-quill/dist/quill.snow.css';

// Dynamic import of react-quill for rich text editing
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function RfqComment() {
  const [comment, setComment] = useState('')
  const [hover, setHover] = useState(false)

  const comments = [
    {
      id: 1,
      author: 'Esther Howard',
      timestamp: '02:39 PM | 14 Dec 2023',
      content: 'We need to clarify the specifications for the industrial equipment. Can you provide more details on the required capacity and dimensions?',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    {
      id: 2,
      author: 'Ralph Edwards',
      timestamp: '11:39 AM | 15 Dec 2023',
      content: 'Ive attached the updated specifications document. Please review and let me know if you need any further information.',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    {
      id: 3,
      author: 'Esther Howard',
      timestamp: '02:39 PM | 15 Dec 2023',
      content: 'Thank you for the quick response. The specifications look good. Can you provide an estimated timeline for delivery?',
      avatar: '/placeholder.svg?height=40&width=40'
    }
  ]

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#E94560', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '18px', color: 'white' }}>RFQ</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '600', margin: 0, color: '#E94560' }}>Request for Quotation</h1>
        </div>
        <Button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: hover ? '#E64A56' : '#E94560', // Lighter red on hover
        color: '#fff',
        fontWeight: '500',
        transition: 'background-color 0.3s ease', // Smooth transition for background color change
      }}
      onMouseEnter={() => setHover(true)} // Change hover state on mouse enter
      onMouseLeave={() => setHover(false)} // Reset hover state on mouse leave
    >
      <ChevronLeft size={18} />
      Back to RFQ List
    </Button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {comments.map((comment) => (
          <div key={comment.id} style={{ display: 'flex', gap: '16px', backgroundColor: '#f8f9fa', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <Avatar style={{ width: '48px', height: '48px' }}>
              <img src={comment.avatar} alt={comment.author} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            </Avatar>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: '600', marginRight: '8px', color: '#333' }}>{comment.author}</span>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>{comment.timestamp}</span>
              </div>
              <p style={{ margin: 0, lineHeight: '1.6', color: '#4b5563' }}>{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <ReactQuill
          value={comment}
          onChange={setComment}
          style={{ 
            height: 'auto',
            backgroundColor: '#ffffff'
          }}
          modules={{
            toolbar: [
              [{ 'header': [1, 2, 3, 4, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
              ['link', 'image'],
              ['clean']
            ],
          }}
          formats={[
            'header',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image'
          ]}
        />
        
      </div>
      <div className="" style={{display: "flex", justifyContent: "flex-end"}}>
        <Button 
            style={{
                margin: "20px",
              backgroundColor: '#E94560',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: '600',
              transition: 'background-color 0.3s ease'
            }}
          >
            Post Comment
            <Send size={18} />
          </Button>
        </div>
    </div>
  )
}