import React from "react";
import { Product } from "../types/product";
import { FavoriteIcon } from "./FavoriteIcon";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
  onToggleFavorite: (productId: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleFavorite,
}) => {
  return (
    <div className="border rounded-lg shadow-lg overflow-hidden flex flex-col h-full bg-white hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <ProductImage
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover bg-gray-100"
          originalPic={product.original_data?.pic}
          hasLocalImage={product.has_local_image}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2 flex-grow text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xl font-bold text-blue-600 mb-3">
          €{parseFloat(product.price).toFixed(2)}
        </p>
        <button
          onClick={() => onToggleFavorite(product.id)}
          className="mt-auto self-end p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          aria-label={
            product.is_favorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          <FavoriteIcon isFavorite={product.is_favorite} />
        </button>
      </div>
    </div>
  );
};
