import styles from "../../css/footer.module.css";
import logo from "../../assets/landing_page/dream11logowhite.png";

const Footer = () => {
  return (
    <footer className={styles.dream11Footer}>
      <div className={styles.dream11LogoSection}>
        <div className={styles.dream11Logo}>
          <img src={logo} alt="Dream 11"></img>
        </div>
        <div className={styles.dream11SocialMedia}>
          <i className={`fab fa-youtube ${styles.dream11Icon}`}></i>
          <i className={`fab fa-facebook-f ${styles.dream11Icon}`}></i>
          <i className={`fab fa-linkedin-in ${styles.dream11Icon}`}></i>
          <i className={`fab fa-x-twitter ${styles.dream11Icon}`}></i>
          <i className={`fab fa-instagram ${styles.dream11Icon}`}></i>
        </div>
      </div>
      <div className={styles.dream11SeparatorVertical}></div>
      <div className={styles.dream11LinksSection}>
        <div className={styles.dream11Column}>
          <a href="#winners">Dream11 winners</a>
          <a href="#jobs">Jobs</a>
          <a href="#about">About us</a>
          <a href="#help">Help & support</a>
          <a href="#guidelines">Community Guidelines</a>
          <a href="#app">Fantasy app download</a>
          <a href="#team">Dream11 team today</a>
        </div>
        <div className={styles.dream11Column}>
          <p>FOUNDING MEMBER</p>
          <p>FAIRPLAY POLICY</p>
        </div>
      </div>
      <div className={styles.dream11Separator}></div>

      <div className={styles.dream11CorporateOffice}>
        <p>
          ONE BKC, Tower A, 12th & 14th Floor, Unit 1201 & 1202 and 1401 & 1402,
          Plot C-66, G Block, Bandra Kurla Complex, Bandra (East), Mumbai 400
          051
        </p>
      </div>

      <div className={styles.dream11BottomSection}>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms and conditions</a>
      </div>

      <div className={styles.dream11Disclaimer}>
        <p>
          THIS GAME MAY BE HABIT-FORMING OR FINANCIALLY RISKY. PLAY RESPONSIBLY.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
