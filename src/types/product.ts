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
