import "./favorites.scss";
import Header from "../../components/header/Header";
import NavBtns from "../../components/navButtons/NavBtns";
import Card from "../../components/card/Card";
import { useSelector } from "react-redux";

const Favorites = () => {
  const myFav = useSelector((state) => state.myFav.myFavData);

  return (
    <div className="favContainer">
      <Header />
      <NavBtns active={"myFav"} />
      <div className="myFavContent">
        <div className="grid">
          {myFav?.map((fav, i) => {
            return <Card key={i} post={fav} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
