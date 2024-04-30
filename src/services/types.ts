export interface Product {
  productId: number;
  name: string;
  weight: string;
  price: number;
  qty: number;
  image: string;
  updated_at: Date;
  created_at: Date;
}

export interface ProductPage {
  products: Product[];
  totalPages: number;
  currentPage: number;
  totalProducts: number;
}
