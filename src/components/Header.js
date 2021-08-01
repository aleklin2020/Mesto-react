import "../index.css";
import headerVektor from "../image/header/Vector.svg";
function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt="Maesto" src={headerVektor} />
    </header>
  );
}
export default Header;