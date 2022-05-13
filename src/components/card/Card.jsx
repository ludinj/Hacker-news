import "./card.scss";
import clock2 from "../../images/clock2.png";
import likeOutline from "../../images/likeOutline.png";
import likeFill from "../../images/likeFill.png";
import { useState, useEffect } from "react";

const Card = ({ post, favorites, setFavorites }) => {
  const [isLiked, setIsLiked] = useState(false);

  //handles the like click event
  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    if (!isLiked) {
      setFavorites((pre) => [...pre, post]);
      localStorage.setItem("myFav", JSON.stringify(favorites));
    } else {
      setFavorites((pre) =>
        pre.filter((ele) => ele.objectID !== post.objectID)
      );
      localStorage.setItem("myFav", JSON.stringify(favorites));
    }
  };
  //sets is liked on render
  useEffect(() => {
    let storedFav = JSON.parse(localStorage.getItem("myFav"));
    storedFav.forEach((fav) => {
      if (fav.objectID === post.objectID) {
        setIsLiked(true);
      }
    });
  }, [post]);

  //calculates the time passed since the post was created
  const timeSince = (date) => {
    if (typeof date !== "object") {
      date = new Date(date);
    }
    let seconds = Math.floor((new Date() - date) / 1000);
    let intervalType;
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      intervalType = "year";
    } else {
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        intervalType = "month";
      } else {
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = "day";
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "hour";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "second";
            }
          }
        }
      }
    }

    if (interval > 1 || interval === 0) {
      intervalType += "s";
    }
    return interval + " " + intervalType;
  };

  return (
    <div className="card" onClick={() => window.open(post.story_url, "_blank")}>
      <div className="cardContent">
        <div className="timer">
          <img src={clock2} alt="clock" />
          <span>
            {timeSince(post.created_at)} ago by {post.author}
          </span>
        </div>
        <span>{post.story_title}</span>
        <br />
      </div>
      <div className="like" onClick={handleLike}>
        <img src={isLiked ? likeFill : likeOutline} alt="like" />
      </div>
    </div>
  );
};

export default Card;
