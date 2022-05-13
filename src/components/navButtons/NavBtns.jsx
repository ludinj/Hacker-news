import "./navBtns.scss";
import { Link } from "react-router-dom";
const NavBtns = ({ active }) => {
  return (
    <div className="navBtns">
      <Link to={"/"}>
        <button className={active === "all" ? "btn active" : "btn"}>All</button>
      </Link>
      <Link to={"/favorites"}>
        <button className={active === "myFav" ? "btn active" : "btn"}>
          My faves
        </button>
      </Link>
    </div>
  );
};

export default NavBtns;
