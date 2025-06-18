export interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  is_favorite: boolean; // Added by backend (withExists)
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
