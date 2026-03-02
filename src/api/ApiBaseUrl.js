const ApiBaseUrl = {
 // Live
 // baseUrl1: process.env.NEXT_PUBLIC_API_BASE_URL_1 || `https://frontend.tizaraa.com/api/`,
 // baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || `https://frontend.tizaraa.shop/api/`,
 // ImgUrl: process.env.NEXT_PUBLIC_IMAGE_BASE_URL || `https://minio.tizaraa.shop/tizaraa/`,

 // UAT
 baseUrl1:
  process.env.NEXT_PUBLIC_API_BASE_URL_1 || `https://frontend.tizaraa.com/api/`,
 baseUrl:
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  `https://uat-client.tizaraa.shop/api/`,
 ImgUrl:
  process.env.NEXT_PUBLIC_IMAGE_BASE_URL ||
  `https://minio.tizaraa.shop/tizaraa/`,
};

export default ApiBaseUrl;
