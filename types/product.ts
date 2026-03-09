import { Product } from "./database";

export interface ProductFilters {
  category?: string;
  university?: string;
  search?: string;
  sort?: "price_asc" | "price_desc" | "newest" | "rating";
  page?: number;
  limit?: number;
}

export interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}
