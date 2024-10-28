'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'

export default function ResponsiveCategory() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const breadcrumbs = [
    { label: 'Health & Beauty', href: '#' },
    { label: 'Personal Care', href: '#' },
    { label: 'Oral Care', href: '#' },
    { label: 'Toothpaste', href: '#' },
    { label: 'Closeup Toothpaste Menthol Fresh Combo Pack of 2-(150g x 2)', href: '#' },
  ]

  const containerStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    padding: '10px',
    backgroundColor: '#F6F9FC',
    borderRadius: '5px',
  }

  const breadcrumbStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  }

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    marginRight: '5px',
  }

  const linkStyle: React.CSSProperties = {
    color: '#0066c0',
    textDecoration: 'none',
    fontSize: '14px',
  }

  const currentPageStyle: React.CSSProperties = {
    color: '#6c757d',
    fontSize: '14px',
  }

  const toggleStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    background: 'none',
    border: 'none',
    color: '#0066c0',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '5px',
  }

  const renderBreadcrumbs = () => {
    if (isMobileOrTablet && !isExpanded) {
      return (
        <li style={itemStyle}>
          <span style={currentPageStyle}>{breadcrumbs[breadcrumbs.length - 1].label}</span>
        </li>
      )
    }

    return breadcrumbs.map((crumb, index) => (
      <li key={index} style={itemStyle}>
        {index > 0 && <ChevronRight size={16} style={{ color: '#6c757d', margin: '0 5px' }} />}
        {index === breadcrumbs.length - 1 ? (
          <span style={currentPageStyle}>{crumb.label}</span>
        ) : (
          <a href={crumb.href} style={linkStyle}>
            {crumb.label}
          </a>
        )}
      </li>
    ))
  }

  return (
    <nav style={containerStyle}>
      {isMobileOrTablet && (
        <button style={toggleStyle} onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              <ChevronUp size={16} style={{ marginRight: '5px' }} />
              Hide categories
            </>
          ) : (
            <>
              <ChevronDown size={16} style={{ marginRight: '5px' }} />
              Show categories
            </>
          )}
        </button>
      )}
      <ol style={breadcrumbStyle}>{renderBreadcrumbs()}</ol>
    </nav>
  )
}