import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';
import { toggleFavorite, importProducts } from '../services/productService';

export const ProductGrid: React.FC = () => {
  const { products, loading, hasMore, lastProductElementRef, updateProductFavoriteStatus, resetProducts } = useProducts();
  const [importing, setImporting] = useState(false);
  const [importMessage, setImportMessage] = useState<string>('');

  const handleToggleFavorite = async (productId: number) => {
    try {
      const response = await toggleFavorite(productId);
      updateProductFavoriteStatus(productId, response.is_favorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // You could show a toast notification here
    }
  };

  const handleImportProducts = async () => {
    setImporting(true);
    setImportMessage('');
    try {
      const response = await importProducts();
      setImportMessage(response.message);
      // Reset and reload products after import
      resetProducts();
      setTimeout(() => {
        window.location.reload(); // Simple refresh to reload products
      }, 1000);
    } catch (error) {
      console.error('Error importing products:', error);
      setImportMessage('Failed to import products. Please try again.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header with import button */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tööriista Maailm</h1>
        <button
          onClick={handleImportProducts}
          disabled={importing}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
            importing
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          } text-white`}
        >
          {importing ? 'Importing...' : 'Import Products'}
        </button>
        {importMessage && (
          <p className={`mt-2 ${importMessage.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>
            {importMessage}
          </p>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product, index) => {
          if (products.length === index + 1 && hasMore) {
            return (
              <div ref={lastProductElementRef} key={product.id}>
                <ProductCard product={product} onToggleFavorite={handleToggleFavorite} />
              </div>
            );
          }
          return (
            <ProductCard key={product.id} product={product} onToggleFavorite={handleToggleFavorite} />
          );
        })}
      </div>

      {/* Loading and status messages */}
      {loading && (
        <div className="text-center mt-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading more products...</p>
        </div>
      )}
      
      {!hasMore && products.length > 0 && (
        <p className="text-center mt-8 text-gray-600">All products loaded.</p>
      )}
      
      {!hasMore && products.length === 0 && !loading && (
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">No products available.</p>
          <p className="text-sm text-gray-500">Try importing products using the button above.</p>
        </div>
      )}
    </div>
  );
};
