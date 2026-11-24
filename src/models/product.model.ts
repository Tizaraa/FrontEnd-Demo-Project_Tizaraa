import Shop from "./shop.model";
import Review from "./Review.model";

interface Product {
 unit?: any;
 slug: string;
 price: number;
 discount_price: number;
 original_price?: number;
 product_stock: number;
 title: string;
 rating: number;
 discount: number;
 thumbnail: string;
 id: string;
 shop?: Shop;
 brand?: string;
 size?: string[];
 status?: string;
 colors?: string[];
 images?: string[];
 categories: any[];
 reviews?: Review[];
 published?: boolean;
 // Cart fields sent by the listing APIs so a card can add to cart directly
 seller_id?: number | string;
 min_order_qty?: number;
 max_order_qty?: number | null;
 has_variants?: boolean;
}

export default Product;
