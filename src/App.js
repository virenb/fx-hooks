import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css';

const Button = styled.button`
font-size: 1.2rem;
background-color: pink; 
color: white;
`;

const Input = styled.input`
type: date;
margin: 1.5rem;
width: 25%;
font-size: 1.2rem;
`;

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
          <h2>USD <span role="img" aria-label="img">🇺🇸</span></h2>
          <h2>Date: {date}</h2>
          <form
            onSubmit={
            e => e.preventDefault()}
          >
            <Button
              type="button"
              value={new Date().toISOString().split('T')[0]}
              onClick={e => setDate(e.target.value)}
            >
              Current
            </Button>
            <Input
              type="date" id="history-date" min="1999-01-04" max="2018-12-31"
              onChange={e => setDate(e.target.value)}
            />
          </form>
        </section>
        <table>
          <tbody>
            {Object.entries(rates).filter(([key]) => key !== 'USD').map(([key, value]) => <tr key={key}><td>{key}</td><td className={`currency-flag currency-flag-lg currency-flag-${key.toLowerCase()}`} /><td>{value}</td></tr>)}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
