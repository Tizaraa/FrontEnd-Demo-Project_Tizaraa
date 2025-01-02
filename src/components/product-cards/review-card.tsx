'use client'

import Image from 'next/image'
import { useEffect, useState, CSSProperties } from 'react'
import axios from 'axios'
import ApiBaseUrl from 'api/ApiBaseUrl'
import ProductRating from './product-rating'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export default function ReviewCard({ productId }: { productId: string }) {
  const [isMobile, setIsMobile] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [modalImages, setModalImages] = useState<string[]>([])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${ApiBaseUrl.baseUrl}product/comment/${productId}`
        )
        // Assuming the API response structure provided
        setComments(response.data.rating || [])
      } catch (err) {
        console.error('Error fetching comments:', err)
        setError("Failed to load reviews. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchComments()

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [productId])

  const openModal = (images: string[], index: number) => {
    setModalImages(images)
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentImageIndex(0)
    setModalImages([])
  }

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % modalImages.length)
  }

  const showPrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? modalImages.length - 1 : prevIndex - 1
    )
  }
  const isMobilee = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;
  const styles: Record<string, CSSProperties> = {
    container: {
      padding: isMobilee ? '16px' : '20px',
      width: isSmallMobile ? '95%' : isMobilee ? '90%' : '70%', // Responsive width
      maxWidth: '1200px',
      boxSizing: 'border-box', 
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px'
    },
    header: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
    avatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#4C6EF5',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    userInfo: { display: 'flex', flexDirection: 'column' as const },
    userName: { fontSize: '16px', fontWeight: '500' },
    date: { color: '#6B7280', fontSize: '14px' },
    rating: { display: 'flex', gap: '4px'},
    star: { color: '#FFC107', fontSize: '14px' },
    reviewText: { fontSize: '16px', lineHeight: '1.5', color: '#1F2937', marginTop: '-10px' },
    productImage: { borderRadius: '4px', height: '300px', cursor: 'pointer' },
    modalOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      position: 'relative' as const,
      width: '100%',
      objectFit: 'cover',
      maxWidth: '700px',
      textAlign: 'center',
    },
    modalImage: { width: '100%', borderRadius: '8px' },
    closeButton: {
      position: 'absolute' as const,
      top: '10px',
      right: '10px',
      background: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      cursor: 'pointer',
    },
    navButton: {
      position: 'absolute' as const,
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      cursor: 'pointer',
    },
    prevButton: { left: '10px' },
    nextButton: { right: '10px' },
  }

  if (loading) return <div>Loading...</div>
  if (error) return <p>{error}</p>

  return (
    <div style={styles.container}>
        <ProductRating productId={productId}></ProductRating>
        {comments.map((comment, index) => (
    <div key={index} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent:"space-between" }}>
        {/* User image, name, rating */}
        <div style={styles.header}>
          <div style={styles.avatar}>{comment.user[0]}</div>
          <div style={styles.userInfo}>
            <div style={styles.userName}>{comment.user}</div>
            <div style={styles.rating}>
              {Array.from({ length: Number(comment.rating) }).map((_, i) => (
                <span key={i} style={styles.star}>
                  <FontAwesomeIcon icon={faStar} />
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Rating date */}
        <div style={styles.date}>{comment.comment_date}</div>
      </div>

      <p style={styles.reviewText}>{comment.user_comment}</p>

      <div
        style={{
          width: '200px',
          height: comment.allimages.length > 0 ? '200px' : '0', // Set height to 0 if no images
          position: 'relative',
          overflow: 'hidden', // Ensures no empty space is visible
        }}
      >
        {comment.allimages.map((image: any, imgIndex: number) => (
          <Image
            key={imgIndex}
            src={`${ApiBaseUrl.ImgUrl}${image.image}`}
            alt="Review Image"
            layout="fill" // Use layout="fill" to make the image fill the container
            objectFit="cover" // Ensures the image covers the container proportionally
            style={{ cursor: 'pointer', borderRadius: '4px' }}
            onClick={() =>
              openModal(
                comment.allimages.map((img: any) => `${ApiBaseUrl.ImgUrl}${img.image}`),
                imgIndex
              )
            }
          />
        ))}
      </div>

      {/* Only show <hr> if it's not the last comment */}
      {index !== comments.length - 1 && (
        <hr style={{ border: '0', borderTop: '1px solid #d3d3d3' }} />
      )}
    </div>
  ))}

{/* image slide  */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <button style={styles.closeButton} onClick={closeModal}>
              ✕
            </button>
            <Image
              src={modalImages[currentImageIndex]}
              alt="Preview"
              width={500}
              height={500}
              style={styles.modalImage}
            />
            <button
              style={{ ...styles.navButton, ...styles.prevButton }}
              onClick={showPrevImage}
            >
              ◀
            </button>
            <button
              style={{ ...styles.navButton, ...styles.nextButton }}
              onClick={showNextImage}
            >
              ▶
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
