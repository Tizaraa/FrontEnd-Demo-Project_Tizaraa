'use client'

import TextArea from '@component/textarea'
import Typography, { H6, SemiSpan } from '@component/Typography'
import { Button, Card, CardContent, CardHeader, Checkbox } from '@mui/material'
import ApiBaseUrl from 'api/ApiBaseUrl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation' 
import CheckBox from '@component/CheckBox'
import FlexBox from '@component/FlexBox'
import toast from 'react-hot-toast'

export default function CancellationForm() {
  const [cancelItem, setCancelItem] = useState<any | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [policyAccepted, setPolicyAccepted] = useState(false)
  const [productType, setProductType] = useState<string | null>(null)
  const router = useRouter()  // Initialize the useRouter hook

  useEffect(() => {
    // Retrieve the item data from sessionStorage
    const storedItem = sessionStorage.getItem('cancelItem')
    if (storedItem) {
      setCancelItem(JSON.parse(storedItem))
    }

    // Retrieve productType from sessionStorage
    const storedCartItems = sessionStorage.getItem('cartItems')
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems)
      setProductType(parsedCartItems.productType || null)
    }
  }, [])

  if (!cancelItem) {
    return <Typography>Loading...</Typography>
  }

  const handleSubmit = async () => {
    const authtoken = localStorage.getItem("token");
    const payload = {
      order_item_id: cancelItem.order_item_id,
      product_id: cancelItem.product_id,
      comment: additionalInfo,
      order_type: productType || 'Local',
    }

    try {
      const response = await axios.post(
        `${ApiBaseUrl.baseUrl}order/item/cencel`, 
        payload, 
        { 
          headers: {
            Authorization: `Bearer ${authtoken}`,
          },
        }
      );
      console.log('Cancellation Successful:', response.data);
      toast.success('Cancellation request submitted successfully.');

      
      router.back(); 
    } catch (error) {
      console.error('Error cancelling the item:', error);
      alert('Failed to submit cancellation request. Please try again.');
    }
  }

  const maxLength = 256

  return (
    <div>
      <Card>
        <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Product Selection */}
          <div>
          <Typography style={{ fontSize: '1.25rem', fontWeight: '700' }}>
            Request Cancellation
          </Typography>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '1rem', flex: 1 }}>
                <Image
                  src={`${ApiBaseUrl.ImgUrl}${cancelItem.product_image}`}
                  alt={cancelItem.product_name}
                  width={100}
                  height={100}
                  style={{ borderRadius: '0.375rem' }}
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <p style={{ fontSize: '0.875rem' }}>
                    {cancelItem.product_name} {cancelItem.quantity}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem' }}>Qty:</span>
                    <span style={{ fontWeight: '500' }}>1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>
              Additional Information (mandatory)
            </h3>
            <div style={{ position: 'relative' }}>
              <TextArea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                maxLength={maxLength}
                placeholder="Enter your reason for cancellation"
                style={{
                  minHeight: '100px',
                  width: '100%',
                  resize: 'none',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.375rem',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  right: '0.5rem',
                  fontSize: '0.75rem',
                  color: '#6c757d',
                }}
              >
                {additionalInfo.length}/{maxLength}
              </span>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500' }}>Cancellation Policy</h3>
            <div
              style={{
                fontSize: '0.875rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '0.375rem',
              }}
            >
              <p>
                Before cancelling the order, kindly read thoroughly our following terms &
                conditions:
              </p>
              <ol style={{ listStyleType: 'decimal', paddingLeft: '1rem', margin: '1rem 0' }}>
                <li>
                  Once you submit this form you agree to cancel the selected item(s) in your order.
                  We will be unable to retrieve your order once it is cancelled.
                </li>
                <li>
                  Once you confirm your item(s) cancellation, we will process your refund within 24
                  hours, provided the item(s) has not been handed over to the logistics partner yet.
                  Please note that, if your item has already been handed over to the logistics
                  partner we will be unable to proceed with your cancellation request and we will
                  inform you accordingly.
                </li>
                <li>
                  If you are cancelling your order partially, i.e. not all the items in your order,
                  then we will be unable to refund you the shipping fee.
                </li>
                <li>
                  Once your item(s) has been successfully cancelled you will receive a notification
                  from us with your refund summary.
                </li>
              </ol>
            </div>
            {/* <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <Checkbox
                id="policy"
                checked={policyAccepted}
                onChange={(e) => setPolicyAccepted(e.target.checked)}
              />
              <label htmlFor="policy" style={{ fontSize: '0.875rem' }}>
                I have read and accepted the Cancellation Policy of Tizaraa.
              </label>
            </div> */}
             <CheckBox
            mb="1.75rem"
            name="agreement"
            color="secondary"
            onChange={(e) => setPolicyAccepted(e.target.checked)}
            checked={policyAccepted}
            label={
              <FlexBox>
                <SemiSpan>I have read and accepted the Cancellation Policy of Tizaraa</SemiSpan>
                {/* <a
                  href="/terms_condition"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <H6
                    ml="0.5rem"
                    borderBottom="1px solid"
                    borderColor="gray.900"
                  >
                    Tizaraa
                  </H6>
                </a> */}
              </FlexBox>
            }
            required
          />



          </div>

          {/* Submit Button */}
          <Button
            style={{
              width: '100%',
              maxWidth: '200px',
              backgroundColor: !policyAccepted || !additionalInfo.trim() ? '#d1d1d1' : '#e94560',
              color: '#fff',
            }}
            disabled={!policyAccepted || !additionalInfo.trim()}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
