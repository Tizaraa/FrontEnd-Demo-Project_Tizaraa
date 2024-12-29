'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ApiBaseUrl from 'api/ApiBaseUrl'

export default function ReviewCard({ productId }: { productId: string }) {
  const [isMobile, setIsMobile] = useState(false)
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Fetch comments data
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${ApiBaseUrl.baseUrl}product/comment/${productId}`
        )
        setComments(response.data)
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

  const styles = {
    container: {
      padding: isMobile ? '16px' : '20px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
    },
    avatar: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: '#4C6EF5',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: '600',
    },
    userInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '4px',
    },
    userName: {
      fontSize: '16px',
      fontWeight: '500',
    },
    date: {
      color: '#6B7280',
      fontSize: '14px',
    },
    rating: {
      display: 'flex',
      gap: '4px',
      marginBottom: '16px',
    },
    star: {
      color: '#FF9900',
      fontSize: '24px',
    },
    reviewText: {
      fontSize: '16px',
      lineHeight: '1.5',
      color: '#1F2937',
      marginBottom: '16px',
    },
    productSection: {
      display: 'flex',
      gap: '12px',
    },
    productImage: {
      borderRadius: '4px',
    },


    spinnerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
      },
      spinner: {
        width: '50px',
        height: '50px',
        border: '5px solid rgba(0, 0, 0, 0.1)',
        borderTop: '5px solid #4C6EF5',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      },
      '@keyframes spin': {
        from: {
          transform: 'rotate(0deg)',
        },
        to: {
          transform: 'rotate(360deg)',
        },
      },
  }

  if (loading)
    return (
      <div style={styles.spinnerContainer}>
        <div style={styles.spinner}></div>
      </div>
    )
  if (error) return <p>{error}</p>

  return (
    <div style={styles.container}>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index}>
            <div style={styles.header}>
              <div style={styles.avatar}>{comment.user[0]}</div>
              <div style={styles.userInfo}>
                <div style={styles.userName}>{comment.user}</div>
                <div style={styles.date}>{comment.comment_date}</div>
              </div>
            </div>

            <div style={styles.rating}>
              {Array.from({ length: Number(comment.rating) }).map((_, i) => (
                <span key={i} style={styles.star}>★</span>
              ))}
            </div>

            <p style={styles.reviewText}>{comment.user_comment}</p>

            <div style={styles.productSection}>
              {comment.allimages.map((image, imgIndex) => (
                <Image
                  key={imgIndex}
                  src={`https://frontend.tizaraa.com/${image.image}`}
                  alt="Review Image"
                  width={80}
                  height={80}
                  style={styles.productImage}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No reviews available for this product.</p>
      )}
    </div>
  )
}
