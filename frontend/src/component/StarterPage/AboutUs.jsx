import styles from "../../css/AboutUs.module.css";
import shadow from "../../assets/landing_page/aboutus.svg";
import img1 from "../../assets/landing_page/aboutus1.png";
import img2 from "../../assets/landing_page/aboutus2.png";
import img3 from "../../assets/landing_page/aboutus3.png";

const AboutUs = () => {
    return (
        <div className={styles.aboutUsContainer}>
            <div className={styles.imageGrid}>
                <div className={styles.imageBox}>
                    <img src={img1} alt="Player 1" className={styles.image1} />
                    <img src={img3} alt="Player 2" className={styles.image3} />
                    
                </div>
                <div className={`${styles.imageBox} ${styles.overlayImageBox}`}>
                <img src={img2} alt="Team Celebration" className={styles.image2} />
                    <div className={styles.overlayText}>Over 20 Crore+ Users</div>
                </div>
            </div>

            <div className={styles.aboutContent}>
                <img src={shadow} alt="Shadow" className={styles.shadow} />
                <div className={styles.aboutbox}>
                    <h2 className={styles.title}>About us</h2>
                    <p className={styles.description}>
                    At Dream11, we are proud to be the world’s largest fantasy sports platform, uniting over 220 million passionate sports fans. A flagship brand of Dream Sports, India’s leading sports technology company, Dream11 offers a world-class fantasy sports experience across cricket, football, kabaddi, basketball, hockey, and more. With partnerships spanning national and international sports bodies, we aim to transform every sports event into an exhilarating experience. Dream11 is driven by a vision to "Make Sports Better," blending sports and technology to redefine fan engagement.

Our cutting-edge solution for cricket enthusiasts takes fantasy sports to the next level. Leveraging advanced machine learning models, we empower users to create winning fantasy cricket teams by providing accurate player performance predictions based on historical data, match conditions, and other relevant factors. Our interactive interface incorporates Generative AI-driven aids, offering real-time insights and guidance to help users make informed team-building decisions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
