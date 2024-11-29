import Header from './components/Header';
import SideNav from './components/SideNav';
import PokeCard from './components/PokeCard';

import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSideMenu, setShowSideMenu] = useState(false);

  function handleToggleDarkMode() {
    setIsDarkMode((prevMode) => !prevMode);
  }

  function handleToggleSideMenu() {
    setShowSideMenu((prevMode) => !prevMode);
  }

  // useEffect(() => {
  //   document.body.style.background = isDarkMode
  //     ? 'var(--background-primary, #05070f)'
  //     : 'var(--background-primary, white)';
  //   document.body.style.color = isDarkMode
  //     ? 'var(--color-primary, white)'
  //     : 'var(--color-primary, black)';
  // }, [isDarkMode]);

  return (
    <>
      {/* <button onClick={handleToggleDarkMode}>
        {' '}
        Switch to {isDarkMode ? 'Light' : 'Dark'} mode...
        {isDarkMode ? (
          <i className="fa-solid fa-toggle-on"></i>
        ) : (
          <i className="fa-solid fa-toggle-off"></i>
        )}{' '}
      </button> */}
      <Header handleToggleSideMenu={handleToggleSideMenu} />
      <SideNav
        handleToggleSideMenu={handleToggleSideMenu}
        setSelectedPokemon={setSelectedPokemon}
        selectedPokemon={selectedPokemon}
        showSideMenu={showSideMenu}
      />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  );
}

export default App;
