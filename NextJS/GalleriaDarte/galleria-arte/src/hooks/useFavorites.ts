import { useState, useEffect } from "react"
import { Artwork } from "../lib/artworks"

export function useFavorites() {
  const [favorites, setFavorites] = useState<Artwork[]>([])

  // Carica dal localStorage all'avvio
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(storedFavorites)
  }, [])

  const addFavorite = (artwork: Artwork) => {
    const newFavorites = [...favorites, artwork]
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const toggleFavorite = (artwork: Artwork) => {
    const exists = favorites.some((a) => a.id === artwork.id)
    const newFavorites = exists
      ? favorites.filter((a) => a.id !== artwork.id)
      : [...favorites, artwork]

    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  const isFavorite = (artwork: Artwork) => {
    return favorites.some((a) => a.id === artwork.id)
  }

  return { favorites, addFavorite, toggleFavorite, isFavorite }
}
