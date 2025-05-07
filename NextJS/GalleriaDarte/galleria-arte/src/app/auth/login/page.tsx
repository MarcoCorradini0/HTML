"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await signIn("credentials", { email, password, redirect: false });

    if (!res?.ok) {
      setError("Credenziali errate!");
      return;
    }

    window.location.href = "/account"; // Reindirizza alla pagina account
  }

  return (
    <div className="auth-container">
      <h2>Accedi con Google</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Accedi</button>
      </form>

      <button className="google-login" onClick={() => signIn("google", { callbackUrl: "/account" })}>
        Accedi con Google
      </button>
      
      <p>Non hai un account? <a href="/auth/register">Registrati</a></p>
    </div>
  );
}