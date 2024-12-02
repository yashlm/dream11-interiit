import styles from "../../css/HomePage/FeaturedMatches.module.css";
import MatchCard from "./MatchCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import cricicon from '../../assets/HomePage/cricket.svg';
import NoMatches from "./NoMatches";

const NextArrow = (props) => {
  const { onClick } = props;
  return <div className={styles.nextArrow} onClick={onClick} />;
};

NextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return <div className={styles.prevArrow} onClick={onClick} />;
};

PrevArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const FeaturedMatches = ({ matches }) => {
  const settings = {
    dots: matches.length > 1, // Enable dots only when more than one match
    arrows: matches.length > 1, // Enable arrows only when more than one match
    infinite: matches.length > 1, // Infinite loop only for multiple matches
    speed: 600,
    slidesToShow: Math.min(3, matches.length), // Show the number of slides based on matches
    slidesToScroll: 1,
    autoplay: matches.length > 1, // Enable autoplay only when more than one match
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(2, matches.length), // Adjust for medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Always show one slide for small screens
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>
        <img src={cricicon} alt="Icon" className={styles.cricicon} />
        Featured Matches
      </h2>
      {matches.length === 0 ? (
        <NoMatches
          message="There are no featured matches"
          customLink="/custommatch"
        />
      ) : (
        <Slider {...settings}>
          {matches.map((match, index) => (
            <div key={index}>
              <MatchCard match={match} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

FeaturedMatches.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      team1Flag: PropTypes.string.isRequired,
      team2Flag: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      series: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      stadium: PropTypes.string.isRequired,
      isFeatured: PropTypes.bool,
    })
  ).isRequired,
};

export default FeaturedMatches;
