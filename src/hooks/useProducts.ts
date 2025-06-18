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
    if (loading || !hasMore) {
      return;
    }

    console.log(
      `Loading page ${page} (${page === 1 ? "20 products" : "10 products"})`
    );
    setLoading(true);

    try {
      const currentPerPage = page === 1 ? initialPerPage : subsequentPerPage;

      // Add fake loading delay for better UX
      const loadingDelay = page === 1 ? 1000 : 1500; // 1s for first load, 1.5s for subsequent loads

      // Fetch products and add loading delay simultaneously
      const [response] = await Promise.all([
        fetchProducts(page, currentPerPage),
        new Promise((resolve) => setTimeout(resolve, loadingDelay)),
      ]);

      if (page === 1) {
        // First load - replace products
        setProducts(response.data);
      } else {
        // Subsequent loads - append products
        setProducts((prevProducts) => [...prevProducts, ...response.data]);
      }

      // Check if we have more products to load
      const hasMoreProducts = response.current_page < response.last_page;
      setHasMore(hasMoreProducts);

      // Increment page for next load
      setPage(page + 1);

      console.log(
        `✅ Loaded ${response.data.length} products. Total: ${
          page === 1
            ? response.data.length
            : products.length + response.data.length
        }/${response.total}`
      );
    } catch (error) {
      console.error("❌ Error loading products:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, products.length]);

  useEffect(() => {
    // Load products only once on initial mount
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once

  const lastProductElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            console.log("🔄 Scrolled to bottom - loading more products...");
            loadProducts();
          }
        },
        {
          rootMargin: "100px", // Start loading 100px before the element is visible
        }
      );
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

  const reloadProducts = useCallback(() => {
    console.log("🔄 Reloading products...");
    setProducts([]);
    setPage(1);
    setHasMore(true);
    // Use setTimeout to ensure state updates are applied before loading
    setTimeout(() => {
      loadProducts();
    }, 0);
  }, [loadProducts]);

  return {
    products,
    loading,
    hasMore,
    lastProductElementRef,
    updateProductFavoriteStatus,
    resetProducts,
    reloadProducts,
  };
};
