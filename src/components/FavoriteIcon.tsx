import React from "react";

interface FavoriteIconProps {
  isFavorite: boolean;
}

export const FavoriteIcon: React.FC<FavoriteIconProps> = ({ isFavorite }) => {
  return (
    <span
      className={`text-2xl ${isFavorite ? "text-yellow-500" : "text-gray-400"}`}
    >
      {isFavorite ? "★" : "☆"}
    </span>
  );
};
