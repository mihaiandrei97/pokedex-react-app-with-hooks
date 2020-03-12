import React, { useState, useEffect } from 'react'

const PokemonList = ({ items, setCurrentItem, filterInput }) => {

  const [ filteredItems, setFilteredItems ] = useState([]);

  useEffect(() => {
    setFilteredItems(items);
  }, [items])

  useEffect(() => {
    setFilteredItems(items.filter((item) => item.name.includes(filterInput)));
  }, [filterInput])
  
  const buildList = () => {
    return filteredItems.map((item, index) => <li className="pokemon-item" key={ index } onClick={() => {
      setCurrentItem(item);
    }}>{ item.name }</li>)
  }

  return (
    <ul className="pokemon-list">
      { buildList() }
    </ul>
  )
}

export default PokemonList
