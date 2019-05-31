import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import '../node_modules/currency-flags/dist/currency-flags.min.css';

const Layout = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const Header = styled.h1`
  text-align: center;
  font-size: 2.5rem;
`;

const Button = styled.button`
  font-size: 1.2rem;
  background-color: pink; 
  color: white;
  display: flex;
  margin: 0 auto;
`;

const Input = styled.input`
  type: date;
  font-size: 1.2rem;
  margin: 1.2rem auto;
 `;

const tableStyles = css`
  border: 1px solid #999;
`;

const TableData = styled.td`
  ${tableStyles};
`;

const TableRow = styled.tr`
  ${tableStyles};
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
    <div>
        <Header>ForEx Tracker</Header>
    <Layout>

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
            {Object.entries(rates).filter(([key]) => key !== 'USD').map(([key, value]) => <TableRow key={key}><TableData>{key}</TableData><TableData className={`currency-flag currency-flag-lg currency-flag-${key.toLowerCase()}`} /><TableData>{value}</TableData></TableRow>)}
          </tbody>
        </table>
      </main>
    </Layout>
</div>    
  );
}

export default App;
