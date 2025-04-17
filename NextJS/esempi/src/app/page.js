"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import HeroMessage from "../components/HeroMessage";
import "./globals.css";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer); // Pulisci il timer
  }, []);

  const [people, setPeople] = useState([
    { name: "Mario", age: 35 },
    { name: "Luigi", age: 32 },
    { name: "Peach", age: 28 },
    { name: "Toad", age: 25 },
    { name: "Yoshi", age: 30 },
    { name: "Super Mario", age: 40, isJumping: false }, // Aggiunto Super Mario
  ]);

  function Header({ title, counter, pos, isJumping }) {
    function handleClick(pos, action) {
      const copyPeople = [...people];
      if (action === "I") {
        copyPeople[pos].age++;
        if (copyPeople[pos].name === "Super Mario") {
          copyPeople[pos].isJumping = true; // Super Mario salta
          setTimeout(() => {
            copyPeople[pos].isJumping = false; // Torna in piedi
            setPeople(copyPeople);
          }, 500); // Durata del salto
        }
      } else if (action === "D") {
        copyPeople[pos].age--;
      }
      setPeople(copyPeople);
    }

    return (
      <div className={`header-container ${isJumping ? "jumping" : ""}`}>
        <h5 className="header-title">{title}</h5>
        {counter <= 28 && <h6 className="header-age">Ha {counter} anni</h6>}
        <button
          className="btn increment-btn"
          onClick={() => handleClick(pos, "I")}
        >
          INCREMENTA
        </button>
        <button
          className="btn decrement-btn"
          onClick={() => handleClick(pos, "D")}
        >
          DECREMENTA
        </button>
        {title === "Super Mario" && (
          <div className="super-mario-animation">
            {isJumping ? "Super Mario sta saltando!" : "Super Mario è in piedi!"}
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React App</title>
      </Head>
      <div className="app">
        {showWelcome ? (
          <div className="hero-wrapper">
            <HeroMessage message="Benvenuto nel mio progetto Next.js!" />
          </div>
        ) : (
          people.map((person, index) => (
            <Header
              key={index}
              title={person.name}
              counter={person.age}
              pos={index}
              isJumping={person.isJumping}
            />
          ))
        )}
      </div>
    </>
  );
}