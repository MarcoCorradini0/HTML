export type Artwork = {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  price: number;
};

export async function getArtworks(): Promise<Artwork[]> {
  const res = await fetch("https://picsum.photos/v2/list?page=1&limit=12");
  if (!res.ok) {
    throw new Error("Errore nel recupero delle immagini");
  }
  const data: any[] = await res.json();

  return data.map((artwork): Artwork => ({
    id: String(artwork.id),
    title: `Opera ${artwork.id}`,
    author: artwork.author,
    imageUrl: artwork.download_url,
    price: Math.floor(Math.random() * (1000 - 100 + 1)) + 100, // Prezzo casuale
  }));
}