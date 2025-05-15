"use client";
import { useCart } from "../../hooks/useCart";
import { Artwork } from "../../lib/artworks";
import { useState, useEffect } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => {
      // Ensure item.price and item.quantity are numbers
      const price = typeof item.price === 'number' ? item.price : Number(item.price);
      const quantity = typeof item.quantity === 'number' ? item.quantity : Number(item.quantity);
      return sum + price * quantity;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  return (
    <div>
      <h1>Il tuo Carrello</h1>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item: Artwork) => (
            <li key={item.id}>
              <img src={item.imageUrl} alt={item.title} />
              <h3>{item.title}</h3>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              />
              <button onClick={() => removeFromCart(item.id)}>Rimuovi</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Il tuo carrello è vuoto.</p>
      )}
      <h2>Totale: €{total.toFixed(2)}</h2>
      <button>Acquista</button>
    </div>
  );
}
