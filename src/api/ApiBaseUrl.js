const ApiBaseUrl = {
 // Live
//  baseUrl1: `https://frontend.tizaraa.com/api/v1/`,
//  baseUrl: `https://frontend.tizaraa.shop/api/v1/`,
//  ImgUrl: `https://minio.tizaraa.shop/tizaraa/`,
//  localApiUrl: `https://customer-api.tizaraa.shop/api/v1/`,

 // UAT
 baseUrl1: `https://frontend.tizaraa.com/api/`,
 baseUrl: `https://uat-client.tizaraa.shop/api/`,
 //localApiUrl: `https://customer-api.tizaraa.shop/api/v1/`,
  // NEXT_PUBLIC_* so a .env edit is picked up live in dev (next.config `env` is read only once at start)
  localApiUrl: process.env.NEXT_PUBLIC_CUSTOMER_API,
 // seller panel (registration, corporate apply, …) — from NEXT_PUBLIC_SELLER_API in .env, no trailing slash
 sellerUrl: (process.env.NEXT_PUBLIC_SELLER_API || "").replace(/\/+$/, ""),
 ImgUrl: `https://minio.tizaraa.shop/tizaraa/`,

 // localApiUrl: `http://127.0.0.1:8000/api/v1/`,
//for development purpose

};

export default ApiBaseUrl;
