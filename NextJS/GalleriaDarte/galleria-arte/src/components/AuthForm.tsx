"use client";

import { useState } from "react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      alert("Email non valida!");
      return;
    }
    if (!validatePassword(password)) {
      alert("La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un simbolo.");
      return;
    }
    console.log("Registrazione/Login avviato con:", email, password);
  }

  return (
    <div className="auth-container">
      <h2>Registrati / Accedi</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Procedi</button>
      </form>
    </div>
  );
}