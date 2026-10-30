export type DressStyle = "Casual" | "Formal" | "Party" | "Gym";
export type ProductType = "T-shirts" | "Shorts" | "Shirts" | "Hoodie" | "Jeans";

export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  type: ProductType;
  style: DressStyle;
  description: string;
  isNew?: boolean;
  isTopSelling?: boolean;
};

export type CartItem = Product & {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
};

export type Review = {
  id: string;
  productId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified?: boolean;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderAddress = {
  fullName: string;
  phone: string;
  line1: string;
  city: string;
  postal: string;
};

export type Order = {
  id: string;
  userId: string;
  userName: string;
  email: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  address: OrderAddress;
  payment: "cod" | "card";
  status: OrderStatus;
  createdAt: string;
};
