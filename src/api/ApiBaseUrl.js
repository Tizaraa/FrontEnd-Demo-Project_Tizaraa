const ApiBaseUrl = {
 // Live
//  baseUrl1: `https://frontend.tizaraa.com/api/v1/`,
//  baseUrl: `https://frontend.tizaraa.shop/api/v1/`,
//  ImgUrl: `https://minio.tizaraa.shop/tizaraa/`,
//  localApiUrl: `https://customer-api.tizaraa.shop/api/v1/`,

 // UAT
 baseUrl1: `https://frontend.tizaraa.com/api/`,
 baseUrl: `https://uat-client.tizaraa.shop/api/`,
 // Set NEXT_PUBLIC_CUSTOMER_API per deploy (UAT: https://customer-api.tizaraa.shop/api/v1/); falls back to live.
 localApiUrl: process.env.NEXT_PUBLIC_CUSTOMER_API || `https://customer.tizaraa.com/api/v1/`,
 ImgUrl: `https://minio.tizaraa.shop/tizaraa/`,

 // localApiUrl: `http://127.0.0.1:8000/api/v1/`,
//for development purpose

};

export default ApiBaseUrl;
