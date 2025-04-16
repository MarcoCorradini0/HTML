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
  ]);

  function Header({ title, counter, pos }) {
    function handleClick(pos, action) {
      const copyPeople = [...people];
      if (action === "I") {
        copyPeople[pos].age++;
      } else if (action === "D") {
        copyPeople[pos].age--;
      }
      setPeople(copyPeople);
    }

    return (
      <div className="header-container">
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
          <HeroMessage message="Benvenuto nel mio progetto Next.js!" />
        ) : (
          people.map((person, index) => (
            <Header
              key={index}
              title={person.name}
              counter={person.age}
              pos={index}
            />
          ))
        )}
      </div>
    </>
  );
}