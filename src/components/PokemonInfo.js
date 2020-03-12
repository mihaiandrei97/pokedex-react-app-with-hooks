import React, { useState } from 'react';
import axios from 'axios';


const PokemonInfo = ({ itemInfo }) => {
  const [ description, setDescription ] = useState("");

  return (
    Object.keys(itemInfo).length > 0 && <React.Fragment>
      <div className="pokemon-title">{ itemInfo.name }</div>
      <div className="pokemon-stats-wrapper">
        <div className="pokemon-image"><img src={`https://pokeres.bastionbot.org/images/pokemon/${itemInfo.id}.png`} alt="" /></div>
        <div className="pokemon-stats">
          <div className="pokemon-stats-grid"><span>Height:</span><div>{ `${(itemInfo.height * 0.1).toFixed(1)}m` }</div></div>
          <div className="pokemon-stats-grid"><span>Weight:</span><div>{ `${(itemInfo.weight * 0.1).toFixed(1)}kg` }</div></div>
          <div className="pokemon-stats-types">
            <span>Type:</span>
            <div style={{marginTop: '10px'}}>
              {
                itemInfo.types.map((type, index) => <span className="pokemon-stats-type" key={ index }>{ type.type.name }</span> )
              }
            </div>
          </div>
          <div><button className="description-button" onClick={() => {
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${itemInfo.id}/`)
            .then(res => {
              let description = res.data.flavor_text_entries.filter((desc) => (desc.language.name === "en")).map(desc => desc.flavor_text);
              let unique_desc = Array.from(new Set(description));
              //console.log(unique_desc);
              setDescription(unique_desc.join(""));
            })
          }}>Check Description</button></div>
        </div>
      </div>
      <div className="pokemon-stats-wrapper">
        
        <ul className="pokemon-moves">
          <li className="pokemon-moves-title">Moves:</li>
          {
            itemInfo.moves.map((move, index) => <li className="pokemon-stats-type" key={ index }>{ move.move.name }</li> )
          }
        </ul>
        <ul className="pokemon-sprites">
          <li className="pokemon-sprites-title">Sprites:</li>
          {
            Object.keys(itemInfo.sprites).map((key, index) => itemInfo.sprites[key] !== null && <img key={ index } alt="" src={`${itemInfo.sprites[key]}`} /> )
          }
        </ul>
      </div>
        {description !== "" && <div className="description">
            <button className="close-description" onClick={() => setDescription("")}>X</button>
            <div>{ description }</div>
          </div>}

    </React.Fragment>
  )
}

export default PokemonInfo
