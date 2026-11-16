const ApiBaseUrl = {
 // Live
//  baseUrl1: `https://frontend.tizaraa.com/api/v1/`,
//  baseUrl: `https://frontend.tizaraa.shop/api/v1/`,
//  ImgUrl: `https://minio.tizaraa.shop/tizaraa/`,
//  localApiUrl: `https://customer-api.tizaraa.shop/api/v1/`,

 // UAT
 baseUrl1: `https://frontend.tizaraa.com/api/`,
 baseUrl: `https://uat-client.tizaraa.shop/api/`,
 // Customer API — from NEXT_PUBLIC_CUSTOMER_API (.env / Dokploy). Accepts the host with or
 // without /api/v1 (e.g. https://customer-api.tizaraa.shop/) — always ends in /api/v1/
 localApiUrl: (process.env.NEXT_PUBLIC_CUSTOMER_API || "https://customer-api.tizaraa.shop")
  .trim().replace(/\/+$/, "").replace(/\/api\/v1$/, "") + "/api/v1/",
 // seller panel (registration, corporate apply, …) — from NEXT_PUBLIC_SELLER_API, no trailing slash
 sellerUrl: (process.env.NEXT_PUBLIC_SELLER_API || "https://tizaraa-seller.tizaraa.shop").trim().replace(/\/+$/, ""),
 ImgUrl: `https://minio.tizaraa.shop/tizaraa/`,

 // localApiUrl: `http://127.0.0.1:8000/api/v1/`,
//for development purpose

};

export default ApiBaseUrl;
