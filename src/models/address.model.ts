import User from "./user.model";

interface Address {
  id: string;
  user: User;
  city: string;
  name: string;
  phone: string;
  address: string;
  country: string;
  landmark: string;
  province_id: string;
  city_id: string;
  area_id: string;
  deliveryCharge: string;
}

export default Address;
