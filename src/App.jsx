import Header from './components/Header';
import SideNav from './components/SideNav';
import PokeCard from './components/PokeCard';

import { useState } from 'react';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(false);

  function handleToggleSideMenu() {
    setShowSideMenu((prevMode) => !prevMode);
  }

  return (
    <>
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
