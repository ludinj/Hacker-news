import "./header.scss";
import hackerImg from "../../images/hacker-news@3x.png";
const Header = () => {
  return (
    <div className="header">
      {/* <span class="HACKER-NEWS">HACKER NEWS</span> */}
      <img src={hackerImg} alt="" />
    </div>
  );
};

export default Header;
