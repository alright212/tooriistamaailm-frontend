import { Product, PaginatedResponse } from "../types/product";

const API_BASE_URL = "http://localhost:8000/api"; // Laravel backend URL

export const fetchProducts = async (
  page: number,
  perPage: number
): Promise<PaginatedResponse<Product>> => {
  const response = await fetch(
    `${API_BASE_URL}/products?page=${page}&per_page=${perPage}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();

  // Transform the data to match our interface
  return {
    data: data.data.map((product: any) => ({
      ...product,
      is_favorite: product.favorite_exists || false, // Laravel withExists returns with the name favorite_exists
    })),
    current_page: data.current_page,
    last_page: data.last_page,
    per_page: data.per_page,
    total: data.total,
  };
};

export const toggleFavorite = async (
  productId: number
): Promise<{ product_id: number; is_favorite: boolean }> => {
  const response = await fetch(
    `${API_BASE_URL}/products/${productId}/favorite`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to toggle favorite status");
  }
  return response.json();
};

export const importProducts = async (): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/products/import`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to import products");
  }
  return response.json();
};
