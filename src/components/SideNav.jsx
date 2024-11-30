/* eslint-disable react/prop-types */
import { useState } from 'react';
import { first151Pokemon, getFullPokedexNumber } from '../utils';

export default function SideNav({
  selectedPokemon,
  setSelectedPokemon,
  handleCloseSideMenu,
  showSideMenu,
}) {
  const [searchValue, setSearchValue] = useState('');

  const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
    // if  full pokedex number includes the current search value, return true
    if (getFullPokedexNumber(eleIndex).includes(searchValue)) return true;
    // if pokedex name includes the current search value, return true
    if (ele.toLowerCase().includes(searchValue.toLowerCase())) return true;
    // otherwise exclude from the array
    return false;
  });

  //* MARK: JSX
  return (
    <nav className={' ' + (!showSideMenu ? ' open' : '')}>
      <div className={'header ' + (!showSideMenu ? 'open' : '')}>
        <button onClick={handleCloseSideMenu} className="open-nav-button">
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
        <h1 className="text-gradient">Poke&#769;dex</h1>
      </div>
      <input
        placeholder="E.g. 001 or Bulbasaur"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        type="text"
      />
      {filteredPokemon.map((pokemon, pokemonIndex) => {
        const truePokedexNumber = first151Pokemon.indexOf(pokemon);
        return (
          
          <button
            onClick={() => {
              setSelectedPokemon(truePokedexNumber);
              handleCloseSideMenu();
            }}
            key={pokemonIndex}
            className={
              'nav-card ' +
              (pokemonIndex === selectedPokemon ? 'nav-card-selected' : ' ')
            }
          >
            <p>{getFullPokedexNumber(truePokedexNumber)}</p>
            <p>{pokemon}</p>
          </button>
        );
      })}
    </nav>
  );
}
