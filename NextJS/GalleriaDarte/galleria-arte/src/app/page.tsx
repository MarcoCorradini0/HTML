"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Artwork, getArtworks } from "../lib/artworks";
import { useFavorites } from "../hooks/useFavorites";
import { signIn } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { get } from "http";

export default function HomePage() {
  const { data: session } = useSession();
  const { addFavorite } = useFavorites();
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    getArtworks().then(setArtworks).catch((error) => {
      console.error("Error fetching artworks:", error);
      toast.error("Errore nel caricamento delle opere d'arte.");
    });
  }, []);

  const handleAddFavorite = (artwork: Artwork) => {
    if (!session) {
      toast.info("Per favore, effettua il login per aggiungere ai preferiti.");
      signIn("google");
    } else {
      addFavorite(artwork);
      toast.success("Aggiunto ai preferiti!");
    }
  };

  return (
    <><Header /><div>
      <h1>Galleria d'Arte</h1>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {artworks.map((artwork) => (
          <SwiperSlide key={artwork.id}>
            <div>
              <Zoom>
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  style={{ width: "100%", borderRadius: "8px", aspectRatio: "16/9", objectFit: "cover" }}
                />
              </Zoom>
              <h3>{artwork.title}</h3>
              <p>Autore: {artwork.author}</p>
              <p>Prezzo: € {artwork.price}</p>
              <button onClick={() => handleAddFavorite(artwork)}>Aggiungi ai preferiti</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <footer>
        <p>© 2025 Galleria d'Arte "Corradini Marco". Tutti i diritti riservati.</p>
        <ToastContainer />
      </footer>
    </div></>
  );
}