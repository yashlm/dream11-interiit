import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Button, Box, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from '../css/faqs.module.css'
import shootmail from '../assets/landing_page/shootmail.svg'

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
                {/* <Box
                    sx={{
                        // backgroundColor: "#000",
                        height: "50px",
                        width: "50px",
                        // borderRadius: "50%",
                        margin: "1rem",
                    }}
                > */}
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
        question: "The expense windows adapted sir. Wrong widen drawn.",
        answer:
            "Offending belonging promotion provision an be oh consulted ourselves it. Blessing welcomed ladyship she met humoured sir breeding her.",
    },
    {
        question: "Six curiosity day assurance bed necessary?",
        answer: "Offending belonging promotion provision an be consulted.",
    },
    {
        question: "Produce say the ten moments parties?",
        answer: "Blessing welcomed ladyship she met humoured sir breeding.",
    },
    {
        question: "Simple innate summer fat appear basket his desire joy?",
        answer: "Simple innate summer fat appear basket his desire joy.",
    },
    {
        question: "Outward clothes promise at gravity do excited?",
        answer: "Outward clothes promise at gravity do excited.",
    },
];

export default FAQ;
