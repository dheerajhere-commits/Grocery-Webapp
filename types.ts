export type Review = {
  id: number;
  author: string;
  rating: number;
  comment: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  reviews: Review[];
};

export type CartItem = Product & {
  quantity: number;
};

export type Recipe = {
  recipeName: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  error?: string;
}

export type Role = 'USER' | 'ADMIN';

export type ShippingInfo = {
  fullName: string;
  address: string;
  city: string;
  zipCode: string;
};

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  shippingInfo: ShippingInfo;
  status: OrderStatus;
};