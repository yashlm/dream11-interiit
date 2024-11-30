import styles from "../../css/HomePage/AllMatches.module.css";
import MatchCard from "./MatchCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import cricicon from '../../assets/HomePage/cricket.svg';

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

const AllMatches = ({ matches }) => {
  const settings = {
    dots: true, // Show navigation dots
    arrows: true, // Enable navigation arrows
    infinite: true, // Loop through items
    speed: 600, // Smooth transition speed (increase for slower effect)
    slidesToShow: 3, // Number of slides visible at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Time interval for autoplay in milliseconds
    pauseOnHover: true, // Pause autoplay on hover
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}><img src={cricicon} alt="Icon" className={styles.cricicon}></img>Other Matches</h2>
      <Slider {...settings}>
        {matches.map((match, index) => (
          <div key={index}>
            <MatchCard match={match} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

AllMatches.propTypes = {
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

export default AllMatches;
