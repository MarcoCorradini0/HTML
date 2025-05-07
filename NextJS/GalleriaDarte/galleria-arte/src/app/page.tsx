"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ArtCard from "../../components/ArtCard";
import { Artwork } from "../../lib/artworks";

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    } else {
      fetch("/api/artworks")
        .then((res) => res.json())
        .then((data) => setArtworks(data))
    }
  }, [session]);
  
  // Redirect to login if not authenticated
  if (!session) {
    return <p>Reindirizzamento alla pagina di login</p>
  }
  return (
    <main className="gallery">
      <h1>Benvenuto nella Galleria d'Arte</h1>
      {artworks.map((artwork) => (
        <ArtCard key={artwork.id} artwork={artwork} />
      ))}
    </main>
  );
}
