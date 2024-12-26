"use client";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
//import "react-toastify/dist/ReactToastify.css";
import Box from "@component/Box";
import Grid from "@component/grid/Grid";
import { Card1 } from "@component/Card1";
import Divider from "@component/Divider";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { ProductCard7 } from "@component/product-cards";
import { useAppContext } from "@context/app-context";
import { currency } from "@utils/utils";
import { Button } from "@component/buttons";
import CheckBox from "@component/CheckBox";
import DeleteIcon from "@mui/icons-material/Delete";
import BeatLoader from "react-spinners/BeatLoader";
import authService from "services/authService";
import { useRouter } from "next/navigation";

export default function Cart() {
  const { state, dispatch } = useAppContext();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<(string | number)[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();


  useEffect(() => {
    setIsLoggedIn(authService.isAuthenticated());
  }, []);

  useEffect(() => {
    setSelectAll(
      state.cart.length > 0 &&
      state.cart.every((item) => state.selectedProducts.includes(item.id))
    );
  }, [state.cart, state.selectedProducts]);
  
  if (!state.buyNowItem) {
    return null; // Or some other fallback
  }
  


  const handleSelectAll = () => {
    if (selectAll) {
      dispatch({ type: "DESELECT_ALL_PRODUCTS" });
    } else {
      dispatch({ type: "SELECT_ALL_PRODUCTS" });
    }
  };

  const handleDeleteSelected = async () => {
    setIsDeleting(true);

    try {
      // Simulate async operation (e.g., API call) with setTimeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      state.selectedProducts.forEach((productId) => {
        dispatch({
          type: "CHANGE_CART_AMOUNT",
          payload: { id: productId, qty: 0 },
        });
      });

      localStorage.removeItem("orderId");
      sessionStorage.removeItem("selectedProducts");
      localStorage.removeItem("cart");
      sessionStorage.removeItem("paymentMethod");
      sessionStorage.removeItem("savedTotalPrice");
      sessionStorage.removeItem("savedTotalWithDelivery");


      dispatch({ type: "DESELECT_ALL_PRODUCTS" });

      toast.success("Selected items deleted successfully");
    } catch (error) {
      toast.error("Failed to delete selected items");
    } finally {
      setIsDeleting(false);
    }
  };

  const getTotalPrice = () => {
    return state.cart.reduce((accumulator, item) => {
      if (state.selectedProducts.includes(item.id)) {
        return (
          accumulator +
          (item.discountPrice ? item.discountPrice : item.price) * item.qty
        );
      }
      return accumulator;
    }, 0);
  };

  const handleCheckout = async () => {
    setIsLoading(true); // Show loading spinner immediately when the button is clicked
  
    if (!isLoggedIn) {
      // Redirect to login page if not logged in
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
      router.push("/login");
      return; // Exit function, no need to reset loading here
    }
  
    const selectedItems = state.cart.filter((item) =>
      state.selectedProducts.includes(item.id)
    );
  
    if (selectedItems.length === 0) {
      toast.error("Please select products to checkout");
      setIsLoading(false); // Reset loading state if no products are selected
      return;
    }
  
    const checkoutData = JSON.stringify(selectedItems);
    sessionStorage.setItem("selectedProducts", checkoutData);
  
    const totalPrice = getTotalPrice();
  
    if (totalPrice === 0) {
      toast.error("Total price is 0. Please add items to your cart.");
      setIsLoading(false); // Reset loading state if total price is 0
      return;
    }
  
    const isError = selectedItems.some(item => item.qty <= 0);
    if (isError) {
      setCheckoutError(true);
      setIsLoading(false); // Reset loading state if there's an error
      return;
    }
  
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
    router.push("/checkout"); // Redirect to checkout page
  };

  useEffect(() => {
    if (checkoutSuccess) {
      toast.success("Checkout successfully!");
      setCheckoutSuccess(false);
    }
  }, [checkoutSuccess]);

  useEffect(() => {
    if (checkoutError) {
      toast.error("Checkout Failed");
      setCheckoutError(false);
    }
  }, [checkoutError]);

  const totalPrice = getTotalPrice();

  return (
    <Fragment>
      <Grid container spacing={6}>
        <Grid item lg={8} md={8} xs={12}>
          <Card1 mb="1.5rem">
            <FlexBox alignItems="center" justifyContent="space-between">
              <FlexBox alignItems="center">
                <CheckBox checked={selectAll} onChange={handleSelectAll} />
                <Typography ml="0.5rem">Select All</Typography>
              </FlexBox>
              <Button
      size="small"
      color="primary"
      variant="outlined"
      disabled={
        state.selectedProducts.length === 0 ||
        state.cart.length === 0 ||
        totalPrice === 0 ||
        isDeleting
      }
      onClick={handleDeleteSelected}
      className={`delete-button ${isDeleting ? "deleting" : ""}`}
    >
      {isDeleting ? (
        <BeatLoader size={18} color="#E94560" />
      ) : (
        <>
          <DeleteIcon style={{ marginRight: "8px", fontSize: "18px" }} /> Remove All
        </>
      )}
    </Button>
            </FlexBox>
          </Card1>
          {/* {state.buyNowItem && (
  <ProductCard21
    mb="1.5rem"
    id={state.buyNowItem.id} 
    key={state.buyNowItem.id}
    qty={state.buyNowItem.qty}
    slug={state.buyNowItem.slug}
    name={state.buyNowItem.name}
    price={state.buyNowItem.price}
    imgUrl={state.buyNowItem.imgUrl}
    productStock={state.buyNowItem.productStock}
    discountPrice={state.buyNowItem.discountPrice}
    productId={state.buyNowItem.productId}
    sellerId={state.buyNowItem.sellerId}
    b2bPricing={state.buyNowItem.b2bPricing}
  />
)} */}




          
          {state.cart.map((item) => (
            <ProductCard7
              mb="1.5rem"
              id={item.id}
              key={item.id}
              qty={item.qty}
              slug={item.slug}
              name={item.name}
              price={item.price}
              imgUrl={item.imgUrl}
              productStock={item.productStock}
              discountPrice={item.discountPrice}
              productId={item.productId}
              sellerId={item.sellerId}
              b2bPricing={item.b2bPricing}
              total_amount={item.total_amount}
            />
          ))}
        </Grid>

        <Grid item lg={4} md={4} xs={12}>
          <Card1>
            <FlexBox justifyContent="space-between" alignItems="center" mb="1rem">
              <Typography color="gray.600">Total:</Typography>
              <Typography fontSize="18px" fontWeight="600" lineHeight="1">
                {currency(totalPrice)}
              </Typography>
            </FlexBox>

            <Divider mb="1rem" />

            {/* <Link href="/checkout" passHref> */}
              <Button
                variant="contained"
                color="primary"
                fullwidth
                onClick={handleCheckout}
                disabled={isLoading || state.selectedProducts.length === 0 || state.cart.length === 0 || totalPrice === 0}
              >
                {isLoading ? <BeatLoader size={18} color="#E94560" /> : "PROCEED TO CHECKOUT"}
              </Button>
            {/* </Link> */}
          </Card1>
        </Grid>
      </Grid>
      <style jsx>{`
        .delete-button {
          transition: all 0.3s ease;
        }
        .delete-button.deleting {
          opacity: 0.5;
          pointer-events: none;
        }
        .delete-button:hover {
          background-color: #f44336;
          color: white;
        }
      `}</style>
    </Fragment>
  );
}