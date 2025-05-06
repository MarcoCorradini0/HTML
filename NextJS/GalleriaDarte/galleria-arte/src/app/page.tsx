import { getArtworks } from "../../lib/artworks";
import ArtCard from "../../components/ArtCard";

export default async function Home() {
  const artworks = await getArtworks();
  return (
    <main className="gallery">
      {artworks.map((artwork) => (
        <ArtCard key={artwork.id} artwork={artwork} />
      ))}
    </main>
  );
}