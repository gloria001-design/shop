import type { Product, Review } from "@/src/types/product";

const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "tape-details",
    name: "T-shirt with Tape Details",
    price: 120,
    rating: 4.5,
    reviewsCount: 120,
    image: img("photo-1521572163474-6864f9cf17ab"),
    images: [
      img("photo-1521572163474-6864f9cf17ab"),
      img("photo-1583743814966-8936f5b7be23"),
      img("photo-1618354691373-d851c5c3a990"),
    ],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Gray", hex: "#9CA3AF" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "T-shirts",
    style: "Casual",
    description:
      "Soft cotton tee with contrast tape details along the seams. Everyday comfort with a clean, modern finish.",
    isNew: true,
  },
  {
    id: "skinny-jeans",
    name: "Skinny Fit Jeans",
    price: 240,
    originalPrice: 260,
    rating: 3.5,
    reviewsCount: 80,
    image: img("photo-1542272604-787c3835535d"),
    images: [
      img("photo-1542272604-787c3835535d"),
      img("photo-1473966968600-fa801b869a1a"),
      img("photo-1541099649105-f69ad21f3246"),
    ],
    colors: [
      { name: "Blue", hex: "#1E3A8A" },
      { name: "Black", hex: "#111827" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "Jeans",
    style: "Casual",
    description:
      "Slim skinny-fit jeans with stretch denim for all-day comfort and a sharp silhouette.",
    isNew: true,
  },
  {
    id: "checkered-shirt",
    name: "Checkered Shirt",
    price: 180,
    rating: 4.5,
    reviewsCount: 95,
    image: img("photo-1596755094514-f87e34085b2c"),
    images: [
      img("photo-1596755094514-f87e34085b2c"),
      img("photo-1602810318383-e386cc2a3ccf"),
      img("photo-1598033129183-c4f50c736f10"),
    ],
    colors: [
      { name: "Red", hex: "#DC2626" },
      { name: "Blue", hex: "#2563EB" },
      { name: "Green", hex: "#16A34A" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "Shirts",
    style: "Casual",
    description:
      "Classic checkered button-up with a relaxed cut. Layer it or wear it open over a tee.",
    isNew: true,
  },
  {
    id: "sleeve-striped",
    name: "Sleeve Striped T-shirt",
    price: 130,
    originalPrice: 160,
    rating: 4.5,
    reviewsCount: 110,
    image: img("photo-1562157873-818bc0726f68"),
    images: [
      img("photo-1562157873-818bc0726f68"),
      img("photo-1576566588028-4147f3842f27"),
      img("photo-1503341504253-dff4815485cf"),
    ],
    colors: [
      { name: "Orange", hex: "#F97316" },
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "T-shirts",
    style: "Casual",
    description:
      "Orange-forward tee with bold sleeve stripes. Soft hand-feel and a regular fit.",
    isNew: true,
  },
  {
    id: "vertical-striped",
    name: "Vertical Striped Shirt",
    price: 212,
    originalPrice: 232,
    rating: 5.0,
    reviewsCount: 140,
    image: img("photo-1602810316693-3667ba139190"),
    images: [
      img("photo-1602810316693-3667ba139190"),
      img("photo-1598033129183-c4f50c736f10"),
      img("photo-1603252109303-2751441dd571"),
    ],
    colors: [
      { name: "Green", hex: "#166534" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#1E3A5F" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "Shirts",
    style: "Formal",
    description:
      "Vertical stripe dress shirt with a refined collar and easy drape for work or nights out.",
    isTopSelling: true,
  },
  {
    id: "courage-graphic",
    name: "Courage Graphic T-shirt",
    price: 145,
    rating: 4.0,
    reviewsCount: 88,
    image: img("photo-1503342217505-b0a15ec3261c"),
    images: [
      img("photo-1503342217505-b0a15ec3261c"),
      img("photo-1529374255404-311a2a4f1fd9"),
      img("photo-1586790170083-2f9ceadc732d"),
    ],
    colors: [
      { name: "Orange", hex: "#EA580C" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "T-shirts",
    style: "Casual",
    description:
      "Statement graphic tee with bold print placement. Midweight cotton and a relaxed fit.",
    isTopSelling: true,
  },
  {
    id: "bermuda-shorts",
    name: "Loose Fit Bermuda Shorts",
    price: 80,
    rating: 3.0,
    reviewsCount: 56,
    image: img("photo-1591195853828-11db59a44f6b"),
    images: [
      img("photo-1591195853828-11db59a44f6b"),
      img("photo-1565084888279-aca607ecce0c"),
      img("photo-1506629082955-511b1aa782c0"),
    ],
    colors: [
      { name: "Blue", hex: "#3B82F6" },
      { name: "Beige", hex: "#D6D3D1" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "Shorts",
    style: "Casual",
    description:
      "Loose bermuda shorts with an easy drawstring waist. Built for warm-weather comfort.",
    isTopSelling: true,
  },
  {
    id: "faded-jeans",
    name: "Faded Skinny Jeans",
    price: 210,
    rating: 4.5,
    reviewsCount: 102,
    image: img("photo-1541099649105-f69ad21f3246"),
    images: [
      img("photo-1541099649105-f69ad21f3246"),
      img("photo-1542272604-787c3835535d"),
      img("photo-1473966968600-fa801b869a1a"),
    ],
    colors: [
      { name: "Black", hex: "#1F2937" },
      { name: "Gray", hex: "#6B7280" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "Jeans",
    style: "Casual",
    description:
      "Faded black skinny jeans with soft stretch and a modern washed finish.",
    isTopSelling: true,
  },
  {
    id: "one-life",
    name: "One Life Graphic T-shirt",
    price: 260,
    originalPrice: 300,
    rating: 4.5,
    reviewsCount: 451,
    image: img("photo-1583743814966-8936f5b7be23"),
    images: [
      img("photo-1583743814966-8936f5b7be23"),
      img("photo-1618354691373-d851c5c3a990"),
      img("photo-1521572163474-6864f9cf17ab"),
    ],
    colors: [
      { name: "Olive", hex: "#4B5320" },
      { name: "Navy", hex: "#314F7C" },
      { name: "Charcoal", hex: "#2F2F2F" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "T-shirts",
    style: "Casual",
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it ensures maximum comfort all day long.",
  },
  {
    id: "gradient-graphic",
    name: "Gradient Graphic T-shirt",
    price: 145,
    rating: 3.5,
    reviewsCount: 72,
    image: img("photo-1576566588028-4147f3842f27"),
    images: [
      img("photo-1576566588028-4147f3842f27"),
      img("photo-1529374255404-311a2a4f1fd9"),
      img("photo-1503341504253-dff4815485cf"),
    ],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Pink", hex: "#F9A8D4" },
      { name: "Blue", hex: "#60A5FA" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "T-shirts",
    style: "Party",
    description:
      "Gradient print tee with a soft cotton body. A bright everyday essential.",
  },
  {
    id: "polo-tipping",
    name: "Polo with Tipping Details",
    price: 180,
    rating: 4.5,
    reviewsCount: 64,
    image: img("photo-1586790170083-2f9ceadc732d"),
    images: [
      img("photo-1586790170083-2f9ceadc732d"),
      img("photo-1618354690430-a39961e8e4a1"),
      img("photo-1625910513413-58cbcb8f8c0e"),
    ],
    colors: [
      { name: "Pink", hex: "#E8B4B8" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#1E3A5F" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "T-shirts",
    style: "Casual",
    description:
      "Soft polo with contrast tipping on the collar and sleeves. Smart-casual staple.",
  },
  {
    id: "black-striped",
    name: "Black Striped T-shirt",
    price: 120,
    originalPrice: 150,
    rating: 5.0,
    reviewsCount: 98,
    image: img("photo-1434389677669-e08b4cac3105"),
    images: [
      img("photo-1434389677669-e08b4cac3105"),
      img("photo-1562157873-818bc0726f68"),
      img("photo-1503342217505-b0a15ec3261c"),
    ],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "T-shirts",
    style: "Casual",
    description:
      "Striped tee with contrasting sleeves. Clean lines and a classic athletic vibe.",
  },
  {
    id: "polo-contrast",
    name: "Polo with Contrast Trims",
    price: 212,
    originalPrice: 242,
    rating: 4.0,
    reviewsCount: 70,
    image: img("photo-1625910513413-58cbcb8f8c0e"),
    images: [
      img("photo-1625910513413-58cbcb8f8c0e"),
      img("photo-1618354690430-a39961e8e4a1"),
      img("photo-1586790170083-2f9ceadc732d"),
    ],
    colors: [
      { name: "Teal", hex: "#0D9488" },
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "T-shirts",
    style: "Formal",
    description:
      "Teal polo with contrast trims. Structured collar and a tailored regular fit.",
  },
  {
    id: "gym-hoodie",
    name: "Performance Hoodie",
    price: 190,
    rating: 4.2,
    reviewsCount: 61,
    image: img("photo-1556821840-3a63f95609a7"),
    images: [
      img("photo-1556821840-3a63f95609a7"),
      img("photo-1578768079052-aa76e52ff62e"),
      img("photo-1509942774183-9f4b32d4d0d5"),
    ],
    colors: [
      { name: "Gray", hex: "#9CA3AF" },
      { name: "Black", hex: "#000000" },
      { name: "Navy", hex: "#1E3A5F" },
    ],
    sizes: ["Small", "Medium", "Large", "X-Large"],
    type: "Hoodie",
    style: "Gym",
    description:
      "Lightweight performance hoodie for training days and cool-down walks.",
  },
];

export const newArrivals = products.filter((p) => p.isNew);
export const topSelling = products.filter((p) => p.isTopSelling);

export function getProduct(id: string) {
  return products.find((p) => p.id === id);
}

export function discountPercent(product: Product) {
  if (!product.originalPrice) return 0;
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
}

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "one-life",
    name: "Samantha D.",
    rating: 5,
    comment:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    date: "August 14, 2023",
    verified: true,
  },
  {
    id: "r2",
    productId: "one-life",
    name: "Alex M.",
    rating: 5,
    comment:
      "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being so soft and breathable, it's already become a favorite in my wardrobe.",
    date: "August 15, 2023",
    verified: true,
  },
  {
    id: "r3",
    productId: "one-life",
    name: "Ethan R.",
    rating: 5,
    comment:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalist yet stylish pattern caught my eye, and the fit is perfect.",
    date: "August 16, 2023",
    verified: true,
  },
  {
    id: "r4",
    productId: "one-life",
    name: "Olivia P.",
    rating: 5,
    comment:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear.",
    date: "August 17, 2023",
    verified: true,
  },
  {
    id: "r5",
    productId: "one-life",
    name: "Liam K.",
    rating: 5,
    comment:
      "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes. It's a conversation starter.",
    date: "August 18, 2023",
    verified: true,
  },
  {
    id: "r6",
    productId: "one-life",
    name: "Ava H.",
    rating: 5,
    comment:
      "I'm not just liking this shirt — I'm loving it! The design is unique and the fabric feels like a dream. It's already a staple in my wardrobe.",
    date: "August 19, 2023",
    verified: true,
  },
];

export const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    comment:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    name: "Alex K.",
    rating: 5,
    comment:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.",
  },
  {
    name: "James L.",
    rating: 5,
    comment:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection is fantastic.",
  },
  {
    name: "Monica E.",
    rating: 5,
    comment:
      "Shop.co has completely transformed my wardrobe. The clothes feel premium and the shipping was faster than expected.",
  },
];

export const dressStyles = [
  {
    name: "Casual" as const,
    image: img("photo-1516826957135-700dedea698c", 800),
  },
  {
    name: "Formal" as const,
    image: img("photo-1507679799987-c73779587ccf", 800),
  },
  {
    name: "Party" as const,
    image: img("photo-1515372039744-b8f02a3ae446", 800),
  },
  {
    name: "Gym" as const,
    image: img("photo-1534438327276-14e5300c3a48", 800),
  },
];
