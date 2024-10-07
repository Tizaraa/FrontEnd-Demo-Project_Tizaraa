import User from "./user.model";

interface Address {
  id: string;
  user: User;
  city: string;
  name: string;
  phone: string;
  address: string;
  country: string;
}

export default Address;
