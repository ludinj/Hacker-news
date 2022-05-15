import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Header from "../../components/header/Header";
import axios from "axios";
import "./home.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import Spiner from "../../components/spiner/Spiner";
import NavBtns from "../../components/navButtons/NavBtns";

const Home = () => {
  const [filter, Setfilter] = useState("");
  const [page, setpage] = useState(0);
  const [posts, setPosts] = useState([]);
  const BASE_URL = "https://hn.algolia.com/api/v1/search_by_date?query=";
  const options = [
    {
      value: "angular",
      label: "Angular",
    },
    {
      value: "reactjs",
      label: "React",
    },
    {
      value: "vuejs",
      label: "Vuejs",
    },
  ];

  //sets the initial values from the local store
  useEffect(() => {
    const storedFilter = localStorage.getItem("filter");
    Setfilter(storedFilter);
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}${storedFilter}&page=0`);
        const data = res.data.hits;
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //handles the selected filter
  const handleSelect = async (e) => {
    setpage(0);
    Setfilter(e.target.value);
    localStorage.setItem("filter", e.target.value);
    try {
      const res = await axios.get(`${BASE_URL}${e.target.value}&page=0`);
      const data = res.data.hits;
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Loads more post depending on the page while scrolling
  const loadMore = async () => {
    setpage((prev) => prev + 1);
    try {
      const res = await axios.get(`${BASE_URL}${filter}&page=${page + 1}`);
      console.log(res.data.hits.length);
      setTimeout(() => {
        setPosts((prev) => [...prev, ...res.data.hits]);
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="homeContainer">
      <Header />
      <NavBtns active={"all"} />
      <div className="contentContainer">
        <div className="content">
          <select
            className="options"
            value={filter ? filter : "default"}
            onChange={handleSelect}
          >
            <option value="default" disabled hidden>
              Select your news
            </option>
            {options.map((opt, i) => {
              return (
                <option key={i} value={opt.value}>
                  {opt.label}
                </option>
              );
            })}
          </select>
          {/* /infinite scroll */}
          <InfiniteScroll
            className="grid"
            dataLength={posts.length}
            next={loadMore}
            hasMore={true}
            loader={<Spiner />}
          >
            {posts.map((post, i) => {
              //checks if the post has the necessary attributes
              if (
                post.author &&
                post.story_title &&
                post.story_url &&
                post.created_at
              ) {
                return <Card key={i} post={post} />;
              } else {
                return null;
              }
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Home;
