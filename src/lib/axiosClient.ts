"use client";
import Axios from "axios";
import ApiBaseUrl from "api/ApiBaseUrl";
import authService from "services/authService";

// Create a dedicated Axios instance
const axios = Axios.create({
 baseURL: ApiBaseUrl.baseUrl,
 headers: {
  "Content-Type": "application/json",
 },
});

// Add request interceptor to attach Redux token dynamically
 axios.interceptors.request.use(
  (config) => {
   const token = authService.getToken();

   if (token) {
    config.headers.Authorization = `Bearer ${token}`;
   }

   // Attach persistent guest token for unauthenticated cart sessions
   if (typeof window !== "undefined") {
    let guestToken = localStorage.getItem("guest_token");
    if (!guestToken) {
     guestToken = "gst_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
     localStorage.setItem("guest_token", guestToken);
    }
    if (guestToken) {
     config.headers["X-Guest-Token"] = guestToken;
    }
   }

   // Endpoints to redirect to local API
   const localEndpoints = [
    "user/profile",
    "user/profile/history",
    "user/address",
    "user/order",
    "user/order/",
    "user/pending/order",
    "user/delivered/order",
    "user/cancel/order",
    "user/return/order",
    "get-invoice",
    "frontend/home/categorie/all",
    "frontend/slider/all",
    "campaigns/active",
    "campaigns/product/filter/",
    "campaigns/product/",
    "product/country/flag",
    "frontend/remark/product/items",
    "frontend/product/details",
    "frontend/product/related",
    "frontend/category/product/view",
    "country/product/view/",
    "frontend/latest/justoforyou/product/view",
    "seller/profile/",
    "seller/products/",
    "shop-filter/",
    "cart/product/info/",
    "cart/sync",
    "cart/add",
    "cart/clear",
    "cart/update/",
    "cart/remove/",
    "cart",
    "pay-via-ajax",
    "checkout/order",
    "checkout/check/pricing",
    "checkout/promo/validate",
    "promo/apply",
    "checkout/address",
    "search",
    "search/suggestions",
    "delivery/charge/apply",
    "otc/price/percentage",
    "home/corporate-product",
    "corporate-shop",
    "corporate/",
    "employee-details",
    "order/item/return",
    "orders/",
    "reviews",
    "user/reviews",
   ];
   if (config.url && localEndpoints.some((e) => config.url.includes(e))) {
    config.url = config.url.replace(ApiBaseUrl.baseUrl, ApiBaseUrl.localApiUrl);
    if (config.url.startsWith("v1/")) {
        config.url = config.url.substring(3);
    }
    config.baseURL = ApiBaseUrl.localApiUrl;
   }
 
   return config;
  },
  (error) => Promise.reject(error)
 );

export default axios;
