import React, { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  originalPic?: string;
  hasLocalImage?: boolean;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = "",
  originalPic,
  hasLocalImage = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [attemptedOriginal, setAttemptedOriginal] = useState(false);

  const handleError = () => {
    if (
      !attemptedOriginal &&
      originalPic &&
      !src.includes("placeholder") &&
      !hasLocalImage
    ) {
      // Try the original pic path from tooriistamaailm
      setAttemptedOriginal(true);
      setHasError(false);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const getImageSrc = () => {
    if (hasError) {
      return `https://placehold.co/300x200/f8fafc/64748b/png?text=${encodeURIComponent(
        alt.substring(0, 15)
      )}`;
    }

    // If we have a local image, use it directly
    if (hasLocalImage && !attemptedOriginal) {
      return src;
    }

    // If we're attempting original and have the pic path, try it
    if (attemptedOriginal && originalPic) {
      return `https://www.tooriistamaailm.ee${originalPic}`;
    }

    return src;
  };

  return (
    <div className="relative">
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
      <img
        src={getImageSrc()}
        alt={alt}
        className={`${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
      />
      {hasLocalImage && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
          ✓ Local
        </div>
      )}
    </div>
  );
};
