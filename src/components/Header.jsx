export default function Header({ handleToggleSideMenu }) {
  return (
    <header>
      <button onClick={handleToggleSideMenu} className="open-nav-button">
      <i className="fa-solid fa-bars"></i>
      </button>
      <h1 className="text-gradient">Poke&#769;dex</h1>
    </header>
  );
}
