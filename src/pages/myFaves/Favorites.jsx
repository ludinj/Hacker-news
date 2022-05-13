import "./favorites.scss";
import Header from "../../components/header/Header";
import NavBtns from "../../components/navButtons/NavBtns";
import Card from "../../components/card/Card";
import { useEffect, useState } from "react";

const Favorites = () => {
  const [myFav, setMyFav] = useState([]);
  //sets the initial value to the local store value
  useEffect(() => {
    let myFav = JSON.parse(localStorage.getItem("myFav"));
    setMyFav(myFav);
  }, []);

  return (
    <div className="favContainer">
      <Header />
      <NavBtns active={"myFav"} />

      <div className="myFavContent">
        <div className="grid">
          {myFav?.map((fav, i) => {
            return (
              <Card
                key={i}
                post={fav}
                favorites={myFav}
                setFavorites={setMyFav}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
