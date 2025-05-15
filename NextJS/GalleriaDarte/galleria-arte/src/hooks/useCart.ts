import { useState, useEffect } from "react";
import { Artwork } from "../lib/artworks";

export function useCart() {
  const [cart, setCart] = useState<Artwork[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const addToCart = (artwork: Artwork) => {
    const newCart = [...cart, { ...artwork, quantity: 1 }];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (id: string) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const newCart = cart.map(item => item.id === id ? { ...item, quantity } : item);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return { cart, addToCart, removeFromCart, updateQuantity };
}
