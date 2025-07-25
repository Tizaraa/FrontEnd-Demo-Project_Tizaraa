"use client";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Box from "@component/Box";
import Image from "@component/Image";
import Rating from "@component/rating";
import Avatar from "@component/avatar";
import Grid from "@component/grid/Grid";
import FlexBox from "@component/FlexBox";
import { Chip } from "@component/Chip";
import { H3, SemiSpan } from "@component/Typography";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
import AddToCartButton from "./AddToCartButton";

import styles from "../../components/products/productsStyle/OTproductsIntrostyle.module.css";

// ========================================

type ConfiguredItem = {
  Id: string;
  Price: {
    ConvertedPriceWithoutSign: number;
    CurrencySign: string;
  };
  Quantity: number;
  SalesCount: number;
  Configurators: {
    Vid: string;
  }[];
  QuantityRanges: {
    MinQuantity: number;
    MaxQuantity: number;
    Price: {
      OriginalPrice: number;
      MarginPrice: number;
      ConvertedPrice: string;
      ConvertedPriceWithoutSign: string;
    };
  }[];
};

interface Attribute {
  ImageUrl: string;
  IsConfigurator: boolean;
  MiniImageUrl: string;
  OriginalPropertyName: string;
  OriginalValue: string;
  Pid: string;
  PropertyName: string;
  Value: string;
  Vid: string;
}

type PricingTier = {
  MinQuantity: number;
  Price: {
    ConvertedPriceWithoutSign: string;
    CurrencySign: string;
    ConvertedPrice: string;
  };
};

type OTProductsIntroProps = {
  images: string[];
  title: string;
  price: number;
  id: string | number;
  sellerShopName: string;
  rating: number;
  discountPrice?: number;
  totalDiscount?: number;
  slug?: string;
  productStock: number;
  productId: string | number;
  variantId: string | number | null;
  sellerId: string | number;
  configuredItems: ConfiguredItem[];
  Attributes?: Attribute[];
  pricingTiers?: PricingTier[];
  sizeColor?: {
    colorwithsize: {
      [color: string]: { size: string; price: string; qty: string }[];
    };
  };
};

// ========================================

