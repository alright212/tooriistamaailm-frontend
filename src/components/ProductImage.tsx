import React, { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  originalPic?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = "",
  originalPic,
}) => {
  const [hasError, setHasError] = useState(false);
  const [attemptedOriginal, setAttemptedOriginal] = useState(false);

  const handleError = () => {
    if (!attemptedOriginal && originalPic && !src.includes("placeholder")) {
      // Try the original pic path
      setAttemptedOriginal(true);
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const getImageSrc = () => {
    if (hasError) {
      return "https://via.placeholder.com/300x200/e5e7eb/6b7280?text=No+Image";
    }
    if (!attemptedOriginal) {
      return src;
    }
    // Try the original pic path from the API data
    return originalPic ? `https://www.tooriistamaailm.ee${originalPic}` : src;
  };

  return (
    <img
      src={getImageSrc()}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};
