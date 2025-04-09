"use client";

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import HeroMessage from '../components/HeroMessage';

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Nascondi il messaggio di benvenuto dopo 3 secondi
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
      if (action === 'I') {
        copyPeople[pos].age++;
      } else if (action === 'D') {
        copyPeople[pos].age--;
      }
      setPeople(copyPeople);
    }

    return (
      <div>
        <h5 className="text">{title}</h5>
        {counter <= 28 && <h6>Ha {counter} anni</h6>}
        <button onClick={() => handleClick(pos, 'I')}>INCREMENTA</button>
        <button onClick={() => handleClick(pos, 'D')}>DECREMENTA</button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React App</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/fontawesome.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/brands.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/solid.min.css" />
        <style>
          {`.app {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
          }
          .text {
              color: red;
          }`}
        </style>
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