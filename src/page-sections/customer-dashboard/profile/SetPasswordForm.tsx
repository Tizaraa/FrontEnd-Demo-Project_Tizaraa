"use client"
import { Button } from '@component/buttons'
import { Shield, Mail } from 'lucide-react'
import Image from "next/image"
import { CSSProperties } from 'react'


const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
  } as CSSProperties,
  
  innerContainer: {
    width: '100%',
    maxWidth: '28rem',
    display: 'flex',
    flexDirection: 'column',
    // gap: '2rem',
  } as CSSProperties,

  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
  } as CSSProperties,

  iconCircle: {
    width: '6rem',
    height: '6rem',
    borderRadius: '50%',
    backgroundColor: '#E8F1FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (min-width: 768px)': {
      width: '8rem',
      height: '8rem',
    },
  } as CSSProperties,

  icon: {
    width: '3rem',
    height: '3rem',
    color: '#4B8BF7',
    '@media (min-width: 768px)': {
      width: '4rem',
      height: '4rem',
    },
  } as CSSProperties,

  textContent: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    // gap: '1rem',
  } as CSSProperties,

  title: {
    fontSize: '1.25rem',
    fontWeight: 500,
    color: '#374151',
    '@media (min-width: 768px)': {
      fontSize: '1.5rem',
    },
  } as CSSProperties,

  subtitle: {
    fontSize: '1rem',
    color: '#6B7280',
    marginTop: '-10px',
  } as CSSProperties,

  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  } as CSSProperties,

  button: {
    width: '100%',
    height: '3.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 1rem',
    gap: '0.75rem',
    backgroundColor: '#fff',
    border: '1px solid #E5E7EB',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#F9FAFB',
    },
  } as CSSProperties,

  buttonIcon: {
    width: '1.25rem',
    height: '1.25rem',
    color: '#6B7280',
    flexShrink: 0,
  } as CSSProperties,
}

export default function SetPasswordForm() {
  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        {/* Icon */}
        <div style={styles.iconWrapper}>
          <div style={styles.iconCircle}>
            <Shield style={styles.icon} />
          </div>
        </div>

        {/* Text Content */}
        <div style={styles.textContent}>
          <h1 style={styles.title}>
            To protect your account security, we need to verify your identity
          </h1>
          <p style={styles.subtitle}>
            Please choose a way to verify:
          </p>
        </div>

        {/* Verification Buttons */}
        <div style={styles.buttonContainer}>
          <Button 
            variant="outlined" 
            style={styles.button}
            onClick={() => {}}
          >
            {/* <Mail style={styles.buttonIcon} /> */}
            <Image
              src="https://img.icons8.com/?size=100&id=6mtfF8X7F8eV&format=png&color=000000"
              alt="Facebook logo"
              width={24}
              height={24}
              style={{ flexShrink: 0 }}
            />
            <span>Verify through Email</span>
          </Button>

          <Button 
            variant="outlined" 
            style={styles.button}
            onClick={() => {}}
          >
            <Image
              src="https://img.icons8.com/?size=100&id=118467&format=png&color=000000"
              alt="Facebook logo"
              width={24}
              height={24}
              style={{ flexShrink: 0 }}
            />
            <span>Verify through Facebook</span>
          </Button>

          <Button 
            variant="outlined" 
            style={styles.button}
            onClick={() => {}}
          >
            <Image
              src="https://img.icons8.com/?size=100&id=17950&format=png&color=000000"
              alt="Google logo"
              width={24}
              height={24}
              style={{ flexShrink: 0 }}
            />
            <span>Verify through Google</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

