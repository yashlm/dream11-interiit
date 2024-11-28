import styles from "../css/footer.module.css";
import logo from "../assets/landing_page/dream11logowhite.png"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <div className={styles.logo}>
          <img src={logo} alt="Dream 11"></img>
        </div>
        <div className={styles.socialMedia}>
          <i className={`fab fa-youtube ${styles.icon}`}></i>
          <i className={`fab fa-facebook-f ${styles.icon}`}></i>
          <i className={`fab fa-linkedin-in ${styles.icon}`}></i>
          <i className={`fab fa-x-twitter ${styles.icon}`}></i>
          <i className={`fab fa-instagram ${styles.icon}`}></i>
        </div>
      </div>

      <div className={styles.linksSection}>
        <div className={styles.column}>
          <a href="#winners">Dream11 winners</a>
          <a href="#jobs">Jobs</a>
          <a href="#about">About us</a>
          <a href="#help">Help & support</a>
          <a href="#guidelines">Community Guidelines</a>
          <a href="#app">Fantasy app download</a>
          <a href="#team">Dream11 team today</a>
        </div>
        <div className={styles.column}>
          <p>FOUNDING MEMBER</p>
          <p>FAIRPLAY POLICY</p>
        </div>
      </div>

      <div className={styles.corporateOffice}>
        <p>
          ONE BKC, Tower A, 12th & 14th Floor, Unit 1201 & 1202 and 1401 & 1402,
          Plot C-66, G Block, Bandra Kurla Complex, Bandra (East), Mumbai 400
          051
        </p>
      </div>

      <div className={styles.bottomSection}>
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms and conditions</a>
      </div>

      <div className={styles.disclaimer}>
        <p>
          THIS GAME MAY BE HABIT-FORMING OR FINANCIALLY RISKY. PLAY RESPONSIBLY.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
