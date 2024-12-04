import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Button, Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from '../../css/faqs.module.css'
import shootmail from '../../assets/landing_page/shootmail.svg'

const FAQ = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (_, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                backgroundColor: "#f9f9f9",
                padding: "2rem",
                gap: "2rem",
                borderRadius: "8px",
            }}
            id="faqs"
        >
            {/* FAQ Section */}
            <Box sx={{ flex: 2 }}>
                <div className={styles.heading}>
                    FREQUENTLY <br/>ASKED QUESTIONS
                </div>

                {/* FAQ Items */}
                {faqData.map((faq, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded === `panel${index}`}
                        onChange={handleChange(`panel${index}`)}
                        sx={{
                            boxShadow: "none",
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            marginBottom: "1rem",
                            "&:before": { display: "none" }, // Remove default accordion line
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                            sx={{
                                fontWeight: 600,
                                fontSize: "1rem",
                                color: "#333",
                            }}
                        >
                            {faq.question}
                        </AccordionSummary>
                        <AccordionDetails sx={{ fontSize: "0.9rem", color: "#666" }}>
                            {faq.answer}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            {/* Contact Section */}
            <Box
                sx={{
                    flex: 0.5,
                    padding: "1.5rem",
                    backgroundColor: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    marginTop: "9.5rem",
                    textAlign: "center",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                }}
            >
                <div className={styles.shootmailicon}><img className={styles.shootmail} src={shootmail}></img></div>
                {/* </Box> */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        marginBottom: "0.5rem",
                        color: "#333",
                    }}
                >
                    Do you have more questions?
                </Typography>
                <Typography
                    sx={{
                        fontSize: "0.9rem",
                        color: "#666",
                        marginBottom: "2rem",
                    }}
                >
                    End-to-end payments and financial management in a single solution.
                    Meet the right platform to help realize.
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#c00",
                        color: "white",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: "#a00",
                        },
                    }}
                >
                    Shoot a Direct Mail
                </Button>
            </Box>

        </Box>
   );
};

// Sample FAQ Data
const faqData = [
    {
      question: "How are Dream11 points calculated?",
      answer: "Dream11 points system is calculated on the basis of the performance of the player in an actual match. Check Dream11 Fantasy Points System for various sports."
    },
    {
      question: "How does Dream11 work for cricket matches?",
      answer: "Dream11 allows users to create their fantasy cricket team by selecting real players from an upcoming match. Your team earns points based on the players' performances in the real match."
    },
    {
      question: "Can I make changes to my team after creating it?",
      answer: "Yes, you can edit your team until the match deadline, which is typically when the match starts."
    },
    {
      question: "How does the ML model select players for the Dream Team?",
      answer: "The ML model uses advanced algorithms to evaluate: Player statistics (recent performances, strike rates, and economy rates), pitch and weather conditions (favoring spinners, pacers, or batsmen), opposition strength and head-to-head records, and historical performance in similar conditions (e.g., venue or tournament). The selected team is optimized for maximizing points based on these inputs."
    },
    {
      question: "Does the ML Dream Team guarantee a win?",
      answer: "No, the ML Dream Team does not guarantee a win. While it is optimized based on data-driven insights, actual match outcomes depend on real-time player performance, which may vary."
    },
    {
      question: "Does the ML model consider match formats (T20, ODI, Test)?",
      answer: "Yes, the ML model is tailored for specific formats. It adjusts: Player preferences based on match duration (e.g., explosive batsmen for T20, consistent performers for Tests) and strategy based on the scoring system for each format."
    },
    {
      question: "Can I customize the ML-generated Dream Team?",
      answer: "Yes, Dream11 often allows you to do the same. If the player is not satisfied with the current team, they can delete any player and drag and drop another player from the remaining squad."
    },
    {
      question: "How do I know the ML model is unbiased?",
      answer: "The ML model uses data-driven logic and statistical algorithms. It is not influenced by subjective opinions or fan biases, ensuring a fair and logical team recommendation."
    },
    {
      question: "How does the custom match feature work on Dream11 website?",
      answer: "There is a custom match button on the navigation bar which will lead the player to a custom match page wherein you can import players from a CSV file. Or on the select match page, the player can select players. This can either be done by searching and selecting players or importing them from a CSV file."
    },
    {
        question: "What languages does the audio feature offer?",
        answer: "It provides the option of Hindi, English, Marathi, Tamil, Telugu and some other regional languages."
      }
   
  ];
  
export default FAQ;
