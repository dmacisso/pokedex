import Header from './components/Header';
import PokeCard from './components/PokeCard';
import SideNav from './components/SideNav';

import { useState } from 'react';

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [showSideMenu, setShowSideMenu] = useState(false);  // this does the opposite of what it should do (ie, when showSideMenu it true, it's actually false)
  
  
  function handleToggleSideMenu() {
    setShowSideMenu((prevMode) => !prevMode);
  }

  // function handleToggleSideMenu() {
  //   setShowSideMenu(!showSideMenu)
  // }

  function handleCloseSideMenu() {
    setShowSideMenu(true);
  }

  return (
    <>
      <Header handleToggleSideMenu={handleToggleSideMenu} />
      <SideNav
        showSideMenu={showSideMenu}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        handleCloseSideMenu={handleCloseSideMenu}
      />
      <PokeCard selectedPokemon={selectedPokemon} />
    </>
  );
}

export default App;
