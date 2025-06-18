import { useState, useEffect, useRef, useCallback } from "react";
import { Product } from "../types/product";
import { fetchProducts } from "../services/productService";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const initialPerPage = 20; // Displays the first 20 products on initial load
  const subsequentPerPage = 10; // When the user scrolls down the page, 10 products are loaded each time.

  const loadProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const currentPerPage = page === 1 ? initialPerPage : subsequentPerPage;
      const response = await fetchProducts(page, currentPerPage);

      setProducts((prevProducts) => [...prevProducts, ...response.data]);
      setHasMore(response.data.length === currentPerPage); // If fewer than "currentPerPage" products were returned, there are no more
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading products:", error);
      // Handle error messages for the user
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  useEffect(() => {
    if (page === 1) {
      loadProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load products only once on initial load

  const lastProductElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadProducts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadProducts]
  );

  const updateProductFavoriteStatus = useCallback(
    (productId: number, isFavorite: boolean) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, is_favorite: isFavorite }
            : product
        )
      );
    },
    []
  );

  const resetProducts = useCallback(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, []);

  return {
    products,
    loading,
    hasMore,
    lastProductElementRef,
    updateProductFavoriteStatus,
    resetProducts,
    loadProducts: () => {
      if (page === 1) {
        loadProducts();
      }
    },
  };
};
