"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="auth-container">
      <h2>Accedi con Google</h2>
      <button className="google-login" onClick={() => signIn("google", { callbackUrl: "/account" })}>
        Accedi con Google
      </button>
      <p>Non hai un account? <a href="https://accounts.google.com/lifecycle/steps/signup/name?dsh=S1091052052:1746795914343290&flowEntry=SignUp&flowName=GlifWebSignIn&TL=AArrULTiDh3896TgSdEOTRbl2AaqaYXpMti0cUHMR140sSlnFF8N9cYBaMoyE2kt&continue=https://accounts.google.com/ManageAccount?nc%3D1">Registrati</a></p>
    </div>
  );
}