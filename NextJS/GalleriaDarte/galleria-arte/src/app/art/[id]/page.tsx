import { getArtworks } from "../../../../lib/artworks";

export default async function ArtDetailPage({ params }: { params: { id: string } }) {
  const artworks = await getArtworks();
  const artwork = artworks.find((art) => art.id === params.id);

  if (!artwork) {
    return <p>Opera non trovata</p>;
  }

  return (
    <div className="purchase-page">
      <img src={artwork.imageUrl} alt={artwork.title} className="art-image" />
      <h1>{artwork.title}</h1>
      <p>Autore: {artwork.author}</p>
      <p>Prezzo: {artwork.price} €</p>

      {/* Selettore quantità */}
      <label htmlFor="quantity">Quantità:</label>
      <input type="number" id="quantity" defaultValue={1} min={1} className="quantity-input" />

      {/* Pulsante per procedere al pagamento */}
      <button className="purchase-button">Procedi al pagamento</button>
    </div>
  );
}