export default function OtProductsIntro({
  images,
  title,
  price,
  id,
  sellerShopName,
  rating,
  discountPrice,
  totalDiscount,
  slug,
  productStock,
  productId,
  sellerId,
  configuredItems,
  Attributes,
  pricingTiers,
  sizeColor,
}: OTProductsIntroProps) {
  const param = useParams();
  const { state, dispatch } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  const [selectedSpec, setSelectedSpec] = useState<string | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(price);
  const [selectedSpecification, setSelectedSpecification] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentQuantity, setCurrentQuantity] = useState(1);

  const routerId = param.slug as string;
  const cartItem = state.cart.find(
    (item) => item.id === id || item.id === routerId
  );

  // Initialize size from Attributes
  useEffect(() => {
    if (Attributes) {
      const sizeAttribute = Attributes.find(
        (attr) => attr.PropertyName.toLowerCase() === "size"
      );
      if (sizeAttribute) {
        setSelectedSize(sizeAttribute.Value);
      }
    }
  }, [Attributes]);

  // Ensure selectedImage is set to a valid image
  useEffect(() => {
    if (!selectedImage && images.length > 0) {
      setSelectedImage(images[0]);
      console.log("Fallback to first image:", images[0]);
    }
  }, [images, selectedImage]);

  const getSelectedColor = (item: ConfiguredItem): string | null => {
    if (!Attributes) return null;
    const colorAttribute = Attributes.find(
      (attr) =>
        item.Configurators.some((config) => config.Vid === attr.Vid) &&
        attr.PropertyName.toLowerCase() === "color"
    );
    return colorAttribute ? colorAttribute.Value : null;
  };

  const getSelectedSpecification = (item: ConfiguredItem): string | null => {
    if (!Attributes) return null;
    const specificationAttribute = Attributes.find(
      (attr) =>
        item.Configurators.some((config) => config.Vid === attr.Vid) &&
        attr.PropertyName.toLowerCase() === "specification"
    );
    return specificationAttribute ? specificationAttribute.Value : null;
  };

  const handleVariantSelect = (item) => {
    setSelectedSpec(item.Vid);
    setSelectedImage(item.ImageUrl || images[0]);
    console.log("Selected Image URL:", item.ImageUrl || images[0]);
    setSelectedRowId(null);

    if (item.PropertyName.toLowerCase() === "size") {
      setSelectedSize(item.Value);
    }
  };

  const getSelectedAttributes = () => {
    if (!selectedSpec || !Attributes) return "";
    const selectedAttributes = Attributes.filter((attr) =>
      configuredItems.some((item) =>
        item.Configurators.some(
          (config) => config.Vid === selectedSpec && config.Vid === attr.Vid
        )
      )
    );
    const attributeValues = selectedAttributes.map((attr) => attr.Value);
    return attributeValues.join(", ");
  };

  const handleRowClick = (itemId: string) => {
    setSelectedRowId(itemId === selectedRowId ? null : itemId);
  };

  const getSelectedRowQuantity = () => {
    const selectedItem = configuredItems.find(
      (item) => item.Id === selectedRowId
    );
    return selectedItem?.Quantity || 0;
  };

  const getDisplayPrice = (item: ConfiguredItem, quantity: number) => {
    if (item.QuantityRanges?.length) {
      const applicableTier = item.QuantityRanges.slice()
        .sort((a, b) => b.MinQuantity - a.MinQuantity)
        .find((tier) => quantity >= tier.MinQuantity);
      return applicableTier
        ? applicableTier.Price.ConvertedPriceWithoutSign
        : item.Price.ConvertedPriceWithoutSign;
    }
    return selectedPrice !== null
      ? selectedPrice
      : item.Price.ConvertedPriceWithoutSign;
  };

  useEffect(() => {
    const initialItem = Attributes?.find((item) =>
      configuredItems.some((configuredItem) =>
        configuredItem.Configurators.some((config) => config.Vid === item.Vid)
      )
    );
    if (initialItem) {
      setSelectedSpec(initialItem.Vid);
    }
  }, [Attributes, configuredItems]);

  useEffect(() => {
    const selectedItem = configuredItems.find((item) =>
      item.Configurators.some((config) => config.Vid === selectedSpec)
    );
    if (selectedItem) {
      setSelectedPrice(selectedItem.Price.ConvertedPriceWithoutSign);
    } else {
      setSelectedPrice(price);
    }
  }, [selectedSpec, configuredItems, price]);

  const handleCartAmountChange = (amount: number) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        productStock,
        qty: amount,
        name: title,
        imgUrl: images[0],
        id: id || routerId,
        discountPrice,
        slug,
        productId,
        sellerId,
      },
    });
  };

  function getItemSize(
    item: ConfiguredItem,
    Attributes: Attribute[],
    selectedSize: string
  ): string {
    for (const config of item.Configurators) {
      const attribute = Attributes.find((attr) => attr.Vid === config.Vid);
      if (
        attribute &&
        (attribute.PropertyName.toLowerCase().includes("size") ||
          attribute.OriginalPropertyName.toLowerCase().includes("size"))
      ) {
        return attribute.Value;
      }
    }
    return selectedSize || "";
  }

  return (
    <Box overflow="hidden">
      <Grid container justifyContent="center" spacing={16}>
        <Grid item md={6} xs={12} alignItems="center">
          <div>
            <FlexBox
              mb="50px"
              overflow="hidden"
              borderRadius={16}
              justifyContent="center"
              style={{ position: "relative" }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: "rgb(233, 69, 96)",
                  color: "#fff",
                  padding: "10px 18px",
                  borderRadius: "999px",
                  fontSize: "14px",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 8px 20px rgba(233, 69, 96, 0.5), 0 0 8px rgba(255, 255, 255, 0.3)",
                  animation: "pulse 2s infinite",
                  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                title="This item is shipped from abroad. Delivery might take longer than local items."
              >
                <span role="img" aria-label="plane">🛫</span> Ships from Abroad
              </div>

              <Image
                width={200}
                height={200}
                src={selectedImage || images[0]}
                style={{ display: "block", width: "100%", height: "auto" }}
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
            </FlexBox>

            {/* <FlexBox overflow="auto" mb="1rem">
              {images.map((url, ind) => (
                <Box
                  key={ind}
                  size={70}
                  bg="white"
                  marginRight="5px"
                  display="flex"
                  cursor="pointer"
                  border="2px solid"
                  borderRadius="10px"
                  alignItems="center"
                  justifyContent="center"
                  borderColor={
                    selectedImage === url ? "primary.main" : "gray.400"
                  }
                  onClick={() => {
                    setSelectedImage(url);
                    console.log("Thumbnail Image URL:", url);
                  }}
                >
                  <Avatar src={url} borderRadius="10px" size={65}/>
                </Box>
              ))}
            </FlexBox> */}


            <FlexBox overflow="auto" mb="1rem">
              {images.map((url, ind) => (
                <Box
                  key={ind}
                  size={70}
                  bg="white"
                  marginRight="5px"
                  display="flex"
                  cursor="pointer"
                  border="2px solid"
                  borderRadius="10px"
                  alignItems="center"
                  justifyContent="center"
                  borderColor={
                    selectedImage === url ? "primary.main" : "gray.400"
                  }
                  onClick={() => {
                    setSelectedImage(url);
                    console.log("Thumbnail Image URL:", url);
                  }}
                >
                  <img
                    src={url || images[0]}
                    alt={`Thumbnail ${ind}`}
                    style={{
                      width: "65px",
                      height: "65px",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                </Box>
              ))}
            </FlexBox>


          </div>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H3 mb="1rem">
            {title}
            <span
              title="This product is shipped from abroad"
              style={{
                display: "inline-block",
                padding: "4px 12px",
                backgroundColor: "#E94560",
                color: "white",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "500",
                marginLeft: "12px",
              }}
            >
              Abroad Product
            </span>
          </H3>

          <FlexBox alignItems="center" mb="1rem">
            <Box mr="8px">
              {rating > 0 && (
                <Rating
                  value={rating}
                  outof={5}
                  color="warn"
                  readOnly
                  size="medium"
                />
              )}
            </Box>
          </FlexBox>

          <Box mb="5px">
            <FlexBox alignItems="center">
              {!configuredItems.some((item) => item.QuantityRanges?.length) && (
                <H3 color="primary.main" mb="4px" lineHeight="1">
                  {discountPrice ? (
                    <>
                      <span className={styles.currentPriceStyle}>
                        {currency(discountPrice)}
                      </span>
                      <span className={styles.originalPriceStyle}>
                        {currency(selectedPrice)}
                      </span>
                    </>
                  ) : (
                    <span>{currency(selectedPrice)}</span>
                  )}
                </H3>
              )}

              {!!discountPrice && totalDiscount && (
                <Chip
                  bg="primary.main"
                  color="white"
                  px="0.5rem"
                  py="0.25rem"
                  ml="1rem"
                  fontWeight="600"
                  fontSize="12px"
                  textAlign="center"
                >
                  {Math.floor(totalDiscount)}% off
                </Chip>
              )}
            </FlexBox>
          </Box>

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {pricingTiers &&
              pricingTiers.length > 0 &&
              pricingTiers.map((tier, index) => {
                const selectedConfiguredItem = configuredItems.find(
                  (item) =>
                    item.Id === selectedRowId ||
                    item.Configurators.some(
                      (config) => config.Vid === selectedSpec
                    )
                );
                const isActiveTier =
                  currentQuantity >= tier.MinQuantity &&
                  (!pricingTiers[index + 1] ||
                    currentQuantity < pricingTiers[index + 1].MinQuantity);

                return (
                  <div
                    key={index}
                    style={{
                      background: isActiveTier ? "#e74c3ca3" : "#ddd",
                      color: "black",
                      padding: "15px",
                      borderRadius: "8px",
                      textAlign: "center",
                      width: "130px",
                      border: isActiveTier ? "2px solid #e74c3c" : "none",
                    }}
                  >
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>
                      {tier.Price.CurrencySign}
                      {tier.Price.ConvertedPriceWithoutSign}
                    </div>
                    <div style={{ fontSize: "14px", marginTop: "5px" }}>
                      {tier.MinQuantity} or More
                    </div>
                  </div>
                );
              })}
          </div>

          {selectedSpec && (
            <Box style={{ paddingTop: "8px", paddingBottom: "8px" }}>
              <SemiSpan
                style={{ fontWeight: "bold", color: "#000", fontSize: "15px" }}
              >
                {
                  Attributes?.find((attr) => attr.Vid === selectedSpec)
                    ?.PropertyName
                }
                :{" "}
                {configuredItems
                  .find(
                    (item) =>
                      item.Id === selectedRowId ||
                      item.Configurators.some(
                        (config) => config.Vid === selectedSpec
                      )
                  )
                  ?.Configurators.map((config, index) => {
                    const matchingAttribute = Attributes.find(
                      (attr) => attr.Vid === config.Vid
                    );
                    return (
                      <Fragment key={index}>
                        {matchingAttribute ? matchingAttribute.Value : config.Vid}
                        {index <
                          (configuredItems.find(
                            (item) =>
                              item.Id === selectedRowId ||
                              item.Configurators.some(
                                (config) => config.Vid === selectedSpec
                              )
                          )?.Configurators.length || 0) -
                            1 && ", "}
                      </Fragment>
                    );
                  })}
              </SemiSpan>
            </Box>
          )}

          <div className={styles.containerStyle}>
            <div className={styles.buttonContainerStyle}>
              {Attributes?.filter((item) =>
                configuredItems.some((configItem) =>
                  configItem.Configurators.some(
                    (config) => config.Vid === item.Vid
                  )
                )
              )
                .reduce((uniqueItems, item) => {
                  const hasImage = item.ImageUrl;
                  const hasSize = item.Value && item.PropertyName === "Size";
                  if (hasImage || !hasSize) {
                    if (
                      !uniqueItems.some(
                        (uniqueItem) => uniqueItem.Vid === item.Vid
                      )
                    ) {
                      uniqueItems.push(item);
                    }
                  }
                  return uniqueItems;
                }, [])
                .map((item) => (
                  <button
                    key={item.Vid}
                    onClick={() => handleVariantSelect(item)}
                    className={
                      styles.getButtonStyle +
                      (selectedSpec === item.Vid
                        ? ` ${styles.getButtonStyleSelected}`
                        : "")
                    }
                  >
                    {item.ImageUrl ? (
                      <img
                        src={item.ImageUrl}
                        alt={item.Value}
                        style={{
                          width: "100%",
                          height: "40px",
                        }}
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    ) : (
                      item.Value
                    )}
                  </button>
                ))}
            </div>

            <div className={styles.tableContainerStyle}>
              {configuredItems.length > 0 &&
              configuredItems.some((item) =>
                item.Configurators.some((config) => config.Vid === selectedSpec)
              ) ? (
                <table className={styles.tableStyle}>
                  <thead>
                    <tr className={styles.tableHeaderStyle}>
                      <th className={styles.tableHeaderCellStyle}>Variants</th>
                      <th className={styles.tableHeaderCellStyle}>Price</th>
                      <th className={styles.tableHeaderCellStyle}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {configuredItems
                      .filter((item) =>
                        item.Configurators.some(
                          (config) => config.Vid === selectedSpec
                        )
                      )
                      .map((item) => (
                        <tr
                          key={item.Id}
                          onClick={() => {
                            handleRowClick(item.Id);
                          }}
                          style={{
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                          }}
                        >
                          <td className={styles.tableCellStyle}>
                            {item.Configurators.map((config, index) => {
                              const matchingAttribute = Attributes.find(
                                (attr) => attr.Vid === config.Vid
                              );
                              return (
                                <Fragment key={index}>
                                  {matchingAttribute
                                    ? matchingAttribute.Value
                                    : config.Vid}
                                  {index < item.Configurators.length - 1 &&
                                    ", "}
                                </Fragment>
                              );
                            })}
                          </td>
                          {item.QuantityRanges?.length ? (
                            <td className={styles.tableCellStyle}>
                              {(() => {
                                const selectedItem = configuredItems.find(
                                  (item) =>
                                    item.Id === selectedRowId ||
                                    item.Configurators.some(
                                      (config) => config.Vid === selectedSpec
                                    )
                                );
                                if (!selectedItem?.QuantityRanges?.length) {
                                  return `${selectedItem?.Price.CurrencySign}${selectedItem?.Price.ConvertedPriceWithoutSign}`;
                                }
                                const activeTier = pricingTiers?.find(
                                  (tier) =>
                                    currentQuantity >= tier.MinQuantity &&
                                    (!pricingTiers[
                                      pricingTiers.indexOf(tier) + 1
                                    ] ||
                                      currentQuantity <
                                        pricingTiers[
                                          pricingTiers.indexOf(tier) + 1
                                        ].MinQuantity)
                                );
                                const displayPrice = activeTier
                                  ? activeTier.Price.ConvertedPriceWithoutSign
                                  : selectedItem.QuantityRanges[0].Price
                                      .ConvertedPriceWithoutSign;
                                return `${selectedItem.Price.CurrencySign}${displayPrice}`;
                              })()}
                            </td>
                          ) : (
                            <td className={styles.tableCellStyle}>
                              {(() => {
                                if (!item.QuantityRanges?.length) {
                                  return `${item.Price.CurrencySign}${item.Price.ConvertedPriceWithoutSign}`;
                                }
                                const applicableTier =
                                  item.QuantityRanges.slice()
                                    .sort(
                                      (a, b) => b.MinQuantity - a.MinQuantity
                                    )
                                    .find(
                                      (tier) =>
                                        currentQuantity >= tier.MinQuantity
                                    );
                                const displayPrice = applicableTier
                                  ? applicableTier.Price
                                      .ConvertedPriceWithoutSign
                                  : item.Price.ConvertedPriceWithoutSign;
                                return `${item.Price.CurrencySign}${displayPrice}`;
                              })()}
                            </td>
                          )}
                          <td
                            className={styles.tableCellStyle}
                            style={{
                              textAlign: "center",
                              verticalAlign: "middle",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              <AddToCartButton
                                productId={productId || id}
                                variantId={item.Id}
                                sellerId={sellerId}
                                images={images}
                                title={title}
                                discountPrice={discountPrice}
                                price={getDisplayPrice(item, currentQuantity)}
                                slug={slug}
                                productStock={item.Quantity}
                                productType="Abroad"
                                sizeColor={sizeColor}
                                selectedColor={getSelectedColor(item)}
                                selectedSpecification={getSelectedSpecification(
                                  item
                                )}
                                selectedSize={getItemSize(
                                  item,
                                  Attributes,
                                  selectedSize
                                )}
                                selectedPrice={getDisplayPrice(
                                  item,
                                  currentQuantity
                                )}
                                currentQuantity={currentQuantity}
                                setCurrentQuantity={setCurrentQuantity}
                              />
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#555",
                                  marginTop: "-40px",
                                }}
                              >
                                In Stock: <strong>{item.Quantity}</strong>
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ) : (
                <div>
                  <AddToCartButton
                    productId={productId || id}
                    variantId={null}
                    sellerId={sellerId}
                    images={images}
                    title={title}
                    discountPrice={discountPrice}
                    price={selectedPrice}
                    slug={slug}
                    productStock={productStock}
                    productType="Abroad"
                    sizeColor={sizeColor}
                    selectedColor={selectedColor}
                    selectedSpecification={selectedSpecification}
                    selectedSize={selectedSize}
                    selectedPrice={selectedPrice}
                    currentQuantity={currentQuantity}
                    setCurrentQuantity={setCurrentQuantity}
                  />
                </div>
              )}
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}