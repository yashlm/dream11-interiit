import React, { useState, useRef, useEffect, CSSProperties } from "react";
import { Tooltip } from "@mui/material";
import {
  BsFillVolumeUpFill,
  BsArrowsExpand,
  BsArrowsCollapse,
} from "react-icons/bs";
import { FaUndo, FaShareAlt, FaSave, FaInfoCircle } from "react-icons/fa";
import styles from "../../css/DescriptionCard.module.css";
import { BASE_URL } from "../../constants";
import ClipLoader from "react-spinners/ClipLoader";

export default function DescriptionCard({
  match_id,
  onUndo,
  onMatchDetails,
  onSave,
  info,
}) {
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const [audioLoading, setAudioLoading] = useState(false);

  // const fetchAudio = async () => {
  //   const text = document.getElementById("infoSectionText").textContent;
  //   console.log("Text to be converted to audio:", text);
  //   try {
  //     const response = await fetch(`${BASE_URL}/ai/audio`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ message: text }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch audio");
  //     }
  //     // Create a blob URL from the audio data
  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);
  //     setAudioUrl(url);
  //   } catch (err) {
  //     console.log("Error in fetching audio:", err);
  //   } finally {
  //     setAudioLoading(false);
  //   }
  // };

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [audioUrl]);

  const [expanded, setExpanded] = useState(false); // Controls the expanded state for ShowMoreText
  const [isOverflowing, setIsOverflowing] = useState(false);
  const infoRef = useRef(null);

  const fetchAudio = async () => {
    setAudioLoading(true); // Show the loader while fetching
    const text = document.getElementById("infoSectionText").textContent;
    console.log("Text to be converted to audio:", text);
    try {
      const response = await fetch(`${BASE_URL}/ai/audio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch audio");
      }
      // Create a blob URL from the audio data
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      // Play audio after URL is set
      if (audioRef.current) {
        audioRef.current.src = url; // Set the audio source
        await audioRef.current.play(); // Play the audio
      }
    } catch (err) {
      console.log("Error in fetching audio:", err);
    } finally {
      setAudioLoading(false); // Hide the loader
    }
  };

  const handleVoiceClick = async () => {
    console.log("Voice button clicked");
    await fetchAudio(); // Ensure fetchAudio is awaited
  };

  const handleExpandToggle = () => {
    setExpanded((prev) => !prev); // Toggle the expanded state when the icon is clicked
  };

  // Effect to run whenever 'expanded' changes
  useEffect(() => {
    console.log("The expanded state has changed:", expanded);
    // Additional logic when expanded changes can go here
  }, [expanded]); // Dependency array ensures this effect runs on 'expanded' change

  return (
    <div className={`${styles.descriptionCard}`} >
      <audio ref={audioRef} style={{ display: "none" }} />
      <div className={styles.bgBlur}>
        <div className={styles.cardHeader}>
          <p>Info Section</p>
          <div className="flex flex-row justify-end">
            <Tooltip title="Listen" placement="top">
              <button className={styles.iconButton} onClick={handleVoiceClick}>
                {audioLoading ? (
                  <ClipLoader
                    color={"white"}
                    className={styles.loader}
                    loading={audioLoading}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  <BsFillVolumeUpFill />
                )}
              </button>
            </Tooltip>
            <Tooltip title={expanded ? "Minimize" : "Expand"} placement="top">
              <button
                className={styles.iconButton}
                onClick={handleExpandToggle}
              >
                {expanded ? <BsArrowsCollapse /> : <BsArrowsExpand />}{" "}
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Info Section */}
        <div
          ref={infoRef}
          className={`${styles.infoSection} ${expanded ? styles.expanded : ""}`}
          id="infoSectionText"
          
        >
          {match_id && (
            <div>
              <h3>Weather Effect</h3>
              <p>{info}</p>
            </div>
          )}
          {/* <p styles={{ color: "white" }}>
            This team is a powerhouse, carefully constructed to dominate today's
            match! We've selected players based on a blend of recent form,
            career achievements, and crucial role-specific metrics. Let's break
            down each selection: **The Stars:** * **Brendon Barrie McCullum
            (Player ID: b8a55852):** Our undisputed top pick! McCullum's recent
            form is electrifying, boasting an `avg_fantasy_score_20` of 76.0,
            significantly higher than any other batter. This reflects his
            explosive batting style and ability to consistently deliver high
            scores. While he hasn't achieved a century recently
            (`centuries_cumsum: 0.0`), his high average of `59.0` runs and
            impressive `strike_rate_n3` of 118.0 showcase his ability to
            accelerate the innings and put pressure on the opposition. He's a
            true match-winner. * **Javagal Srinath (Player ID: bad31fac):** A
            bowling legend! Although he has `wickets_taken: 0` in this
            particular dataset, his exceptional economy rate (`economy_rate_n3:
            4.33`) demonstrates his ability to control runs. Crucially, his two
            `four_wicket_hauls_n` in his career highlight his match-winning
            potential. His high `dot_ball_percentage_n3` of 72.29% shows his
            ability to build pressure and create opportunities for wickets.
            Srinath's experience and proven ability to deliver under pressure
            make him an invaluable asset. He's a master of controlling the flow
            of the game, setting up opportunities for other bowlers. * **Kyle
            David Mills (Player ID: 7fb32e5b):** A consistent performer, Mills
            provides excellent support to Srinath. With `wickets_taken: 2` and a
            respectable `economy_rate_n3` of 4.62, he's a reliable wicket-taker
            who doesn't concede many runs. His `dot_ball_percentage_n3` of
            56.25% further underscores his ability to contain the opposition.
            Mills offers a perfect balance of economy and wicket-taking ability,
            making him a vital part of our bowling attack. **The Solid
            Contributors:** * **Daryl Raymond Tuffey (Player ID: 43936951):**
            Tuffey complements Mills with his experience and ability to bowl a
            steady line and length. His `dot_ball_percentage_n3` of 56.59% and
            `total_overs_throwed` of 94.8 show his workhorse qualities. While
            his wickets might be lower, his role is crucial in building pressure
            and allowing the other bowlers to attack. * **Harbhajan Singh
            (Player ID: 8b5b6769):** Harbhajan brings his vast experience and a
            potent spin bowling ability. His economy rate of 4.63 is excellent,
            and despite having only `wickets_taken: 1` in this dataset, his
            ability to control the run-rate and create pressure is vital. His
            `total_overs_throwed` of 122.66 demonstrates his stamina and
            willingness to bowl long spells. * **Zaheer Khan (Player ID:
            91a4a398):** Zaheer, another experienced campaigner, offers variety
            to the bowling attack. While his wickets are low in this dataset,
            his ability to control the run flow is important. His
            `dot_ball_percentage_n3` of 56.80% shows his consistency. **The
            Supporting Batsmen:** * **Nathan John Astle (Player ID: 99639abf):**
            Astle brings experience and big-hitting potential to the middle
            order. His four centuries (`centuries_cumsum: 4.0`) showcase his
            ability to play match-winning innings. His recent form might not be
            as stellar as McCullum's, but his experience is a valuable asset. *
            **Lou Vincent (Player ID: 2764133a):** Vincent adds further depth to
            the batting lineup. His two centuries show his class, and his
            `avg_fantasy_score_20` of 49.15 indicates respectable recent form. *
            **Virender Sehwag (Player ID: 8ba8195d):** Sehwag's ten centuries
            demonstrate his explosive batting style. While his recent form is
            moderate (`avg_fantasy_score_20: 49.8`), his potential to change the
            game in a few overs is huge. * **Mathew Stuart Sinclair (Player ID:
            1b668884):** Sinclair's inclusion provides batting depth, although
            his recent form suggests he might need to perform exceptionally well
            to add significant value to the side. **Team Balance:** This team is
            exceptionally well-balanced. We have a potent batting lineup
            spearheaded by McCullum, supported by experienced players like
            Sehwag and Astle. Our bowling attack is a mix of experienced
            wicket-takers (Srinath, Mills) and economical bowlers (Tuffey,
            Harbhajan, Zaheer), creating a strong combination to restrict the
            opposition. The selection ensures a strong blend of experience,
            recent form, and a variety of bowling styles to tackle any batting
            lineup. We are confident that this team will deliver a winning
            performance today!
          </p> */}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <Tooltip title="Undo" placement="top">
          <button className={styles.actionButton} onClick={onUndo}>
            <FaUndo />
          </button>
        </Tooltip>
        <Tooltip title="Share" placement="top">
          <button className={styles.actionButton}>
            <FaShareAlt />
          </button>
        </Tooltip>
        <Tooltip title="Match Details" placement="top">
          <button className={styles.actionButton} onClick={onMatchDetails}>
            <FaInfoCircle />
          </button>
        </Tooltip>
        <Tooltip title="Save" placement="top">
          <button className={styles.actionButton} onClick={onSave}>
            <FaSave />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
