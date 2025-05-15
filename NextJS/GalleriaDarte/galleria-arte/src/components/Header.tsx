"use client";
import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";
import "./Header.css"; 

export default function Header() {
  const { data: session } = useSession();
  const username = session?.user?.name || "Guest";

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">Galleria d'Arte</Link>
      </div>
      <nav className="nav">
        <span className="welcome">Ciao, {username}</span>
        <Link href="/favorites">❤️ Preferiti</Link>
        <Link href="/cart">🛒 Carrello</Link>
      {session ? (
        <button className="auth-button" onClick={() => signOut()}>Logout</button>
      ) : (
        <button className="auth-button" onClick={() => signIn("google")}>Accedi con Google</button>
      )}
      </nav>
    </header>
  );
}