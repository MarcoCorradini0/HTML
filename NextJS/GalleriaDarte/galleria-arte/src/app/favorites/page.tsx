"use client";
import { useFavorites } from "../../hooks/useFavorites";
import { useCart } from "../../hooks/useCart";
import { Artwork } from "../../lib/artworks";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { addToCart } = useCart();

  return (
    <div>
      <h1>I tuoi Preferiti</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((fav: Artwork) => (
            <li key={fav.id}>
              <img src={fav.imageUrl} alt={fav.title} />
              <h3>{fav.title}</h3>
              <button onClick={() => addToCart(fav)}>Aggiungi al Carrello</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Non hai ancora salvato preferiti.</p>
      )}
    </div>
  );
}
