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
 
   // Endpoints to redirect to local API
   const localEndpoints = [
    "user/profile",
    "user/profile/history",
    "user/address",
    "user/order",
    "user/order/",
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
    "cart/add",
    "cart/clear",
    "cart/update/",
    "cart/remove/",
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
    "employee/registration",
    "employee-details",
    "order/item/return",
    "orders/",
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
