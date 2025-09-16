import { useState, useEffect } from "react";
import { Artwork } from "../lib/artworks";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Artwork[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  const addFavorite = (artwork: Artwork) => {
    const newFavorites = [...favorites, artwork];
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return { favorites, addFavorite };
}
