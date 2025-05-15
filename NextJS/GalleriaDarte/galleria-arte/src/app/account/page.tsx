"use client";
import { useSession, signOut } from "next-auth/react";
import { useFavorites } from "../../hooks/useFavorites";
import { Artwork } from "../../lib/artworks";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const { favorites } = useFavorites();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (status === "loading") {
    return <div className="loading">Caricamento...</div>;
  }

  if (!session) {
    return (
      <div className="auth-container">
        <h2>Accesso richiesto</h2>
        <p>Effettua il login per accedere ai tuoi preferiti.</p>
        <a href="/auth/login">Accedi</a>
      </div>
    );
  }

  return (
    <div className="account-container">
      <h2>Benvenuto {session.user?.name}!</h2>
      <button onClick={() => signOut()}>Esci</button>
      
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((fav: Artwork) => (
            <li key={fav.id}>
              <img src={fav.imageUrl} alt={fav.title} />
              <h3>{fav.title}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>Non hai ancora salvato preferiti.</p>
      )}
    </div>
  );
}