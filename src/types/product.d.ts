export interface Product {
  id: number;
  name: string;
  price: string; // API returns price as string
  image_url: string;
  is_favorite: boolean; // Added by backend (withExists)
  original_data?: {
    ID: string;
    tootekood: string;
    slug: string;
    soodushind: string;
    pic: string;
    tavahind: string;
    name: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}
