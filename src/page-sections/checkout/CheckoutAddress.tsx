"use client";

import { useEffect, useState } from "react";
import axios from "@lib/axiosClient";
import { Fragment } from "react";
import CheckBox from "@component/CheckBox";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import { Chip } from "@component/Chip";
import { Small } from "@component/Typography";
import Typography from "@component/Typography";
import authService from "services/authService";
import Address from "@models/address.model";
import { SemiSpan } from "@component/Typography";
import { FaTruckFast } from "react-icons/fa6";
import { toast } from "react-toastify";
import { FaExclamationTriangle } from "react-icons/fa";
import { CreditCardIcon, InfoIcon } from "lucide-react";
import { CircularProgress, LinearProgress, Tooltip } from "@mui/material";
import { useAppContext } from "@context/app-context";
import tz from "../../theme/tizaraa";

export default function CheckoutAddress({
  setDeliveryCharge,
  seller_type,
  selectedAddress,
  setSelectedAddress,
}) {
  const { state } = useAppContext();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [province, setProvince] = useState([]);
  const authtoken = authService.getToken();
  const [expressDelivery, setExpressDelivery] = useState(false);

  const [loading, setLoading] = useState(false);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<
    number | null
  >(100);
  const [advancePaymentAmount, setAdvancePaymentAmount] = useState<
    number | null
  >(null);

  const handlePaymentOptionSelect = async (percentage) => {
    // Store the selected percentage in sessionStorage
    sessionStorage.setItem("selectedPaymentOption", percentage.toString());

    const selectedProducts = JSON.parse(
      sessionStorage.getItem("selectedProducts") || "[]"
    );
    const totalAmount = selectedProducts.reduce(
      (sum, product) => sum + product.qty * product.price,
      0
    );
    setSelectedPaymentOption(percentage);
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const { data } = await axios.post(
        `otc/price/percentage`,
        { total_ammount: totalAmount },
        {
          params: { total: totalAmount, percentage },
          signal: controller.signal,
        }
      );

      // Update state and sessionStorage synchronously
      setAdvancePaymentAmount(data.newtotal);
      sessionStorage.setItem("otcAdvancePaymentAmount", data.newtotal.toString());
    } catch (error) {
      error.name === "AbortError"
        ? toast.error("Your internet seems slow. Please try again.")
        : toast.error("Your internet seems slow. Please try again.");
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  // ✅ Trigger 50% advance payment API call on page load
  useEffect(() => {
    const selectedProducts = JSON.parse(
      sessionStorage.getItem("selectedProducts") || "[]"
    );
    const hasProducts = selectedProducts.length > 0;

    if (hasProducts && selectedPaymentOption === 100) {
      handlePaymentOptionSelect(100);
    }
  }, []); // Empty dependency array to run only on mount

  // Fetch provinces data
  const fetchProvince = async () => {
    const authtoken = localStorage.getItem("token");
    try {
      const response = await axios.get(`checkout/address`);

      if (Array.isArray(response.data)) {
        setProvince(response.data);
      }
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Fetch addresses data
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`user/address`, {
          params: { seller_type },
        });
        const fetchedAddresses = response.data?.address || [];
        setAddresses(fetchedAddresses);
        if (
          fetchedAddresses.length > 0 &&
          seller_type.toLocaleLowerCase() == "corporate"
        ) {
          const item = fetchedAddresses[0];

          sessionStorage.setItem("address", JSON.stringify(item));
          setSelectedAddress(item);
        }
        // Load the selected address from sessionStorage
        const storedAddress = sessionStorage.getItem("address");
        if (storedAddress) {
          const parsedAddress = JSON.parse(storedAddress);
          const matchingAddress = fetchedAddresses.find(
            (addr) => addr.id === parsedAddress.id
          );
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    setTimeout(() => {
      fetchAddresses();
    }, 200);
    fetchProvince();
  }, [state.cart, seller_type]);

  // Corporate products have no delivery charge — pickup only
  useEffect(() => {
    if (seller_type.toLowerCase() === "corporate") {
      setDeliveryCharge(0);
      sessionStorage.setItem("deliveryCharge", "0");
      return;
    }
  }, [seller_type, setDeliveryCharge]);

  // Recalculate delivery charge when selectedAddress or expressDelivery changes
  useEffect(() => {
    if (seller_type.toLowerCase() === "corporate") return;

    if (selectedAddress) {
      const selectedProducts = JSON.parse(
        sessionStorage.getItem("selectedProducts") || "[]"
      );
      const products = selectedProducts.map((product) => ({
        id: `${product.productId}-${product.productType}`,
        name: product.name,
        price: product.discountPrice || product.price,
        productId: product.productId,
        productStock: product.productStock,
        productType: product.productType,
        qty: product.qty,
        sellerId: product.sellerId,
        slug: product.slug,
        total_amount: product.qty * (product.discountPrice || product.price),
      }));

      if (selectedAddress.province_id) {
        const selectedProvince = province.find(
          (prov: any) => prov.id === selectedAddress.province_id
        );
        if (selectedProvince) {
          const payload = {
            express_delivery: expressDelivery ? 1 : 2,
            province: selectedAddress.province_id,
            city: selectedAddress.city_id,
            area: selectedAddress.area_id,
            products: products,
          };
          axios
            .post(`delivery/charge/apply`, payload)
            .then((response) => {
              const totalDeliveryCost = Math.round(response.data.totalDeliveryCost);
              setDeliveryCharge(totalDeliveryCost);
              sessionStorage.setItem("deliveryCharge", totalDeliveryCost.toString());
            })
            .catch((error) => {
              console.error("Error fetching delivery charge:", error);
            });
        }
      }
    }
  }, [selectedAddress, expressDelivery, province, authtoken, setDeliveryCharge, seller_type]);

  // Handle selection of an address
  const handleSelect = async (item: Address, isAutoSelect = false) => {
    setSelectedAddress((prev) => {
      if (prev && prev.id === item.id) {
        return null;
      }
      return item;
    });
    if (!isAutoSelect) {
      sessionStorage.setItem("address", JSON.stringify(item));
    }
  };

  // Handle express delivery checkbox change
  const handleExpressDeliveryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const storedAddress = JSON.parse(sessionStorage.getItem("address"));

    if (!storedAddress) {
      toast.warning("Please select an address first!", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: tz.tone.warning.fill,
          color: tz.color.ink,
          fontSize: "16px",
          border: `2px solid ${tz.color.paper}`,
          boxShadow: `0 0 0 4px ${tz.tone.warning.bg}`,
        },
        icon: <FaExclamationTriangle style={{ color: tz.color.ink, fontSize: "20px" }} />, // Custom icon
        progressStyle: {
          background: tz.color.paper,
        },
      });
      return;
    }

    const isChecked = event.target.checked;
    setExpressDelivery(isChecked);

    // ✅ Store in session as 1 or 2
    sessionStorage.setItem("expressDelivery", isChecked ? "2" : "1");
  };

  // Load stored address and delivery charge on component mount
  useEffect(() => {
    const storedAddress = sessionStorage.getItem("address");
    const storedCharge = sessionStorage.getItem("deliveryCharge");
    const storedAdvancePayment = sessionStorage.getItem(
      "otcAdvancePaymentAmount"
    );

    if (storedCharge) {
      setDeliveryCharge(parseFloat(storedCharge));
    }

    if (storedAdvancePayment) {
      setAdvancePaymentAmount(parseFloat(storedAdvancePayment));
    }
  }, [setDeliveryCharge]);

  return (
    <Fragment>
      {(() => {
        const selectedProducts = JSON.parse(
          sessionStorage.getItem("selectedProducts") || "[]"
        );
        const hasAbroadProduct = selectedProducts.some(
          (product: any) => product.productType === "Abroad"
        );

        if (hasAbroadProduct) {
          return (
            <FlexBox
              flexDirection="column"
              mb="1rem"
              p="1rem"
              border={`1px solid ${tz.color.line}`}
              borderRadius="8px"
              backgroundColor={tz.color.mist}
            >
              <FlexBox alignItems="center" style={{ gap: "8px" }}>
                <Tooltip title="100% advance payment is required for abroad products">
                  <InfoIcon
                    style={{
                      color: tz.color.emberDeep,
                      fontSize: "18px",
                      cursor: "pointer",
                    }}
                  />
                </Tooltip>
                <Typography
                  variant="h6"
                  style={{ color: tz.color.emberDeep, fontWeight: "600" }}
                >
                  Advance Payment Details
                </Typography>
              </FlexBox>
              <Typography
                style={{
                  marginBottom: "1rem",
                  fontSize: "13px",
                  color: tz.color.ink,
                }}
              >
                100% advance payment is required to proceed with your abroad order.
              </Typography>

              <Grid container spacing={2}>
                {/* Option 3 - 100% */}
                <Grid item xs={12}>
                  <FlexBox
                    flexDirection="column"
                    p="1rem"
                    border={`1px solid ${selectedPaymentOption === 100 ? tz.color.emberDeep : tz.color.line
                      }`}
                    borderRadius="8px"
                    backgroundColor={
                      selectedPaymentOption === 100 ? tz.color.emberDeep : tz.color.paper
                    }
                    style={{
                      cursor:
                        loading && selectedPaymentOption === 100 ? "wait" : "pointer",
                      position: "relative",
                      overflow: "hidden",
                      opacity: loading && selectedPaymentOption !== 100 ? 0.7 : 1,
                      transition: "all 0.3s ease",
                    }}
                  // onClick={() => !loading && handlePaymentOptionSelect(100)}
                  >
                    {loading && selectedPaymentOption === 100 && (
                      <LinearProgress
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: tz.color.paper,
                          },
                        }}
                      />
                    )}

                    <FlexBox alignItems="center" justifyContent="center">
                      {loading && selectedPaymentOption === 100 ? (
                        <CircularProgress
                          size={20}
                          thickness={5}
                          style={{
                            color: tz.color.paper,
                            marginRight: "8px",
                          }}
                        />
                      ) : (
                        <CreditCardIcon
                          style={{
                            color: selectedPaymentOption === 100 ? tz.color.paper : tz.color.ink,
                            marginRight: "8px",
                            transition: "color 0.3s ease",
                          }}
                        />
                      )}
                      <Typography
                        style={{
                          fontWeight: "600",
                          color: selectedPaymentOption === 100 ? tz.color.paper : tz.color.ink,
                          transition: "color 0.3s ease",
                        }}
                      >
                        {loading && selectedPaymentOption === 100
                          ? "Processing..."
                          : "Pay Now 100%"}
                      </Typography>
                    </FlexBox>
                  </FlexBox>
                </Grid>
              </Grid>
            </FlexBox>
          );
        } else {
          return (
            <>
              {seller_type.toLocaleLowerCase() !== "corporate" && (
                <label className={`co-express${expressDelivery ? " is-on" : ""}`} htmlFor="expressDelivery">
                  <span className="co-express-icon" aria-hidden="true">
                    <FaTruckFast />
                  </span>
                  <span className="co-express-text">
                    <strong>Express delivery</strong>
                    <small>Get your order faster. Select an address first.</small>
                  </span>
                  <input
                    checked={expressDelivery}
                    onChange={handleExpressDeliveryChange}
                    type="checkbox"
                    id="expressDelivery"
                  />
                  <span className="co-switch" aria-hidden="true" />
                </label>
              )}
            </>
          );
        }
      })()}

      {seller_type.toLowerCase() === "corporate" ? (
        <FlexBox
          flexDirection="column"
          p="1.25rem"
          mb="1rem"
          border={`1px solid ${tz.tone.success.fill}`}
          borderRadius="8px"
          backgroundColor={tz.tone.success.bg}
        >
          <FlexBox alignItems="center" style={{ gap: "8px", marginBottom: "0.5rem" }}>
            <FaTruckFast style={{ fontSize: "22px", color: tz.tone.success.fg }} />
            <Typography style={{ fontWeight: "700", color: tz.tone.success.fg, fontSize: "15px" }}>
              Corporate Pickup — No Delivery Charge
            </Typography>
          </FlexBox>
          <Typography style={{ fontSize: "13px", color: tz.color.inkSoft, lineHeight: "1.6" }}>
            This is a corporate order. You will collect your items directly from your
            company's designated pickup location. Shipping address is not required.
          </Typography>
          <Typography style={{ fontSize: "13px", color: tz.color.emberDeep, marginTop: "0.5rem", fontWeight: "600" }}>
            Delivery charge: <strong>৳ 0</strong>
          </Typography>
        </FlexBox>
      ) : addresses?.length > 0 ? (
        <div className="co-addr-list" role="radiogroup" aria-label="Delivery address">
          {addresses.map((item, i) => (
            <AddressItem
              key={i}
              index={i}
              item={item}
              isSelected={!!selectedAddress && selectedAddress.id === item.id}
              onSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        <a className="co-addr-empty" href="/address/checkoutAddress">
          <span aria-hidden="true">＋</span>
          <strong>Add your first address</strong>
          <small>We need it to deliver your order.</small>
        </a>
      )}
    </Fragment>
  );
}

interface AddressItemProps {
  item: Address;
  isSelected: boolean;
  onSelect: (item: Address, isAutoSelect?: boolean) => void;
  index?: number;
}

const ADDR_ICON: Record<string, string> = {
  Home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z",
  Office: "M4 21V3h11v18M15 9h5v12M8 7h3M8 11h3M8 15h3",
  "Pickup Point": "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
};

// Street, area, city, division, postcode — skipping blanks and parts the
// street line already contains.
function fullAddressOf(item: any): string {
  const street = String(item?.address ?? "").trim();
  const extra: string[] = [];
  for (const raw of [item?.area?.area, item?.city?.city, item?.province?.province, item?.postal_code]) {
    const p = String(raw ?? "").trim();
    if (!p) continue;
    if ([street, ...extra].some((x) => x.toLowerCase().includes(p.toLowerCase()))) continue;
    extra.push(p);
  }
  return [street, ...extra].filter(Boolean).join(", ");
}

function AddressItem({ item, isSelected, onSelect, index = 0 }: AddressItemProps) {
  const landmarkMap: { [key: string]: string } = {
    "1": "Home",
    "2": "Office",
    "3": "Pickup Point",
    "home": "Home",
    "office": "Office",
    "pickup_point": "Pickup Point",
    "pickup point": "Pickup Point",
  };

  const landmarkKey = String(item.landmark ?? "").toLowerCase();
  const landmarkLabel =
    landmarkMap[String(item.landmark)] ??
    landmarkMap[landmarkKey] ??
    item.landmark ??
    "Other";

  // Pickup points are always on and can't be unticked (unchanged rule)
  const isPickup = Number(item.landmark) === 3;
  const checked = isPickup || isSelected;
  const line = fullAddressOf(item);
  const [showInfo, setShowInfo] = useState(false);
  const shortLine = [(item as any).area?.area, (item as any).city?.city]
    .map((v) => String(v ?? "").trim())
    .filter(Boolean)
    .join(", ");
  const facts = [
    { k: "Division", v: (item as any).province?.province },
    { k: "City", v: (item as any).city?.city },
    { k: "Area", v: (item as any).area?.area },
    { k: "Postcode", v: (item as any).postal_code },
    { k: "Type", v: landmarkLabel },
  ].filter((f) => f.v !== null && f.v !== undefined && String(f.v).trim() !== "");
  const choose = () => {
    if (!isPickup) onSelect(item);
  };

  return (
    <div
      className={`co-addr${checked ? " is-on" : ""}${isPickup ? " is-pickup" : ""}`}
      style={{ ["--i" as any]: index }}
      role="radio"
      aria-checked={checked}
      tabIndex={isPickup ? -1 : 0}
      onClick={choose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          choose();
        }
      }}
    >
      <span className="co-radio" aria-hidden="true">
        <i />
      </span>
      <div className="co-addr-body">
        <div className="co-addr-top">
          <strong>{item.name || "No Name"}</strong>
          <span className="co-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d={ADDR_ICON[landmarkLabel] ?? ADDR_ICON["Pickup Point"]} />
            </svg>
            {landmarkLabel}
          </span>
          {(item as any).is_default && <span className="co-tag co-tag--def">Default</span>}
          {checked && (
            <span className="co-here">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Delivering here
            </span>
          )}
        </div>
        {/* compact: one short line; everything else sits behind "Details" */}
        <p className="co-short" title={line}>
          {shortLine || line || "Address not provided"}
        </p>
        {(
          <>
            <button
              type="button"
              className="co-more"
              aria-expanded={showInfo}
              onClick={(e) => {
                e.stopPropagation();
                setShowInfo((v) => !v);
              }}
              onKeyDown={(e) => e.stopPropagation()}
            >
              {showInfo ? "Hide details" : "Details"}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            <div className={`co-facts-wrap${showInfo ? " is-open" : ""}`}>
              <div>
          <p className="co-line">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>{line || "Address not provided"}</span>
          </p>
          {item.phone && (
            <p className="co-line">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
              </svg>
              <span>{item.phone}</span>
            </p>
          )}
              <dl className="co-facts">
                {facts.map((f) => (
                  <div key={f.k}>
                    <dt>{f.k}</dt>
                    <dd>{String(f.v)}</dd>
                  </div>
                ))}
              </dl>
              </div>
            </div>
          </>
        )}
      </div>
      {!isPickup && (
        <a className="co-edit" href={`/address/edit/${item.id}`} onClick={(e) => e.stopPropagation()}>
          Edit
        </a>
      )}
    </div>
  );
}
