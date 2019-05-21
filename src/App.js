import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

/*
API
History - https://api.openrates.io/2000-01-03?base=USD
Latest - https://api.openrates.io/latest?base=USD
*/

function App() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch(`https://api.openrates.io/${date}?base=USD`)
      .then(response => response.json())
      .then(data => setRates(data.rates));
  }, [date]);

  return (
    <div className="app">
      <header>
        <h1>ForEx Tracker</h1>
      </header>
      <main>
        <section>
          <h3>USD <span role="img" aria-label="img">🇺🇸</span></h3>
          <p>Date: {date}</p>
          <form
            onSubmit={
              e => e.preventDefault()}>
            <button
              type="button"
              value={new Date().toISOString().split('T')[0]}
              onClick={e => setDate(e.target.value)}
            >
              Current
            </button>
            <input
              type="date" id="history-date" min="1999-01-04" max="2018-12-31"
              onChange={e => setDate(e.target.value)}
            />
            <button type="submit" onClick={() => console.log(`${date}`)}>Submit</button>
          </form>
        </section>
        <div>
          {Object.entries(rates).map(([key, value]) => <li key={key}>{key}, {value}</li>)}
        </div>
      </main>
    </div>
  );
}

export default App;
