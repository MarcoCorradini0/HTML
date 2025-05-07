"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePassword(password: string) {
    return password.length >= 8 &&
           /[A-Z]/.test(password) &&
           /\d/.test(password) &&
           /[\W_]/.test(password);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Email non valida!");
      return;
    }
    if (!validatePassword(password)) {
      setError("La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un simbolo.");
      return;
    }

    console.log("Registrazione avviata con:", email, password);
    setError(""); // Reset dell'errore
  }

  return (
    <div className="auth-container">
      <h2>Registrati</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registrati</button>
      </form>
      <p>Hai già un account? <a href="/auth/login">Accedi</a></p>
    </div>
  );
}