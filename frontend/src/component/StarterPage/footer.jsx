import styles from "../../css/footer.module.css";
import logo from "../../assets/landing_page/dream11logowhite.png";

const Footer = () => {
  return (
    <footer className={styles.dream11Footer}>
      <div className={styles.dream11TopSection}>
        {/* Left Section: Logo and Social Media */}
        <div className={styles.dream11LogoSection}>
          <div className={styles.dream11Logo}>
            <img src={logo} alt="Dream 11" />
          </div>
          <div className={styles.dream11SocialMedia}>
            <a
              href="https://www.youtube.com/dream11"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`fab fa-youtube ${styles.dream11Icon}`}></i>
            </a>
            <a
              href="https://www.facebook.com/Dream11/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`fab fa-facebook-f ${styles.dream11Icon}`}></i>
            </a>
            <a
              href="https://www.linkedin.com/company/dream11/mycompany/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`fab fa-linkedin-in ${styles.dream11Icon}`}></i>
            </a>
            <a
              href="https://x.com/Dream11"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`fab fa-x-twitter ${styles.dream11Icon}`}></i>
            </a>
            <a
              href="https://www.instagram.com/dream11/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className={`fab fa-instagram ${styles.dream11Icon}`}></i>
            </a>
          </div>
        </div>

        {/* Right Section: Links */}
        <div className={styles.dream11LinksSection}>
          <div className={styles.dream11Column}>
            <a href="#winners">Dream11 winners</a>
            <a href="#jobs">Jobs</a>
            <a href="#about">About us</a>
            <a href="#help">Help & support</a>
            <a href="#guidelines">Community Guidelines</a>
            <a href="https://play.google.com/store/apps/details?id=com.dream11.fantasy.cricket.football.kabaddi">Fantasy app download</a>
            <a href="#team">Dream11 team today</a>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className={styles.dream11Disclaimer}>
        <p>
          THIS GAME MAY BE HABIT-FORMING OR FINANCIALLY RISKY. PLAY RESPONSIBLY.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
