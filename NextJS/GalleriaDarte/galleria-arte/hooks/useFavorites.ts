"use client";
import { useState, useEffect } from "react";
import { Artwork } from "../lib/artworks";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Artwork[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  function toggleFavorite(artwork: Artwork) {
    const newFavorites = favorites.some((fav) => fav.id === artwork.id)
      ? favorites.filter((fav) => fav.id !== artwork.id)
      : [...favorites, artwork];

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  }

  return { favorites, toggleFavorite };
}