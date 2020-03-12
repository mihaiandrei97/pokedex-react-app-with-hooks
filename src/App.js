import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Circle from './components/Circle';
import PokemonList from './components/PokemonList';
import PokemonInfo from './components/PokemonInfo';

/*
  Make pokedex design container
  Make each specific component
  Make pokemon list on the left
  Make a component on right based on state that is getting the info
*/

const App = () => {

  const [ items, setItems ] = useState([]);
  const [ currentItem, setCurrentItem ] = useState({});
  const [ itemInfo, setItemInfo ] = useState({});
  const [ input, setInput ] = useState("");

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=151`)
    .then(res => {
      const pokemons = res.data.results;
      setItems(pokemons);
      setCurrentItem(res.data.results[0]);
    })
  }, [])

  useEffect(() => {
    if(Object.keys(currentItem).length > 0) {
      axios.get(`${currentItem.url}`)
      .then(res => setItemInfo(res.data) )
    }
  }, [currentItem])

  const buildCircles = () => {
    return Array(4).fill(0).map((key, index) => <Circle key={ index } id={ index } />)
  }
  
  const buildSearchInput = () => {
    return <input className="name-input" placeholder="Enter pokemon name..." onChange={(e) => setInput(e.target.value)} />
  }

  return (
    <div className="pokemon-app-container">
      <div className="pokedex">
        <div className="pokemon-list-wrapper">
          { buildCircles() }
          { buildSearchInput() }
          <PokemonList items={ items } filterInput={ input } setCurrentItem={ setCurrentItem } />
        </div>
        <div className="pokemon-info">
          <PokemonInfo itemInfo={ itemInfo }/>
        </div> 
      </div>
    </div>
  );
}

export default App;
