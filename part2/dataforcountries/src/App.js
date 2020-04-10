import React, { useState, useEffect } from 'react';
import './App.css';
import Display from './Display';

function App() {

  // states
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  // effect
  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(countries => setCountries(countries))
  }, [])

  const handleFilterChange = e => {
    setFilter(e.target.value)
  }

  let countriesToShow;
  if (filter === '') countriesToShow = [];
  else countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))


  return (
    <div className="App">
      find countries: <input onChange={handleFilterChange} /> 
      <br/>
      <Display countries={countriesToShow} />
    </div>
  );
}

export default App;
