// import React from "react";
import FeaturedMatches from "../component/HomePage/FeaturedMatches";
import AllMatches from "../component/HomePage/AllMatches";
import HowToPlay from "../component/HomePage/HowToPlay";
import styles from "../css/HomePage/HomePage.module.css";
import Calendar from "../component/HomePage/Calendar";
import Header from "../component/HomePage/Header";
import Navbar from "../component/Navbar";

const matches = [
    {
        "match_id": "1385697",
        "innings": 1,
        "batting_team": "Australia",
        "city": "Southampton",
        "dates": ["2024-09-11"],
        "event_name": "Australia tour of England",
        "match_number": "1",
        "gender": "male",
        "match_type": "T20",
        "match_referees": "AJ Pycroft",
        "tv_umpires": "MJ Saggers",
        "umpires": "{\"AG Wharf\",\"RJ Warren\"}",
        "team_type": "international",
        "teams": ["Australia", "England"],
        "venue": "{\"The Rose Bowl\",Southampton}",
        "players": "{\"MW Short\",\"TM Head\",\"MR Marsh\",\"JP Inglis\",\"MP Stoinis\",\"TH David\",\"C Green\",\"SA Abbott\",\"XC Bartlett\",\"A Zampa\",\"JR Hazlewood\"}",
        "season": "2024",
        "isFeatured": true
    },
    {
        "match_id": "1385697",
        "innings": 2,
        "batting_team": "England",
        "city": "Southampton",
        "dates": ["2024-09-11"],
        "event_name": "Australia tour of England",
        "match_number": "1",
        "gender": "male",
        "match_type": "T20",
        "match_referees": "AJ Pycroft",
        "tv_umpires": "MJ Saggers",
        "umpires": "{\"AG Wharf\",\"RJ Warren\"}",
        "team_type": "international",
        "teams": ["Australia", "England"],
        "venue": "{\"The Rose Bowl\",Southampton}",
        "players": "{\"PD Salt\",\"WG Jacks\",\"JM Cox\",\"LS Livingstone\",\"JG Bethell\",\"SM Curran\",\"J Overton\",\"JC Archer\",\"AU Rashid\",\"S Mahmood\",\"RJW Topley\"}",
        "season": "2024",
        "isFeatured": false
    },
    {
        "match_id": "1385698",
        "innings": 1,
        "batting_team": "Australia",
        "city": "Cardiff",
        "dates": ["2024-09-13"],
        "event_name": "Australia tour of England",
        "match_number": "2",
        "gender": "male",
        "match_type": "T20",
        "match_referees": "AJ Pycroft",
        "tv_umpires": "RJ Warren",
        "umpires": "{\"AG Wharf\",\"M Burns\"}",
        "team_type": "international",
        "teams": ["Australia", "England"],
        "venue": "{\"Sophia Gardens\",Cardiff}",
        "players": "{\"MW Short\",\"TM Head\",\"J Fraser-McGurk\",\"JP Inglis\",\"MP Stoinis\",\"TH David\",\"C Green\",\"AM Hardie\",\"C Connolly\",\"SA Abbott\",\"A Zampa\"}",
        "season": "2024",
        "isFeatured": false
    },
    {
        "match_id": "1385698",
        "innings": 2,
        "batting_team": "England",
        "city": "Cardiff",
        "dates": ["2024-09-13"],
        "event_name": "Australia tour of England",
        "match_number": "2",
        "gender": "male",
        "match_type": "T20",
        "match_referees": "AJ Pycroft",
        "tv_umpires": "RJ Warren",
        "umpires": "{\"AG Wharf\",\"M Burns\"}",
        "team_type": "international",
        "teams": ["Australia", "England"],
        "venue": "{\"Sophia Gardens\",Cardiff}",
        "players": "{\"PD Salt\",\"WG Jacks\",\"JM Cox\",\"LS Livingstone\",\"JG Bethell\",\"SM Curran\",\"J Overton\",\"BA Carse\",\"AU Rashid\",\"S Mahmood\",\"RJW Topley\"}",
        "season": "2024",
        "isFeatured": true
    },
    {
        "match_id": "1385700",
        "innings": 1,
        "batting_team": "England",
        "city": "Nottingham",
        "dates": ["2024-09-19"],
        "event_name": "Australia tour of England",
        "match_number": "1",
        "gender": "male",
        "match_type": "ODI",
        "match_referees": "AJ Pycroft",
        "tv_umpires": "JS Wilson",
        "umpires": "{\"AG Wharf\",\"HDPK Dharmasena\"}",
        "team_type": "international",
        "teams": ["England", "Australia"],
        "venue": "{\"Trent Bridge\",Nottingham}",
        "players": "{\"PD Salt\",\"BM Duckett\",\"WG Jacks\",\"HC Brook\",\"JL Smith\",\"LS Livingstone\",\"JG Bethell\",\"BA Carse\",\"JC Archer\",\"MJ Potts\",\"AU Rashid\"}",
        "season": "2024",
        "isFeatured": true
    },
    {
        "match_id": "1385700",
        "innings": 2,
        "batting_team": "Australia",
        "city": "Nottingham",
        "dates": ["2024-09-19"],
        "event_name": "Australia tour of England",
        "match_number": "1",
        "gender": "male",
        "match_type": "ODI",
        "match_referees": "AJ Pycroft",
        "tv_umpires": "JS Wilson",
        "umpires": "{\"AG Wharf\",\"HDPK Dharmasena\"}",
        "team_type": "international",
        "teams": ["England", "Australia"],
        "venue": "{\"Trent Bridge\",Nottingham}",
        "players": "{\"MR Marsh\",\"TM Head\",\"SPD Smith\",\"C Green\",\"M Labuschagne\",\"AT Carey\",\"MW Short\",\"AM Hardie\",\"SA Abbott\",\"BJ Dwarshuis\",\"A Zampa\"}",
        "season": "2024",
        "isFeatured": false
    },
    {
        "match_id": "1385701",
        "innings": 1,
        "batting_team": "Australia",
        "city": "Leeds",
        "dates": ["2024-09-21"],
        "event_name": "Australia tour of England",
        "match_number": "2",
        "gender": "male",
        "match_type": "ODI",
        "match_referees": "AJ Pycroft",
        "tv_umpires": "HDPK Dharmasena",
        "umpires": "{\"JS Wilson\",\"RJ Warren\"}",
        "team_type": "international",
        "teams": ["Australia", "England"],
        "venue": "{Headingley,Leeds}",
        "players": "{\"MW Short\",\"TM Head\",\"MR Marsh\",\"SPD Smith\",\"M Labuschagne\",\"AT Carey\",\"GJ Maxwell\",\"AM Hardie\",\"MA Starc\",\"A Zampa\",\"JR Hazlewood\"}",
        "season": "2024",
        "isFeatured": false
    },
    {
        "match_id": "1385701",
        "innings": 2,
        "batting_team": "England",
        "city": "Leeds",
        "dates": ["2024-09-21"],
        "event_name": "Australia tour of England",
        "match_number": "2",
        "gender": "male",
        "match_type": "ODI",
        "match_referees": "AJ Pycroft",
        "tv_umpires": "HDPK Dharmasena",
        "umpires": "{\"JS Wilson\",\"RJ Warren\"}",
        "team_type": "international",
        "teams": ["Australia", "England"],
        "venue": "{Headingley,Leeds}",
        "players": "{\"PD Salt\",\"BM Duckett\",\"WG Jacks\",\"HC Brook\",\"JL Smith\",\"LS Livingstone\",\"JG Bethell\",\"BA Carse\",\"AU Rashid\",\"MJ Potts\",\"OP Stone\"}",
        "season": "2024",
        "isFeatured": false
    },
    {
        "match_id": "1385702",
        "innings": 1,
        "batting_team": "Australia",
        "city": "{Chester-le-Street}",
        "dates": ["2024-09-24"],
        "event_name": "Australia tour of England",
        "match_number": "3",
        "gender": "male",
        "match_type": "ODI",
        "match_referees": "AJ Pycroft",
        "tv_umpires": "JS Wilson",
        "umpires": "{\"AG Wharf\",\"HDPK Dharmasena\"}",
        "team_type": "international",
        "teams": ["Australia", "England"],
        "venue": "{\"Riverside Ground\",Chester-le-Street}",
        "players": "{\"MW Short\",\"MR Marsh\",\"SPD Smith\",\"C Green\",\"M Labuschagne\",\"AT Carey\",\"GJ Maxwell\",\"AM Hardie\",\"SA Abbott\",\"MA Starc\",\"JR Hazlewood\"}",
        "season": "2024",
        "isFeatured": true
    },
    {
        "match_id": "1385702",
        "innings": 2,
        "batting_team": "England",
        "city": "{Chester-le-Street}",
        "dates": ["2024-09-24"],
        "event_name": "Australia tour of England",
        "match_number": "3",
        "gender": "male",
        "match_type": "ODI",
        "match_referees": "AJ Pycroft",
        "tv_umpires": "JS Wilson",
        "umpires": "{\"AG Wharf\",\"HDPK Dharmasena\"}",
        "team_type": "international",
        "teams": ["Australia", "England"],
        "venue": "{\"Riverside Ground\",Chester-le-Street}",
        "players": "{\"PD Salt\",\"BM Duckett\",\"WG Jacks\",\"HC Brook\",\"JL Smith\",\"LS Livingstone\",\"JG Bethell\",\"BA Carse\",\"AU Rashid\",\"MJ Potts\",\"RJW Topley\"}",
        "season": "2024",
        "isFeatured": false
    }
]

const HomePage = () => {
    const featuredMatches = matches.filter((match) => match.isFeatured);
    const allMatches = matches;

    return (
        <div className={styles.container}>
            <Navbar />
            <Header />
            <div className={styles.nonheader}>
                <div className={styles.matchlist}>
                    <FeaturedMatches matches={featuredMatches} />
                    <AllMatches matches={allMatches} />
                </div>
                <div className={styles.sidebar}>
                    <Calendar />
                    <HowToPlay />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
