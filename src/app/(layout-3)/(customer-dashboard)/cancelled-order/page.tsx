"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styled from "styled-components";
import toast from "react-hot-toast";
import ApiBaseUrl from "api/ApiBaseUrl";
import axios from "@lib/axiosClient";
import { notifyDashboardCountsChanged } from "utils/dashboardCounts";
import { currency } from "@utils/utils";

type CancelScope = "item" | "order";

const CORPORATE_REASONS = [
  "Duplicate corporate order",
  "Incorrect specification / wrong item",
  "Project timeline / requirement changed",
  "Corporate credit / budget reallocation",
  "Department request cancelled",
  "Other procurement reason",
];

const Ico = ({ d, size = 16, className = "" }: { d: string; size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const I = {
  building: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2m12-10h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2M10 6h4M10 10h4M10 14h4M10 18h4",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  creditCard: "M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM1 10h22",
  check: "M20 6 9 17l-5-5",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  fileText: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  alertTriangle: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
  arrowLeft: "M19 12H5M12 19l-7-7 7-7",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
};

const PageContainer = styled.div`
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 1rem 0 3rem;
  font-family: inherit;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: #5e6678;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: all 160ms ease;

  &:hover {
    background: #f1f4f9;
    color: #0e3460;
  }
`;

const MainCard = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(15, 52, 96, 0.06);
  overflow: hidden;
`;

const HeaderBanner = styled.div`
  background: linear-gradient(135deg, #0e3460 0%, #15457a 100%);
  color: #ffffff;
  padding: 24px 28px;

  @media (max-width: 540px) {
    padding: 20px 18px;
  }
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    right: -20px;
    top: -30px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(241, 80, 36, 0.25) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const CorporateBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #fed7aa;
  margin-bottom: 10px;
`;

const PageTitle = styled.h1`
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

const PageSubtitle = styled.p`
  margin: 6px 0 0;
  font-size: 13px;
  color: #cbd5e1;
  max-width: 600px;
  line-height: 1.45;
`;

const FormBody = styled.div`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 26px;

  @media (max-width: 540px) {
    padding: 18px;
  }
`;

const ProductSection = styled.div`
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 18px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 540px) {
    padding: 14px;
  }
`;

const ProductLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: min(240px, 100%);
`;

const ProductImgWrap = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  overflow: hidden;
`;

const ProductName = styled.h2`
  overflow-wrap: anywhere;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 4px;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 12px;
  font-size: 12.5px;
  color: #64748b;
`;

const MetaPill = styled.span`
  background: #ffffff;
  border: 1px solid #cbd5e1;
  padding: 2px 8px;
  border-radius: 6px;
  font-weight: 600;
  color: #334155;
`;

const ProductRight = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const CreditRefundTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #ecfdf5;
  border: 1px solid #a7f3d0;
  color: #047857;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 11.5px;
  font-weight: 700;
`;

const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 2px 12px;
  align-items: center;
  justify-content: space-between;

  span.sub {
    font-size: 12px;
    font-weight: 500;
    color: #64748b;
  }
`;

const ScopeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ScopeCard = styled.label<{ $selected: boolean }>`
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 14px;
  border: 2px solid ${({ $selected }) => ($selected ? "#F15024" : "#e2e8f0")};
  background: ${({ $selected }) => ($selected ? "#FFF7F4" : "#ffffff")};
  cursor: pointer;
  transition: all 180ms ease;

  &:hover {
    border-color: ${({ $selected }) => ($selected ? "#F15024" : "#cbd5e1")};
    background: ${({ $selected }) => ($selected ? "#FFF7F4" : "#f8fafc")};
  }

  /* keep the title clear of the absolutely-positioned "Recommended" badge */
  &:has(> span:last-child) strong {
    padding-right: 96px;
  }

  input {
    margin-top: 3px;
    accent-color: #f15024;
    width: 16px;
    height: 16px;
  }
`;

const ScopeContent = styled.div`
  flex: 1;

  strong {
    display: block;
    font-size: 13.5px;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 2px;
  }

  small {
    display: block;
    font-size: 12px;
    color: #64748b;
    line-height: 1.4;
  }
`;

const RecommendedBadge = styled.span`
  position: absolute;
  top: 10px;
  right: 12px;
  background: #f15024;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const ReasonChip = styled.button<{ $active: boolean }>`
  padding: 7px 12px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid ${({ $active }) => ($active ? "#F15024" : "#cbd5e1")};
  background: ${({ $active }) => ($active ? "#FFF7F4" : "#ffffff")};
  color: ${({ $active }) => ($active ? "#F15024" : "#334155")};
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    border-color: #f15024;
    background: ${({ $active }) => ($active ? "#FFF7F4" : "#fafafa")};
  }
`;

const TextareaWrapper = styled.div`
  position: relative;

  textarea {
    width: 100%;
    min-height: 100px;
    border-radius: 12px;
    border: 1.5px solid #cbd5e1;
    padding: 12px 14px;
    font-family: inherit;
    font-size: 13.5px;
    color: #0f172a;
    background: #ffffff;
    resize: vertical;
    transition: all 160ms ease;

    &:focus {
      outline: none;
      border-color: #f15024;
      box-shadow: 0 0 0 3px rgba(241, 80, 36, 0.15);
    }

    &::placeholder {
      color: #94a3b8;
    }
  }

  span.counter {
    position: absolute;
    bottom: 10px;
    right: 12px;
    font-size: 11px;
    font-weight: 600;
    color: #94a3b8;
    pointer-events: none;
  }
`;

const PolicyCard = styled.div`
  background: #f0f7ff;
  border: 1px solid #bae6fd;
  border-radius: 16px;
  padding: 18px 20px;
`;

const PolicyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 700;
  color: #0369a1;
  margin-bottom: 12px;
`;

const PolicyList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PolicyItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 12.5px;
  color: #1e293b;
  line-height: 1.5;

  .ico {
    flex-shrink: 0;
    margin-top: 2px;
    color: #0284c7;
  }

  strong {
    color: #0f172a;
  }
`;

const AgreementCard = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 18px;
  background: #ffffff;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    border-color: #cbd5e1;
    background: #f8fafc;
  }

  input {
    margin-top: 3px;
    width: 17px;
    height: 17px;
    accent-color: #f15024;
    cursor: pointer;
  }

  span {
    font-size: 13px;
    color: #1e293b;
    font-weight: 600;
    line-height: 1.45;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 6px;
  padding-top: 18px;
  border-top: 1px solid #e2e8f0;

  @media (max-width: 540px) {
    flex-direction: column-reverse;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

const CancelBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 11px 22px;
  border-radius: 12px;
  border: 1.5px solid #cbd5e1;
  background: #ffffff;
  color: #334155;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 160ms ease;

  &:hover:enabled {
    background: #f8fafc;
    border-color: #94a3b8;
  }
`;

const SubmitBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 26px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #f15024 0%, #d9381e 100%);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(241, 80, 36, 0.35);
  transition: all 160ms ease;

  &:hover:enabled {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(241, 80, 36, 0.45);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    background: #94a3b8;
  }

  .spin {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: spin 600ms linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingCard = styled.div`
  max-width: 600px;
  margin: 60px auto;
  padding: 40px 24px;
  text-align: center;
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  h3 {
    margin: 16px 0 8px;
    font-size: 18px;
    color: #0f172a;
    font-weight: 700;
  }

  p {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 20px;
  }
`;

export default function CancellationForm() {
  const [cancelItem, setCancelItem] = useState<any | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [scope, setScope] = useState<CancelScope>("item");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedItem = sessionStorage.getItem("cancelItem");
    if (storedItem) {
      try {
        setCancelItem(JSON.parse(storedItem));
      } catch (err) {
        console.error("Failed to parse cancelItem", err);
      }
    }
  }, []);

  if (!cancelItem) {
    return (
      <PageContainer>
        <LoadingCard>
          <Ico d={I.building} size={36} className="text-[#0E3460] mx-auto" />
          <h3>No Order Selected for Cancellation</h3>
          <p>Please select an active pending order item from your corporate order list to proceed.</p>
          <CancelBtn type="button" onClick={() => router.push("/orders")}>
            Go to Corporate Orders
          </CancelBtn>
        </LoadingCard>
      </PageContainer>
    );
  }

  const canCancelSingleItem = Boolean(cancelItem?.order_item_id);
  const maxLength = 256;

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
      setAdditionalInfo((prev) => {
        if (!prev.trim()) return tag;
        return `${tag}. ${prev}`;
      });
    }
  };

  const handleSubmit = async () => {
    if (submitting) return;
    const finalReason = additionalInfo.trim() || selectedTag || "";
    if (!finalReason) {
      toast.error("Please provide or select a reason for cancellation.");
      return;
    }

    setSubmitting(true);

    try {
      const cancelWholeOrder = scope === "order" || !canCancelSingleItem;
      const url = cancelWholeOrder
        ? `user/order/${cancelItem.order_id}/cancel`
        : `user/order/${cancelItem.order_id}/items/${cancelItem.order_item_id}/cancel`;

      await axios.post(url, { reason: finalReason });

      notifyDashboardCountsChanged();

      toast.success(
        cancelWholeOrder
          ? "Corporate order cancelled. Credit released to company balance."
          : `${cancelItem.product_name} cancelled. Credit released.`
      );

      router.back();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        "Failed to submit cancellation request. Please contact your corporate admin.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = policyAccepted && (additionalInfo.trim().length > 0 || Boolean(selectedTag));
  const itemTotal = Number(cancelItem.price || 0) * Number(cancelItem.quantity || 1);

  return (
    <PageContainer>
      <BackButton type="button" onClick={() => router.back()}>
        <Ico d={I.arrowLeft} size={15} />
        <span>Return to Corporate Order</span>
      </BackButton>

      <MainCard>
        {/* Corporate Header */}
        <HeaderBanner>
          <CorporateBadge>
            <Ico d={I.building} size={13} />
            <span>Corporate Employee Procurement</span>
          </CorporateBadge>
          <PageTitle>Order Item Cancellation & Credit Reversal</PageTitle>
          <PageSubtitle>
            Official procurement cancellation form. Restores reserved Corporate Credit balance directly back to your company allowance upon submission.
          </PageSubtitle>
        </HeaderBanner>

        <FormBody>
          {/* Item details card */}
          <ProductSection>
            <ProductLeft>
              <ProductImgWrap>
                {cancelItem.product_image ? (
                  <Image
                    src={
                      /^https?:\/\//i.test(cancelItem.product_image)
                        ? cancelItem.product_image
                        : `${ApiBaseUrl.ImgUrl}${cancelItem.product_image}`
                    }
                    alt={cancelItem.product_name}
                    width={64}
                    height={64}
                    style={{ objectFit: "contain" }}
                  />
                ) : (
                  <Ico d={I.building} size={28} className="text-slate-400" />
                )}
              </ProductImgWrap>
              <div>
                <ProductName>{cancelItem.product_name}</ProductName>
                <MetaRow>
                  <span>Order Ref: <strong>#{cancelItem.order_id}</strong></span>
                  <span>•</span>
                  <span>Qty: <MetaPill>{cancelItem.quantity}</MetaPill></span>
                  {itemTotal > 0 && (
                    <>
                      <span>•</span>
                      <span>Amount: <strong style={{ color: "#0F3460" }}>{currency(itemTotal)}</strong></span>
                    </>
                  )}
                </MetaRow>
              </div>
            </ProductLeft>

            <ProductRight>
              <CreditRefundTag>
                <Ico d={I.zap} size={12} />
                <span>Instant Corporate Credit Release</span>
              </CreditRefundTag>
            </ProductRight>
          </ProductSection>

          {/* Cancellation Scope */}
          {canCancelSingleItem && (
            <div>
              <SectionTitle>
                <span>What would you like to cancel?</span>
                <span className="sub">Select cancellation scope</span>
              </SectionTitle>
              <ScopeGrid>
                <ScopeCard $selected={scope === "item"}>
                  <input
                    type="radio"
                    name="cancelScope"
                    value="item"
                    checked={scope === "item"}
                    onChange={() => setScope("item")}
                  />
                  <ScopeContent>
                    <strong>Just this item ({cancelItem.product_name})</strong>
                    <small>Only this specific item will be removed. Remaining items in your corporate order continue for fulfillment.</small>
                  </ScopeContent>
                  <RecommendedBadge>Recommended</RecommendedBadge>
                </ScopeCard>

                <ScopeCard $selected={scope === "order"}>
                  <input
                    type="radio"
                    name="cancelScope"
                    value="order"
                    checked={scope === "order"}
                    onChange={() => setScope("order")}
                  />
                  <ScopeContent>
                    <strong>The entire order</strong>
                    <small>All items in Order #{cancelItem.order_id} will be cancelled and the entire order value returned to credit.</small>
                  </ScopeContent>
                </ScopeCard>
              </ScopeGrid>
            </div>
          )}

          {/* Quick Select Reason Tags + Notes */}
          <div>
            <SectionTitle>
              <span>Cancellation Reason & Details <em style={{ color: "#F15024" }}>*</em></span>
              <span className="sub">Required for corporate audit trail</span>
            </SectionTitle>

            <ChipContainer>
              {CORPORATE_REASONS.map((tag) => (
                <ReasonChip
                  key={tag}
                  type="button"
                  $active={selectedTag === tag}
                  onClick={() => handleTagClick(tag)}
                >
                  {selectedTag === tag && <Ico d={I.check} size={12} />}
                  <span>{tag}</span>
                </ReasonChip>
              ))}
            </ChipContainer>

            <TextareaWrapper>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                maxLength={maxLength}
                placeholder="Provide details or internal corporate justification for procurement logs..."
              />
              <span className="counter">
                {additionalInfo.length}/{maxLength}
              </span>
            </TextareaWrapper>
          </div>

          {/* Corporate Cancellation Terms */}
          <PolicyCard>
            <PolicyHeader>
              <Ico d={I.shield} size={16} />
              <span>Corporate Procurement Cancellation Policy</span>
            </PolicyHeader>

            <PolicyList>
              <PolicyItem>
                <Ico d={I.creditCard} size={15} className="ico" />
                <div>
                  <strong>Instant Corporate Credit Restoration:</strong> The amount will be automatically deducted from your Pending Credit and returned directly to your company&apos;s Available Corporate Credit balance.
                </div>
              </PolicyItem>
              <PolicyItem>
                <Ico d={I.clock} size={15} className="ico" />
                <div>
                  <strong>Pending Status Window:</strong> Cancellation is eligible only while the order remains in Pending status prior to merchant dispatch.
                </div>
              </PolicyItem>
              <PolicyItem>
                <Ico d={I.fileText} size={15} className="ico" />
                <div>
                  <strong>Enterprise Audit Trail:</strong> Cancellations are recorded in your company&apos;s monthly purchase log and invoice statement for compliance.
                </div>
              </PolicyItem>
              <PolicyItem>
                <Ico d={I.bell} size={15} className="ico" />
                <div>
                  <strong>Automated Alerts:</strong> Notification will be dispatched to your corporate email and SMS with updated credit ledger balance.
                </div>
              </PolicyItem>
            </PolicyList>
          </PolicyCard>

          {/* Agreement Checkbox */}
          <AgreementCard>
            <input
              type="checkbox"
              id="corporateAgreement"
              checked={policyAccepted}
              onChange={(e) => setPolicyAccepted(e.target.checked)}
            />
            <span>
              I confirm this order cancellation on behalf of my corporate account and authorize the corresponding credit adjustment in our company ledger.
            </span>
          </AgreementCard>

          {/* Action Buttons */}
          <ActionButtons>
            <CancelBtn type="button" onClick={() => router.back()} disabled={submitting}>
              Keep Order
            </CancelBtn>
            <SubmitBtn
              type="button"
              disabled={!isFormValid || submitting}
              onClick={handleSubmit}
            >
              {submitting ? (
                <>
                  <span className="spin" />
                  <span>Processing Cancellation...</span>
                </>
              ) : (
                <>
                  <Ico d={I.shield} size={15} />
                  <span>Confirm Corporate Cancellation</span>
                </>
              )}
            </SubmitBtn>
          </ActionButtons>
        </FormBody>
      </MainCard>
    </PageContainer>
  );
}
