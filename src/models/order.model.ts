import User from "./user.model";

type Item = {
  product_img: string;
  product_name: string;
  product_price: number;
  product_quantity: number;
};

interface Order {
  user: User;
  id: string;
  tax: number;
  items: Item[];
  createdAt: Date;
  discount: number;
  deliveredAt: Date;
  totalPrice: number;
  isDelivered: boolean;
  shippingAddress: string;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
  invoice: number;
  date: Date;
  amount: number;
  invoice_id: number;
  address: string;
  // order_place_date: string;

}

export default Order;
