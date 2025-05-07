"use client"; // Indica che il componente funziona nel browser

import { useEffect, useState } from "react";
import Link from "next/link";
import { Artwork } from "../lib/artworks";
import { useFavorites } from "../hooks/useFavorites";

type ArtCardProps = {
  artwork: Artwork;
};

export default function ArtCard({ artwork }: ArtCardProps) {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [price, setPrice] = useState(artwork.price);

  useEffect(() => {
    if (typeof window !== "undefined") { // Evita errori lato server
      const savedPrice = localStorage.getItem(`price_${artwork.id}`);
      if (savedPrice) {
        setPrice(parseFloat(savedPrice));
      } else {
        localStorage.setItem(`price_${artwork.id}`, price.toString());
      }
    }
  }, []);

  return (
    <Link href={`/art/${artwork.id}`} className="art-card">
      <div className="border p-4 transition-transform duration-300 hover:scale-95 hover:border-gold">
        <img src={artwork.imageUrl} alt={artwork.title} className="w-full h-48 object-cover" />
        <h2 className="text-lg font-bold">{artwork.title}</h2>
        <p className="text-sm text-gray-600">{artwork.author}</p>
        <p className="text-md font-semibold">{price} €</p>

        {/* Pulsante per aggiungere/rimuovere preferiti */}
        <button
          className={`favorite-button ${isFavorite(artwork.id) ? "favorite" : ""}`}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(artwork.id);
          }}
        >
          {isFavorite(artwork.id) ? "❤️" : "🤍"}
        </button>
      </div>
    </Link>
  );
}