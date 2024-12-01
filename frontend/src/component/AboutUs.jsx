import styles from "../css/AboutUs.module.css";
import shadow from "../assets/landing_page/aboutus.svg";
import img1 from "../assets/landing_page/aboutus1.png";
import img2 from "../assets/landing_page/aboutus2.png";
import img3 from "../assets/landing_page/aboutus3.png";

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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                        venenatis, nulla vitae consectetur efficitur, ipsum elit vestibulum
                        icia dolor ex nemo modi eum saepe nisi accusantium corrupti deleniti commodi culpa omnis maxime! Consequuntur, asperiores itaque doloribus earum maiores omnis laborum? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt nam eos asperiores minus nihil blanditiis harum quaerat, dolores laudantium quod voluptates voluptatem facilis omnis pariatur incidunt unde, totam dicta? Inventore!
                        Est suscipit debitis fugiat cum quia facere accusamus consequuntur dignissimos perspiciatis voluptatibus cumque laborum necessitatibus aut eos praesentium fugit reiciendis sapiente, quibusdam quidem tempora consequatur earum aspernatur dicta. Cum, dolor. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae voluptates distinctio provident accusantium rerum inventore pariatur enim voluptas vitae quaerat cumque, aliquam quia dolor accusamus. Amet officia debitis consequatur harum!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
