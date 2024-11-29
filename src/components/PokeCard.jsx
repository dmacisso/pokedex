/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { getFullPokedexNumber, getPokedexNumber } from '../utils';

//* MARK: Components
import TypeCard from './TypeCard';
import Modal from './Modal';

export default function PokeCard({ selectedPokemon }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [skill, setSkill] = useState('');
  const [loadingSkill, setLoadingSkill] = useState(false);

  const { name, height, abilities, stats, types, moves, sprites } = data || {};

  const imgList = Object.keys(sprites || {}).filter((val) => {
    if (!sprites[val]) return false;
    if (['versions', 'other'].includes(val)) return false;
    return true;
  });

  async function fetchMoveData(move, moveUrl) {
    if (loadingSkill || !localStorage || !moveUrl) return;
    // check cache for move
    let c = {};
    if (localStorage.getItem('pokemon-moves'))
      c = JSON.parse(localStorage.getItem('pokemon-moves'));

    if (move in c) {
      setSkill(c[move]);
      console.log('found move in cache');
      return;
    }
    // Did't find move in c "cache"
    try {
      setLoadingSkill(true);
      const res = await fetch(moveUrl);
      const moveData = await res.json();
      console.log('Fetched move from api ', moveData);
      const description = moveData?.flavor_text_entries.filter((val) => {
        return (val.version_group.name = 'firered-leafgreen');
      })[0]?.flavor_text;

      const skillData = {
        name: move,
        description,
      };
      setSkill(skillData);

      c[move] = skillData;

      localStorage.setItem("pokemon-moves",JSON.stringify(c));
    } catch (err) {
      console.log('Error :', err.message);
    } finally {
      setLoadingSkill(false);
    }
  }

  //* MARK: Use Effect
  useEffect(() => {
    // if loading, exit logic
    if (loading || !localStorage) return;
    // Check cache for selected pokemon information
    // 1. Define the cache
    let cache = {};
    if (localStorage.getItem('pokedex')) {
      cache = JSON.parse(localStorage.getItem('pokedex'));
    }
    // 2. Check if selected pokemon is in cache, otherwise fetch from api
    if (selectedPokemon in cache) {
      // read from cache
      setData(cache[selectedPokemon]);
      console.log('pokemon found in cache');
      return;
    }
    // If not in cache,  need to fetch the data from the api
    async function fetchPokemonData() {
      setLoading(true);
      try {
        const baseUrl = 'https://pokeapi.co/api/v2/';
        const endpoint = 'pokemon/' + getPokedexNumber(selectedPokemon);
        const finalUrl = baseUrl + endpoint;
        // console.log(finalUrl);
        const res = await fetch(finalUrl);
        const pokemonData = await res.json();
        setData(pokemonData);
        console.log('Fetched pokemon data');

        cache[selectedPokemon] = pokemonData;
        localStorage.setItem('pokedex', JSON.stringify(cache));
      } catch (err) {
        console.log('Error: ', err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPokemonData();
    //3. if data is fetched from api, update the cache with new pokemon info
  }, [selectedPokemon]);

  //* logic
  if (loading || !data) {
    return (
      <div className="">
        <h4 className="">Loading....</h4>
      </div>
    );
  }
  //* MARK: JSX
  return (
    <div className="poke-card">
      {skill && (
        <Modal
          handleCloseModal={() => {
            setSkill(null);
          }}
        >
          <div>
            <h6>Name</h6>
            <h2 className='skill-name' >{skill.name.replaceAll('-', ' ')}</h2>
          </div>
          <div>
            <h6>description</h6>
            <p>{skill.description}</p>
          </div>
        </Modal>
      )}
      <div>
        <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
        <h2>{name}</h2>
      </div>
      <div className="type-container">
        {types.map((typeObj, typeIndex) => {
          return <TypeCard key={typeIndex} type={typeObj?.type?.name} />;
        })}
      </div>
      <img
        src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'}
        alt={`${name}-large-img`}
        className="default-img"
      />
      <div className="img-container">
        {imgList.map((spriteUrl, spriteIndex) => {
          const imgUrl = sprites[spriteUrl];
          return (
            <img
              key={spriteIndex}
              src={imgUrl}
              alt={`${name}-img-${spriteUrl}`}
            />
          );
        })}
      </div>
      <h3>Stats</h3>
      <div className="stats-card">
        {stats.map((statObj, statIndex) => {
          const { stat, base_stat } = statObj;
          return (
            <div key={statIndex} className="stat-item">
              <p>{stat?.name.replace('-', ' ')}</p>
              <h4>{base_stat}</h4>
            </div>
          );
        })}
      </div>
      <h3>Moves:</h3>
      <div className="pokemon-move-grid">
        {moves.map((moveObj, moveIndex) => {
          return (
            <button
              onClick={() => {
                fetchMoveData(moveObj?.move?.name, moveObj?.move?.url);
              }}
              key={moveIndex}
              className="button-card pokemon-move"
            >
              <p>{moveObj?.move?.name.replaceAll('-', ' ')}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
